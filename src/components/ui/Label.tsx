import { IconInfoCircle } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export interface LabelProps {
  /** Label text */
  label?: string;
  /** Show mandatory asterisk (*) */
  mandatory?: boolean;
  /** Show tooltip icon */
  tooltip?: boolean;
  /** Click handler for the tooltip icon */
  onTooltipClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function Label({
  label = "Label",
  mandatory = false,
  tooltip = false,
  onTooltipClick,
  className,
}: LabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-50", className)}>
      <span className="text-body font-medium text-text-level1">{label}</span>
      {mandatory && (
        <span className="text-body font-normal text-text-critical-3">*</span>
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
