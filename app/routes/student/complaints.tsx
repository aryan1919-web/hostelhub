import type { Route } from "./+types/complaints";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CheckCircle, ArrowLeft, Clock, AlertCircle, Filter } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Textarea } from "~/components/ui/textarea/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select/select";
import { mockComplaints, studentProfile, type Complaint } from "~/data/mock-data";
import { initializeEntity, create, getAll, generateId, ENTITIES } from "~/data/storage";
import styles from "./complaints.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raise Complaint - HostelHub" },
    {
      name: "description",
      content: "Submit a maintenance or facility complaint",
    },
  ];
}

export default function RaiseComplaint() {
  const [submitted, setSubmitted] = useState(false);
  const [view, setView] = useState<"form" | "list">("list");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    location: "",
  });

  // Initialize complaints from localStorage on mount
  useEffect(() => {
    const stored = initializeEntity<Complaint>(ENTITIES.COMPLAINTS, mockComplaints);
    setComplaints(stored);
  }, []);

  const myComplaints = complaints.filter((c) => c.studentName === studentProfile.name);
  const filteredComplaints =
    filterStatus === "all" ? myComplaints : myComplaints.filter((c) => c.status === filterStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComplaint: Complaint = {
      id: generateId("C"),
      title: formData.title,
      description: formData.description,
      category: formData.category as Complaint["category"],
      status: "pending",
      priority: formData.priority as Complaint["priority"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      studentName: studentProfile.name,
      roomNumber: studentProfile.roomNumber,
    };

    const created = create<Complaint>(ENTITIES.COMPLAINTS, newComplaint);
    setComplaints((prev) => [...prev, created]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ title: "", category: "", priority: "", description: "", location: "" });
      setView("list");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "in-progress":
        return styles.statusInProgress;
      case "resolved":
        return styles.statusResolved;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <Button variant="link" asChild style={{ marginBottom: "var(--space-4)", padding: 0 }}>
            <Link to="/student/dashboard">
              <ArrowLeft style={{ width: "16px", height: "16px", marginRight: "var(--space-2)" }} />
              Back to Dashboard
            </Link>
          </Button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 className={styles.title}>
                {view === "form" ? "Raise a Complaint" : "My Complaints"}
              </h1>
              <p className={styles.subtitle}>
                {view === "form"
                  ? "Report any maintenance or facility issues. We'll get back to you soon."
                  : `${myComplaints.length} total complaints · ${myComplaints.filter((c) => c.status === "pending" || c.status === "in-progress").length} active`}
              </p>
            </div>
            <Button
              onClick={() => setView(view === "form" ? "list" : "form")}
              variant={view === "form" ? "outline" : "default"}
            >
              {view === "form" ? "View My Complaints" : "Raise New Complaint"}
            </Button>
          </div>
        </div>

        {/* Complaint List View */}
        {view === "list" && (
          <>
            <div style={{ marginBottom: "var(--space-4)", display: "flex", gap: "var(--space-2)" }}>
              {["all", "pending", "in-progress", "resolved"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>

            {filteredComplaints.length === 0 ? (
              <div className={styles.card} style={{ textAlign: "center", padding: "var(--space-8)" }}>
                <AlertCircle style={{ width: "48px", height: "48px", color: "var(--color-neutral-8)", marginBottom: "var(--space-4)" }} />
                <p style={{ color: "var(--color-neutral-11)" }}>
                  {filterStatus === "all" ? "No complaints yet. Click 'Raise New Complaint' to get started." : `No ${filterStatus} complaints.`}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {filteredComplaints.map((complaint) => (
                  <div key={complaint.id} className={styles.card} style={{ padding: "var(--space-5)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-2)" }}>
                      <h3 style={{ fontWeight: 600, color: "var(--color-neutral-12)", fontSize: "var(--font-size-2)" }}>
                        {complaint.title}
                      </h3>
                      <div style={{ display: "flex", gap: "var(--space-2)" }}>
                        <span className={`${styles.badge} ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                        <span className={styles.badge} style={{
                          backgroundColor: complaint.priority === "high" ? "var(--color-error-3)" : complaint.priority === "medium" ? "var(--color-warning-3)" : "var(--color-neutral-4)",
                          color: complaint.priority === "high" ? "var(--color-error-11)" : complaint.priority === "medium" ? "var(--color-warning-11)" : "var(--color-neutral-11)",
                        }}>
                          {complaint.priority}
                        </span>
                      </div>
                    </div>
                    <p style={{ color: "var(--color-neutral-11)", fontSize: "var(--font-size-1)", marginBottom: "var(--space-3)" }}>
                      {complaint.description}
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-3)", color: "var(--color-neutral-10)", fontSize: "var(--font-size-0)" }}>
                      <span>ID: {complaint.id}</span>
                      <span>•</span>
                      <span>{complaint.category}</span>
                      <span>•</span>
                      <span>
                        <Clock style={{ width: "12px", height: "12px", display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                        {new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Complaint Form View */}
        {view === "form" && (
          <>
            {submitted && (
              <div className={styles.successMessage}>
                <CheckCircle className={styles.successIcon} />
                <div className={styles.successContent}>
                  <h3 className={styles.successTitle}>Complaint Submitted Successfully!</h3>
                  <p className={styles.successText}>
                    Your complaint has been registered and saved. You'll receive updates on your dashboard.
                  </p>
                </div>
              </div>
            )}

            <div className={styles.card}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <Label htmlFor="title" className={styles.label}>
                    Complaint Title<span className={styles.required}>*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="category" className={styles.label}>
                    Category<span className={styles.required}>*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                      <SelectItem value="cleanliness">Cleanliness</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="priority" className={styles.label}>
                    Priority<span className={styles.required}>*</span>
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    required
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait a few days</SelectItem>
                      <SelectItem value="medium">Medium - Needs attention soon</SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="location" className={styles.label}>
                    Location<span className={styles.required}>*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Room A-204, Common Area, etc."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="description" className={styles.label}>
                    Detailed Description<span className={styles.required}>*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                  <p className={styles.helpText}>
                    Please include as much detail as possible to help us resolve the issue quickly
                  </p>
                </div>

                <div className={styles.buttonGroup}>
                  <Button type="submit" size="lg">
                    Submit Complaint
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => setView("list")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
