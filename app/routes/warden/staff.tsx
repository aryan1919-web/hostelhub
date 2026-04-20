import type { Route } from "./+types/staff";
import { useState } from "react";
import { Users, Plus, Phone, Mail, Clock, CheckCircle, AlertCircle, Search, Filter } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockStaff } from "~/data/mock-data";
import styles from "./staff.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Staff Management - HostelHub Warden" },
    { name: "description", content: "Manage hostel staff and duty schedules" },
  ];
}

const shiftLabels = {
  morning: "Morning (6 AM - 2 PM)",
  evening: "Evening (2 PM - 10 PM)",
  night: "Night (10 PM - 6 AM)",
  general: "General (9 AM - 6 PM)",
};

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "on-leave" | "inactive">("all");

  const departments = ["all", ...new Set(mockStaff.map((s) => s.department))];

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || staff.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || staff.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const activeCount = mockStaff.filter((s) => s.status === "active").length;
  const onLeaveCount = mockStaff.filter((s) => s.status === "on-leave").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Staff Management</h1>
            <p className={styles.subtitle}>Manage hostel staff and duty schedules</p>
          </div>
          <Button>
            <Plus size={16} />
            Add Staff
          </Button>
        </div>

        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.total}`}>
            <Users size={20} />
            <div>
              <span className={styles.statValue}>{mockStaff.length}</span>
              <span className={styles.statLabel}>Total Staff</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.active}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{activeCount}</span>
              <span className={styles.statLabel}>Active</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.onLeave}`}>
            <AlertCircle size={20} />
            <div>
              <span className={styles.statValue}>{onLeaveCount}</span>
              <span className={styles.statLabel}>On Leave</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className={styles.select}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className={styles.select}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className={styles.staffGrid}>
          {filteredStaff.map((staff) => (
            <div key={staff.id} className={styles.staffCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className={styles.staffInfo}>
                  <h3 className={styles.staffName}>{staff.name}</h3>
                  <span className={styles.designation}>{staff.designation}</span>
                </div>
                <span className={`${styles.statusBadge} ${styles[staff.status.replace("-", "")]}`}>
                  {staff.status}
                </span>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Department</span>
                  <span className={styles.detailValue}>{staff.department}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Shift</span>
                  <span className={styles.detailValue}>{shiftLabels[staff.shift]}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Joined</span>
                  <span className={styles.detailValue}>
                    {new Date(staff.joinDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <a href={`tel:${staff.phone}`} className={styles.contactLink}>
                  <Phone size={14} />
                  {staff.phone}
                </a>
                <a href={`mailto:${staff.email}`} className={styles.contactLink}>
                  <Mail size={14} />
                  {staff.email}
                </a>
              </div>

              <div className={styles.cardActions}>
                <Button size="sm" variant="outline">
                  <Clock size={14} />
                  View Schedule
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} />
            <h3>No staff found</h3>
            <p>No staff members match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
