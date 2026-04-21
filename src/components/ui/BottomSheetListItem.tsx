"use client";

import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface BottomSheetListItemProps {
  /** Leading Tabler icon — rendered via Icon size="md" (20px frame) */
  icon: TablerIcon;
  /** Primary row label */
  label: string;
  /** Descriptive sentence below the label — wraps freely, no truncation */
  subText: string;
  /** Activates selected state: brand-primary surface + border */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function BottomSheetListItem({
  icon,
  label,
  subText,
  selected = false,
  onClick,
  className,
}: BottomSheetListItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-100 px-100 py-125 rounded-100 cursor-pointer",
        selected
          ? "bg-surface-brand-primary-subtle border border-border-color-primary"
          : "bg-surface-level1 hover:bg-surface-level2",
        className,
      )}
    >
      {/* Leading icon */}
      <span
        className="inline-flex shrink-0 items-center justify-center mt-px"
        style={{ width: 20, height: 20 }}
      >
        <Icon icon={icon} size="md" noOffset className="text-text-level2" />
      </span>

      {/* Text content */}
      <div className="flex flex-col flex-1 min-w-0 gap-50">
        <span className="text-body font-medium text-text-level1">{label}</span>
        <span className="text-body font-normal text-text-level2">{subText}</span>
      </div>
    </div>
  );
}
