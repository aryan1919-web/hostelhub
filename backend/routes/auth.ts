import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb, saveDb } from "../db/setup.js";
import { JWT_SECRET, authenticate, type AuthRequest } from "../middleware/auth.js";

const router = Router();

/** POST /api/auth/login */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const db = await getDb();
  const result = db.exec("SELECT * FROM users WHERE email = ?", [email]);

  if (!result.length || !result[0].values.length) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const row = result[0].values[0];
  const cols = result[0].columns;
  const user: any = {};
  cols.forEach((col, i) => user[col] = row[i]);

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    token,
    user: {
      id: user.id, name: user.name, email: user.email, role: user.role,
      roomNumber: user.room_number, block: user.block, phone: user.phone,
    },
  });
});

/** POST /api/auth/register */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role = "student", roomNumber, block, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required" });
    return;
  }

  const db = await getDb();
  const existing = db.exec("SELECT id FROM users WHERE email = ?", [email]);

  if (existing.length && existing[0].values.length) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run("INSERT INTO users (name, email, password, role, room_number, block, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, email, hashedPassword, role, roomNumber, block, phone]);
  saveDb();

  const inserted = db.exec("SELECT last_insert_rowid() as id");
  const userId = inserted[0].values[0][0];

  const token = jwt.sign({ userId, email, role, name }, JWT_SECRET, { expiresIn: "24h" });

  res.status(201).json({
    token,
    user: { id: userId, name, email, role, roomNumber, block, phone },
  });
});

/** GET /api/auth/me */
router.get("/me", authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const db = await getDb();
  const result = db.exec("SELECT id, name, email, role, room_number, block, phone FROM users WHERE id = ?", [req.user!.userId]);

  if (!result.length || !result[0].values.length) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const row = result[0].values[0];
  const cols = result[0].columns;
  const user: any = {};
  cols.forEach((col, i) => user[col] = row[i]);

  res.json({
    id: user.id, name: user.name, email: user.email, role: user.role,
    roomNumber: user.room_number, block: user.block, phone: user.phone,
  });
});

export default router;
