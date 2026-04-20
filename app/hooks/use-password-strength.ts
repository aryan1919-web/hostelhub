import { useMemo } from "react";

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password),
    };

    const passed = Object.values(checks).filter(Boolean).length;
    let score = 0;
    let label = "";
    let color = "";

    if (password.length === 0) {
      return { score: 0, label: "", color: "", checks };
    }

    score = (passed / 5) * 100;

    if (score <= 20) {
      label = "Very Weak";
      color = "var(--color-error-9)";
    } else if (score <= 40) {
      label = "Weak";
      color = "var(--color-error-9)";
    } else if (score <= 60) {
      label = "Fair";
      color = "var(--color-warning-9)";
    } else if (score <= 80) {
      label = "Good";
      color = "var(--color-accent-9)";
    } else {
      label = "Strong";
      color = "var(--color-success-9)";
    }

    return { score, label, color, checks };
  }, [password]);
}
