import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tcywixxcrrdeofmhleiq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeXdpeHhjcnJkZW9mbWhsZWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTQwNTIsImV4cCI6MjA5NDA3MDA1Mn0.2QadJRvDT9Kq4Ccaeho6aqlHAjpgbzqj8hS0VnZgMdU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations

export async function getComplaints() {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addComplaint(complaint: {
  title: string;
  description: string;
  category: string;
  priority: string;
  student_name: string;
  room_number: string;
}) {
  const { data, error } = await supabase
    .from('complaints')
    .insert([complaint])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateComplaintStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('complaints')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function getLeaveApplications() {
  const { data, error } = await supabase
    .from('leave_applications')
    .select('*')
    .order('applied_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addLeaveApplication(leave: {
  student_name: string;
  room_number: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
}) {
  const { data, error } = await supabase
    .from('leave_applications')
    .insert([leave])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateLeaveStatus(id: string, status: string, approved_by?: string, remarks?: string) {
  const { data, error } = await supabase
    .from('leave_applications')
    .update({ status, approved_by, remarks, approved_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function getNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addNotice(notice: {
  title: string;
  content: string;
  category: string;
  published_by: string;
  is_pinned: boolean;
}) {
  const { data, error } = await supabase
    .from('notices')
    .insert([notice])
    .select();
  if (error) throw error;
  return data[0];
}

export async function getFeedbacks() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addFeedback(fb: {
  student_name: string;
  room_number: string;
  category: string;
  rating: number;
  title: string;
  description: string;
  is_anonymous: boolean;
}) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([fb])
    .select();
  if (error) throw error;
  return data[0];
}

export async function getVisitors() {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('visit_date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addVisitor(visitor: {
  student_name: string;
  room_number: string;
  visitor_name: string;
  visitor_relation: string;
  visitor_phone: string;
  visit_date: string;
  visit_time: string;
  purpose: string;
}) {
  const { data, error } = await supabase
    .from('visitors')
    .insert([visitor])
    .select();
  if (error) throw error;
  return data[0];
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) throw error;
  return data;
}

export async function getFeeRecords() {
  const { data, error } = await supabase
    .from('fee_records')
    .select('*')
    .order('due_date', { ascending: false });
  if (error) throw error;
  return data;
}
