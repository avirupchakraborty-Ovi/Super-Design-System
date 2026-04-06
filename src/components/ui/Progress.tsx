"use client";

import { cn } from "@/lib/cn";

export interface ProgressProps {
  /** Value from 0 to 100 */
  value: number;
  /** Show the label above the bar (e.g. "50% completed") */
  showLabel?: boolean;
  className?: string;
}

export function Progress({ value, showLabel = true, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const isComplete = clamped === 100;

  return (
    <div className={cn("flex flex-col gap-[4px]", className)}>
      {showLabel && (
        <span className="text-body text-text-level1">
          {clamped}% completed
        </span>
      )}
      {/* Track */}
      <div className="relative w-full h-[4px] rounded-150 bg-surface-level2">
        {/* Fill */}
        {clamped > 0 && (
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-150 transition-all",
              isComplete ? "bg-success-600" : "bg-surface-brand-primary",
            )}
            style={{ width: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  );
}
