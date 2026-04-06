"use client";

import {
  IconSquare,
  IconSquareCheckFilled,
  IconSquareMinusFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  className?: string;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  id,
  name,
  className,
}: CheckboxProps) {
  const IconComponent = checked
    ? IconSquareCheckFilled
    : indeterminate
    ? IconSquareMinusFilled
    : IconSquare;

  const iconClass = checked || indeterminate
    ? disabled
      ? "text-text-level4"
      : "text-text-brand-primary"
    : disabled
    ? "text-text-level4"
    : "text-text-level3";

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      name={name}
      aria-checked={indeterminate ? "mixed" : checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <IconComponent size={20} className={iconClass} />
    </button>
  );
}
