"use client";

import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Toggle, type ToggleSize } from "@/components/ui/Toggle";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export type TogglePosition = "start" | "end";

export interface ToggleRowProps {
  /** Whether the toggle is on */
  checked?: boolean;
  /** Toggle switch size */
  size?: ToggleSize;
  /** Disables the entire row */
  disabled?: boolean;
  /** Fires with the next checked value */
  onChange?: (checked: boolean) => void;
  /** Toggle position relative to content */
  position?: TogglePosition;
  /** Primary label */
  label: string;
  /** Optional secondary description line */
  subText?: string;
  /** Optional leading icon (left of text) */
  leadingIcon?: TablerIcon;
  /** Optional trailing icon (between text and toggle) */
  trailingIcon?: TablerIcon;
  /** Optional trailing icon (after the toggle) */
  trailingIcon2?: TablerIcon;
  /** Optional 36×36 leading image */
  image?: string;
  imageAlt?: string;
  /** Optional slot content rendered below the main row */
  slot?: ReactNode;
  className?: string;
}

export function ToggleRow({
  checked = false,
  size = "sm",
  disabled = false,
  onChange,
  position = "end",
  label,
  subText,
  leadingIcon,
  trailingIcon,
  trailingIcon2,
  image,
  imageAlt = "",
  slot,
  className,
}: ToggleRowProps) {
  const labelClass = disabled ? "text-text-level4" : "text-text-level1";
  const subTextClass = disabled ? "text-text-level4" : "text-text-level3";
  const iconClass = cn("shrink-0", disabled ? "text-text-level4" : "text-text-level2");

  const toggleEl = (
    <Toggle
      checked={checked}
      size={size}
      disabled={disabled}
      onChange={onChange}
    />
  );

  return (
    <div className={cn("flex flex-col rounded-100 bg-surface-level1", className)}>
      {/* ── Main row ──────────────────────────────────────────── */}
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "flex items-start px-150 py-100 gap-100",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        {position === "start" && <span className="mt-px shrink-0">{toggleEl}</span>}

        {leadingIcon && (
          <Icon icon={leadingIcon} size="md" noOffset className={iconClass} />
        )}

        {image && (
          <img
            src={image}
            alt={imageAlt}
            className="w-[36px] h-[36px] rounded-050 object-cover shrink-0"
          />
        )}

        {/* Text */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className={cn("text-body", labelClass)}>{label}</span>
          {subText && (
            <span className={cn("text-supporting truncate", subTextClass)}>{subText}</span>
          )}
        </div>

        {trailingIcon && (
          <Icon icon={trailingIcon} size="md" noOffset className={iconClass} />
        )}

        {position === "end" && toggleEl}

        {trailingIcon2 && (
          <Icon icon={trailingIcon2} size="md" noOffset className={iconClass} />
        )}
      </div>

      {/* ── Slot (optional extra content below the row) ───────── */}
      {slot && (
        <div className="px-150 pb-100">
          {slot}
        </div>
      )}
    </div>
  );
}
