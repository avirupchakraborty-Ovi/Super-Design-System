"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge, type BadgeColour } from "@/components/ui/Badge";

export type BadgeWithTextColour = BadgeColour;

export interface BadgeWithTextProps {
  /** Short label inside the badge */
  badge: string;
  /** Semantic colour of the badge — matches Badge colour prop */
  colour?: BadgeWithTextColour;
  /** Body text to the right of the badge */
  children: ReactNode;
  className?: string;
}

export function BadgeWithText({
  badge,
  colour = "success",
  children,
  className,
}: BadgeWithTextProps) {
  return (
    <div className={cn("inline-flex items-center gap-[12px]", className)}>
      <Badge colour={colour} fill="light" type="semi-rounded" shadow={false}>
        {badge}
      </Badge>
      <span className="text-body font-semibold text-text-level1">{children}</span>
    </div>
  );
}
