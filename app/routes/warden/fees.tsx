import type { Route } from "./+types/fees";
import { useState } from "react";
import { DollarSign, CheckCircle, Clock, AlertTriangle, Search, Filter, Download, Mail } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockFeePayments } from "~/data/mock-data";
import styles from "./fees.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fee Management - HostelHub Warden" },
    { name: "description", content: "Track and manage student fee payments" },
  ];
}

export default function FeeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");

  const filteredPayments = mockFeePayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalExpected = mockFeePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalCollected = mockFeePayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockFeePayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = mockFeePayments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);

  const paidCount = mockFeePayments.filter((p) => p.status === "paid").length;
  const pendingCount = mockFeePayments.filter((p) => p.status === "pending").length;
  const overdueCount = mockFeePayments.filter((p) => p.status === "overdue").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Fee Management</h1>
            <p className={styles.subtitle}>Track and manage student fee payments</p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="outline">
              <Download size={16} />
              Export Report
            </Button>
            <Button>
              <Mail size={16} />
              Send Reminders
            </Button>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <DollarSign size={24} />
            <div>
              <span className={styles.statValue}>₹{totalExpected.toLocaleString()}</span>
              <span className={styles.statLabel}>Total Expected</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.collected}`}>
            <CheckCircle size={24} />
            <div>
              <span className={styles.statValue}>₹{totalCollected.toLocaleString()}</span>
              <span className={styles.statLabel}>Collected ({paidCount})</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.pending}`}>
            <Clock size={24} />
            <div>
              <span className={styles.statValue}>₹{totalPending.toLocaleString()}</span>
              <span className={styles.statLabel}>Pending ({pendingCount})</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.overdue}`}>
            <AlertTriangle size={24} />
            <div>
              <span className={styles.statValue}>₹{totalOverdue.toLocaleString()}</span>
              <span className={styles.statLabel}>Overdue ({overdueCount})</span>
            </div>
          </div>
        </div>

        <div className={styles.collectionProgress}>
          <div className={styles.progressHeader}>
            <span>Collection Progress - January 2024</span>
            <span>{((totalCollected / totalExpected) * 100).toFixed(1)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(totalCollected / totalExpected) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search by name or room..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Room</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className={styles.studentCell}>
                      <span className={styles.studentName}>{payment.studentName}</span>
                      <span className={styles.studentId}>{payment.studentId}</span>
                    </div>
                  </td>
                  <td>{payment.roomNumber}</td>
                  <td>{payment.month}</td>
                  <td className={styles.amount}>₹{payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString("en-IN")}</td>
                  <td>{payment.paidDate ? new Date(payment.paidDate).toLocaleDateString("en-IN") : "-"}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[payment.status]}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      {payment.status === "paid" ? (
                        <Button size="sm" variant="outline">
                          Receipt
                        </Button>
                      ) : (
                        <>
                          <Button size="sm">Mark Paid</Button>
                          <Button size="sm" variant="outline">
                            Remind
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className={styles.emptyState}>
            <DollarSign size={48} />
            <h3>No fee records found</h3>
            <p>No records match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
