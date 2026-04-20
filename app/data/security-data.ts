export interface LoginActivity {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  timestamp: string;
  status: "success" | "failed" | "blocked";
  method: "password" | "2fa" | "otp";
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  os: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userRole: "student" | "warden" | "admin" | "system";
  action: string;
  category: "auth" | "data" | "permission" | "system" | "security";
  severity: "info" | "warning" | "critical";
  details: string;
  ip: string;
  resource?: string;
}

export interface SecurityAlert {
  id: string;
  type: "brute_force" | "suspicious_login" | "data_export" | "permission_change" | "system_update";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  isRead: boolean;
  actionTaken?: string;
}

export const mockLoginActivity: LoginActivity[] = [
  {
    id: "LA001",
    device: "Windows Desktop",
    browser: "Chrome 121.0",
    ip: "192.168.1.45",
    location: "Bangalore, Karnataka",
    timestamp: "2024-01-18T14:30:00Z",
    status: "success",
    method: "2fa",
  },
  {
    id: "LA002",
    device: "iPhone 15",
    browser: "Safari 17.2",
    ip: "10.0.0.12",
    location: "Bangalore, Karnataka",
    timestamp: "2024-01-17T09:15:00Z",
    status: "success",
    method: "password",
  },
  {
    id: "LA003",
    device: "Unknown Device",
    browser: "Firefox 122.0",
    ip: "103.87.56.23",
    location: "Mumbai, Maharashtra",
    timestamp: "2024-01-16T23:45:00Z",
    status: "failed",
    method: "password",
  },
  {
    id: "LA004",
    device: "Unknown Device",
    browser: "Chrome 120.0",
    ip: "103.87.56.23",
    location: "Mumbai, Maharashtra",
    timestamp: "2024-01-16T23:46:00Z",
    status: "failed",
    method: "password",
  },
  {
    id: "LA005",
    device: "Unknown Device",
    browser: "Chrome 120.0",
    ip: "103.87.56.23",
    location: "Mumbai, Maharashtra",
    timestamp: "2024-01-16T23:47:00Z",
    status: "blocked",
    method: "password",
  },
  {
    id: "LA006",
    device: "MacBook Pro",
    browser: "Chrome 121.0",
    ip: "192.168.1.45",
    location: "Bangalore, Karnataka",
    timestamp: "2024-01-15T10:00:00Z",
    status: "success",
    method: "password",
  },
  {
    id: "LA007",
    device: "Android Phone",
    browser: "Chrome Mobile 121.0",
    ip: "10.0.0.18",
    location: "Bangalore, Karnataka",
    timestamp: "2024-01-14T18:30:00Z",
    status: "success",
    method: "otp",
  },
  {
    id: "LA008",
    device: "Windows Desktop",
    browser: "Edge 121.0",
    ip: "192.168.1.45",
    location: "Bangalore, Karnataka",
    timestamp: "2024-01-13T08:20:00Z",
    status: "success",
    method: "2fa",
  },
];

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "S001",
    device: "Windows Desktop",
    browser: "Chrome 121.0",
    ip: "192.168.1.45",
    location: "Bangalore, Karnataka",
    lastActive: "2024-01-18T14:30:00Z",
    isCurrent: true,
    os: "Windows 11",
  },
  {
    id: "S002",
    device: "iPhone 15",
    browser: "Safari 17.2",
    ip: "10.0.0.12",
    location: "Bangalore, Karnataka",
    lastActive: "2024-01-17T09:15:00Z",
    isCurrent: false,
    os: "iOS 17.2",
  },
  {
    id: "S003",
    device: "Android Phone",
    browser: "Chrome Mobile 121.0",
    ip: "10.0.0.18",
    location: "Bangalore, Karnataka",
    lastActive: "2024-01-14T18:30:00Z",
    isCurrent: false,
    os: "Android 14",
  },
];

export const mockAuditLog: AuditLogEntry[] = [
  {
    id: "AUD001",
    timestamp: "2024-01-18T14:35:00Z",
    user: "Prof. Meena Iyer",
    userRole: "warden",
    action: "Approved leave request",
    category: "data",
    severity: "info",
    details: "Approved leave request L001 for student Rahul Kumar (A-204)",
    ip: "192.168.1.100",
    resource: "Leave Request L001",
  },
  {
    id: "AUD002",
    timestamp: "2024-01-18T14:30:00Z",
    user: "Rahul Kumar",
    userRole: "student",
    action: "Login successful",
    category: "auth",
    severity: "info",
    details: "2FA authentication from Windows Desktop, Chrome 121.0, IP: 192.168.1.45",
    ip: "192.168.1.45",
  },
  {
    id: "AUD003",
    timestamp: "2024-01-18T13:20:00Z",
    user: "Prof. Meena Iyer",
    userRole: "warden",
    action: "Posted notice",
    category: "data",
    severity: "info",
    details: "Published notice: 'Hostel Fee Payment Deadline Extended'",
    ip: "192.168.1.100",
    resource: "Notice N001",
  },
  {
    id: "AUD004",
    timestamp: "2024-01-18T12:00:00Z",
    user: "System",
    userRole: "system",
    action: "Automated backup completed",
    category: "system",
    severity: "info",
    details: "Daily automated backup completed successfully. Backup size: 2.4 GB",
    ip: "127.0.0.1",
  },
  {
    id: "AUD005",
    timestamp: "2024-01-16T23:47:00Z",
    user: "Unknown",
    userRole: "admin",
    action: "IP blocked",
    category: "security",
    severity: "critical",
    details: "IP 103.87.56.23 blocked after 3 failed login attempts within 5 minutes. Possible brute force attack.",
    ip: "103.87.56.23",
  },
  {
    id: "AUD006",
    timestamp: "2024-01-16T23:46:00Z",
    user: "Unknown",
    userRole: "admin",
    action: "Failed login attempt",
    category: "auth",
    severity: "warning",
    details: "Failed login attempt #2 for account student@demo.com from IP 103.87.56.23",
    ip: "103.87.56.23",
  },
  {
    id: "AUD007",
    timestamp: "2024-01-16T23:45:00Z",
    user: "Unknown",
    userRole: "admin",
    action: "Failed login attempt",
    category: "auth",
    severity: "warning",
    details: "Failed login attempt #1 for account student@demo.com from IP 103.87.56.23",
    ip: "103.87.56.23",
  },
  {
    id: "AUD008",
    timestamp: "2024-01-16T14:00:00Z",
    user: "Prof. Meena Iyer",
    userRole: "warden",
    action: "Updated student record",
    category: "data",
    severity: "info",
    details: "Updated room allocation for student Amit Patel (STU003) from C-305 to A-105",
    ip: "192.168.1.100",
    resource: "Student STU003",
  },
  {
    id: "AUD009",
    timestamp: "2024-01-16T10:30:00Z",
    user: "Admin",
    userRole: "admin",
    action: "Permission role updated",
    category: "permission",
    severity: "warning",
    details: "Role 'maintenance_staff' permission updated: added 'view_complaints' access",
    ip: "192.168.1.1",
    resource: "Role: maintenance_staff",
  },
  {
    id: "AUD010",
    timestamp: "2024-01-15T22:00:00Z",
    user: "System",
    userRole: "system",
    action: "SSL certificate renewed",
    category: "system",
    severity: "info",
    details: "SSL/TLS certificate automatically renewed. Valid until 2025-01-15",
    ip: "127.0.0.1",
  },
  {
    id: "AUD011",
    timestamp: "2024-01-15T18:45:00Z",
    user: "Priya Sharma",
    userRole: "student",
    action: "Data export requested",
    category: "data",
    severity: "warning",
    details: "Student requested personal data export under GDPR/DPDP compliance",
    ip: "10.0.0.55",
    resource: "Student STU002",
  },
  {
    id: "AUD012",
    timestamp: "2024-01-15T16:20:00Z",
    user: "System",
    userRole: "system",
    action: "Vulnerability scan completed",
    category: "security",
    severity: "info",
    details: "Automated vulnerability scan completed. 0 critical, 1 medium, 3 low issues found.",
    ip: "127.0.0.1",
  },
  {
    id: "AUD013",
    timestamp: "2024-01-14T09:00:00Z",
    user: "Admin",
    userRole: "admin",
    action: "System update applied",
    category: "system",
    severity: "info",
    details: "Security patch v2.4.1 applied successfully. Includes XSS protection enhancement.",
    ip: "192.168.1.1",
  },
  {
    id: "AUD014",
    timestamp: "2024-01-13T14:10:00Z",
    user: "Prof. Meena Iyer",
    userRole: "warden",
    action: "Bulk fee reminder sent",
    category: "data",
    severity: "info",
    details: "Sent fee payment reminders to 15 students with pending payments",
    ip: "192.168.1.100",
  },
  {
    id: "AUD015",
    timestamp: "2024-01-12T11:30:00Z",
    user: "System",
    userRole: "system",
    action: "Suspicious activity detected",
    category: "security",
    severity: "critical",
    details: "Unusual API call pattern detected from IP 45.33.32.156. Rate limiting applied.",
    ip: "45.33.32.156",
  },
];

export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "SA001",
    type: "brute_force",
    title: "Brute Force Attack Blocked",
    description: "3 failed login attempts from IP 103.87.56.23 within 5 minutes. IP has been automatically blocked for 24 hours.",
    severity: "critical",
    timestamp: "2024-01-16T23:47:00Z",
    isRead: false,
    actionTaken: "IP blocked for 24 hours",
  },
  {
    id: "SA002",
    type: "suspicious_login",
    title: "Login from New Location",
    description: "A successful login was detected from Mumbai, Maharashtra - a location not previously associated with this account.",
    severity: "medium",
    timestamp: "2024-01-15T08:30:00Z",
    isRead: true,
  },
  {
    id: "SA003",
    type: "data_export",
    title: "Data Export Request",
    description: "Student Priya Sharma (STU002) requested a full personal data export under data protection compliance.",
    severity: "low",
    timestamp: "2024-01-15T18:45:00Z",
    isRead: true,
    actionTaken: "Data export processed",
  },
  {
    id: "SA004",
    type: "system_update",
    title: "Security Patch Available",
    description: "Critical security patch v2.4.2 is available. Includes fix for CVE-2024-1234 (XSS vulnerability in form inputs).",
    severity: "high",
    timestamp: "2024-01-18T06:00:00Z",
    isRead: false,
  },
  {
    id: "SA005",
    type: "permission_change",
    title: "Role Permission Modified",
    description: "The 'maintenance_staff' role was updated with additional permissions. Review changes to ensure principle of least privilege.",
    severity: "medium",
    timestamp: "2024-01-16T10:30:00Z",
    isRead: true,
    actionTaken: "Reviewed and approved",
  },
];

export const securityScore = {
  overall: 82,
  categories: [
    { name: "Password Strength", score: 90, max: 100 },
    { name: "Two-Factor Auth", score: 100, max: 100 },
    { name: "Session Security", score: 75, max: 100 },
    { name: "Data Encryption", score: 95, max: 100 },
    { name: "Access Control", score: 70, max: 100 },
    { name: "Audit Compliance", score: 80, max: 100 },
  ],
  lastUpdated: "2024-01-18T14:30:00Z",
};

export const securitySettings = {
  twoFactorEnabled: true,
  loginNotifications: true,
  suspiciousLoginAlerts: true,
  dataEncryption: true,
  sessionTimeout: 30,
  maxFailedAttempts: 3,
  passwordLastChanged: "2024-01-10T00:00:00Z",
  trustedDevices: 2,
};
