"use client";

import { type ComponentType, type SVGProps } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/cn";

type TablerIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }>;

export interface TableAction {
  icon: TablerIcon;
  onClick?: () => void;
  label: string;
}

export interface TableActionGroupProps {
  actions: TableAction[];
  className?: string;
}

export function TableActionGroup({ actions, className }: TableActionGroupProps) {
  return (
    <div className={cn("flex items-center gap-[8px]", className)}>
      {actions.map((action) => (
        <Tooltip
          key={action.label}
          body={action.label}
          size="label"
          tipSide="top"
          tipAlign="center"
          delayDuration={300}
        >
          <IconButton
            icon={action.icon}
            variant="ghost"
            size="sm"
            onClick={action.onClick}
            aria-label={action.label}
          />
        </Tooltip>
      ))}
    </div>
  );
}
