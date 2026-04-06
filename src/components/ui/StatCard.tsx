"use client";

import { IconInfoCircle, IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export type StatTrend = "up" | "down" | "neutral";

const trendConfig: Record<StatTrend, { textClass: string; icon: typeof IconArrowUpRight | null; circleBg: string | null }> = {
  up:      { textClass: "text-text-success-1",  icon: IconArrowUpRight,  circleBg: "bg-surface-success-1"  },
  down:    { textClass: "text-text-critical-3", icon: IconArrowDownRight, circleBg: "bg-surface-critical-1" },
  neutral: { textClass: "text-text-level3",     icon: null,              circleBg: null                    },
};

export interface StatCardProps {
  /** Metric label displayed above the value */
  heading?: string;
  /** Formatted metric value — e.g. "12,345" */
  value?: string;
  /**
   * Delta string — first word is colored in trend color, remainder is muted.
   * E.g. "245 in last 7 days"
   */
  delta?: string;
  /** Controls arrow direction and delta color */
  trend?: StatTrend;
  /** Show the heading row */
  showHeading?: boolean;
  /** Show the info icon next to the heading */
  showInfo?: boolean;
  /** Show the delta row */
  showDelta?: boolean;
  className?: string;
}

export function StatCard({
  heading = "Metric label",
  value = "10,000",
  delta = "245 in last 7 days",
  trend = "up",
  showHeading = true,
  showInfo = true,
  showDelta = true,
  className,
}: StatCardProps) {
  const { textClass, icon: TrendIcon, circleBg } = trendConfig[trend];
  const [deltaNum, ...deltaRest] = delta.split(" ");

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-50 w-full rounded-100 p-200 bg-surface-level1",
        "border border-border-color-level2",
        "[box-shadow:var(--shadow-chart)]",
        className,
      )}
    >
      {/* Heading + info icon */}
      {showHeading && (
        <div className="flex items-center gap-50">
          <span className="text-supporting font-medium text-text-level1 uppercase">{heading}</span>
          {showInfo && <IconInfoCircle size={14} strokeWidth={1.5} className="text-text-level3 shrink-0" />}
        </div>
      )}

      {/* Value */}
      <span className="text-h1 font-semibold text-text-level1">{value}</span>

      {/* Delta row */}
      {showDelta && (
        <div className="flex items-center gap-50">
          {TrendIcon && circleBg && (
            <span className={cn(
              "w-175 h-175 min-w-175 min-h-175 rounded-500 shrink-0",
              "flex items-center justify-center",
              circleBg,
            )}>
              <TrendIcon size={10} strokeWidth={2.5} className={textClass} />
            </span>
          )}
          <span className={cn("text-supporting font-medium", textClass)}>
            {deltaNum}
          </span>
          <span className="text-supporting font-normal text-text-level3">
            {deltaRest.join(" ")}
          </span>
        </div>
      )}
    </div>
  );
}
