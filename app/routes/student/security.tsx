import type { Route } from "./+types/security";
import { useState } from "react";
import { Link } from "react-router";
import {
  Shield,
  ShieldCheck,
  Lock,
  Fingerprint,
  Monitor,
  Smartphone,
  Globe,
  Clock,
  Settings,
  Key,
  Database,
} from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import {
  mockLoginActivity,
  mockActiveSessions,
  securityScore,
  securitySettings,
} from "~/data/security-data";
import styles from "./security.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Security Dashboard - HostelHub" },
    {
      name: "description",
      content: "Monitor your account security, active sessions, and login activity",
    },
  ];
}

function getScoreColor(score: number): string {
  if (score >= 80) return "var(--color-success-9)";
  if (score >= 60) return "var(--color-accent-9)";
  if (score >= 40) return "var(--color-warning-9)";
  return "var(--color-error-9)";
}

function getDeviceIcon(device: string) {
  if (device.includes("iPhone") || device.includes("Android")) {
    return Smartphone;
  }
  return Monitor;
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

export default function SecurityDashboard() {
  const [sessions, setSessions] = useState(mockActiveSessions);

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.greeting}>
                <Shield className={styles.headerIcon} />
                Security Dashboard
              </h1>
              <p className={styles.subtitle}>
                Monitor your account security, review login activity, and manage active sessions.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/student/security-settings">
                <Settings style={{ width: 16, height: 16 }} />
                Security Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Security Score */}
        <div className={styles.scoreSection}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreCircle}>
              <div className={styles.scoreCircleRing} />
              <div
                className={styles.scoreCircleProgress}
                style={{
                  borderColor: getScoreColor(securityScore.overall),
                  clipPath: `inset(0 ${100 - securityScore.overall}% 0 0)`,
                }}
              />
              <span className={styles.scoreValue}>{securityScore.overall}</span>
              <span className={styles.scoreMax}>/100</span>
            </div>
            <p className={styles.scoreLabel}>Security Score</p>
            <p className={styles.scoreUpdate}>
              Last updated: {formatDate(securityScore.lastUpdated)}
            </p>
          </div>

          <div className={styles.scoreBreakdown}>
            <h2 className={styles.scoreBreakdownTitle}>Score Breakdown</h2>
            <div className={styles.scoreCategories}>
              {securityScore.categories.map((cat) => (
                <div key={cat.name} className={styles.scoreCategory}>
                  <span className={styles.scoreCategoryName}>{cat.name}</span>
                  <div className={styles.scoreCategoryBar}>
                    <div
                      className={styles.scoreCategoryFill}
                      style={{
                        width: `${cat.score}%`,
                        backgroundColor: getScoreColor(cat.score),
                      }}
                    />
                  </div>
                  <span className={styles.scoreCategoryValue}>{cat.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Status Cards */}
        <div className={styles.statusGrid}>
          <div className={styles.statusCard}>
            <div className={styles.statusIconBox} data-color="success">
              <ShieldCheck className={styles.statusIcon} />
            </div>
            <div className={styles.statusInfo}>
              <p className={styles.statusLabel}>Two-Factor Auth</p>
              <p className={styles.statusValue}>
                {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIconBox} data-color="accent">
              <Lock className={styles.statusIcon} />
            </div>
            <div className={styles.statusInfo}>
              <p className={styles.statusLabel}>Data Encryption</p>
              <p className={styles.statusValue}>AES-256 Active</p>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIconBox} data-color="accent">
              <Key className={styles.statusIcon} />
            </div>
            <div className={styles.statusInfo}>
              <p className={styles.statusLabel}>Password Age</p>
              <p className={styles.statusValue}>
                Changed {Math.floor((Date.now() - new Date(securitySettings.passwordLastChanged).getTime()) / 86400000)} days ago
              </p>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIconBox} data-color="warning">
              <Fingerprint className={styles.statusIcon} />
            </div>
            <div className={styles.statusInfo}>
              <p className={styles.statusLabel}>Trusted Devices</p>
              <p className={styles.statusValue}>{securitySettings.trustedDevices} devices</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className={styles.twoColumn}>
          {/* Login Activity */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Login Activity</h2>
            </div>
            <div className={styles.activityList}>
              {mockLoginActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={styles.activityItem}
                  data-status={activity.status}
                >
                  <div
                    className={styles.activityStatusDot}
                    data-status={activity.status}
                  />
                  <div className={styles.activityInfo}>
                    <p className={styles.activityDevice}>
                      {activity.device} &middot; {activity.browser}
                    </p>
                    <p className={styles.activityDetails}>
                      <Globe style={{ width: 12, height: 12, display: "inline", verticalAlign: "middle" }} />{" "}
                      {activity.location} &middot; IP: {activity.ip}
                    </p>
                  </div>
                  <div className={styles.activityMeta}>
                    <p className={styles.activityTime}>
                      <Clock style={{ width: 12, height: 12, display: "inline", verticalAlign: "middle" }} />{" "}
                      {formatDate(activity.timestamp)}
                    </p>
                    <span
                      className={styles.activityBadge}
                      data-status={activity.status}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sessions */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Active Sessions</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSessions((prev) => prev.filter((s) => s.isCurrent))}
              >
                Revoke All Others
              </Button>
            </div>
            <div className={styles.sessionsList}>
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.device);
                return (
                  <div
                    key={session.id}
                    className={styles.sessionItem}
                    data-current={session.isCurrent}
                  >
                    <div className={styles.sessionIconBox}>
                      <DeviceIcon style={{ width: 20, height: 20 }} />
                    </div>
                    <div className={styles.sessionInfo}>
                      <p className={styles.sessionDevice}>
                        {session.device}
                        {session.isCurrent && (
                          <span className={styles.currentBadge}>Current</span>
                        )}
                      </p>
                      <p className={styles.sessionDetails}>
                        {session.os} &middot; {session.browser} &middot; {session.location}
                      </p>
                      <p className={styles.sessionDetails}>
                        IP: {session.ip} &middot; Last active: {formatDate(session.lastActive)}
                      </p>
                    </div>
                    <div className={styles.sessionActions}>
                      {!session.isCurrent && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeSession(session.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}

              {sessions.length === 0 && (
                <p style={{ textAlign: "center", color: "var(--color-neutral-10)", padding: "var(--space-6)" }}>
                  No active sessions
                </p>
              )}
            </div>

            {/* Encryption Info */}
            <div style={{ marginTop: "var(--space-6)", padding: "var(--space-4)", background: "var(--color-accent-2)", borderRadius: "var(--radius-3)", border: "1px solid var(--color-accent-6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                <Database style={{ width: 18, height: 18, color: "var(--color-accent-9)" }} />
                <span style={{ fontWeight: 600, fontSize: "var(--font-size-1)", color: "var(--color-neutral-12)" }}>
                  Data Protection
                </span>
              </div>
              <p style={{ fontSize: "var(--font-size-0)", color: "var(--color-neutral-11)", margin: 0, lineHeight: 1.6 }}>
                All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit.
                Session tokens are rotated every 30 minutes. Passwords are hashed using bcrypt with salt rounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
