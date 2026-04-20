import type { Route } from "./+types/attendance";
import { useState } from "react";
import { Users, CheckCircle, XCircle, Clock, AlertTriangle, Calendar, Filter, Download } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockAttendanceRecords } from "~/data/mock-data";
import styles from "./attendance.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Attendance Tracking - HostelHub Warden" },
    { name: "description", content: "Monitor student attendance and roll calls" },
  ];
}

const statusConfig = {
  present: { icon: CheckCircle, color: "present", label: "Present" },
  absent: { icon: XCircle, color: "absent", label: "Absent" },
  late: { icon: Clock, color: "late", label: "Late" },
  "on-leave": { icon: Calendar, color: "onLeave", label: "On Leave" },
};

export default function AttendanceTracking() {
  const [selectedDate, setSelectedDate] = useState("2024-01-18");
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent" | "late" | "on-leave">("all");

  const filteredRecords = mockAttendanceRecords.filter((record) => {
    const matchesDate = record.date === selectedDate;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const presentCount = mockAttendanceRecords.filter((r) => r.status === "present").length;
  const absentCount = mockAttendanceRecords.filter((r) => r.status === "absent").length;
  const lateCount = mockAttendanceRecords.filter((r) => r.status === "late").length;
  const onLeaveCount = mockAttendanceRecords.filter((r) => r.status === "on-leave").length;
  const totalStudents = mockAttendanceRecords.length;

  const attendancePercentage = ((presentCount + lateCount) / totalStudents) * 100;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Attendance Tracking</h1>
            <p className={styles.subtitle}>Monitor daily attendance and roll calls</p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="outline">
              <Download size={16} />
              Export
            </Button>
            <Button>
              <Users size={16} />
              Start Roll Call
            </Button>
          </div>
        </div>

        <div className={styles.dateSelector}>
          <Calendar size={18} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.present}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{presentCount}</span>
              <span className={styles.statLabel}>Present</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.absent}`}>
            <XCircle size={20} />
            <div>
              <span className={styles.statValue}>{absentCount}</span>
              <span className={styles.statLabel}>Absent</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.late}`}>
            <Clock size={20} />
            <div>
              <span className={styles.statValue}>{lateCount}</span>
              <span className={styles.statLabel}>Late Entry</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.onLeave}`}>
            <Calendar size={20} />
            <div>
              <span className={styles.statValue}>{onLeaveCount}</span>
              <span className={styles.statLabel}>On Leave</span>
            </div>
          </div>
        </div>

        <div className={styles.attendanceProgress}>
          <div className={styles.progressHeader}>
            <span>Attendance Rate</span>
            <span className={attendancePercentage >= 90 ? styles.good : styles.warning}>
              {attendancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${attendancePercentage >= 90 ? styles.good : styles.warning}`}
              style={{ width: `${attendancePercentage}%` }}
            />
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
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>
        </div>

        <div className={styles.attendanceList}>
          {filteredRecords.map((record) => {
            const config = statusConfig[record.status];
            const StatusIcon = config.icon;
            return (
              <div key={record.id} className={styles.attendanceCard}>
                <div className={styles.studentInfo}>
                  <div className={styles.avatar}>
                    {record.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className={styles.studentName}>{record.studentName}</h3>
                    <span className={styles.roomNumber}>Room: {record.roomNumber}</span>
                  </div>
                </div>

                <div className={styles.statusInfo}>
                  <div className={`${styles.statusBadge} ${styles[config.color]}`}>
                    <StatusIcon size={14} />
                    {config.label}
                  </div>
                  {record.checkInTime && (
                    <span className={styles.checkTime}>Check-in: {record.checkInTime}</span>
                  )}
                </div>

                {record.remarks && <div className={styles.remarks}>{record.remarks}</div>}

                <div className={styles.actions}>
                  {record.status === "absent" && (
                    <>
                      <Button size="sm" variant="outline">
                        <AlertTriangle size={14} />
                        Send Alert
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark Present
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    View History
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecords.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} />
            <h3>No attendance records</h3>
            <p>No records found for the selected date and filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
