"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { IconInfoCircle, IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export type ChartType =
  | "no-data"
  | "uptrend"
  | "downtrend"
  | "neutral-up"
  | "neutral-down";

const CHART_CFG: Record<
  ChartType,
  { line: string; fill: string; deltaClass: string | null; arrowUp: boolean | null }
> = {
  "no-data":      { line: "var(--color-success-600)", fill: "var(--color-success-600)",        deltaClass: null,                    arrowUp: null  },
  "uptrend":      { line: "var(--color-success-600)", fill: "var(--color-chart-uptrend-fill)", deltaClass: "text-text-success-1",   arrowUp: true  },
  "downtrend":    { line: "var(--color-critical-500)", fill: "var(--color-critical-500)",      deltaClass: "text-text-critical-3",  arrowUp: false },
  "neutral-up":   { line: "var(--color-chart-neutral)", fill: "var(--color-chart-neutral)",    deltaClass: "text-text-success-1",   arrowUp: true  },
  "neutral-down": { line: "var(--color-chart-neutral)", fill: "var(--color-chart-neutral)",    deltaClass: "text-text-critical-3",  arrowUp: false },
};

export interface ChartDataPoint {
  v: number;
}

const DEFAULT_DATA: ChartDataPoint[] = [
  { v: 20 }, { v: 45 }, { v: 35 }, { v: 65 }, { v: 50 },
  { v: 80 }, { v: 60 }, { v: 85 }, { v: 55 }, { v: 90 },
];

export interface ChartCardProps {
  heading?: string;
  value?: string;
  /** First word is highlighted in trend color, remainder is muted. E.g. "245 in last 7 days" */
  delta?: string;
  type?: ChartType;
  showHeading?: boolean;
  showDelta?: boolean;
  data?: ChartDataPoint[];
  className?: string;
}

export function ChartCard({
  heading = "Chart heading",
  value = "10,000",
  delta = "245 in last 7 days",
  type = "uptrend",
  showHeading = true,
  showDelta = true,
  data = DEFAULT_DATA,
  className,
}: ChartCardProps) {
  const cfg = CHART_CFG[type];
  const { deltaClass } = cfg;
  const isNoData = type === "no-data";
  const gradientId = `chart-card-grad-${type}`;
  const [deltaNum, ...deltaRest] = delta.split(" ");

  return (
    <div
      className={cn(
        "flex flex-col gap-200 w-full rounded-100 p-200 bg-surface-level1",
        "border border-border-color-level2",
        "[box-shadow:var(--shadow-chart)]",
        className,
      )}
    >
      {/* Top section: heading → value → delta (gap-50 between heading and value+delta group, 0 between value and delta) */}
      <div className="flex flex-col gap-50">
        {/* Heading + info icon */}
        {showHeading && (
          <div className="flex items-center gap-50">
            <span className="text-supporting font-medium text-text-level3">{heading}</span>
            <IconInfoCircle size={14} strokeWidth={1.5} className="text-text-level3 shrink-0" />
          </div>
        )}

        {/* Value + delta grouped with no gap between them */}
        <div className="flex flex-col">
          <span className="text-h1 font-semibold text-text-level1">{value}</span>

          {/* Delta / trend row */}
          {showDelta && !isNoData && deltaClass !== null && (
            <div className="flex items-center gap-50">
              {cfg.arrowUp
                ? <IconArrowUpRight size={14} strokeWidth={2} className={cn("shrink-0", deltaClass)} />
                : <IconArrowDownRight size={14} strokeWidth={2} className={cn("shrink-0", deltaClass)} />
              }
              <span className={cn("text-supporting font-medium", deltaClass)}>
                {deltaNum}
              </span>
              <span className="text-supporting font-normal text-text-level3">
                {deltaRest.join(" ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sparkline chart — 16px below top section via gap-200 on parent */}
      <div className="h-[60px] w-full">
        {isNoData ? (
          <div className="h-full flex items-end">
            <div className="w-full h-px" style={{ backgroundColor: cfg.line }} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={cfg.fill} stopOpacity={1} />
                  <stop offset="100%" stopColor={cfg.fill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={cfg.line}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
