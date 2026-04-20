import type { Route } from "./+types/visitor-approvals";
import { useState } from "react";
import { Users, Calendar, Clock, CheckCircle, XCircle, Phone, Filter } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockVisitors } from "~/data/mock-data";
import type { Visitor } from "~/data/mock-data";
import styles from "./visitor-approvals.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visitor Approvals - HostelHub Warden" },
    { name: "description", content: "Review and approve visitor registration requests" },
  ];
}

// Extended mock data with more visitor requests
const extendedVisitors: Visitor[] = [
  ...mockVisitors,
  {
    id: "V003",
    studentName: "Amit Patel",
    roomNumber: "C-305",
    visitorName: "Mrs. Kavita Patel",
    visitorRelation: "Mother",
    visitorPhone: "+91-9876543240",
    visitDate: "2024-01-21",
    visitTime: "11:00 AM - 01:00 PM",
    purpose: "Dropping off winter clothes",
    status: "pending",
  },
  {
    id: "V004",
    studentName: "Priya Sharma",
    roomNumber: "B-101",
    visitorName: "Mr. Rajiv Sharma",
    visitorRelation: "Uncle",
    visitorPhone: "+91-9876543241",
    visitDate: "2024-01-22",
    visitTime: "03:00 PM - 05:00 PM",
    purpose: "Family discussion about career",
    status: "pending",
  },
  {
    id: "V005",
    studentName: "Vikram Singh",
    roomNumber: "A-203",
    visitorName: "Mr. Harpreet Singh",
    visitorRelation: "Father",
    visitorPhone: "+91-9876543242",
    visitDate: "2024-01-19",
    visitTime: "10:00 AM - 12:00 PM",
    purpose: "Monthly visit",
    status: "completed",
    approvedBy: "Security Desk",
  },
  {
    id: "V006",
    studentName: "Neha Gupta",
    roomNumber: "B-205",
    visitorName: "Ms. Shruti Gupta",
    visitorRelation: "Sister",
    visitorPhone: "+91-9876543243",
    visitDate: "2024-01-18",
    visitTime: "04:00 PM - 06:00 PM",
    purpose: "Birthday celebration",
    status: "rejected",
  },
];

export default function VisitorApprovals() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected" | "completed">("all");

  const filteredVisitors = extendedVisitors.filter((visitor) => {
    return filterStatus === "all" || visitor.status === filterStatus;
  });

  const pendingCount = extendedVisitors.filter((v) => v.status === "pending").length;
  const todayVisits = extendedVisitors.filter(
    (v) => v.status === "approved" && new Date(v.visitDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Visitor Approvals</h1>
            <p className={styles.subtitle}>Review and approve visitor registration requests</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.pending}`}>
            <Clock size={20} />
            <div>
              <span className={styles.statValue}>{pendingCount}</span>
              <span className={styles.statLabel}>Pending Requests</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.today}`}>
            <Users size={20} />
            <div>
              <span className={styles.statValue}>{todayVisits}</span>
              <span className={styles.statLabel}>Today&apos;s Visits</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className={styles.select}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className={styles.visitorsList}>
          {filteredVisitors.map((visitor) => (
            <div key={visitor.id} className={styles.visitorCard}>
              <div className={styles.cardHeader}>
                <div className={styles.visitorIcon}>
                  <Users size={20} />
                </div>
                <div className={styles.visitorMainInfo}>
                  <h3 className={styles.visitorName}>{visitor.visitorName}</h3>
                  <span className={styles.relation}>{visitor.visitorRelation}</span>
                </div>
                <span className={`${styles.badge} ${styles[`status${visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}`]}`}>
                  {visitor.status}
                </span>
              </div>

              <div className={styles.studentInfo}>
                <span>Visiting: <strong>{visitor.studentName}</strong></span>
                <span>Room: <strong>{visitor.roomNumber}</strong></span>
              </div>

              <div className={styles.visitDetails}>
                <div className={styles.detailItem}>
                  <Calendar size={14} />
                  <span>{new Date(visitor.visitDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}</span>
                </div>
                <div className={styles.detailItem}>
                  <Clock size={14} />
                  <span>{visitor.visitTime}</span>
                </div>
                <div className={styles.detailItem}>
                  <Phone size={14} />
                  <span>{visitor.visitorPhone}</span>
                </div>
              </div>

              <div className={styles.purpose}>
                <strong>Purpose:</strong> {visitor.purpose}
              </div>

              {visitor.status === "pending" && (
                <div className={styles.actions}>
                  <Button size="sm" className={styles.approveBtn}>
                    <CheckCircle size={14} />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className={styles.rejectBtn}>
                    <XCircle size={14} />
                    Reject
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Student
                  </Button>
                </div>
              )}

              {visitor.approvedBy && (
                <div className={styles.approvalInfo}>
                  Approved by: {visitor.approvedBy}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredVisitors.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} />
            <h3>No visitor requests found</h3>
            <p>No requests match your selected filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
