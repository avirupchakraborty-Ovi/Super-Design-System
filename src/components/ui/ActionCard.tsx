"use client";

import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
>;

export interface ActionCardProps {
  /** Tabler icon displayed inside the circular icon container */
  icon: TablerIcon;
  /** Tailwind text-color token class for the icon — e.g. "text-text-brand-primary" */
  iconClassName?: string;
  /** Card label */
  label: string;
  /** Show card shadow — defaults to true */
  shadow?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({
  icon,
  iconClassName = "text-text-brand-primary",
  label,
  shadow = true,
  onClick,
  className,
}: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-200 w-full min-w-[212px]",
        "p-200 rounded-150",
        "bg-surface-level1 border border-border-color-level2",
        shadow && "[box-shadow:var(--shadow-pill-tab)]",
        "hover:bg-surface-level1-hover cursor-pointer transition-colors",
        className,
      )}
    >
      {/* Icon circle */}
      <span
        className={cn(
          "w-500 h-500 min-w-500 min-h-500 rounded-500 shrink-0",
          "flex items-center justify-center",
          "bg-surface-level1 [box-shadow:var(--shadow-badge)]",
        )}
      >
        <Icon icon={icon} size="md" noOffset className={iconClassName} />
      </span>

      {/* Label */}
      <span className="text-body font-semibold text-text-level1 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
