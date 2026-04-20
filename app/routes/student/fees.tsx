import type { Route } from "./+types/fees";
import { Navigation } from "~/components/navigation";
import { mockFeeRecords } from "~/data/mock-data";
import styles from "./fees.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fee Details - HostelHub" },
    {
      name: "description",
      content: "View your fee payment history and upcoming dues",
    },
  ];
}

export default function Fees() {
  const totalPaid = mockFeeRecords.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0);
  const pendingAmount = mockFeeRecords.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount, 0);
  const nextDue = mockFeeRecords.find((f) => f.status === "pending");

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Fee Details</h1>
          <p className={styles.subtitle}>Track your hostel fee payments and dues</p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Paid</span>
              <span className={styles.summaryValue}>₹{totalPaid.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Pending Amount</span>
              <span className={styles.summaryValue}>₹{pendingAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Next Due Date</span>
              <span className={styles.summaryValue}>
                {nextDue
                  ? new Date(nextDue.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Payment History</h2>
        <div className={styles.feeTable}>
          <div className={`${styles.tableRow} ${styles.tableHeader}`}>
            <div>Month</div>
            <div>Amount</div>
            <div>Due Date</div>
            <div>Status</div>
          </div>
          {mockFeeRecords.map((record) => (
            <div key={record.id} className={styles.tableRow}>
              <div className={styles.tableCellBold} data-label="Month">
                {record.month}
              </div>
              <div className={styles.tableCell} data-label="Amount">
                ₹{record.amount.toLocaleString("en-IN")}
              </div>
              <div className={styles.tableCell} data-label="Due Date">
                {new Date(record.dueDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div data-label="Status">
                <span
                  className={`${styles.statusBadge} ${
                    record.status === "paid"
                      ? styles.statusPaid
                      : record.status === "pending"
                        ? styles.statusPending
                        : styles.statusOverdue
                  }`}
                >
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
