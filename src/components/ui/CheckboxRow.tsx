"use client";

import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Checkbox } from "@/components/ui/Checkbox";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export type CheckboxPosition = "start" | "end";

export interface CheckboxRowProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in the indeterminate state */
  indeterminate?: boolean;
  /** Disables the entire row */
  disabled?: boolean;
  /** Fires with the next checked value when the row or checkbox is clicked */
  onChange?: (checked: boolean) => void;
  /** Checkbox position relative to content */
  position?: CheckboxPosition;
  /** Primary label */
  label: string;
  /** Optional secondary description line */
  subText?: string;
  /** Optional leading icon (left of text) */
  leadingIcon?: TablerIcon;
  /** Optional trailing icon (right of text) */
  trailingIcon?: TablerIcon;
  /** Optional 36×36 leading image */
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function CheckboxRow({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  position = "end",
  label,
  subText,
  leadingIcon,
  trailingIcon,
  image,
  imageAlt = "",
  className,
}: CheckboxRowProps) {
  const labelClass = disabled ? "text-text-level4" : "text-text-level1";
  const subTextClass = disabled ? "text-text-level4" : "text-text-level3";

  const checkboxEl = (
    <span onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={onChange}
      />
    </span>
  );

  return (
    <div
      role="row"
      onClick={() => !disabled && onChange?.(!checked)}
      className={cn(
        "flex items-start px-150 py-100 gap-100 rounded-100 bg-surface-level1",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {position === "start" && <span className="mt-px shrink-0">{checkboxEl}</span>}

      {leadingIcon && (
        <Icon icon={leadingIcon} size="md" noOffset className={cn("shrink-0", disabled ? "text-text-level4" : "text-text-level2")} />
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
        <Icon icon={trailingIcon} size="md" noOffset className={cn("shrink-0", disabled ? "text-text-level4" : "text-text-level2")} />
      )}

      {position === "end" && checkboxEl}
    </div>
  );
}
