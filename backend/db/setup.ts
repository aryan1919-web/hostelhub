import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "hostelhub.db");

let db: SqlJsDatabase;

export async function getDb(): Promise<SqlJsDatabase> {
  if (!db) {
    const SQL = await initSqlJs();

    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }
  }
  return db;
}

export function saveDb(): void {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDb();

  db.run(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'warden', 'admin')),
      room_number TEXT,
      block TEXT,
      phone TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS complaints (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'medium',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      student_name TEXT NOT NULL,
      room_number TEXT NOT NULL,
      user_id INTEGER REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS leave_applications (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      room_number TEXT NOT NULL,
      leave_type TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      applied_at TEXT DEFAULT (datetime('now')),
      approved_by TEXT,
      approved_at TEXT,
      remarks TEXT,
      user_id INTEGER REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notices (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      published_at TEXT DEFAULT (datetime('now')),
      published_by TEXT NOT NULL,
      is_pinned INTEGER DEFAULT 0
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      room_number TEXT NOT NULL,
      visitor_name TEXT NOT NULL,
      visitor_relation TEXT NOT NULL,
      visitor_phone TEXT NOT NULL,
      visit_date TEXT NOT NULL,
      visit_time TEXT NOT NULL,
      purpose TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      approved_by TEXT,
      user_id INTEGER REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      room_number TEXT,
      category TEXT NOT NULL,
      rating INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      is_anonymous INTEGER DEFAULT 0,
      submitted_at TEXT DEFAULT (datetime('now')),
      status TEXT DEFAULT 'submitted',
      response TEXT,
      user_id INTEGER REFERENCES users(id)
    );
  `);

  saveDb();
  console.log("✅ Database initialized");
}
