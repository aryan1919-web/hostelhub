import type { Route } from "./+types/leave-approvals";
import { useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle, Filter, Home, Briefcase, Heart, PartyPopper } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockLeaveApplications } from "~/data/mock-data";
import type { LeaveApplication } from "~/data/mock-data";
import styles from "./leave-approvals.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leave Approvals - HostelHub Warden" },
    { name: "description", content: "Review and approve student leave applications" },
  ];
}

const leaveTypeIcons = {
  home: Home,
  outing: Briefcase,
  medical: Heart,
  event: PartyPopper,
};

const leaveTypeLabels = {
  home: "Home Visit",
  outing: "Day Outing",
  medical: "Medical",
  event: "Event",
};

// Extended mock data with more leave applications
const extendedLeaveApplications: LeaveApplication[] = [
  ...mockLeaveApplications,
  {
    id: "L004",
    studentName: "Priya Sharma",
    roomNumber: "B-101",
    leaveType: "home",
    startDate: "2024-01-22",
    endDate: "2024-01-28",
    reason: "Family emergency - grandmother unwell",
    status: "pending",
    appliedAt: "2024-01-18T08:00:00Z",
  },
  {
    id: "L005",
    studentName: "Amit Patel",
    roomNumber: "C-305",
    leaveType: "outing",
    startDate: "2024-01-20",
    endDate: "2024-01-20",
    reason: "Interview at local company",
    status: "pending",
    appliedAt: "2024-01-17T15:00:00Z",
  },
  {
    id: "L006",
    studentName: "Vikram Singh",
    roomNumber: "A-203",
    leaveType: "event",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    reason: "Attending tech conference in city",
    status: "pending",
    appliedAt: "2024-01-16T11:00:00Z",
  },
];

export default function LeaveApprovals() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [filterType, setFilterType] = useState<"all" | "home" | "outing" | "medical" | "event">("all");

  const filteredApplications = extendedLeaveApplications.filter((app) => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesType = filterType === "all" || app.leaveType === filterType;
    return matchesStatus && matchesType;
  });

  const pendingCount = extendedLeaveApplications.filter((a) => a.status === "pending").length;
  const approvedCount = extendedLeaveApplications.filter((a) => a.status === "approved").length;
  const rejectedCount = extendedLeaveApplications.filter((a) => a.status === "rejected").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Leave Approvals</h1>
            <p className={styles.subtitle}>Review and approve student leave applications</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.pending}`}>
            <Clock size={20} />
            <div>
              <span className={styles.statValue}>{pendingCount}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.approved}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{approvedCount}</span>
              <span className={styles.statLabel}>Approved</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.rejected}`}>
            <XCircle size={20} />
            <div>
              <span className={styles.statValue}>{rejectedCount}</span>
              <span className={styles.statLabel}>Rejected</span>
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
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className={styles.select}
            >
              <option value="all">All Types</option>
              <option value="home">Home Visit</option>
              <option value="outing">Day Outing</option>
              <option value="medical">Medical</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>

        <div className={styles.applicationsList}>
          {filteredApplications.map((application) => {
            const LeaveIcon = leaveTypeIcons[application.leaveType];
            return (
              <div key={application.id} className={styles.applicationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.leaveTypeIcon}>
                    <LeaveIcon size={20} />
                  </div>
                  <div className={styles.applicantInfo}>
                    <h3 className={styles.applicantName}>{application.studentName}</h3>
                    <span className={styles.roomNumber}>Room: {application.roomNumber}</span>
                  </div>
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${styles[application.leaveType]}`}>
                      {leaveTypeLabels[application.leaveType]}
                    </span>
                    <span className={`${styles.badge} ${styles[`status${application.status.charAt(0).toUpperCase() + application.status.slice(1)}`]}`}>
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className={styles.dateInfo}>
                  <div className={styles.dateItem}>
                    <Calendar size={14} />
                    <span>
                      {new Date(application.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      -{" "}
                      {new Date(application.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className={styles.dateItem}>
                    <Clock size={14} />
                    <span>Applied: {new Date(application.appliedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>

                <div className={styles.reason}>
                  <strong>Reason:</strong> {application.reason}
                </div>

                {application.remarks && (
                  <div className={styles.remarks}>
                    <strong>Remarks:</strong> {application.remarks}
                  </div>
                )}

                {application.status === "pending" && (
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
                      Request Info
                    </Button>
                  </div>
                )}

                {application.status === "approved" && application.approvedBy && (
                  <div className={styles.approvalInfo}>
                    Approved by {application.approvedBy} on{" "}
                    {application.approvedAt && new Date(application.approvedAt).toLocaleDateString("en-IN")}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className={styles.emptyState}>
            <Calendar size={48} />
            <h3>No leave applications found</h3>
            <p>No applications match your selected filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
