import type { Route } from "./+types/dashboard";
import { Link } from "react-router";
import {
  FileText,
  Bell,
  Users,
  CheckCircle,
  Clock,
  DoorOpen,
  Calendar,
  IndianRupee,
  ClipboardCheck,
  Package,
  UserCog,
  BarChart3,
  LogOut,
  Eye,
  AlertTriangle,
  TrendingUp,
  Building,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import {
  mockComplaints,
  mockNotices,
  mockLeaveApplications,
  mockVisitors,
  mockFeePayments,
  mockAttendanceRecords,
  allStudents,
  mockRoomAllocations,
  mockEvents,
  mockLostFoundItems,
  mockStaff,
} from "~/data/mock-data";
import styles from "./dashboard.module.css";

// Chart data
const complaintTrendData = [
  { month: "Aug", complaints: 12, resolved: 10 },
  { month: "Sep", complaints: 18, resolved: 15 },
  { month: "Oct", complaints: 14, resolved: 13 },
  { month: "Nov", complaints: 22, resolved: 18 },
  { month: "Dec", complaints: 16, resolved: 14 },
  { month: "Jan", complaints: 8, resolved: 5 },
];

const feeCollectionData = [
  { month: "Aug", collected: 92, pending: 8 },
  { month: "Sep", collected: 88, pending: 12 },
  { month: "Oct", collected: 95, pending: 5 },
  { month: "Nov", collected: 90, pending: 10 },
  { month: "Dec", collected: 85, pending: 15 },
  { month: "Jan", collected: 78, pending: 22 },
];

const complaintCategoryData = [
  { name: "Maintenance", value: 35, color: "var(--color-accent-9)" },
  { name: "Facilities", value: 25, color: "var(--color-success-9)" },
  { name: "Cleanliness", value: 20, color: "var(--color-warning-9)" },
  { name: "Security", value: 12, color: "var(--color-error-9)" },
  { name: "Other", value: 8, color: "var(--color-neutral-9)" },
];

const PIE_COLORS = ["#6E56CF", "#30A46C", "#F5A623", "#E54666", "#8B8D98"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Warden Dashboard - HostelHub" },
    {
      name: "description",
      content: "Manage hostel operations and student requests",
    },
  ];
}

export default function WardenDashboard() {
  // Calculate statistics
  const pendingComplaints = mockComplaints.filter((c) => c.status === "pending").length;
  const inProgressComplaints = mockComplaints.filter((c) => c.status === "in-progress").length;
  const resolvedComplaints = mockComplaints.filter((c) => c.status === "resolved").length;
  const activeNotices = mockNotices.filter((n) => n.isPinned).length;
  const pendingLeaves = mockLeaveApplications.filter((l) => l.status === "pending").length;
  const pendingVisitors = mockVisitors.filter((v) => v.status === "pending").length;
  const pendingFees = mockFeePayments.filter((f) => f.status === "pending").length;
  const overdueFees = mockFeePayments.filter((f) => f.status === "overdue").length;
  const todayPresent = mockAttendanceRecords.filter((a) => a.status === "present").length;
  const todayAbsent = mockAttendanceRecords.filter((a) => a.status === "absent").length;
  const totalStudents = allStudents.length;
  const availableRooms = mockRoomAllocations.filter((r) => r.status === "available").length;
  const upcomingEvents = mockEvents.filter((e) => new Date(e.date) >= new Date()).length;
  const openLostItems = mockLostFoundItems.filter((i) => i.status === "open").length;
  const activeStaff = mockStaff.filter((s) => s.status === "active").length;

  const occupancyRate = Math.round(
    (mockRoomAllocations.reduce((sum, r) => sum + r.occupied, 0) /
      mockRoomAllocations.reduce((sum, r) => sum + r.capacity, 0)) *
      100
  );

  const feeCollectionRate = Math.round(
    (mockFeePayments.filter((f) => f.status === "paid").length / mockFeePayments.length) * 100
  );

  // Quick action modules
  const modules = [
    {
      title: "Student Management",
      icon: Users,
      link: "/warden/students",
      count: totalStudents,
      label: "Total Students",
      color: "accent",
    },
    {
      title: "Leave Approvals",
      icon: LogOut,
      link: "/warden/leave-approvals",
      count: pendingLeaves,
      label: "Pending",
      color: "warning",
    },
    {
      title: "Visitor Approvals",
      icon: Eye,
      link: "/warden/visitor-approvals",
      count: pendingVisitors,
      label: "Pending",
      color: "warning",
    },
    {
      title: "Room Allocation",
      icon: DoorOpen,
      link: "/warden/rooms",
      count: availableRooms,
      label: "Available Rooms",
      color: "success",
    },
    {
      title: "Complaints",
      icon: FileText,
      link: "/warden/complaints",
      count: pendingComplaints + inProgressComplaints,
      label: "Active",
      color: "error",
    },
    {
      title: "Notices",
      icon: Bell,
      link: "/warden/notices",
      count: activeNotices,
      label: "Pinned",
      color: "accent",
    },
    {
      title: "Fee Management",
      icon: IndianRupee,
      link: "/warden/fees",
      count: pendingFees + overdueFees,
      label: "Due",
      color: "error",
    },
    {
      title: "Attendance",
      icon: ClipboardCheck,
      link: "/warden/attendance",
      count: todayPresent,
      label: "Present Today",
      color: "success",
    },
    {
      title: "Events",
      icon: Calendar,
      link: "/warden/events",
      count: upcomingEvents,
      label: "Upcoming",
      color: "accent",
    },
    {
      title: "Reports",
      icon: BarChart3,
      link: "/warden/reports",
      count: 4,
      label: "Report Types",
      color: "accent",
    },
    {
      title: "Lost & Found",
      icon: Package,
      link: "/warden/lost-found",
      count: openLostItems,
      label: "Open Items",
      color: "warning",
    },
    {
      title: "Staff Management",
      icon: UserCog,
      link: "/warden/staff",
      count: activeStaff,
      label: "Active Staff",
      color: "accent",
    },
    {
      title: "Security Audit Log",
      icon: BarChart3,
      link: "/warden/audit-log",
      count: 15,
      label: "Events Today",
      color: "error",
    },
  ];

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.greeting}>Warden Dashboard</h1>
              <p className={styles.subtitle}>
                Centralized hostel management - Manage operations, track requests, and ensure student satisfaction
              </p>
            </div>
            <div className={styles.headerActions}>
              <Link to="/warden/reports">
                <Button variant="outline">
                  <BarChart3 size={16} />
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className={styles.kpiSection}>
          <h2 className={styles.sectionTitle}>Key Performance Indicators</h2>
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiIcon} data-color="success">
                <Building size={24} />
              </div>
              <div className={styles.kpiContent}>
                <span className={styles.kpiValue}>{occupancyRate}%</span>
                <span className={styles.kpiLabel}>Occupancy Rate</span>
              </div>
              <TrendingUp size={16} className={styles.kpiTrend} />
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiIcon} data-color="accent">
                <IndianRupee size={24} />
              </div>
              <div className={styles.kpiContent}>
                <span className={styles.kpiValue}>{feeCollectionRate}%</span>
                <span className={styles.kpiLabel}>Fee Collection</span>
              </div>
              <TrendingUp size={16} className={styles.kpiTrend} />
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiIcon} data-color="warning">
                <Clock size={24} />
              </div>
              <div className={styles.kpiContent}>
                <span className={styles.kpiValue}>2.5</span>
                <span className={styles.kpiLabel}>Avg Resolution (days)</span>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiIcon} data-color="success">
                <CheckCircle size={24} />
              </div>
              <div className={styles.kpiContent}>
                <span className={styles.kpiValue}>94.2%</span>
                <span className={styles.kpiLabel}>Attendance Rate</span>
              </div>
              <TrendingUp size={16} className={styles.kpiTrend} />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard} data-priority="high">
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Pending Complaints</span>
              <Clock className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{pendingComplaints}</h2>
            <span className={styles.statSubtext}>Requires immediate attention</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Leave Requests</span>
              <LogOut className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{pendingLeaves}</h2>
            <span className={styles.statSubtext}>Awaiting approval</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Visitor Requests</span>
              <Eye className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{pendingVisitors}</h2>
            <span className={styles.statSubtext}>Awaiting approval</span>
          </div>

          <div className={styles.statCard} data-priority="warning">
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Overdue Fees</span>
              <AlertTriangle className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{overdueFees}</h2>
            <span className={styles.statSubtext}>Students with overdue payments</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Today Absent</span>
              <Users className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{todayAbsent}</h2>
            <span className={styles.statSubtext}>Without approved leave</span>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className={styles.chartsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Analytics & Trends</h2>
          </div>
          <div className={styles.chartsGrid}>
            {/* Complaint Trends */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Complaint Trends (6 Months)</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={complaintTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-5)" />
                    <XAxis dataKey="month" stroke="var(--color-neutral-10)" fontSize={12} />
                    <YAxis stroke="var(--color-neutral-10)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-neutral-2)",
                        border: "1px solid var(--color-neutral-6)",
                        borderRadius: "8px",
                        color: "var(--color-neutral-12)",
                      }}
                    />
                    <Area type="monotone" dataKey="complaints" stroke="#E54666" fill="#E5466622" name="Raised" />
                    <Area type="monotone" dataKey="resolved" stroke="#30A46C" fill="#30A46C22" name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Complaint Categories Pie */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Complaints by Category</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={complaintCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {complaintCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-neutral-2)",
                        border: "1px solid var(--color-neutral-6)",
                        borderRadius: "8px",
                        color: "var(--color-neutral-12)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.pieLegend}>
                  {complaintCategoryData.map((entry, index) => (
                    <div key={entry.name} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: PIE_COLORS[index] }} />
                      <span className={styles.legendLabel}>{entry.name}</span>
                      <span className={styles.legendValue}>{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fee Collection Bar Chart */}
            <div className={styles.chartCardWide}>
              <h3 className={styles.chartTitle}>Fee Collection Rate (%)</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={feeCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-5)" />
                    <XAxis dataKey="month" stroke="var(--color-neutral-10)" fontSize={12} />
                    <YAxis stroke="var(--color-neutral-10)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-neutral-2)",
                        border: "1px solid var(--color-neutral-6)",
                        borderRadius: "8px",
                        color: "var(--color-neutral-12)",
                      }}
                    />
                    <Bar dataKey="collected" fill="#30A46C" radius={[4, 4, 0, 0]} name="Collected %" />
                    <Bar dataKey="pending" fill="#E54666" radius={[4, 4, 0, 0]} name="Pending %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Modules */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Access</h2>
            <p className={styles.sectionSubtitle}>Access all hostel management modules</p>
          </div>

          <div className={styles.modulesGrid}>
            {modules.map((module) => (
              <Link key={module.title} to={module.link} className={styles.moduleCard}>
                <div className={styles.moduleIcon} data-color={module.color}>
                  <module.icon size={24} />
                </div>
                <div className={styles.moduleContent}>
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <div className={styles.moduleStats}>
                    <span className={styles.moduleCount}>{module.count}</span>
                    <span className={styles.moduleLabel}>{module.label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Complaints</h2>
            <Link to="/warden/complaints">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className={styles.complaintsList}>
            {mockComplaints.slice(0, 3).map((complaint) => (
              <div key={complaint.id} className={styles.complaintItem}>
                <div className={styles.complaintHeader}>
                  <h3 className={styles.complaintTitle}>{complaint.title}</h3>
                  <div className={styles.badges}>
                    <span
                      className={`${styles.badge} ${
                        complaint.priority === "high"
                          ? styles.priorityHigh
                          : complaint.priority === "medium"
                            ? styles.priorityMedium
                            : styles.priorityLow
                      }`}
                    >
                      {complaint.priority}
                    </span>
                    <span
                      className={`${styles.badge} ${
                        complaint.status === "pending"
                          ? styles.statusPending
                          : complaint.status === "in-progress"
                            ? styles.statusInProgress
                            : styles.statusResolved
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>
                <p className={styles.complaintDescription}>{complaint.description}</p>
                <div className={styles.complaintMeta}>
                  <span>ID: {complaint.id}</span>
                  <span>•</span>
                  <span>{complaint.studentName}</span>
                  <span>•</span>
                  <span>Room: {complaint.roomNumber}</span>
                  <span>•</span>
                  <span>{new Date(complaint.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <div className={styles.complaintActions}>
                  <Button size="sm">Assign</Button>
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals Summary */}
        <div className={styles.twoColumnGrid}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Pending Leave Requests</h2>
              <Link to="/warden/leave-approvals">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className={styles.approvalsList}>
              {mockLeaveApplications
                .filter((l) => l.status === "pending")
                .slice(0, 3)
                .map((leave) => (
                  <div key={leave.id} className={styles.approvalItem}>
                    <div className={styles.approvalInfo}>
                      <span className={styles.approvalName}>{leave.studentName}</span>
                      <span className={styles.approvalDetail}>
                        {leave.leaveType} | {new Date(leave.startDate).toLocaleDateString("en-IN")} -{" "}
                        {new Date(leave.endDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className={styles.approvalActions}>
                      <Button size="sm" variant="default">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              {mockLeaveApplications.filter((l) => l.status === "pending").length === 0 && (
                <p className={styles.emptyText}>No pending leave requests</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Pending Visitor Requests</h2>
              <Link to="/warden/visitor-approvals">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className={styles.approvalsList}>
              {mockVisitors
                .filter((v) => v.status === "pending")
                .slice(0, 3)
                .map((visitor) => (
                  <div key={visitor.id} className={styles.approvalItem}>
                    <div className={styles.approvalInfo}>
                      <span className={styles.approvalName}>
                        {visitor.visitorName} ({visitor.visitorRelation})
                      </span>
                      <span className={styles.approvalDetail}>
                        For {visitor.studentName} | {new Date(visitor.visitDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className={styles.approvalActions}>
                      <Button size="sm" variant="default">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              {mockVisitors.filter((v) => v.status === "pending").length === 0 && (
                <p className={styles.emptyText}>No pending visitor requests</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Notices */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Notices</h2>
            <Link to="/warden/notices">
              <Button variant="outline">Manage Notices</Button>
            </Link>
          </div>
          <div className={styles.noticesList}>
            {mockNotices.slice(0, 3).map((notice) => (
              <div key={notice.id} className={styles.noticeItem}>
                <div className={styles.noticeHeader}>
                  <h3 className={styles.noticeTitle}>
                    {notice.isPinned && <Bell size={14} className={styles.pinnedIcon} />}
                    {notice.title}
                  </h3>
                  <span className={`${styles.noticeBadge} ${styles[`category${notice.category}`]}`}>
                    {notice.category}
                  </span>
                </div>
                <p className={styles.noticeContent}>{notice.content}</p>
                <span className={styles.noticeDate}>
                  Published: {new Date(notice.publishedAt).toLocaleDateString("en-IN")} by {notice.publishedBy}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
