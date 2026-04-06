"use client";

import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import {
  IconInfoCircle,
  IconArrowUpRight,
  IconArrowDownRight,
  IconChevronDown,
  IconShare2,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import type { ChartType } from "@/components/ui/ChartCard";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

const CHART_CFG: Record<
  ChartType,
  { line: string; fill: string; deltaColor: string | null; arrowUp: boolean | null }
> = {
  "no-data":      { line: "var(--color-success-600)", fill: "var(--color-success-600)",        deltaColor: null,                          arrowUp: null  },
  "uptrend":      { line: "var(--color-success-600)", fill: "var(--color-chart-uptrend-fill)", deltaColor: "var(--color-success-700)",    arrowUp: true  },
  "downtrend":    { line: "var(--color-critical-500)", fill: "var(--color-critical-500)",      deltaColor: "var(--color-critical-500)",   arrowUp: false },
  "neutral-up":   { line: "var(--color-chart-neutral)", fill: "var(--color-chart-neutral)",    deltaColor: "var(--color-success-700)",    arrowUp: true  },
  "neutral-down": { line: "var(--color-chart-neutral)", fill: "var(--color-chart-neutral)",    deltaColor: "var(--color-critical-500)",   arrowUp: false },
};

export interface ChartFullWidthDataPoint {
  date: string;
  v: number;
}

const DEFAULT_DATA: ChartFullWidthDataPoint[] = [
  { date: "10 May", v: 20 },
  { date: "11 May", v: 55 },
  { date: "12 May", v: 45 },
  { date: "13 May", v: 85 },
  { date: "14 May", v: 95 },
  { date: "15 May", v: 35 },
  { date: "16 May", v: 65 },
];

const NO_DATA_FLAT: ChartFullWidthDataPoint[] = DEFAULT_DATA.map((d) => ({
  ...d,
  v: 0,
}));

export interface ChartFullWidthProps {
  heading?: string;
  value?: string;
  /** First word is highlighted in trend color, remainder is muted. E.g. "245 in last 7 days" */
  delta?: string;
  type?: ChartType;
  showHeading?: boolean;
  showDelta?: boolean;
  data?: ChartFullWidthDataPoint[];
  productFilter?: string;
  timeFilter?: string;
  onProductFilterClick?: () => void;
  onTimeFilterClick?: () => void;
  onShare?: () => void;
  className?: string;
}

export function ChartFullWidth({
  heading = "Chart heading",
  value = "10,000",
  delta = "245 in last 7 days",
  type = "uptrend",
  showHeading = true,
  showDelta = true,
  data,
  productFilter = "All Products",
  timeFilter = "Lifetime",
  onProductFilterClick,
  onTimeFilterClick,
  onShare,
  className,
}: ChartFullWidthProps) {
  const cfg = CHART_CFG[type];
  const isNoData = type === "no-data";
  const gradientId = `chart-fw-grad-${type}`;
  const chartData = data ?? (isNoData ? NO_DATA_FLAT : DEFAULT_DATA);
  const [deltaNum, ...deltaRest] = delta.split(" ");

  return (
    <div
      className={cn(
        "flex flex-col w-full rounded-300 py-250 px-300 bg-surface-level1",
        "border border-border-color-level2",
        "[box-shadow:var(--shadow-chart)]",
        className,
      )}
    >
      {/* ── Top row: heading+value | filters+share ─────────────────── */}
      <div className="flex items-start justify-between gap-200 mb-125">
        {/* Left: heading + value + delta */}
        <div className="flex flex-col gap-50">
          {showHeading && (
            <div className="flex items-center gap-50">
              <span className="text-supporting font-medium text-text-level3">{heading}</span>
              <IconInfoCircle size={14} strokeWidth={1.5} className="text-text-level3 shrink-0" />
            </div>
          )}

          {/* Value + delta — same row, aligned to bottom */}
          <div className="flex items-center gap-100">
            <span className="text-h0 font-bold text-text-level1">{value}</span>

            {/* Delta */}
            {showDelta && !isNoData && cfg.deltaColor !== null && (
              <div className="flex items-center gap-50">
                {cfg.arrowUp
                  ? <IconArrowUpRight size={14} strokeWidth={2} style={{ color: cfg.deltaColor }} className="shrink-0" />
                  : <IconArrowDownRight size={14} strokeWidth={2} style={{ color: cfg.deltaColor }} className="shrink-0" />
                }
                <span className="text-supporting font-medium" style={{ color: cfg.deltaColor }}>
                  {deltaNum}
                </span>
                <span className="text-supporting font-normal text-text-level3">
                  {deltaRest.join(" ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: filter dropdowns + share */}
        <div className="flex items-center gap-100 shrink-0">
          {/* Product filter */}
          <Button
            shape="semi-rounded"
            variant="outline"
            size="xs"
            trailingIcon={IconChevronDown}
            onClick={onProductFilterClick}
          >
            {productFilter}
          </Button>

          {/* Time filter */}
          <Button
            shape="semi-rounded"
            variant="outline"
            size="xs"
            trailingIcon={IconChevronDown}
            onClick={onTimeFilterClick}
          >
            {timeFilter}
          </Button>

          {/* Share */}
          <IconButton
            variant="outline"
            size="inline"
            icon={IconShare2}
            aria-label="Share"
            onClick={onShare}
          />
        </div>
      </div>

      {/* ── Area chart with date axis ───────────────────────────────── */}
      <div className="h-[252px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={cfg.fill} stopOpacity={isNoData ? 0 : 1} />
                <stop offset="100%" stopColor={cfg.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={(props) => {
                const { x, y, payload, index, visibleTicksCount } = props;
                const anchor =
                  index === 0 ? "start"
                  : index === visibleTicksCount - 1 ? "end"
                  : "middle";
                return (
                  <text
                    x={x}
                    y={y + 8}
                    textAnchor={anchor}
                    fontSize={12}
                    fill="#808080"
                    fontFamily="inherit"
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke={cfg.line}
              strokeWidth={isNoData ? 1 : 1.5}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
