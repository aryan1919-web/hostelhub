import type { Route } from "./+types/audit-log";
import { useState, useMemo } from "react";
import {
  Shield,
  Search,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Users,
  Activity,
  Download,
  Filter,
} from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import {
  mockAuditLog,
  mockSecurityAlerts,
} from "~/data/security-data";
import styles from "./audit-log.module.css";

type CategoryFilter = "all" | "auth" | "data" | "permission" | "system" | "security";
type SeverityFilter = "all" | "info" | "warning" | "critical";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Audit Log - HostelHub" },
    {
      name: "description",
      content: "View security audit logs, track all system events and user actions",
    },
  ];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLog() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = useMemo(() => {
    return mockAuditLog.filter((log) => {
      if (categoryFilter !== "all" && log.category !== categoryFilter) return false;
      if (severityFilter !== "all" && log.severity !== severityFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          log.action.toLowerCase().includes(q) ||
          log.user.toLowerCase().includes(q) ||
          log.details.toLowerCase().includes(q) ||
          log.ip.includes(q)
        );
      }
      return true;
    });
  }, [categoryFilter, severityFilter, searchQuery]);

  const totalEvents = mockAuditLog.length;
  const securityEvents = mockAuditLog.filter((l) => l.category === "security").length;
  const warningEvents = mockAuditLog.filter((l) => l.severity === "warning").length;
  const criticalEvents = mockAuditLog.filter((l) => l.severity === "critical").length;

  const categoryOptions: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "auth", label: "Authentication" },
    { value: "data", label: "Data Access" },
    { value: "permission", label: "Permissions" },
    { value: "system", label: "System" },
    { value: "security", label: "Security" },
  ];

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.greeting}>
                <Shield className={styles.headerIcon} />
                Security Audit Log
              </h1>
              <p className={styles.subtitle}>
                Complete audit trail of all system events, user actions, login attempts, and security incidents.
                Ensure compliance and track unauthorized access.
              </p>
            </div>
            <Button variant="outline">
              <Download style={{ width: 16, height: 16 }} />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconBox} data-color="accent">
              <Activity style={{ width: 20, height: 20 }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{totalEvents}</p>
              <p className={styles.statLabel}>Total Events</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconBox} data-color="error">
              <ShieldCheck style={{ width: 20, height: 20 }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{securityEvents}</p>
              <p className={styles.statLabel}>Security Events</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconBox} data-color="warning">
              <AlertTriangle style={{ width: 20, height: 20 }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{warningEvents}</p>
              <p className={styles.statLabel}>Warnings</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconBox} data-color="error">
              <AlertTriangle style={{ width: 20, height: 20 }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{criticalEvents}</p>
              <p className={styles.statLabel}>Critical</p>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className={styles.alertsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Security Alerts</h2>
          </div>
          <div className={styles.alertsList}>
            {mockSecurityAlerts.map((alert) => (
              <div
                key={alert.id}
                className={styles.alertItem}
                data-severity={alert.severity}
                data-unread={!alert.isRead}
              >
                <div className={styles.alertIconBox} data-severity={alert.severity}>
                  <AlertTriangle style={{ width: 18, height: 18 }} />
                </div>
                <div className={styles.alertInfo}>
                  <p className={styles.alertTitle}>
                    {!alert.isRead && <span className={styles.unreadDot} />}
                    {alert.title}
                  </p>
                  <p className={styles.alertDescription}>{alert.description}</p>
                  <div className={styles.alertMeta}>
                    <span className={styles.severityBadge} data-severity={alert.severity}>
                      {alert.severity}
                    </span>
                    <span>{formatDate(alert.timestamp)}</span>
                    {alert.actionTaken && <span>Action: {alert.actionTaken}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className={styles.logSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Event Log</h2>
            <div className={styles.searchWrapper}>
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className={styles.filters}>
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                className={styles.filterButton}
                data-active={categoryFilter === opt.value}
                onClick={() => setCategoryFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <table className={styles.logTable}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Details</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <span className={styles.logTimestamp}>{formatDate(log.timestamp)}</span>
                  </td>
                  <td>
                    <div className={styles.logUser}>
                      <span className={styles.logUserName}>{log.user}</span>
                      <span className={styles.logUserRole}>{log.userRole}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.logAction}>{log.action}</span>
                  </td>
                  <td>
                    <span className={styles.categoryBadge} data-category={log.category}>
                      {log.category}
                    </span>
                  </td>
                  <td>
                    <span className={styles.severityBadge} data-severity={log.severity}>
                      {log.severity}
                    </span>
                  </td>
                  <td>
                    <span className={styles.logDetails} title={log.details}>
                      {log.details}
                    </span>
                  </td>
                  <td>
                    <span className={styles.logIp}>{log.ip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--color-neutral-10)", padding: "var(--space-8)" }}>
              No log entries match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
