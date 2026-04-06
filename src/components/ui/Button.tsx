import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type ButtonVariant =
  | "brand"
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "outline"
  | "blue-outline"
  | "dash-primary"
  | "dash-outline"
  | "link";

export type ButtonSize = "lg" | "md" | "sm" | "xs" | "inline";
export type ButtonShape = "full-rounded" | "semi-rounded";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface ButtonProps {
  /** Visual style */
  variant?: ButtonVariant;
  /** Size — lg/md/sm/xs/inline */
  size?: ButtonSize;
  /** Corner rounding — full-rounded (pill) or semi-rounded (12px) */
  shape?: ButtonShape;
  /** Override colours to critical/destructive palette */
  destructive?: boolean;
  disabled?: boolean;
  /** Optional leading icon — pass a Tabler icon component */
  leadingIcon?: TablerIcon;
  /** Optional trailing icon — pass a Tabler icon component */
  trailingIcon?: TablerIcon;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

// ─── Size → spacing + typography + icon size ────────────────
// py-125 = 10px, py-75 = 6px, py-62 = 5px (new tokens for button padding)
const sizeStyles: Record<ButtonSize, { classes: string; iconSize: "sm" | "md" }> = {
  lg:     { classes: "py-150 px-300 gap-100 text-body",       iconSize: "md" },
  md:     { classes: "py-125 px-300 gap-100 text-body",       iconSize: "md" },
  sm:     { classes: "py-100 px-250 gap-100 text-body",       iconSize: "md" },
  xs:     { classes: "py-75  px-200 gap-100 text-supporting", iconSize: "sm" },
  inline: { classes: "py-62  px-200 gap-25  text-supporting", iconSize: "sm" },
};

// ─── Variant → normal + hover + disabled colours ────────────
const variantStyles: Record<ButtonVariant, string> = {
  brand:
    "bg-brand-primary-500 text-text-inverted hover:bg-brand-primary-600 disabled:bg-gray-100 disabled:text-text-level4",
  primary:
    "bg-gray-900 text-text-inverted hover:bg-gray-700 disabled:bg-gray-100 disabled:text-text-level4",
  secondary:
    "bg-gray-0 text-text-level1 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-text-level4",
  tertiary:
    "bg-gray-100 text-text-level1 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-text-level4",
  ghost:
    "bg-transparent text-text-level1 hover:bg-gray-50 disabled:bg-transparent disabled:text-text-level4",
  outline:
    "bg-transparent ring-1 ring-inset ring-border-color-level2 text-text-level1 hover:bg-gray-50 disabled:ring-border-color-level1 disabled:text-text-level4",
  "blue-outline":
    "bg-transparent ring-1 ring-inset ring-border-color-primary text-text-level1 hover:bg-gray-50 disabled:ring-border-color-level1 disabled:text-text-level4",
  "dash-primary":
    "bg-transparent border border-dashed border-border-color-primary text-text-level1 hover:bg-gray-50 disabled:border-border-color-level2 disabled:text-text-level4",
  "dash-outline":
    "bg-transparent border border-dashed border-border-color-level3 text-text-level1 hover:bg-gray-50 disabled:border-border-color-level2 disabled:text-text-level4",
  link:
    "bg-transparent text-text-level1 hover:underline disabled:no-underline disabled:text-text-level4",
};

// Destructive overrides variant colours entirely
const destructiveStyles =
  "bg-critical-500 text-text-inverted hover:bg-critical-600 disabled:bg-gray-100 disabled:text-text-level4";

export function Button({
  variant = "brand",
  size = "md",
  shape = "full-rounded",
  destructive = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const { classes: sizeClasses, iconSize } = sizeStyles[size];
  const colourClasses = destructive ? destructiveStyles : variantStyles[variant];
  // Figma spec: semi-rounded uses 8px radius (rounded-100) for all sizes
  const shapeClass =
    shape === "full-rounded"
      ? "rounded-500"
      : "rounded-100";

  // Icon frame dimensions — narrower than the icon to optically crop dead space
  // at button edges, matching Figma's icon frame clipping behaviour.
  // md (20×20 icon) → 16×20 frame, clip 4px | sm (16×16 icon) → 13×16 frame, clip 3px
  const frameW = iconSize === "md" ? 16 : 13;
  const frameH = iconSize === "md" ? 20 : 16;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center font-medium overflow-hidden",
        "disabled:cursor-not-allowed disabled:pointer-events-none",
        shapeClass,
        sizeClasses,
        colourClasses,
        className,
      )}
    >
      {leadingIcon && (
        // Wrapper is narrower than icon — right-aligns icon so it overflows
        // left into padding. No overflow-hidden: glyph must not be clipped.
        // Flex layout uses wrapper width (16/13px) for spacing calculations.
        <span
          className="inline-flex shrink-0 justify-end"
          style={{ width: frameW, height: frameH }}
        >
          <Icon icon={leadingIcon} size={iconSize} noOffset />
        </span>
      )}
      {children && <span>{children}</span>}
      {trailingIcon && (
        // Left-aligns icon so it overflows right into padding.
        <span
          className="inline-flex shrink-0 justify-start"
          style={{ width: frameW, height: frameH }}
        >
          <Icon icon={trailingIcon} size={iconSize} noOffset />
        </span>
      )}
    </button>
  );
}
