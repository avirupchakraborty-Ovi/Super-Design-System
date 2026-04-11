import { IconInfoCircle } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type LabelVariant =
  | "body-regular"
  | "body-medium"
  | "supporting-medium"
  | "supporting-semibold"
  | "supporting-caps";

const variantClasses: Record<LabelVariant, string> = {
  "body-regular":        "text-body font-normal text-text-level1",
  "body-medium":         "text-body font-medium text-text-level1",
  "supporting-medium":   "text-supporting font-medium text-text-level1",
  "supporting-semibold": "text-supporting font-semibold text-text-level1",
  "supporting-caps":     "text-supporting font-medium text-text-level1 uppercase",
};

const asteriskClasses: Record<LabelVariant, string> = {
  "body-regular":        "text-body font-normal text-text-critical-3",
  "body-medium":         "text-body font-normal text-text-critical-3",
  "supporting-medium":   "text-supporting font-normal text-text-critical-3",
  "supporting-semibold": "text-supporting font-normal text-text-critical-3",
  "supporting-caps":     "text-supporting font-normal text-text-critical-3",
};

export interface LabelProps {
  /** Label text */
  label?: string;
  /** Typography variant — select based on hierarchy in surrounding context */
  variant?: LabelVariant;
  /** Show mandatory asterisk (*) */
  mandatory?: boolean;
  /** Show tooltip icon */
  tooltip?: boolean;
  /** Click handler for the tooltip icon */
  onTooltipClick?: () => void;
  /** Additional CSS classes — MUST NOT override typography */
  className?: string;
}

export function Label({
  label = "Label",
  variant = "body-medium",
  mandatory = false,
  tooltip = false,
  onTooltipClick,
  className,
}: LabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-50", className)}>
      <span className={variantClasses[variant]}>{label}</span>
      {mandatory && (
        <span className={asteriskClasses[variant]}>*</span>
      )}
      {tooltip && (
        <button
          type="button"
          onClick={onTooltipClick}
          className="inline-flex items-center text-text-level3 cursor-default"
        >
          <Icon icon={IconInfoCircle} size="md" />
        </button>
      )}
    </div>
  );
}
