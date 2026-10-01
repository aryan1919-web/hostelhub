import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePasswordStrength } from "./use-password-strength";

describe("usePasswordStrength", () => {
  it("returns empty state for an empty password", () => {
    const { result } = renderHook(() => usePasswordStrength(""));

    expect(result.current).toMatchObject({ score: 0, label: "", color: "" });
    expect(result.current.checks).toEqual({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    });
  });

  it("classifies a password with every requirement as strong", () => {
    const { result } = renderHook(() => usePasswordStrength("StrongPass1!"));

    expect(result.current.score).toBe(100);
    expect(result.current.label).toBe("Strong");
    expect(result.current.checks).toEqual({
      length: true,
      uppercase: true,
      lowercase: true,
      number: true,
      special: true,
    });
  });

  it("reports the intermediate fair strength boundary", () => {
    const { result } = renderHook(() => usePasswordStrength("abcdefg1"));

    expect(result.current.score).toBe(60);
    expect(result.current.label).toBe("Fair");
  });
});