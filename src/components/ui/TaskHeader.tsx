import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { IconX } from "@tabler/icons-react";

type TablerIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }>;

export interface TaskHeaderSecondaryAction {
  label: string;
  icon?: TablerIcon;
  onClick: () => void;
}

export interface TaskHeaderProps {
  /** Task/form title displayed in the header */
  title: string;
  /** Called when the close (×) button is pressed — required, every task flow needs an exit */
  onClose: () => void;
  /** Current active step — 1-indexed. Provide together with totalSteps for multi-step flows */
  currentStep?: number;
  /** Total number of steps. StepIndicator is shown only when totalSteps > 1 */
  totalSteps?: number;
  /**
   * Optional secondary action rendered on the right side.
   * Permitted ONLY for proportional-split layout screens (LAYOUT.md R13).
   * MUST NOT be passed for aside-panel, centered, or full-stretch layouts.
   */
  secondaryAction?: TaskHeaderSecondaryAction;
  className?: string;
}

export function TaskHeader({
  title,
  onClose,
  currentStep,
  totalSteps,
  secondaryAction,
  className,
}: TaskHeaderProps) {
  const showStepIndicator = typeof totalSteps === "number" && totalSteps > 1;

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "bg-surface-level1 border-b border-border-color-level2",
        "pl-125 pr-200 gap-200",
        // R15: safe area inset — additive to standard padding
        "pt-[env(safe-area-inset-top)]",
        className,
      )}
      style={{ height: "var(--layout-task-header-height)" }}
    >
      {/* Left: close button + divider + title */}
      <div className="flex items-center gap-100 flex-1 min-w-0">
        <IconButton
          icon={IconX}
          size="inline"
          variant="ghost"
          aria-label="Close"
          onClick={onClose}
        />
        {/* Vertical divider */}
        <span
          className="shrink-0 bg-border-color-level2"
          style={{ width: 1, height: 20 }}
        />
        <span className="text-body font-medium text-text-level1 truncate">
          {title}
        </span>
      </div>

      {/* Right: step indicator (multi-step only) + optional secondary action */}
      {(showStepIndicator || secondaryAction) && (
        <div className="flex items-center gap-100 shrink-0">
          {showStepIndicator && (
            <StepIndicator
              currentStep={currentStep ?? 1}
              totalSteps={totalSteps!}
            />
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size="xs"
              trailingIcon={secondaryAction.icon}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
