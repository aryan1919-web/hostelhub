import type { Route } from "./+types/visitors";
import { useState, useEffect } from "react";
import { Users, Plus, Clock, CheckCircle, XCircle, Phone, User, Calendar } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockVisitors, studentProfile, type Visitor } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./visitors.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visitor Management - HostelHub" },
    { name: "description", content: "Register and manage visitors" },
  ];
}

const relationOptions = ["Father", "Mother", "Brother", "Sister", "Guardian", "Relative", "Friend"];
const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

export default function VisitorManagement() {
  const [showForm, setShowForm] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorRelation: "Father",
    visitorPhone: "",
    visitDate: "",
    visitTime: timeSlots[0],
    purpose: "",
  });

  useEffect(() => {
    setVisitors(initializeEntity<Visitor>(ENTITIES.VISITORS, mockVisitors));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisitor: Visitor = {
      id: generateId("V"),
      studentName: studentProfile.name,
      roomNumber: studentProfile.roomNumber,
      visitorName: formData.visitorName,
      visitorRelation: formData.visitorRelation,
      visitorPhone: formData.visitorPhone,
      visitDate: formData.visitDate,
      visitTime: formData.visitTime,
      purpose: formData.purpose,
      status: "pending" as const,
    };
    const created = create<Visitor>(ENTITIES.VISITORS, newVisitor);
    setVisitors([created, ...visitors]);
    setFormData({
      visitorName: "",
      visitorRelation: "Father",
      visitorPhone: "",
      visitDate: "",
      visitTime: timeSlots[0],
      purpose: "",
    });
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return <CheckCircle className={styles.statusIconApproved} />;
      case "rejected":
        return <XCircle className={styles.statusIconRejected} />;
      default:
        return <Clock className={styles.statusIconPending} />;
    }
  };

  const myVisitors = visitors.filter((v) => v.studentName === studentProfile.name);

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Visitor Management</h1>
            <p className={styles.subtitle}>Register expected visitors and track approvals</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Register Visitor
            </Button>
          )}
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Register New Visitor</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Visitor Name</label>
                  <Input
                    placeholder="Full name of visitor"
                    value={formData.visitorName}
                    onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Relationship</label>
                  <select
                    className={styles.select}
                    value={formData.visitorRelation}
                    onChange={(e) => setFormData({ ...formData, visitorRelation: e.target.value })}
                  >
                    {relationOptions.map((relation) => (
                      <option key={relation} value={relation}>
                        {relation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Visitor Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.visitorPhone}
                    onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Visit Date</label>
                  <Input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Preferred Time Slot</label>
                <div className={styles.timeSlotGrid}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`${styles.timeSlotButton} ${formData.visitTime === slot ? styles.timeSlotButtonActive : ""}`}
                      onClick={() => setFormData({ ...formData, visitTime: slot })}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Purpose of Visit</label>
                <Textarea
                  placeholder="Brief description of visit purpose..."
                  rows={3}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Register Visitor</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.visitorsSection}>
          <h2 className={styles.sectionTitle}>Registered Visitors</h2>

          {myVisitors.length > 0 ? (
            <div className={styles.visitorsList}>
              {myVisitors.map((visitor) => (
                <div key={visitor.id} className={styles.visitorCard}>
                  <div className={styles.visitorHeader}>
                    <div className={styles.visitorInfo}>
                      <div className={styles.visitorAvatar}>
                        <User className={styles.avatarIcon} />
                      </div>
                      <div>
                        <h3 className={styles.visitorName}>{visitor.visitorName}</h3>
                        <span className={styles.visitorRelation}>{visitor.visitorRelation}</span>
                      </div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles[`status${visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}`]}`}>
                      {getStatusIcon(visitor.status)}
                      {visitor.status}
                    </div>
                  </div>

                  <div className={styles.visitorDetails}>
                    <div className={styles.detailItem}>
                      <Calendar className={styles.detailIcon} />
                      <span>
                        {new Date(visitor.visitDate).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <Clock className={styles.detailIcon} />
                      <span>{visitor.visitTime}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Phone className={styles.detailIcon} />
                      <span>{visitor.visitorPhone}</span>
                    </div>
                  </div>

                  <p className={styles.visitorPurpose}>
                    <strong>Purpose:</strong> {visitor.purpose}
                  </p>

                  {visitor.approvedBy && (
                    <div className={styles.visitorMeta}>
                      Approved by: {visitor.approvedBy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Users className={styles.emptyIcon} />
              <p className={styles.emptyText}>No visitors registered yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
