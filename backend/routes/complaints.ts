import { Router, Response } from "express";
import { getDb, saveDb } from "../db/setup.js";
import { authenticate, authorize, type AuthRequest } from "../middleware/auth.js";

const router = Router();

// Helper to convert sql.js result to objects array
function resultToObjects(result: any[]): any[] {
  if (!result.length || !result[0].values.length) return [];
  const cols = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    cols.forEach((col: string, i: number) => obj[col] = row[i]);
    return obj;
  });
}

/** GET /api/complaints */
router.get("/", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const db = await getDb();
  let result;
  if (req.user!.role === "student") {
    result = db.exec("SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC", [req.user!.userId]);
  } else {
    result = db.exec("SELECT * FROM complaints ORDER BY created_at DESC");
  }
  res.json(resultToObjects(result));
});

/** POST /api/complaints */
router.post("/", authenticate, authorize("student"), async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, category, priority = "medium" } = req.body;
  if (!title || !description || !category) {
    res.status(400).json({ error: "Title, description, and category are required" });
    return;
  }
  const db = await getDb();
  const userResult = db.exec("SELECT name, room_number FROM users WHERE id = ?", [req.user!.userId]);
  const user = resultToObjects(userResult)[0];
  const id = `C${Date.now().toString(36)}`;

  db.run("INSERT INTO complaints (id, title, description, category, priority, student_name, room_number, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, title, description, category, priority, user.name, user.room_number, req.user!.userId]);
  saveDb();

  const complaint = resultToObjects(db.exec("SELECT * FROM complaints WHERE id = ?", [id]))[0];
  res.status(201).json(complaint);
});

/** PATCH /api/complaints/:id/status */
router.patch("/:id/status", authenticate, authorize("warden", "admin"), async (req: AuthRequest, res: Response): Promise<void> => {
  const { status } = req.body;
  const { id } = req.params;
  if (!["pending", "in-progress", "resolved", "closed"].includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const db = await getDb();
  db.run("UPDATE complaints SET status = ?, updated_at = datetime('now') WHERE id = ?", [status, id]);
  saveDb();
  const complaint = resultToObjects(db.exec("SELECT * FROM complaints WHERE id = ?", [id]))[0];
  res.json(complaint);
});

export default router;
