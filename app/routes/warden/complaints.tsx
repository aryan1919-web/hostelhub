import type { Route } from "./+types/complaints";
import { useState } from "react";
import { AlertCircle, Clock, CheckCircle, Filter, Search, User, Home, Wrench, Shield, Trash2, HelpCircle } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockComplaints } from "~/data/mock-data";
import type { Complaint } from "~/data/mock-data";
import styles from "./complaints.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Complaint Management - HostelHub Warden" },
    { name: "description", content: "Manage and resolve student complaints" },
  ];
}

const categoryIcons = {
  maintenance: Wrench,
  facilities: Home,
  cleanliness: Trash2,
  security: Shield,
  other: HelpCircle,
};

// Extended complaints data
const extendedComplaints: Complaint[] = [
  ...mockComplaints,
  {
    id: "C004",
    title: "AC not cooling properly",
    description: "The air conditioner in room A-305 is not cooling effectively. Temperature remains high even at lowest setting.",
    category: "maintenance",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-17T11:00:00Z",
    updatedAt: "2024-01-17T11:00:00Z",
    studentName: "Vikram Singh",
    roomNumber: "A-203",
  },
  {
    id: "C005",
    title: "Garbage not collected",
    description: "The garbage bins on the 3rd floor have not been emptied for 3 days. Causing bad smell.",
    category: "cleanliness",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-17T09:00:00Z",
    studentName: "Neha Gupta",
    roomNumber: "B-205",
  },
  {
    id: "C006",
    title: "Security camera not working",
    description: "The CCTV camera near the main entrance has been non-functional for a week.",
    category: "security",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-15T16:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
    studentName: "Ravi Menon",
    roomNumber: "A-101",
  },
];

export default function ComplaintManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "resolved" | "closed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");
  const [filterCategory, setFilterCategory] = useState<"all" | "maintenance" | "facilities" | "cleanliness" | "security" | "other">("all");

  const filteredComplaints = extendedComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus;
    const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority;
    const matchesCategory = filterCategory === "all" || complaint.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const pendingCount = extendedComplaints.filter((c) => c.status === "pending").length;
  const inProgressCount = extendedComplaints.filter((c) => c.status === "in-progress").length;
  const resolvedCount = extendedComplaints.filter((c) => c.status === "resolved").length;
  const highPriorityCount = extendedComplaints.filter((c) => c.priority === "high" && c.status !== "resolved").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Complaint Management</h1>
            <p className={styles.subtitle}>Track, assign, and resolve student complaints</p>
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
          <div className={`${styles.statCard} ${styles.inProgress}`}>
            <AlertCircle size={20} />
            <div>
              <span className={styles.statValue}>{inProgressCount}</span>
              <span className={styles.statLabel}>In Progress</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.resolved}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{resolvedCount}</span>
              <span className={styles.statLabel}>Resolved</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.highPriority}`}>
            <AlertCircle size={20} />
            <div>
              <span className={styles.statValue}>{highPriorityCount}</span>
              <span className={styles.statLabel}>High Priority</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className={styles.select}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
              className={styles.select}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
              className={styles.select}
            >
              <option value="all">All Categories</option>
              <option value="maintenance">Maintenance</option>
              <option value="facilities">Facilities</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={styles.complaintsList}>
          {filteredComplaints.map((complaint) => {
            const CategoryIcon = categoryIcons[complaint.category];
            return (
              <div key={complaint.id} className={styles.complaintCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.categoryIcon}>
                    <CategoryIcon size={20} />
                  </div>
                  <div className={styles.complaintInfo}>
                    <div className={styles.complaintTitleRow}>
                      <h3 className={styles.complaintTitle}>{complaint.title}</h3>
                      <span className={styles.complaintId}>#{complaint.id}</span>
                    </div>
                    <div className={styles.complaintMeta}>
                      <span className={styles.metaItem}>
                        <User size={12} />
                        {complaint.studentName}
                      </span>
                      <span className={styles.metaItem}>
                        <Home size={12} />
                        {complaint.roomNumber}
                      </span>
                    </div>
                  </div>
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${styles[`priority${complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}`]}`}>
                      {complaint.priority}
                    </span>
                    <span className={`${styles.badge} ${styles[complaint.status.replace("-", "")]}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>

                <p className={styles.description}>{complaint.description}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.timestamps}>
                    <span>Created: {new Date(complaint.createdAt).toLocaleDateString("en-IN")}</span>
                    <span>Updated: {new Date(complaint.updatedAt).toLocaleDateString("en-IN")}</span>
                  </div>

                  <div className={styles.actions}>
                    {complaint.status === "pending" && (
                      <Button size="sm">Assign Staff</Button>
                    )}
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredComplaints.length === 0 && (
          <div className={styles.emptyState}>
            <AlertCircle size={48} />
            <h3>No complaints found</h3>
            <p>No complaints match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
