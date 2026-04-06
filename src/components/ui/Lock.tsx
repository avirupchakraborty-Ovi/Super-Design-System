import { IconLockFilled } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type LockSize = "sm" | "xs";
export type LockColour = "blue" | "purple";

export interface LockProps {
  /** Size variant — sm: 36px tall, xs: 24px tall */
  size?: LockSize;
  /** Colour — blue for primary plan gating, purple for Pro plan gating */
  colour?: LockColour;
  /** Label text shown next to the lock icon */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// Colours via inline style referencing :root CSS variables.
// Typography: text-body = 14px/21px, text-supporting = 12px/18px (both from @theme inline).
const sizeStyles: Record<LockSize, { className: string; iconSize: "sm" | "md" }> = {
  sm: { className: "text-body font-medium px-200 py-50 gap-25", iconSize: "md" },
  xs: { className: "text-supporting font-medium px-150 py-50 gap-25", iconSize: "sm" },
};

const colourStyles: Record<LockColour, { background: string; color: string }> = {
  blue: {
    // --surface-brand-primary-subtle: #e8f1ff
    background: "var(--surface-brand-primary-subtle)",
    // --text-brand-primary: #156ae8
    color: "var(--text-brand-primary)",
  },
  purple: {
    // --surface-brand-secondary-subtle: #f1e6ff
    background: "var(--surface-brand-secondary-subtle)",
    // --text-brand-secondary: #7300fa
    color: "var(--text-brand-secondary)",
  },
};

export function Lock({
  size = "sm",
  colour = "blue",
  label = "Unlock",
  className,
}: LockProps) {
  const { background, color } = colourStyles[colour];
  const { className: sizeClass, iconSize } = sizeStyles[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full",
        sizeClass,
        className,
      )}
      style={{ background, color }}
    >
      {/* sm uses md icon (20px) which needs an extra 1px optical nudge up beyond Icon's built-in -translate-y-px */}
      <span className={size === "sm" ? "-translate-y-px inline-flex" : "inline-flex"}>
        <Icon icon={IconLockFilled} size={iconSize} filled color={color} />
      </span>
      {label}
    </span>
  );
}
