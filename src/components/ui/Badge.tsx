import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeColour = "neutral" | "critical" | "warning" | "success" | "primary";
export type BadgeFill = "light" | "dark" | "no-fill";
export type BadgeType = "full-rounded" | "semi-rounded";

export interface BadgeProps {
  /** The text content of the badge */
  children: ReactNode;
  /** Semantic color of the badge */
  colour?: BadgeColour;
  /** Background fill style */
  fill?: BadgeFill;
  /** Corner rounding — pill or rectangular */
  type?: BadgeType;
  /** Show border — rendered as inset ring to match Figma's INSIDE stroke (no layout impact) */
  border?: boolean;
  /** Show drop shadow */
  shadow?: boolean;
  /** Optional leading icon */
  leadingIcon?: ReactNode;
  /** Optional trailing icon */
  trailingIcon?: ReactNode;
  /** Show the leading icon (requires leadingIcon to be set) */
  showLeadingIcon?: boolean;
  /** Show the trailing icon (requires trailingIcon to be set) */
  showTrailingIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const fillStyles: Record<BadgeFill, Record<BadgeColour, string>> = {
  light: {
    neutral: "bg-surface-level2 text-text-level2",
    critical: "bg-surface-critical-1 text-text-critical-1",
    warning: "bg-surface-warning-1 text-text-warning-1",
    success: "bg-surface-success-1 text-text-success-1",
    primary: "bg-surface-brand-primary-subtle text-text-brand-primary-subtle",
  },
  dark: {
    neutral: "bg-gray-300 text-text-inverted",
    critical: "bg-critical-500 text-text-inverted",
    warning: "bg-warning-600 text-text-inverted",
    success: "bg-success-700 text-text-inverted",
    primary: "bg-brand-primary-600 text-text-inverted",
  },
  "no-fill": {
    neutral: "bg-transparent text-text-level2",
    critical: "bg-transparent text-text-critical-1",
    warning: "bg-transparent text-text-warning-1",
    success: "bg-transparent text-text-success-1",
    primary: "bg-transparent text-text-brand-primary-subtle",
  },
};

// Uses ring-inset (inset box-shadow) to match Figma's strokeAlign: INSIDE —
// unlike CSS `border`, this does not add to the element's height/width.
const borderStyles: Record<BadgeColour, string> = {
  neutral: "ring-border-color-level3",
  critical: "ring-border-color-critical",
  warning: "ring-border-color-warning",
  success: "ring-border-color-success",
  primary: "ring-border-color-primary",
};

export function Badge({
  children,
  colour = "neutral",
  fill = "light",
  type = "full-rounded",
  border = true,
  shadow = false,
  leadingIcon,
  trailingIcon,
  showLeadingIcon = true,
  showTrailingIcon = true,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles — text-supporting = 12px / 18px / 0.02em letter-spacing
        "inline-flex items-center gap-50 px-100 py-50 text-supporting font-semibold",
        // Border radius
        type === "full-rounded" ? "rounded-full" : "rounded-050",
        // Fill + colour
        fillStyles[fill][colour],
        // Border — ring-1 ring-inset = inset 1px box-shadow, matches Figma INSIDE stroke
        border && ["ring-1 ring-inset", borderStyles[colour]],
        // Shadow — matches Figma: 0 2px 8px rgba(0,0,0,0.12)
        shadow && "[box-shadow:var(--shadow-badge)]",
        className,
      )}
    >
      {/* translate-y-px nudges icons 1px down to optically align with Hind Madurai's
          visual cap height, which sits lower in the CSS line box than Figma's
          textAlignVertical:TOP rendering due to Devanagari-extended ascender metrics */}
      {showLeadingIcon && leadingIcon}
      {children}
      {showTrailingIcon && trailingIcon}
    </span>
  );
}
