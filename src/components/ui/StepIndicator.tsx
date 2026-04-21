import { cn } from "@/lib/cn";

export interface StepIndicatorProps {
  /** Current active step — 1-indexed */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  className?: string;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  className,
}: StepIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-150", className)}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {/* Dot row — filled for completed/current, unfilled for remaining */}
      {/* SP8 exception — 6×6px dot; w-75/h-75 resolve to 300px on Tailwind's default scale */}
      <div className="flex items-center gap-50">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={cn(
              "inline-block shrink-0 rounded-500",
              i < currentStep ? "bg-surface-inverted" : "bg-surface-level4",
            )}
            style={{ width: 6, height: 6 }}
          />
        ))}
      </div>
      <span className="text-supporting font-medium text-text-level3">
        Step {currentStep}
      </span>
    </div>
  );
}
