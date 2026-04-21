import React, { type ComponentType, type SVGProps, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type IconButtonVariant =
  | "brand"
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "outline"
  | "blue-outline";

export type IconButtonSize = "lg" | "md" | "sm" | "xs" | "inline";

export type IconButtonShape = "circle" | "semi-rounded";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Visual style */
  variant?: IconButtonVariant;
  /** Size — lg (44px) / md (40px) / sm (36px) / xs (32px) / inline (28px) */
  size?: IconButtonSize;
  /** Corner rounding — circle (pill, default) or semi-rounded (8px) */
  shape?: IconButtonShape;
  /** Override colours to critical/destructive palette */
  destructive?: boolean;
  /** The icon to display — pass a Tabler icon component */
  icon: TablerIcon;
  /** Required for accessibility — describes the action to screen readers */
  "aria-label": string;
}

// lg: 44×44 (p-150=12px) | md: 40×40 (p-125=10px) | sm: 36×36 (p-100=8px) | xs: 32×32 (p-75=6px) | inline: 28×28 (p-50=4px)
const sizeStyles: Record<IconButtonSize, string> = {
  lg: "p-150",
  md: "p-125",
  sm: "p-100",
  xs: "p-100",
  inline: "p-50",
};

const variantStyles: Record<IconButtonVariant, string> = {
  brand:
    "bg-brand-primary-500 text-text-on-brand hover:bg-brand-primary-600 disabled:bg-surface-level3 disabled:text-text-level4",
  primary:
    "bg-surface-inverted text-text-inverted hover:bg-surface-level9 disabled:bg-surface-level3 disabled:text-text-level4",
  secondary:
    "bg-surface-level1 text-text-level1 hover:bg-surface-level2 disabled:bg-surface-level3 disabled:text-text-level4",
  tertiary:
    "bg-surface-level3 text-text-level1 hover:bg-surface-level2 disabled:bg-surface-level3 disabled:text-text-level4",
  ghost:
    "bg-transparent text-text-level1 hover:bg-surface-level2 disabled:bg-transparent disabled:text-text-level4",
  outline:
    "bg-transparent ring-1 ring-inset ring-border-color-level2 text-text-level1 hover:bg-surface-level2 disabled:ring-border-color-level1 disabled:text-text-level4",
  "blue-outline":
    "bg-transparent ring-1 ring-inset ring-border-color-primary text-text-level1 hover:bg-surface-level2 disabled:ring-border-color-level1 disabled:text-text-level4",
};

const destructiveStyles =
  "bg-surface-critical-3 text-text-inverted hover:bg-surface-critical-4 disabled:bg-surface-level3 disabled:text-text-level4";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
  variant = "brand",
  size = "md",
  shape = "circle",
  destructive = false,
  disabled = false,
  icon,
  type = "button",
  "aria-label": ariaLabel,
  className,
  ...rest
}, ref) {
  const colourClasses = destructive ? destructiveStyles : variantStyles[variant];
  const shapeClass = shape === "semi-rounded" ? "rounded-100" : "rounded-500";

  const iconSize = size === "xs" || size === "inline" ? "sm" : "md";

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        "disabled:cursor-not-allowed disabled:pointer-events-none",
        shapeClass,
        sizeStyles[size],
        colourClasses,
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} size={iconSize} noOffset />
    </button>
  );
});
