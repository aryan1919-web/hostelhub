export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: "maintenance" | "facilities" | "cleanliness" | "security" | "other";
  status: "pending" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  studentName: string;
  roomNumber: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: "general" | "urgent" | "event" | "maintenance" | "fee";
  publishedAt: string;
  publishedBy: string;
  isPinned: boolean;
}

export interface FeeRecord {
  id: string;
  month: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}

export interface Rule {
  id: string;
  category: string;
  title: string;
  description: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email?: string;
  category: "medical" | "security" | "management" | "maintenance";
  available24x7: boolean;
}

export interface LeaveApplication {
  id: string;
  studentName: string;
  roomNumber: string;
  leaveType: "home" | "outing" | "medical" | "event";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  remarks?: string;
}

export interface MealSchedule {
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface Visitor {
  id: string;
  studentName: string;
  roomNumber: string;
  visitorName: string;
  visitorRelation: string;
  visitorPhone: string;
  visitDate: string;
  visitTime: string;
  purpose: string;
  status: "pending" | "approved" | "rejected" | "completed";
  approvedBy?: string;
}

export interface LaundryItem {
  id: string;
  studentName: string;
  roomNumber: string;
  items: { type: string; quantity: number }[];
  submittedAt: string;
  status: "submitted" | "washing" | "drying" | "ready" | "collected";
  expectedDate: string;
  collectedAt?: string;
}

export interface HostelEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: "cultural" | "sports" | "academic" | "festival" | "meeting";
  isRegistrationRequired: boolean;
  registrationDeadline?: string;
}

export interface Resident {
  id: string;
  name: string;
  roomNumber: string;
  block: string;
  course: string;
  year: string;
  phone?: string;
  email?: string;
  profileVisible: boolean;
}

export interface Feedback {
  id: string;
  studentName: string;
  roomNumber: string;
  category: "food" | "cleanliness" | "facilities" | "staff" | "security" | "other";
  rating: number;
  title: string;
  description: string;
  isAnonymous: boolean;
  submittedAt: string;
  status: "submitted" | "reviewed" | "addressed";
  response?: string;
}

export interface LostFoundItem {
  id: string;
  type: "lost" | "found";
  itemName: string;
  description: string;
  category: "electronics" | "clothing" | "documents" | "accessories" | "other";
  location: string;
  date: string;
  reportedBy: string;
  contactPhone: string;
  status: "open" | "claimed" | "closed";
  imageUrl?: string;
}

export interface AmenityBooking {
  id: string;
  studentName: string;
  roomNumber: string;
  amenity: string;
  date: string;
  timeSlot: string;
  status: "booked" | "cancelled" | "completed";
  bookedAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: "forms" | "certificates" | "guidelines" | "notices";
  fileType: "pdf" | "doc" | "xlsx";
  uploadedAt: string;
  downloadUrl: string;
}

export interface RoomChangeRequest {
  id: string;
  studentName: string;
  currentRoom: string;
  preferredRoom: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  processedAt?: string;
  remarks?: string;
}

export const mockComplaints: Complaint[] = [
  {
    id: "C001",
    title: "Water leakage in bathroom",
    description: "There is continuous water leakage from the bathroom ceiling. It has been going on for 2 days now.",
    category: "maintenance",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
  },
  {
    id: "C002",
    title: "WiFi not working in common area",
    description: "The WiFi connection in the common study area has been down since yesterday evening.",
    category: "facilities",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    studentName: "Priya Sharma",
    roomNumber: "B-101",
  },
  {
    id: "C003",
    title: "Broken window pane",
    description: "The window pane in my room is cracked and needs replacement for safety reasons.",
    category: "maintenance",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-10T16:45:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
    studentName: "Amit Patel",
    roomNumber: "C-305",
  },
];

export const mockNotices: Notice[] = [
  {
    id: "N001",
    title: "Hostel Fee Payment Deadline Extended",
    content:
      "Due to technical issues with the payment gateway, the hostel fee payment deadline has been extended to January 31st, 2024. Please ensure timely payment to avoid late fees.",
    category: "fee",
    publishedAt: "2024-01-15T08:00:00Z",
    publishedBy: "Hostel Administration",
    isPinned: true,
  },
  {
    id: "N002",
    title: "Maintenance Work Schedule - Water Supply",
    content:
      "Water supply will be temporarily suspended on January 20th from 10:00 AM to 2:00 PM for essential maintenance work. Please store water in advance.",
    category: "maintenance",
    publishedAt: "2024-01-14T15:30:00Z",
    publishedBy: "Maintenance Department",
    isPinned: true,
  },
  {
    id: "N003",
    title: "Annual Sports Day - January 28th",
    content:
      "The annual hostel sports day will be held on January 28th at the college ground. All residents are encouraged to participate. Registration closes on January 22nd.",
    category: "event",
    publishedAt: "2024-01-12T10:00:00Z",
    publishedBy: "Student Activities Committee",
    isPinned: false,
  },
  {
    id: "N004",
    title: "New Study Hours Policy",
    content:
      "Starting February 1st, the common study area will remain open 24/7 during exam season (February-March). Please maintain silence and cleanliness.",
    category: "general",
    publishedAt: "2024-01-10T12:00:00Z",
    publishedBy: "Hostel Warden",
    isPinned: false,
  },
];

export const mockFeeRecords: FeeRecord[] = [
  {
    id: "F001",
    month: "January 2024",
    amount: 8500,
    dueDate: "2024-01-10",
    paidDate: "2024-01-08",
    status: "paid",
    description: "Monthly hostel fee including accommodation and utilities",
  },
  {
    id: "F002",
    month: "February 2024",
    amount: 8500,
    dueDate: "2024-02-10",
    status: "pending",
    description: "Monthly hostel fee including accommodation and utilities",
  },
  {
    id: "F003",
    month: "December 2023",
    amount: 8500,
    dueDate: "2023-12-10",
    paidDate: "2023-12-12",
    status: "paid",
    description: "Monthly hostel fee including accommodation and utilities",
  },
  {
    id: "F004",
    month: "November 2023",
    amount: 8500,
    dueDate: "2023-11-10",
    paidDate: "2023-11-09",
    status: "paid",
    description: "Monthly hostel fee including accommodation and utilities",
  },
];

export const mockRules: Rule[] = [
  {
    id: "R001",
    category: "General Conduct",
    title: "Quiet Hours",
    description:
      "Maintain silence in corridors and rooms between 10:00 PM and 7:00 AM. Use headphones for music and entertainment.",
  },
  {
    id: "R002",
    category: "General Conduct",
    title: "Visitor Policy",
    description:
      "Visitors are allowed only in the common area between 9:00 AM and 8:00 PM. All visitors must register at the reception with valid ID.",
  },
  {
    id: "R003",
    category: "Safety & Security",
    title: "Entry and Exit",
    description:
      "Main gate closes at 11:00 PM. Late entry requires prior permission from the warden. ID card must be shown at entry.",
  },
  {
    id: "R004",
    category: "Safety & Security",
    title: "Prohibited Items",
    description:
      "Possession of alcohol, drugs, weapons, or any illegal substances is strictly prohibited and will result in immediate expulsion.",
  },
  {
    id: "R005",
    category: "Room & Facilities",
    title: "Room Maintenance",
    description:
      "Keep your room clean and tidy. Room inspections are conducted monthly. Damage to hostel property will be charged.",
  },
  {
    id: "R006",
    category: "Room & Facilities",
    title: "Electrical Appliances",
    description:
      "Only approved electrical appliances (laptop, phone charger, study lamp) are allowed. Cooking appliances and heaters are prohibited in rooms.",
  },
  {
    id: "R007",
    category: "Fees & Payments",
    title: "Fee Payment",
    description:
      "Monthly fees must be paid by the 10th of each month. Late payment attracts a penalty of ₹200 per day.",
  },
  {
    id: "R008",
    category: "Fees & Payments",
    title: "Refund Policy",
    description:
      "Advance notice of 30 days required for vacating. Security deposit refunded within 15 days after room inspection.",
  },
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: "E001",
    name: "Dr. Rajesh Verma",
    designation: "Hostel Medical Officer",
    phone: "+91-9876543210",
    email: "dr.verma@hostel.edu",
    category: "medical",
    available24x7: true,
  },
  {
    id: "E002",
    name: "City Hospital Emergency",
    designation: "Nearest Hospital",
    phone: "108",
    category: "medical",
    available24x7: true,
  },
  {
    id: "E003",
    name: "Mr. Suresh Kumar",
    designation: "Chief Security Officer",
    phone: "+91-9876543211",
    email: "security@hostel.edu",
    category: "security",
    available24x7: true,
  },
  {
    id: "E004",
    name: "Police Control Room",
    designation: "Emergency Services",
    phone: "100",
    category: "security",
    available24x7: true,
  },
  {
    id: "E005",
    name: "Prof. Meena Iyer",
    designation: "Hostel Warden",
    phone: "+91-9876543212",
    email: "warden@hostel.edu",
    category: "management",
    available24x7: false,
  },
  {
    id: "E006",
    name: "Mr. Ramesh Patil",
    designation: "Maintenance Supervisor",
    phone: "+91-9876543213",
    email: "maintenance@hostel.edu",
    category: "maintenance",
    available24x7: false,
  },
  {
    id: "E007",
    name: "Fire Department",
    designation: "Emergency Services",
    phone: "101",
    category: "security",
    available24x7: true,
  },
  {
    id: "E008",
    name: "Ambulance Service",
    designation: "Emergency Medical",
    phone: "102",
    category: "medical",
    available24x7: true,
  },
];

export const studentProfile = {
  id: "STU001",
  name: "Rahul Kumar",
  rollNumber: "CS2021045",
  roomNumber: "A-204",
  block: "A Block",
  email: "rahul.kumar@student.edu",
  phone: "+91-9876543214",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  admissionDate: "2021-08-15",
  dateOfBirth: "2002-05-15",
  bloodGroup: "O+",
  address: "123, Main Street, Bangalore, Karnataka - 560001",
  guardianName: "Mr. Suresh Kumar",
  guardianPhone: "+91-9876543215",
  guardianRelation: "Father",
  profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
};

export const mockLeaveApplications: LeaveApplication[] = [
  {
    id: "L001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    leaveType: "home",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    reason: "Attending family function - Sister's wedding",
    status: "approved",
    appliedAt: "2024-01-15T10:00:00Z",
    approvedBy: "Prof. Meena Iyer",
    approvedAt: "2024-01-16T14:00:00Z",
  },
  {
    id: "L002",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    leaveType: "outing",
    startDate: "2024-01-28",
    endDate: "2024-01-28",
    reason: "Shopping for academic supplies",
    status: "pending",
    appliedAt: "2024-01-17T09:30:00Z",
  },
  {
    id: "L003",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    leaveType: "medical",
    startDate: "2024-01-05",
    endDate: "2024-01-07",
    reason: "Doctor's appointment and recovery",
    status: "approved",
    appliedAt: "2024-01-04T16:00:00Z",
    approvedBy: "Prof. Meena Iyer",
    approvedAt: "2024-01-04T18:00:00Z",
    remarks: "Get well soon. Submit medical certificate on return.",
  },
];

export const mockMealSchedule: MealSchedule[] = [
  {
    day: "Monday",
    breakfast: "Poha, Bread Toast, Butter, Tea/Coffee",
    lunch: "Rice, Dal, Aloo Gobi, Roti, Salad, Curd",
    snacks: "Samosa, Tea",
    dinner: "Rice, Rajma, Chapati, Mixed Veg, Salad",
  },
  {
    day: "Tuesday",
    breakfast: "Idli, Sambar, Chutney, Tea/Coffee",
    lunch: "Rice, Dal Tadka, Paneer Bhurji, Roti, Salad",
    snacks: "Bread Pakora, Tea",
    dinner: "Pulao, Raita, Chapati, Dal Makhani, Salad",
  },
  {
    day: "Wednesday",
    breakfast: "Paratha, Curd, Pickle, Tea/Coffee",
    lunch: "Rice, Sambhar, Bhindi Fry, Roti, Salad",
    snacks: "Vada Pav, Tea",
    dinner: "Rice, Chole, Chapati, Baingan Bharta, Salad",
  },
  {
    day: "Thursday",
    breakfast: "Upma, Coconut Chutney, Tea/Coffee",
    lunch: "Rice, Dal, Matar Paneer, Roti, Salad",
    snacks: "Cutlet, Tea",
    dinner: "Jeera Rice, Kadhi, Chapati, Aloo Fry, Salad",
  },
  {
    day: "Friday",
    breakfast: "Chole Bhature, Tea/Coffee",
    lunch: "Rice, Dal Fry, Mix Veg, Roti, Salad, Sweet",
    snacks: "Dhokla, Tea",
    dinner: "Rice, Dal Palak, Chapati, Gobi Matar, Salad",
  },
  {
    day: "Saturday",
    breakfast: "Dosa, Sambar, Chutney, Tea/Coffee",
    lunch: "Biryani, Raita, Roti, Salad",
    snacks: "Pav Bhaji, Tea",
    dinner: "Rice, Dal, Chapati, Shahi Paneer, Salad",
  },
  {
    day: "Sunday",
    breakfast: "Puri, Aloo Sabzi, Tea/Coffee",
    lunch: "Rice, Dal Makhani, Paneer Butter Masala, Roti, Salad, Ice Cream",
    snacks: "Pasta, Cold Drink",
    dinner: "Fried Rice, Manchurian, Chapati, Soup, Salad",
  },
];

export const mockVisitors: Visitor[] = [
  {
    id: "V001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    visitorName: "Mr. Suresh Kumar",
    visitorRelation: "Father",
    visitorPhone: "+91-9876543215",
    visitDate: "2024-01-20",
    visitTime: "10:00 AM - 12:00 PM",
    purpose: "Monthly visit",
    status: "approved",
    approvedBy: "Security Desk",
  },
  {
    id: "V002",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    visitorName: "Anjali Kumar",
    visitorRelation: "Sister",
    visitorPhone: "+91-9876543216",
    visitDate: "2024-01-25",
    visitTime: "02:00 PM - 04:00 PM",
    purpose: "Dropping off personal items",
    status: "pending",
  },
];

export const mockLaundryItems: LaundryItem[] = [
  {
    id: "LN001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    items: [
      { type: "Shirts", quantity: 4 },
      { type: "Pants", quantity: 2 },
      { type: "T-Shirts", quantity: 3 },
    ],
    submittedAt: "2024-01-15T09:00:00Z",
    status: "ready",
    expectedDate: "2024-01-17",
  },
  {
    id: "LN002",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    items: [
      { type: "Bed Sheets", quantity: 2 },
      { type: "Pillow Covers", quantity: 2 },
      { type: "Towels", quantity: 2 },
    ],
    submittedAt: "2024-01-18T10:00:00Z",
    status: "washing",
    expectedDate: "2024-01-20",
  },
];

export const mockEvents: HostelEvent[] = [
  {
    id: "EV001",
    title: "Annual Sports Day",
    description: "Annual hostel sports day with various athletic events, team sports, and prizes.",
    date: "2024-01-28",
    time: "09:00 AM - 06:00 PM",
    venue: "College Sports Ground",
    category: "sports",
    isRegistrationRequired: true,
    registrationDeadline: "2024-01-22",
  },
  {
    id: "EV002",
    title: "Republic Day Celebration",
    description: "Flag hoisting ceremony followed by cultural performances and patriotic songs.",
    date: "2024-01-26",
    time: "08:00 AM - 10:00 AM",
    venue: "Hostel Main Ground",
    category: "cultural",
    isRegistrationRequired: false,
  },
  {
    id: "EV003",
    title: "Monthly Town Hall Meeting",
    description: "Open forum to discuss hostel issues, suggestions, and announcements.",
    date: "2024-02-01",
    time: "05:00 PM - 06:30 PM",
    venue: "Common Room",
    category: "meeting",
    isRegistrationRequired: false,
  },
  {
    id: "EV004",
    title: "Career Guidance Workshop",
    description: "Interactive session with industry professionals on career opportunities and skill development.",
    date: "2024-02-05",
    time: "03:00 PM - 05:00 PM",
    venue: "Seminar Hall",
    category: "academic",
    isRegistrationRequired: true,
    registrationDeadline: "2024-02-03",
  },
  {
    id: "EV005",
    title: "Hostel Night",
    description: "Annual cultural night with music, dance, drama performances, and dinner.",
    date: "2024-02-14",
    time: "06:00 PM - 10:00 PM",
    venue: "Auditorium",
    category: "festival",
    isRegistrationRequired: true,
    registrationDeadline: "2024-02-10",
  },
];

export const mockResidents: Resident[] = [
  {
    id: "STU001",
    name: "Rahul Kumar",
    roomNumber: "A-204",
    block: "A Block",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    phone: "+91-9876543214",
    email: "rahul.kumar@student.edu",
    profileVisible: true,
  },
  {
    id: "STU002",
    name: "Priya Sharma",
    roomNumber: "B-101",
    block: "B Block",
    course: "B.Tech Electronics",
    year: "2nd Year",
    email: "priya.sharma@student.edu",
    profileVisible: true,
  },
  {
    id: "STU003",
    name: "Amit Patel",
    roomNumber: "C-305",
    block: "C Block",
    course: "B.Tech Mechanical",
    year: "4th Year",
    phone: "+91-9876543217",
    profileVisible: true,
  },
  {
    id: "STU004",
    name: "Sneha Reddy",
    roomNumber: "A-102",
    block: "A Block",
    course: "B.Tech Civil",
    year: "3rd Year",
    profileVisible: false,
  },
  {
    id: "STU005",
    name: "Vikram Singh",
    roomNumber: "A-203",
    block: "A Block",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    phone: "+91-9876543218",
    email: "vikram.singh@student.edu",
    profileVisible: true,
  },
  {
    id: "STU006",
    name: "Neha Gupta",
    roomNumber: "B-205",
    block: "B Block",
    course: "B.Tech IT",
    year: "2nd Year",
    email: "neha.gupta@student.edu",
    profileVisible: true,
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: "FB001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    category: "food",
    rating: 4,
    title: "Good variety in breakfast",
    description: "The breakfast menu has improved significantly. More variety and fresh items.",
    isAnonymous: false,
    submittedAt: "2024-01-10T12:00:00Z",
    status: "reviewed",
    response: "Thank you for your feedback. We are glad you enjoyed the improvements!",
  },
  {
    id: "FB002",
    studentName: "Anonymous",
    roomNumber: "-",
    category: "cleanliness",
    rating: 3,
    title: "Bathroom cleaning needs improvement",
    description: "The common bathroom on 2nd floor needs more frequent cleaning, especially during morning hours.",
    isAnonymous: true,
    submittedAt: "2024-01-12T08:30:00Z",
    status: "addressed",
    response: "We have increased cleaning frequency to 3 times daily. Thank you for bringing this to our attention.",
  },
];

export const mockLostFoundItems: LostFoundItem[] = [
  {
    id: "LF001",
    type: "lost",
    itemName: "Blue Wallet",
    description: "Navy blue leather wallet with college ID and some cash. Last seen in canteen.",
    category: "accessories",
    location: "Canteen",
    date: "2024-01-16",
    reportedBy: "Rahul Kumar",
    contactPhone: "+91-9876543214",
    status: "open",
  },
  {
    id: "LF002",
    type: "found",
    itemName: "Wireless Earbuds",
    description: "White wireless earbuds in black case. Found near study room.",
    category: "electronics",
    location: "Study Room - 2nd Floor",
    date: "2024-01-15",
    reportedBy: "Security Desk",
    contactPhone: "+91-9876543211",
    status: "open",
  },
  {
    id: "LF003",
    type: "found",
    itemName: "Textbook - Data Structures",
    description: "Data Structures and Algorithms textbook. Name written inside cover but not legible.",
    category: "documents",
    location: "Library",
    date: "2024-01-14",
    reportedBy: "Library Staff",
    contactPhone: "+91-9876543220",
    status: "claimed",
  },
];

export const mockAmenityBookings: AmenityBooking[] = [
  {
    id: "AB001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    amenity: "Study Room A",
    date: "2024-01-20",
    timeSlot: "06:00 PM - 08:00 PM",
    status: "booked",
    bookedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "AB002",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    amenity: "Gym",
    date: "2024-01-19",
    timeSlot: "07:00 AM - 08:00 AM",
    status: "completed",
    bookedAt: "2024-01-17T15:00:00Z",
  },
];

export const availableAmenities = [
  { id: "AM001", name: "Study Room A", capacity: 4, available: true },
  { id: "AM002", name: "Study Room B", capacity: 6, available: true },
  { id: "AM003", name: "Gym", capacity: 10, available: true },
  { id: "AM004", name: "Music Room", capacity: 3, available: true },
  { id: "AM005", name: "Recreation Room", capacity: 8, available: true },
  { id: "AM006", name: "Washing Machine 1", capacity: 1, available: true },
  { id: "AM007", name: "Washing Machine 2", capacity: 1, available: false },
  { id: "AM008", name: "Common Kitchen", capacity: 4, available: true },
];

export const amenityTimeSlots = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
  "07:00 PM - 08:00 PM",
  "08:00 PM - 09:00 PM",
  "09:00 PM - 10:00 PM",
];

export const mockDocuments: Document[] = [
  {
    id: "DOC001",
    title: "Leave Application Form",
    description: "Standard form for applying hostel leave",
    category: "forms",
    fileType: "pdf",
    uploadedAt: "2024-01-01T00:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "DOC002",
    title: "Room Change Request Form",
    description: "Form to request room/block change",
    category: "forms",
    fileType: "pdf",
    uploadedAt: "2024-01-01T00:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "DOC003",
    title: "No Dues Certificate Request",
    description: "Application for no dues certificate",
    category: "forms",
    fileType: "pdf",
    uploadedAt: "2024-01-01T00:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "DOC004",
    title: "Hostel Rules & Regulations",
    description: "Complete hostel guidelines document",
    category: "guidelines",
    fileType: "pdf",
    uploadedAt: "2024-01-01T00:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "DOC005",
    title: "Fee Structure 2024",
    description: "Detailed fee breakdown for current academic year",
    category: "notices",
    fileType: "pdf",
    uploadedAt: "2024-01-05T00:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "DOC006",
    title: "Bonafide Certificate Request",
    description: "Form to request bonafide certificate",
    category: "certificates",
    fileType: "pdf",
    uploadedAt: "2024-01-01T00:00:00Z",
    downloadUrl: "#",
  },
];

export const mockRoomChangeRequests: RoomChangeRequest[] = [
  {
    id: "RC001",
    studentName: "Rahul Kumar",
    currentRoom: "A-204",
    preferredRoom: "A-301",
    reason: "Would prefer a room on a higher floor for better ventilation and less noise from the common area.",
    status: "pending",
    appliedAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "RC002",
    studentName: "Priya Sharma",
    currentRoom: "B-101",
    preferredRoom: "B-202",
    reason: "Current room has persistent dampness issues affecting health.",
    status: "pending",
    appliedAt: "2024-01-17T14:30:00Z",
  },
  {
    id: "RC003",
    studentName: "Amit Patel",
    currentRoom: "C-305",
    preferredRoom: "A-105",
    reason: "Would like to shift to A Block to be closer to friends for group study.",
    status: "approved",
    appliedAt: "2024-01-10T09:00:00Z",
    processedAt: "2024-01-12T16:00:00Z",
    remarks: "Approved. Room change effective from February 1st.",
  },
];

// Warden-specific data

export interface Staff {
  id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  shift: "morning" | "evening" | "night" | "general";
  status: "active" | "on-leave" | "inactive";
  joinDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  date: string;
  status: "present" | "absent" | "late" | "on-leave";
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

export interface RoomAllocation {
  roomNumber: string;
  block: string;
  floor: number;
  capacity: number;
  occupied: number;
  students: { id: string; name: string }[];
  status: "available" | "occupied" | "full" | "maintenance";
  amenities: string[];
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  month: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: string;
  transactionId?: string;
}

export interface WardenReport {
  id: string;
  title: string;
  type: "occupancy" | "complaint" | "fee" | "attendance" | "maintenance";
  period: string;
  generatedAt: string;
  summary: Record<string, number | string>;
}

export const mockStaff: Staff[] = [
  {
    id: "ST001",
    name: "Ramesh Patil",
    designation: "Maintenance Supervisor",
    department: "Maintenance",
    phone: "+91-9876543213",
    email: "ramesh.patil@hostel.edu",
    shift: "general",
    status: "active",
    joinDate: "2019-06-15",
  },
  {
    id: "ST002",
    name: "Suresh Kumar",
    designation: "Chief Security Officer",
    department: "Security",
    phone: "+91-9876543211",
    email: "security@hostel.edu",
    shift: "general",
    status: "active",
    joinDate: "2018-03-01",
  },
  {
    id: "ST003",
    name: "Lakshmi Devi",
    designation: "Housekeeping Supervisor",
    department: "Housekeeping",
    phone: "+91-9876543225",
    email: "housekeeping@hostel.edu",
    shift: "morning",
    status: "active",
    joinDate: "2020-01-10",
  },
  {
    id: "ST004",
    name: "Ajay Verma",
    designation: "Night Security Guard",
    department: "Security",
    phone: "+91-9876543226",
    email: "ajay.verma@hostel.edu",
    shift: "night",
    status: "active",
    joinDate: "2021-05-20",
  },
  {
    id: "ST005",
    name: "Manoj Singh",
    designation: "Electrician",
    department: "Maintenance",
    phone: "+91-9876543227",
    email: "manoj.singh@hostel.edu",
    shift: "general",
    status: "on-leave",
    joinDate: "2019-08-12",
  },
  {
    id: "ST006",
    name: "Rekha Sharma",
    designation: "Cook",
    department: "Mess",
    phone: "+91-9876543228",
    email: "mess@hostel.edu",
    shift: "morning",
    status: "active",
    joinDate: "2017-04-01",
  },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    studentId: "STU001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    date: "2024-01-18",
    status: "present",
    checkInTime: "09:15 PM",
  },
  {
    id: "ATT002",
    studentId: "STU002",
    studentName: "Priya Sharma",
    roomNumber: "B-101",
    date: "2024-01-18",
    status: "present",
    checkInTime: "08:45 PM",
  },
  {
    id: "ATT003",
    studentId: "STU003",
    studentName: "Amit Patel",
    roomNumber: "C-305",
    date: "2024-01-18",
    status: "late",
    checkInTime: "11:30 PM",
    remarks: "Permission granted",
  },
  {
    id: "ATT004",
    studentId: "STU004",
    studentName: "Sneha Reddy",
    roomNumber: "A-102",
    date: "2024-01-18",
    status: "on-leave",
    remarks: "Home leave approved",
  },
  {
    id: "ATT005",
    studentId: "STU005",
    studentName: "Vikram Singh",
    roomNumber: "A-203",
    date: "2024-01-18",
    status: "absent",
    remarks: "Not reported",
  },
  {
    id: "ATT006",
    studentId: "STU006",
    studentName: "Neha Gupta",
    roomNumber: "B-205",
    date: "2024-01-18",
    status: "present",
    checkInTime: "07:30 PM",
  },
];

export const mockRoomAllocations: RoomAllocation[] = [
  {
    roomNumber: "A-101",
    block: "A",
    floor: 1,
    capacity: 2,
    occupied: 2,
    students: [
      { id: "STU007", name: "Ravi Menon" },
      { id: "STU008", name: "Karthik Nair" },
    ],
    status: "full",
    amenities: ["AC", "Attached Bathroom", "Study Table"],
  },
  {
    roomNumber: "A-102",
    block: "A",
    floor: 1,
    capacity: 2,
    occupied: 1,
    students: [{ id: "STU004", name: "Sneha Reddy" }],
    status: "available",
    amenities: ["AC", "Attached Bathroom", "Study Table"],
  },
  {
    roomNumber: "A-203",
    block: "A",
    floor: 2,
    capacity: 2,
    occupied: 2,
    students: [
      { id: "STU005", name: "Vikram Singh" },
      { id: "STU009", name: "Deepak Sharma" },
    ],
    status: "full",
    amenities: ["AC", "Attached Bathroom", "Study Table"],
  },
  {
    roomNumber: "A-204",
    block: "A",
    floor: 2,
    capacity: 2,
    occupied: 1,
    students: [{ id: "STU001", name: "Rahul Kumar" }],
    status: "available",
    amenities: ["AC", "Attached Bathroom", "Study Table"],
  },
  {
    roomNumber: "A-301",
    block: "A",
    floor: 3,
    capacity: 2,
    occupied: 0,
    students: [],
    status: "available",
    amenities: ["AC", "Attached Bathroom", "Study Table"],
  },
  {
    roomNumber: "B-101",
    block: "B",
    floor: 1,
    capacity: 3,
    occupied: 2,
    students: [
      { id: "STU002", name: "Priya Sharma" },
      { id: "STU010", name: "Ananya Rao" },
    ],
    status: "available",
    amenities: ["Fan", "Common Bathroom", "Study Table"],
  },
  {
    roomNumber: "B-205",
    block: "B",
    floor: 2,
    capacity: 3,
    occupied: 3,
    students: [
      { id: "STU006", name: "Neha Gupta" },
      { id: "STU011", name: "Kavitha Reddy" },
      { id: "STU012", name: "Meera Patel" },
    ],
    status: "full",
    amenities: ["Fan", "Common Bathroom", "Study Table"],
  },
  {
    roomNumber: "C-305",
    block: "C",
    floor: 3,
    capacity: 2,
    occupied: 1,
    students: [{ id: "STU003", name: "Amit Patel" }],
    status: "available",
    amenities: ["AC", "Attached Bathroom", "Study Table", "Balcony"],
  },
  {
    roomNumber: "C-401",
    block: "C",
    floor: 4,
    capacity: 2,
    occupied: 0,
    students: [],
    status: "maintenance",
    amenities: ["AC", "Attached Bathroom", "Study Table", "Balcony"],
  },
];

export const mockFeePayments: FeePayment[] = [
  {
    id: "FP001",
    studentId: "STU001",
    studentName: "Rahul Kumar",
    roomNumber: "A-204",
    month: "January 2024",
    amount: 8500,
    dueDate: "2024-01-10",
    paidDate: "2024-01-08",
    status: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN123456",
  },
  {
    id: "FP002",
    studentId: "STU002",
    studentName: "Priya Sharma",
    roomNumber: "B-101",
    month: "January 2024",
    amount: 7500,
    dueDate: "2024-01-10",
    status: "pending",
  },
  {
    id: "FP003",
    studentId: "STU003",
    studentName: "Amit Patel",
    roomNumber: "C-305",
    month: "January 2024",
    amount: 9000,
    dueDate: "2024-01-10",
    paidDate: "2024-01-15",
    status: "paid",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN123457",
  },
  {
    id: "FP004",
    studentId: "STU004",
    studentName: "Sneha Reddy",
    roomNumber: "A-102",
    month: "January 2024",
    amount: 8500,
    dueDate: "2024-01-10",
    status: "overdue",
  },
  {
    id: "FP005",
    studentId: "STU005",
    studentName: "Vikram Singh",
    roomNumber: "A-203",
    month: "January 2024",
    amount: 8500,
    dueDate: "2024-01-10",
    paidDate: "2024-01-09",
    status: "paid",
    paymentMethod: "Card",
    transactionId: "TXN123458",
  },
  {
    id: "FP006",
    studentId: "STU006",
    studentName: "Neha Gupta",
    roomNumber: "B-205",
    month: "January 2024",
    amount: 7500,
    dueDate: "2024-01-10",
    status: "overdue",
  },
];

export const allStudents: Resident[] = [
  ...mockResidents,
  {
    id: "STU007",
    name: "Ravi Menon",
    roomNumber: "A-101",
    block: "A Block",
    course: "B.Tech Computer Science",
    year: "2nd Year",
    phone: "+91-9876543230",
    email: "ravi.menon@student.edu",
    profileVisible: true,
  },
  {
    id: "STU008",
    name: "Karthik Nair",
    roomNumber: "A-101",
    block: "A Block",
    course: "B.Tech Electronics",
    year: "2nd Year",
    phone: "+91-9876543231",
    email: "karthik.nair@student.edu",
    profileVisible: true,
  },
  {
    id: "STU009",
    name: "Deepak Sharma",
    roomNumber: "A-203",
    block: "A Block",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    email: "deepak.sharma@student.edu",
    profileVisible: true,
  },
  {
    id: "STU010",
    name: "Ananya Rao",
    roomNumber: "B-101",
    block: "B Block",
    course: "B.Tech IT",
    year: "2nd Year",
    phone: "+91-9876543232",
    email: "ananya.rao@student.edu",
    profileVisible: true,
  },
  {
    id: "STU011",
    name: "Kavitha Reddy",
    roomNumber: "B-205",
    block: "B Block",
    course: "B.Tech Electronics",
    year: "2nd Year",
    email: "kavitha.reddy@student.edu",
    profileVisible: false,
  },
  {
    id: "STU012",
    name: "Meera Patel",
    roomNumber: "B-205",
    block: "B Block",
    course: "B.Tech Civil",
    year: "2nd Year",
    phone: "+91-9876543233",
    email: "meera.patel@student.edu",
    profileVisible: true,
  },
];

export const wardenReports: WardenReport[] = [
  {
    id: "RPT001",
    title: "Monthly Occupancy Report",
    type: "occupancy",
    period: "January 2024",
    generatedAt: "2024-01-31T10:00:00Z",
    summary: {
      totalRooms: 50,
      occupiedRooms: 42,
      vacantRooms: 6,
      maintenanceRooms: 2,
      occupancyRate: "84%",
    },
  },
  {
    id: "RPT002",
    title: "Complaint Resolution Report",
    type: "complaint",
    period: "January 2024",
    generatedAt: "2024-01-31T10:00:00Z",
    summary: {
      totalComplaints: 25,
      resolved: 20,
      pending: 3,
      inProgress: 2,
      avgResolutionDays: 2.5,
    },
  },
  {
    id: "RPT003",
    title: "Fee Collection Report",
    type: "fee",
    period: "January 2024",
    generatedAt: "2024-01-31T10:00:00Z",
    summary: {
      totalExpected: 1275000,
      collected: 1105000,
      pending: 127500,
      overdue: 42500,
      collectionRate: "86.7%",
    },
  },
  {
    id: "RPT004",
    title: "Attendance Summary Report",
    type: "attendance",
    period: "January 2024",
    generatedAt: "2024-01-31T10:00:00Z",
    summary: {
      avgAttendance: "94.2%",
      totalAbsences: 45,
      lateEntries: 23,
      approvedLeaves: 18,
    },
  },
];
