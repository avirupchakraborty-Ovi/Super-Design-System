"use client";

import { type ComponentType, type SVGProps } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/IconButton";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
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

const MAX_VISIBLE = 3;

export function TableActionGroup({ actions, className }: TableActionGroupProps) {
  const hasOverflow = actions.length > MAX_VISIBLE;
  const visibleActions = hasOverflow ? actions.slice(0, 2) : actions;
  const overflowActions = hasOverflow ? actions.slice(2) : [];

  return (
    <div className={cn("flex items-center gap-[8px]", className)}>
      {visibleActions.map((action) => (
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

      {hasOverflow && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              icon={IconDotsVertical}
              variant="ghost"
              size="sm"
              aria-label="More actions"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent width={200} align="end">
            {overflowActions.map((action) => (
              <DropdownMenuItem
                key={action.label}
                icon={action.icon}
                onSelect={action.onClick}
              >
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
