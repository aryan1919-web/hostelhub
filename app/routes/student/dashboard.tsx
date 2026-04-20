import type { Route } from "./+types/dashboard";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Bell, FileText, DollarSign, BookOpen, Phone, AlertCircle, Clock, Shield } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockNotices, mockComplaints, studentProfile, type Complaint, type Notice } from "~/data/mock-data";
import { initializeEntity, ENTITIES } from "~/data/storage";
import styles from "./dashboard.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Dashboard - HostelHub" },
    {
      name: "description",
      content: "Your personal hostel management dashboard",
    },
  ];
}

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    setComplaints(initializeEntity<Complaint>(ENTITIES.COMPLAINTS, mockComplaints));
    setNotices(initializeEntity<Notice>(ENTITIES.NOTICES, mockNotices));
  }, []);

  const recentNotices = notices.slice(0, 3);
  const myComplaints = complaints.filter((c) => c.studentName === studentProfile.name);
  const pendingComplaints = myComplaints.filter((c) => c.status === "pending" || c.status === "in-progress").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.greeting}>Welcome back, {studentProfile.name}!</h1>
          <p className={styles.subtitle}>
            {studentProfile.roomNumber} • {studentProfile.block} • {studentProfile.course}
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Active Complaints</span>
              <FileText className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>{pendingComplaints}</h2>
            <p className={styles.statDescription}>{pendingComplaints > 0 ? "Being processed" : "All resolved"}</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Unread Notices</span>
              <Bell className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>2</h2>
            <p className={styles.statDescription}>New announcements</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Fee Status</span>
              <DollarSign className={styles.statIcon} />
            </div>
            <h2 className={styles.statValue}>₹8,500</h2>
            <p className={styles.statDescription}>Due on Feb 10, 2024</p>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Notices</h2>
                <Button variant="link" asChild>
                  <Link to="/student/notices">View All</Link>
                </Button>
              </div>

              <div className={styles.noticesList}>
                {recentNotices.map((notice) => (
                  <div key={notice.id} className={styles.noticeItem}>
                    <div className={styles.noticeHeader}>
                      <h3 className={styles.noticeTitle}>{notice.title}</h3>
                      <span
                        className={`${styles.noticeBadge} ${
                          notice.category === "urgent"
                            ? styles.badgeUrgent
                            : notice.category === "fee"
                              ? styles.badgeFee
                              : styles.badgeGeneral
                        }`}
                      >
                        {notice.category}
                      </span>
                    </div>
                    <p className={styles.noticeContent}>{notice.content.substring(0, 120)}...</p>
                    <span className={styles.noticeDate}>
                      {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section} style={{ marginTop: "var(--space-6)" }}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>My Complaints</h2>
                <Button variant="link" asChild>
                  <Link to="/student/complaints">Raise New</Link>
                </Button>
              </div>

              {myComplaints.length > 0 ? (
                <div className={styles.complaintsList}>
                  {myComplaints.map((complaint) => (
                    <div key={complaint.id} className={styles.complaintItem}>
                      <div className={styles.complaintHeader}>
                        <h3 className={styles.complaintTitle}>{complaint.title}</h3>
                        <span
                          className={`${styles.statusBadge} ${
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
                      <p className={styles.complaintDescription}>{complaint.description}</p>
                      <div className={styles.complaintMeta}>
                        <span>ID: {complaint.id}</span>
                        <span>•</span>
                        <span>{new Date(complaint.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FileText className={styles.emptyIcon} />
                  <p className={styles.emptyText}>No complaints raised yet</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.quickActions}>
                <Button variant="outline" className={styles.actionButton} asChild>
                  <Link to="/student/complaints">
                    <AlertCircle className={styles.actionIcon} />
                    Raise Complaint
                  </Link>
                </Button>
                <Button variant="outline" className={styles.actionButton} asChild>
                  <Link to="/student/fees">
                    <DollarSign className={styles.actionIcon} />
                    View Fee Details
                  </Link>
                </Button>
                <Button variant="outline" className={styles.actionButton} asChild>
                  <Link to="/student/rules">
                    <BookOpen className={styles.actionIcon} />
                    Hostel Rules
                  </Link>
                </Button>
                <Button variant="outline" className={styles.actionButton} asChild>
                  <Link to="/student/emergency">
                    <Phone className={styles.actionIcon} />
                    Emergency Contacts
                  </Link>
                </Button>
                <Button variant="outline" className={styles.actionButton} asChild>
                  <Link to="/student/security">
                    <Shield className={styles.actionIcon} />
                    Security Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            <div className={styles.section} style={{ marginTop: "var(--space-6)" }}>
              <h2 className={styles.sectionTitle}>Important Reminders</h2>
              <div className={styles.noticesList}>
                <div className={styles.noticeItem}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    <Clock style={{ width: "16px", height: "16px", color: "var(--color-warning-9)" }} />
                    <span style={{ fontWeight: 600, color: "var(--color-neutral-12)", fontSize: "var(--font-size-1)" }}>
                      Fee Payment Due
                    </span>
                  </div>
                  <p className={styles.noticeContent}>Your February fee payment is due on Feb 10, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
