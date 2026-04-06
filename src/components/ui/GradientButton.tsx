import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type GradientButtonSize = "lg" | "md" | "sm" | "xs";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface GradientButtonProps {
  /** Size — lg/md/sm/xs */
  size?: GradientButtonSize;
  children?: ReactNode;
  /**
   * Top color of the vertical gradient.
   * Accepts any valid CSS color — hex, hsl, rgb, etc.
   * Defaults to the Figma design blue.
   */
  gradientFrom?: string;
  /**
   * Bottom color of the vertical gradient.
   * Accepts any valid CSS color — hex, hsl, rgb, etc.
   * Defaults to the Figma design light blue.
   */
  gradientTo?: string;
  /**
   * Optional decorative illustration rendered behind the button content.
   * Absolutely positioned and clipped by the button boundary — pass any
   * ReactNode (SVG, image, component). Designers size and position it freely.
   */
  illustration?: ReactNode;
  /** Optional leading icon — pass a Tabler icon component */
  leadingIcon?: TablerIcon;
  /** Optional trailing icon — pass a Tabler icon component */
  trailingIcon?: TablerIcon;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const sizeStyles: Record<GradientButtonSize, { classes: string; iconSize: "sm" | "md" }> = {
  lg: { classes: "py-150 px-300 gap-100 text-body",       iconSize: "md" },
  md: { classes: "py-125 px-300 gap-100 text-body",       iconSize: "md" },
  sm: { classes: "py-100 px-300 gap-100 text-body",       iconSize: "md" },
  xs: { classes: "py-75  px-200 gap-50  text-supporting", iconSize: "sm" },
};

export function GradientButton({
  size = "md",
  children,
  gradientFrom = "#4A7CFE",
  gradientTo = "#6EA8F9",
  illustration,
  leadingIcon,
  trailingIcon,
  onClick,
  type = "button",
  className,
}: GradientButtonProps) {
  const { classes: sizeClasses, iconSize } = sizeStyles[size];

  // Icon frame dimensions — same optical clipping as Button
  const frameW = iconSize === "md" ? 16 : 13;
  const frameH = iconSize === "md" ? 20 : 16;

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center font-medium text-text-inverted",
        "rounded-500 overflow-hidden",
        "hover:brightness-105 transition-[filter] duration-150",
        sizeClasses,
        className,
      )}
      style={{ background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})` }}
    >
      {/* Illustration slot — absolute, fills button, clipped by overflow-hidden.
          Comes first in DOM so content paints on top without needing z-index. */}
      {illustration && (
        <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {illustration}
        </span>
      )}

      {leadingIcon && (
        <span className="inline-flex shrink-0 justify-end" style={{ width: frameW, height: frameH }}>
          <Icon icon={leadingIcon} size={iconSize} />
        </span>
      )}
      {children && <span>{children}</span>}
      {trailingIcon && (
        <span className="inline-flex shrink-0 justify-start" style={{ width: frameW, height: frameH }}>
          <Icon icon={trailingIcon} size={iconSize} />
        </span>
      )}
    </button>
  );
}
