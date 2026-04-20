import { Router, Response } from "express";
import { getDb, saveDb } from "../db/setup.js";
import { authenticate, authorize, type AuthRequest } from "../middleware/auth.js";

const router = Router();

function resultToObjects(result: any[]): any[] {
  if (!result.length || !result[0].values.length) return [];
  const cols = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    cols.forEach((col: string, i: number) => obj[col] = row[i]);
    return obj;
  });
}

/** GET /api/leaves */
router.get("/", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const db = await getDb();
  let result;
  if (req.user!.role === "student") {
    result = db.exec("SELECT * FROM leave_applications WHERE user_id = ? ORDER BY applied_at DESC", [req.user!.userId]);
  } else {
    result = db.exec("SELECT * FROM leave_applications ORDER BY applied_at DESC");
  }
  res.json(resultToObjects(result));
});

/** POST /api/leaves */
router.post("/", authenticate, authorize("student"), async (req: AuthRequest, res: Response): Promise<void> => {
  const { leaveType, startDate, endDate, reason } = req.body;
  if (!leaveType || !startDate || !endDate || !reason) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  const db = await getDb();
  const userResult = db.exec("SELECT name, room_number FROM users WHERE id = ?", [req.user!.userId]);
  const user = resultToObjects(userResult)[0];
  const id = `L${Date.now().toString(36)}`;

  db.run("INSERT INTO leave_applications (id, student_name, room_number, leave_type, start_date, end_date, reason, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, user.name, user.room_number, leaveType, startDate, endDate, reason, req.user!.userId]);
  saveDb();

  const leave = resultToObjects(db.exec("SELECT * FROM leave_applications WHERE id = ?", [id]))[0];
  res.status(201).json(leave);
});

/** PATCH /api/leaves/:id/approve */
router.patch("/:id/approve", authenticate, authorize("warden", "admin"), async (req: AuthRequest, res: Response): Promise<void> => {
  const { status, remarks } = req.body;
  const { id } = req.params;
  if (!["approved", "rejected"].includes(status)) {
    res.status(400).json({ error: "Status must be 'approved' or 'rejected'" });
    return;
  }
  const db = await getDb();
  db.run("UPDATE leave_applications SET status = ?, approved_by = ?, approved_at = datetime('now'), remarks = ? WHERE id = ?",
    [status, req.user!.name, remarks || null, id]);
  saveDb();
  const leave = resultToObjects(db.exec("SELECT * FROM leave_applications WHERE id = ?", [id]))[0];
  res.json(leave);
});

export default router;
