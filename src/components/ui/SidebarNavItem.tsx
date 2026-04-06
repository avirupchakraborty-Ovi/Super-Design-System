"use client";

import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
>;

export interface SidebarNavItemProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SidebarNavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
  className,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-150 w-full h-500 px-200 rounded-500 cursor-pointer",
        active
          ? "bg-surface-nav-active"
          : "hover:bg-surface-nav-hover",
        className,
      )}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        className={cn("shrink-0", active ? "text-text-inverted" : "text-text-level5")}
      />
      <span
        className={cn(
          "text-body",
          active
            ? "font-semibold text-text-inverted"
            : "font-normal text-text-level5",
        )}
      >
        {label}
      </span>
    </button>
  );
}
