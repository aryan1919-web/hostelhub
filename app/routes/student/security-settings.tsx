import type { Route } from "./+types/security-settings";
import { useState } from "react";
import { Link } from "react-router";
import {
  Settings,
  ShieldCheck,
  Eye,
  EyeOff,
  Bell,
  Lock,
  Smartphone,
  AlertTriangle,
  Check,
  Download,
  Trash2,
  Globe,
  Users,
} from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Switch } from "~/components/ui/switch/switch";
import { usePasswordStrength } from "~/hooks/use-password-strength";
import { securitySettings } from "~/data/security-data";
import styles from "./security-settings.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Security Settings - HostelHub" },
    {
      name: "description",
      content: "Configure your account security preferences, 2FA, and privacy controls",
    },
  ];
}

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings.twoFactorEnabled);
  const [loginNotifications, setLoginNotifications] = useState(securitySettings.loginNotifications);
  const [suspiciousAlerts, setSuspiciousAlerts] = useState(securitySettings.suspiciousLoginAlerts);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(true);

  const passwordStrength = usePasswordStrength(newPassword);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword && passwordStrength.score >= 60) {
      setPasswordChanged(true);
      setShowChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordChanged(false), 5000);
    }
  };

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.greeting}>
            <Settings className={styles.headerIcon} />
            Security Settings
          </h1>
          <p className={styles.subtitle}>
            Configure your account security preferences, manage two-factor authentication, and control your privacy.
          </p>
        </div>

        {passwordChanged && (
          <div className={styles.successBanner}>
            <Check className={styles.successIcon} />
            Password has been changed successfully.
          </div>
        )}

        {/* Two-Factor Authentication */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Two-Factor Authentication (2FA)</h2>
          <p className={styles.sectionDescription}>
            Add an extra layer of security to your account. When enabled, you will need to enter a verification code
            in addition to your password when signing in.
          </p>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Enable 2FA</p>
              <p className={styles.settingDescription}>
                Require a 6-digit verification code on every login
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Authentication Method</p>
              <p className={styles.settingDescription}>
                Choose how you receive verification codes
              </p>
            </div>
            <div className={styles.settingAction}>
              <Button variant="outline" size="sm">
                <Smartphone style={{ width: 14, height: 14 }} />
                SMS/Email
              </Button>
            </div>
          </div>
        </div>

        {/* Password Management */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Password Management</h2>
          <p className={styles.sectionDescription}>
            Keep your account secure by using a strong, unique password. We recommend changing your password every 90 days.
          </p>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Current Password</p>
              <p className={styles.settingDescription}>
                Last changed {Math.floor((Date.now() - new Date(securitySettings.passwordLastChanged).getTime()) / 86400000)} days ago
              </p>
            </div>
            <div className={styles.settingAction}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChangePassword(!showChangePassword)}
              >
                <Lock style={{ width: 14, height: 14 }} />
                Change Password
              </Button>
            </div>
          </div>

          {showChangePassword && (
            <form onSubmit={handleChangePassword} className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <Label>Current Password</Label>
                <div className={styles.passwordWrapper}>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className={styles.passwordToggleIcon} />
                    ) : (
                      <Eye className={styles.passwordToggleIcon} />
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label>New Password</Label>
                <div className={styles.passwordWrapper}>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className={styles.passwordToggleIcon} />
                    ) : (
                      <Eye className={styles.passwordToggleIcon} />
                    )}
                  </button>
                </div>
                {newPassword.length > 0 && (
                  <>
                    <div className={styles.strengthBar}>
                      <div
                        className={styles.strengthFill}
                        style={{
                          width: `${passwordStrength.score}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <span className={styles.strengthLabel} style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
                {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                  <span style={{ fontSize: "var(--font-size-00)", color: "var(--color-error-11)" }}>
                    Passwords do not match
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={passwordStrength.score < 60 || newPassword !== confirmPassword}
              >
                Update Password
              </Button>
            </form>
          )}
        </div>

        {/* Notification Preferences */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Security Notifications</h2>
          <p className={styles.sectionDescription}>
            Stay informed about important security events on your account.
          </p>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Login Notifications</p>
              <p className={styles.settingDescription}>
                Receive an alert every time your account is accessed
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={loginNotifications}
                onCheckedChange={setLoginNotifications}
              />
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Suspicious Login Alerts</p>
              <p className={styles.settingDescription}>
                Get notified when a login occurs from an unrecognized device or location
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={suspiciousAlerts}
                onCheckedChange={setSuspiciousAlerts}
              />
            </div>
          </div>
        </div>

        {/* Privacy Controls */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Privacy Controls</h2>
          <p className={styles.sectionDescription}>
            Control who can see your personal information and profile details.
          </p>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Profile Visibility</p>
              <p className={styles.settingDescription}>
                Allow other residents to see your profile in the directory
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={profileVisibility}
                onCheckedChange={setProfileVisibility}
              />
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Show Email Address</p>
              <p className={styles.settingDescription}>
                Display your email on your public profile
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={showEmail}
                onCheckedChange={setShowEmail}
              />
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <p className={styles.settingLabel}>Show Phone Number</p>
              <p className={styles.settingDescription}>
                Display your phone number on your public profile
              </p>
            </div>
            <div className={styles.settingAction}>
              <Switch
                checked={showPhone}
                onCheckedChange={setShowPhone}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.dangerSection}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <p className={styles.dangerDescription}>
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className={styles.dangerActions}>
            <Button variant="outline" size="sm">
              <Download style={{ width: 14, height: 14 }} />
              Export My Data
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 style={{ width: 14, height: 14 }} />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
