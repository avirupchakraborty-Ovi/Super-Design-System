"use client";

import { cn } from "@/lib/cn";

export type ToggleSize = "sm" | "lg";

export interface ToggleProps {
  checked?: boolean;
  size?: ToggleSize;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
}

// ─── Figma-spec pixel dimensions ───────────────────────────────────────────────
// Small: track 30×18, knob 14×14, 2px inset all sides
// Large: track 35×20, knob 17×16, 2px inset all sides

const dims = {
  sm: { trackW: 30, trackH: 18, knobW: 14, knobH: 14, knobOn: 14 },
  lg: { trackW: 35, trackH: 20, knobW: 17, knobH: 16, knobOn: 16 },
};

export function Toggle({
  checked = false,
  size = "sm",
  disabled = false,
  onChange,
  id,
  className,
}: ToggleProps) {
  const { trackW, trackH, knobW, knobH, knobOn } = dims[size];

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        width: trackW,
        height: trackH,
        borderRadius: 9999,
        backgroundColor: checked
          ? "var(--color-surface-success-3)"
          : "var(--color-surface-level3)",
        transition: "background-color 200ms ease",
        flexShrink: 0,
        position: "relative",
        display: "inline-flex",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-color-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        style={{
          position: "absolute",
          width: knobW,
          height: knobH,
          top: 2,
          left: checked ? knobOn : 2,
          borderRadius: 9999,
          backgroundColor: "var(--color-surface-level1)",
          boxShadow: "var(--shadow-toggle)",
          transition: "left 200ms ease",
        }}
      />
    </button>
  );
}
