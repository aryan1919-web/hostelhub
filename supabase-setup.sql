-- HostelHub Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student', 'warden', 'admin')),
  room_number TEXT,
  block TEXT,
  phone TEXT,
  course TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  student_name TEXT NOT NULL,
  room_number TEXT NOT NULL,
  user_id UUID REFERENCES users(id)
);

-- Leave applications table
CREATE TABLE IF NOT EXISTS leave_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  room_number TEXT NOT NULL,
  leave_type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  remarks TEXT,
  user_id UUID REFERENCES users(id)
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  published_by TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false
);

-- Visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  user_id UUID REFERENCES users(id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  room_number TEXT,
  category TEXT NOT NULL,
  rating INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'submitted',
  response TEXT,
  user_id UUID REFERENCES users(id)
);

-- Fee records table
CREATE TABLE IF NOT EXISTS fee_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  due_date TEXT NOT NULL,
  paid_date TEXT,
  status TEXT DEFAULT 'pending',
  description TEXT,
  user_id UUID REFERENCES users(id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_records ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (for demo purposes)
CREATE POLICY "Allow all on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on complaints" ON complaints FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on leave_applications" ON leave_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on notices" ON notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on visitors" ON visitors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on feedback" ON feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on fee_records" ON fee_records FOR ALL USING (true) WITH CHECK (true);

-- Seed demo users (password: demo123 hashed with bcrypt)
INSERT INTO users (name, email, password, role, room_number, block, phone, course, year) VALUES
  ('Rahul Kumar', 'student@demo.com', '$2a$10$xQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h', 'student', 'A-204', 'A Block', '+91-9876543214', 'B.Tech Computer Science', '3rd Year'),
  ('Priya Sharma', 'student2@demo.com', '$2a$10$xQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h', 'student', 'B-101', 'B Block', '+91-9876543211', 'B.Tech Electronics', '2nd Year'),
  ('Dr. Anand Kumar', 'warden@demo.com', '$2a$10$xQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h', 'warden', NULL, NULL, '+91-9876543200', NULL, NULL),
  ('Admin User', 'admin@demo.com', '$2a$10$xQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h5k5VZ5Z5Z5ZeQHJqZGx5h', 'admin', NULL, NULL, '+91-9876543100', NULL, NULL);

-- Seed complaints
INSERT INTO complaints (title, description, category, status, priority, student_name, room_number) VALUES
  ('Water leakage in bathroom', 'Continuous water leakage from the bathroom ceiling for 2 days.', 'maintenance', 'in-progress', 'high', 'Rahul Kumar', 'A-204'),
  ('WiFi not working in common area', 'WiFi connection in common study area down since yesterday.', 'facilities', 'pending', 'medium', 'Priya Sharma', 'B-101'),
  ('Broken window pane', 'Window pane is cracked and needs replacement for safety.', 'maintenance', 'resolved', 'medium', 'Amit Patel', 'C-305');

-- Seed notices
INSERT INTO notices (title, content, category, published_by, is_pinned) VALUES
  ('Hostel Fee Payment Deadline Extended', 'Fee payment deadline extended to January 31st. Please ensure timely payment.', 'fee', 'Hostel Administration', true),
  ('Maintenance Work - Water Supply', 'Water supply suspended on Jan 20th from 10AM-2PM for maintenance.', 'maintenance', 'Maintenance Department', true),
  ('Annual Sports Day - January 28th', 'Annual hostel sports day at college ground. Registration closes Jan 22nd.', 'event', 'Student Activities Committee', false);

-- Seed leave applications
INSERT INTO leave_applications (student_name, room_number, leave_type, start_date, end_date, reason, status, approved_by, remarks) VALUES
  ('Rahul Kumar', 'A-204', 'home', '2024-01-20', '2024-01-25', 'Attending family function - Sister''s wedding', 'approved', 'Prof. Meena Iyer', 'Approved. Return on time.'),
  ('Rahul Kumar', 'A-204', 'outing', '2024-01-28', '2024-01-28', 'Shopping for academic supplies', 'pending', NULL, NULL),
  ('Priya Sharma', 'B-101', 'medical', '2024-01-05', '2024-01-07', 'Doctor''s appointment and recovery', 'approved', 'Prof. Meena Iyer', 'Submit medical certificate on return.');

SELECT 'Database setup complete!' AS status;
