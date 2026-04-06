import { cn } from "@/lib/cn";
import { ChartCard, type ChartCardProps } from "@/components/ui/ChartCard";
import { ChartFullWidth, type ChartFullWidthProps } from "@/components/ui/ChartFullWidth";

export interface ChartComparisonProps {
  card: ChartCardProps;
  chart: ChartFullWidthProps;
  className?: string;
}

export function ChartComparison({ card, chart, className }: ChartComparisonProps) {
  return (
    <div className={cn("flex items-start gap-200 w-full", className)}>
      <div className="w-[280px] shrink-0">
        <ChartCard {...card} />
      </div>
      <div className="flex-1 min-w-0">
        <ChartFullWidth {...chart} />
      </div>
    </div>
  );
}
