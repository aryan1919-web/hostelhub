import type { Route } from "./+types/login";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Home,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Check,
  X,
  AlertTriangle,
  Fingerprint,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs/tabs";
import { Checkbox } from "~/components/ui/checkbox/checkbox";
import { usePasswordStrength } from "~/hooks/use-password-strength";
import styles from "./login.module.css";

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 30000;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Secure Login - HostelHub" },
    {
      name: "description",
      content: "Securely login to your HostelHub account with 2FA protection",
    },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [show2FA, setShow2FA] = useState(false);
  const [otpValues, setOtpValues] = useState(["" , "", "", "", "", ""]);
  const [pendingRole, setPendingRole] = useState<"student" | "warden">("student");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const passwordStrength = usePasswordStrength(password);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length > 1) return;
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }, [otpValues]);

  const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }, [otpValues]);

  const handleLoginAttempt = (role: "student" | "warden") => {
    if (isLocked) return;
    if (!captchaVerified) return;

    // Simulate credential validation
    const validEmail = role === "student" ? "student@demo.com" : "warden@demo.com";
    const validPassword = "demo123";

    if (email === validEmail && password === validPassword) {
      setPendingRole(role);
      setShow2FA(true);
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_DURATION_MS);
        setTimeout(() => {
          setLockedUntil(null);
          setFailedAttempts(0);
        }, LOCKOUT_DURATION_MS);
      }
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAttempt("student");
  };

  const handleWardenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAttempt("warden");
  };

  const handleVerify2FA = () => {
    const code = otpValues.join("");
    if (code.length === 6) {
      navigate(pendingRole === "student" ? "/student/dashboard" : "/warden/dashboard");
    }
  };

  const handleResendOtp = () => {
    setOtpValues(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
  };

  const renderLoginForm = (role: "student" | "warden", onSubmit: (e: React.FormEvent) => void) => (
    <>
      <div className={styles.demoInfo}>
        <p className={styles.demoTitle}>Demo Credentials:</p>
        <div className={styles.demoCredentials}>
          <div>
            Email: <code>{role === "student" ? "student@demo.com" : "warden@demo.com"}</code>
          </div>
          <div>
            Password: <code>demo123</code>
          </div>
        </div>
      </div>

      {isLocked && (
        <div className={styles.lockoutBanner}>
          <AlertTriangle className={styles.lockoutIcon} />
          <div className={styles.lockoutText}>
            <p className={styles.lockoutTitle}>Account Temporarily Locked</p>
            <p className={styles.lockoutDescription}>
              Too many failed attempts. Please wait 30 seconds before trying again.
            </p>
          </div>
        </div>
      )}

      {failedAttempts > 0 && failedAttempts < MAX_FAILED_ATTEMPTS && !isLocked && (
        <div className={styles.lockoutBanner}>
          <AlertTriangle className={styles.lockoutIcon} />
          <div className={styles.lockoutText}>
            <p className={styles.lockoutTitle}>Invalid Credentials</p>
            <p className={styles.lockoutDescription}>
              {MAX_FAILED_ATTEMPTS - failedAttempts} attempt(s) remaining before account lockout.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Label htmlFor={`${role}-email`} className={styles.label}>
            Email Address
          </Label>
          <Input
            id={`${role}-email`}
            type="email"
            placeholder={role === "student" ? "your.email@student.edu" : "warden@hostel.edu"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={isLocked}
          />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor={`${role}-password`} className={styles.label}>
            Password
          </Label>
          <div className={styles.passwordWrapper}>
            <Input
              id={`${role}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLocked}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className={styles.passwordToggleIcon} />
              ) : (
                <Eye className={styles.passwordToggleIcon} />
              )}
            </button>
          </div>

          {password.length > 0 && (
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthFill}
                  style={{
                    width: `${passwordStrength.score}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <div className={styles.strengthLabel}>
                <span style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                <span style={{ color: "var(--color-neutral-10)", fontWeight: 400 }}>
                  {Math.round(passwordStrength.score)}%
                </span>
              </div>
              <div className={styles.strengthChecks}>
                <span
                  className={styles.strengthCheck}
                  data-passed={passwordStrength.checks.length}
                >
                  {passwordStrength.checks.length ? (
                    <Check className={styles.strengthCheckIcon} />
                  ) : (
                    <X className={styles.strengthCheckIcon} />
                  )}
                  8+ characters
                </span>
                <span
                  className={styles.strengthCheck}
                  data-passed={passwordStrength.checks.uppercase}
                >
                  {passwordStrength.checks.uppercase ? (
                    <Check className={styles.strengthCheckIcon} />
                  ) : (
                    <X className={styles.strengthCheckIcon} />
                  )}
                  Uppercase
                </span>
                <span
                  className={styles.strengthCheck}
                  data-passed={passwordStrength.checks.lowercase}
                >
                  {passwordStrength.checks.lowercase ? (
                    <Check className={styles.strengthCheckIcon} />
                  ) : (
                    <X className={styles.strengthCheckIcon} />
                  )}
                  Lowercase
                </span>
                <span
                  className={styles.strengthCheck}
                  data-passed={passwordStrength.checks.number}
                >
                  {passwordStrength.checks.number ? (
                    <Check className={styles.strengthCheckIcon} />
                  ) : (
                    <X className={styles.strengthCheckIcon} />
                  )}
                  Number
                </span>
                <span
                  className={styles.strengthCheck}
                  data-passed={passwordStrength.checks.special}
                >
                  {passwordStrength.checks.special ? (
                    <Check className={styles.strengthCheckIcon} />
                  ) : (
                    <X className={styles.strengthCheckIcon} />
                  )}
                  Special char
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CAPTCHA */}
        <div
          className={styles.captchaBox}
          onClick={() => setCaptchaVerified(!captchaVerified)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setCaptchaVerified(!captchaVerified)}
        >
          <div className={styles.captchaCheckbox} data-checked={captchaVerified}>
            {captchaVerified && <Check className={styles.captchaCheckboxIcon} />}
          </div>
          <div className={styles.captchaText}>
            <p className={styles.captchaLabel}>I&apos;m not a robot</p>
            <p className={styles.captchaSubtext}>reCAPTCHA verification</p>
          </div>
          <Shield className={styles.captchaShield} />
        </div>

        {/* Options Row */}
        <div className={styles.formOptions}>
          <label className={styles.rememberDevice}>
            <Checkbox
              checked={rememberDevice}
              onCheckedChange={(v) => setRememberDevice(v === true)}
            />
            Remember this device
          </label>
          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" disabled={isLocked || !captchaVerified}>
          <Lock style={{ width: 16, height: 16 }} />
          Secure Sign In
        </Button>
      </form>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Home className={styles.logoIcon} />
            <span className={styles.logoText}>HostelHub</span>
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your secure account</p>
          <div className={styles.securityBadge}>
            <ShieldCheck className={styles.securityBadgeIcon} />
            256-bit SSL Encrypted
          </div>
        </div>

        <Tabs defaultValue="student" className={styles.tabs}>
          <TabsList>
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="warden">Warden/Owner</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            {renderLoginForm("student", handleStudentLogin)}
          </TabsContent>

          <TabsContent value="warden">
            {renderLoginForm("warden", handleWardenLogin)}
          </TabsContent>
        </Tabs>

        <div className={styles.securityFeatures}>
          <span className={styles.securityFeature}>
            <ShieldCheck className={styles.securityFeatureIcon} />
            2FA Enabled
          </span>
          <span className={styles.securityFeature}>
            <Lock className={styles.securityFeatureIcon} />
            Encrypted
          </span>
          <span className={styles.securityFeature}>
            <Fingerprint className={styles.securityFeatureIcon} />
            Biometric Ready
          </span>
        </div>

        <div className={styles.footer}>
          Don&apos;t have an account?{" "}
          <a href="#" className={styles.footerLink}>
            Contact your hostel administration
          </a>
        </div>
      </div>

      {/* 2FA OTP Modal */}
      {show2FA && (
        <div className={styles.otpOverlay}>
          <div className={styles.otpCard}>
            <KeyRound className={styles.otpIcon} />
            <h2 className={styles.otpTitle}>Two-Factor Authentication</h2>
            <p className={styles.otpSubtitle}>
              Enter the 6-digit code sent to your registered email/phone for verification.
            </p>
            <div className={styles.otpInputGroup}>
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={styles.otpInput}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <div className={styles.otpActions}>
              <Button size="lg" onClick={handleVerify2FA} disabled={otpValues.join("").length < 6}>
                <ShieldCheck style={{ width: 16, height: 16 }} />
                Verify & Sign In
              </Button>
              <p className={styles.otpResend}>
                Didn&apos;t receive code?{" "}
                <button className={styles.otpResendLink} onClick={handleResendOtp} type="button">
                  Resend Code
                </button>
              </p>
              <Button variant="outline" size="sm" onClick={() => setShow2FA(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
