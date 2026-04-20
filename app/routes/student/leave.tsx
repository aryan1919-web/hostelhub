import type { Route } from "./+types/leave";
import { useState, useEffect } from "react";
import { Calendar, Clock, Plus, CheckCircle, XCircle, Home, Briefcase, Heart, PartyPopper } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockLeaveApplications, studentProfile, type LeaveApplication } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./leave.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leave Application - HostelHub" },
    { name: "description", content: "Apply for leave and track applications" },
  ];
}

const leaveTypes = [
  { id: "home", label: "Home Visit", icon: Home, description: "Going home for personal reasons" },
  { id: "outing", label: "Day Outing", icon: Briefcase, description: "Short trip outside campus" },
  { id: "medical", label: "Medical", icon: Heart, description: "Health-related leave" },
  { id: "event", label: "Event/Function", icon: PartyPopper, description: "Attending events or functions" },
];

export default function LeaveApplication() {
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState<LeaveApplication[]>([]);
  const [formData, setFormData] = useState({
    leaveType: "home" as "home" | "outing" | "medical" | "event",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    setApplications(initializeEntity<LeaveApplication>(ENTITIES.LEAVE_APPLICATIONS, mockLeaveApplications));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: LeaveApplication = {
      id: generateId("L"),
      studentName: studentProfile.name,
      roomNumber: studentProfile.roomNumber,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: "pending" as const,
      appliedAt: new Date().toISOString(),
    };
    const created = create<LeaveApplication>(ENTITIES.LEAVE_APPLICATIONS, newApplication);
    setApplications([created, ...applications]);
    setFormData({ leaveType: "home", startDate: "", endDate: "", reason: "" });
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className={styles.statusIconApproved} />;
      case "rejected":
        return <XCircle className={styles.statusIconRejected} />;
      default:
        return <Clock className={styles.statusIconPending} />;
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    const leaveType = leaveTypes.find((t) => t.id === type);
    if (leaveType) {
      const Icon = leaveType.icon;
      return <Icon className={styles.leaveTypeIcon} />;
    }
    return null;
  };

  const myApplications = applications.filter((a) => a.studentName === studentProfile.name);
  const pendingCount = myApplications.filter((a) => a.status === "pending").length;
  const approvedCount = myApplications.filter((a) => a.status === "approved").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Leave Application</h1>
            <p className={styles.subtitle}>Apply for leave and track your applications</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Apply for Leave
            </Button>
          )}
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <Calendar className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{myApplications.length}</span>
              <span className={styles.statLabel}>Total Applications</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <Clock className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{pendingCount}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <CheckCircle className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{approvedCount}</span>
              <span className={styles.statLabel}>Approved</span>
            </div>
          </div>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>New Leave Application</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Leave Type</label>
                <div className={styles.leaveTypeGrid}>
                  {leaveTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`${styles.leaveTypeButton} ${formData.leaveType === type.id ? styles.leaveTypeButtonActive : ""}`}
                      onClick={() => setFormData({ ...formData, leaveType: type.id as typeof formData.leaveType })}
                    >
                      <type.icon className={styles.leaveTypeButtonIcon} />
                      <span className={styles.leaveTypeButtonLabel}>{type.label}</span>
                      <span className={styles.leaveTypeButtonDesc}>{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.dateRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Reason</label>
                <Textarea
                  placeholder="Provide details about your leave request..."
                  rows={4}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.applicationsSection}>
          <h2 className={styles.sectionTitle}>My Applications</h2>

          {myApplications.length > 0 ? (
            <div className={styles.applicationsList}>
              {myApplications.map((application) => (
                <div key={application.id} className={styles.applicationCard}>
                  <div className={styles.applicationHeader}>
                    <div className={styles.applicationTypeInfo}>
                      {getLeaveTypeIcon(application.leaveType)}
                      <div>
                        <span className={styles.applicationId}>#{application.id}</span>
                        <span className={styles.applicationType}>
                          {leaveTypes.find((t) => t.id === application.leaveType)?.label}
                        </span>
                      </div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles[`status${application.status.charAt(0).toUpperCase() + application.status.slice(1)}`]}`}>
                      {getStatusIcon(application.status)}
                      {application.status}
                    </div>
                  </div>

                  <div className={styles.applicationDates}>
                    <div className={styles.dateItem}>
                      <Calendar className={styles.dateIcon} />
                      <span>
                        {new Date(application.startDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className={styles.dateSeparator}>to</span>
                      <span>
                        {new Date(application.endDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <p className={styles.applicationReason}>{application.reason}</p>

                  <div className={styles.applicationMeta}>
                    <span>
                      Applied: {new Date(application.appliedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {application.approvedBy && (
                      <span>Approved by: {application.approvedBy}</span>
                    )}
                  </div>

                  {application.remarks && (
                    <div className={styles.applicationRemarks}>
                      <strong>Remarks:</strong> {application.remarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Calendar className={styles.emptyIcon} />
              <p className={styles.emptyText}>No leave applications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
