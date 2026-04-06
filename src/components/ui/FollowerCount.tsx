"use client";

import { IconInfoCircle, IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export type FollowerCountState = "zero" | "na" | "positive";

export interface FollowerCountProps {
  state?: FollowerCountState;
  /** Follower count — used when state is "zero" or "positive" */
  count?: number;
  className?: string;
}

export function FollowerCount({
  state = "zero",
  count = 0,
  className,
}: FollowerCountProps) {
  const base =
    "inline-flex items-center rounded-500 bg-surface-level2 border border-border-color-level2 text-body text-text-level1";

  if (state === "na") {
    return (
      <div className={cn(base, "gap-[4px] px-[8px] py-[2px] pr-[2px]", className)}>
        <span className="font-medium">N/A</span>
        <IconInfoCircle size={20} strokeWidth={1.5} className="text-text-level3" />
      </div>
    );
  }

  if (state === "positive") {
    return (
      <div className={cn(base, "gap-[4px] px-[8px] py-[2px] pr-[2px]", className)}>
        <span>🔥</span>
        <span className="font-medium">{count}</span>
        <div className="w-[18px] h-[18px] rounded-500 bg-surface-level2 flex items-center justify-center">
          <IconArrowUpRight size={12} strokeWidth={2} className="text-text-level2" />
        </div>
      </div>
    );
  }

  // zero
  return (
    <div className={cn(base, "gap-[4px] px-[10px] py-[2px] pl-[8px]", className)}>
      <span>🔥</span>
      <span className="font-medium">0</span>
    </div>
  );
}
