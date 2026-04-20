import { getDb, saveDb, initializeDatabase } from "./setup.js";
import bcrypt from "bcryptjs";

async function seed() {
  await initializeDatabase();
  const db = await getDb();

  // Clear existing data
  db.run("DELETE FROM users");
  db.run("DELETE FROM complaints");
  db.run("DELETE FROM leave_applications");
  db.run("DELETE FROM notices");
  db.run("DELETE FROM feedback");

  // Seed users with hashed passwords
  const hashedPassword = bcrypt.hashSync("demo123", 10);

  db.run("INSERT INTO users (name, email, password, role, room_number, block, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ["Rahul Sharma", "student@demo.com", hashedPassword, "student", "A-204", "Block A", "+91-9876543210"]);
  db.run("INSERT INTO users (name, email, password, role, room_number, block, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ["Priya Patel", "student2@demo.com", hashedPassword, "student", "B-105", "Block B", "+91-9876543211"]);
  db.run("INSERT INTO users (name, email, password, role, room_number, block, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ["Dr. Anand Kumar", "warden@demo.com", hashedPassword, "warden", null, null, "+91-9876543200"]);
  db.run("INSERT INTO users (name, email, password, role, room_number, block, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ["Admin User", "admin@demo.com", hashedPassword, "admin", null, null, "+91-9876543100"]);

  // Seed complaints
  db.run("INSERT INTO complaints (id, title, description, category, status, priority, student_name, room_number, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ["C001", "Water leakage in bathroom", "Continuous water leakage from the tap in bathroom for 2 days.", "maintenance", "pending", "high", "Rahul Sharma", "A-204", 1]);
  db.run("INSERT INTO complaints (id, title, description, category, status, priority, student_name, room_number, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ["C002", "WiFi not working", "WiFi in Block A has been extremely slow for the past week.", "facilities", "in-progress", "medium", "Rahul Sharma", "A-204", 1]);
  db.run("INSERT INTO complaints (id, title, description, category, status, priority, student_name, room_number, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ["C003", "Broken window lock", "Window lock in my room is broken and needs replacement.", "maintenance", "resolved", "low", "Priya Patel", "B-105", 2]);

  // Seed notices
  db.run("INSERT INTO notices (id, title, content, category, published_by, is_pinned) VALUES (?, ?, ?, ?, ?, ?)",
    ["N001", "Hostel Fee Due Date Extended", "Last date for hostel fee payment extended to March 15, 2025.", "fee", "Dr. Anand Kumar", 1]);
  db.run("INSERT INTO notices (id, title, content, category, published_by, is_pinned) VALUES (?, ?, ?, ?, ?, ?)",
    ["N002", "Annual Cultural Night", "Join us for Annual Cultural Night on March 20th. Register by March 10th.", "event", "Dr. Anand Kumar", 0]);

  // Seed leave applications
  db.run("INSERT INTO leave_applications (id, student_name, room_number, leave_type, start_date, end_date, reason, status, approved_by, remarks, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ["L001", "Rahul Sharma", "A-204", "home", "2025-03-10", "2025-03-14", "Going home for family function", "approved", "Dr. Anand Kumar", "Approved. Return on time.", 1]);
  db.run("INSERT INTO leave_applications (id, student_name, room_number, leave_type, start_date, end_date, reason, status, approved_by, remarks, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ["L002", "Priya Patel", "B-105", "outing", "2025-03-08", "2025-03-08", "Shopping for essentials", "pending", null, null, 2]);

  saveDb();

  console.log("✅ Database seeded with demo data");
  console.log("   - 4 users (student, student2, warden, admin)");
  console.log("   - 3 complaints, 2 notices, 2 leave applications");
}

seed();
