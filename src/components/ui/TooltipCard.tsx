"use client";

import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export type TooltipColor = "black" | "white";
export type TooltipSize = "md" | "sm" | "label";
export type TooltipTipSide = "top" | "bottom" | "left" | "right";
export type TooltipTipAlign = "start" | "center" | "end";

export interface TooltipCardProps {
  /** Theme: black (dark bg) or white (light bg) */
  color?: TooltipColor;
  /** Which edge of the card the tip arrow appears on */
  tipSide?: TooltipTipSide;
  /** Where along the edge the tip is aligned */
  tipAlign?: TooltipTipAlign;
  /** Show the tip arrow */
  showTip?: boolean;
  /** Size variant */
  size?: TooltipSize;
  /** Optional icon beside the heading */
  icon?: TablerIcon;
  /** Optional leading image */
  image?: string;
  imageAlt?: string;
  /** Heading text */
  heading?: string;
  /** Body text */
  body?: string;
  /** Primary action button label */
  primaryAction?: string;
  /** Secondary action button label */
  secondaryAction?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  /** Slot for extra content (e.g. info cards) rendered below heading/body */
  children?: ReactNode;
  className?: string;
}

// ── Tip arrow dimensions ──────────────────────────────────────────────────────
// md: 14px thick, 20px wide triangle
// sm: 7px thick, 12px wide triangle
// label: same as sm
const TIP = {
  md:    { thick: 14, wide: 20, offset: 20 },
  sm:    { thick: 7,  wide: 12, offset: 12 },
  label: { thick: 7,  wide: 12, offset: 12 },
};

function TipArrow({
  tipSide,
  tipAlign,
  size,
  color,
}: {
  tipSide: TooltipTipSide;
  tipAlign: TooltipTipAlign;
  size: TooltipSize;
  color: TooltipColor;
}) {
  const { thick, wide, offset } = TIP[size];
  const fill =
    color === "black"
      ? "var(--color-surface-inverted)"
      : "var(--color-surface-level1)";

  const isVertical = tipSide === "top" || tipSide === "bottom";
  const svgW = isVertical ? wide : thick;
  const svgH = isVertical ? thick : wide;

  // Rounded-apex paths using a quadratic bezier at the tip point.
  // The approach points are 30% inset from each side so the curve
  // matches the subtle rounded tip visible in the Figma design.
  let d: string;
  const w = wide, h = thick;
  switch (tipSide) {
    case "top":    d = `M 0,${h} L ${w*0.4},${h*0.14} Q ${w/2},0 ${w*0.6},${h*0.14} L ${w},${h} Z`; break;
    case "bottom": d = `M 0,0 L ${w},0 L ${w*0.6},${h*0.86} Q ${w/2},${h} ${w*0.4},${h*0.86} Z`; break;
    case "left":   d = `M ${h},0 L ${h},${w} L ${h*0.14},${w*0.6} Q 0,${w/2} ${h*0.14},${w*0.4} Z`; break;
    case "right":  d = `M 0,0 L 0,${w} L ${h*0.86},${w*0.6} Q ${h},${w/2} ${h*0.86},${w*0.4} Z`; break;
  }

  const arrow = (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ display: "block", color: fill }}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );

  if (isVertical) {
    // Row that spans the full card width; arrow sits at the appropriate horizontal position
    return (
      <div
        className={cn("w-full flex shrink-0", {
          "justify-start": tipAlign === "start",
          "justify-center": tipAlign === "center",
          "justify-end":  tipAlign === "end",
        })}
        style={{
          height: thick,
          paddingLeft:  tipAlign === "start" ? offset : 0,
          paddingRight: tipAlign === "end"   ? offset : 0,
        }}
      >
        {arrow}
      </div>
    );
  }

  // Column that spans the full card height; arrow sits at the appropriate vertical position
  return (
    <div
      className={cn("self-stretch flex flex-col shrink-0", {
        "justify-start": tipAlign === "start",
        "justify-center": tipAlign === "center",
        "justify-end":  tipAlign === "end",
      })}
      style={{
        width: thick,
        paddingTop:    tipAlign === "start" ? offset : 0,
        paddingBottom: tipAlign === "end"   ? offset : 0,
      }}
    >
      {arrow}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function TooltipCard({
  color = "black",
  tipSide = "top",
  tipAlign = "start",
  showTip = true,
  size = "md",
  icon,
  image,
  imageAlt = "",
  heading,
  body,
  primaryAction,
  secondaryAction,
  onPrimaryAction,
  onSecondaryAction,
  children,
  className,
}: TooltipCardProps) {
  const isBlack = color === "black";

  const headingClass = isBlack ? "text-text-inverted" : "text-text-level1";
  const bodyClass    = isBlack ? "text-text-inverted opacity-70" : "text-text-level3";
  const iconClass    = cn("shrink-0", isBlack ? "text-text-inverted" : "text-text-level2");

  const sizeStyles = {
    md: {
      card:   "p-250 gap-300",
      width:  "w-[400px]",
      img:    "w-[62px] h-[62px]",
      imgGap: "gap-[12px]",
    },
    sm: {
      card:   "p-150 gap-300",
      width:  "w-[344px]",
      img:    "w-[50px] h-[50px]",
      imgGap: "gap-[10px]",
    },
    label: {
      card:   "px-150 py-75 gap-0",
      width:  "w-auto",
      img:    "",
      imgGap: "",
    },
  };

  const { card, width, img, imgGap } = sizeStyles[size];

  const cardEl = (
    <div
      className={cn(
        "rounded-150 flex flex-col",
        card,
        width,
        isBlack ? "bg-surface-inverted" : "bg-surface-level1",
      )}
    >
      {/* Heading + body + optional image ────────────────────── */}
      {(image || icon || heading || body) && (
        <div className={cn("flex", imgGap)}>
          {image && (
            <img
              src={image}
              alt={imageAlt}
              className={cn("shrink-0 rounded-100 object-cover", img)}
            />
          )}
          <div className="flex flex-col gap-[6px] flex-1 min-w-0">
            {heading && (
              <div className="flex items-center gap-[6px]">
                {icon && (
                  <Icon icon={icon} size="md" noOffset className={iconClass} />
                )}
                <span className={cn("text-title font-semibold", headingClass)}>
                  {heading}
                </span>
              </div>
            )}
            {body && (
              <span className={cn("text-body", bodyClass, size === "label" && "whitespace-nowrap")}>{body}</span>
            )}
          </div>
        </div>
      )}

      {/* Slot for extra content (info cards, etc.) ─────────── */}
      {children}

      {/* Action buttons ─────────────────────────────────────── */}
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-[12px]">
          {primaryAction && (
            <button
              type="button"
              onClick={onPrimaryAction}
              className={cn(
                "text-body font-medium underline-offset-2 hover:underline cursor-pointer",
                isBlack ? "text-text-inverted" : "text-text-brand-primary",
              )}
            >
              {primaryAction}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className={cn(
                "text-body font-medium cursor-pointer",
                isBlack ? "text-text-inverted opacity-60" : "text-text-level3",
              )}
            >
              {secondaryAction}
            </button>
          )}
        </div>
      )}
    </div>
  );

  const isVertical = tipSide === "top" || tipSide === "bottom";
  const tipFirst   = tipSide === "top" || tipSide === "left";

  const tipEl = (
    <TipArrow
      tipSide={tipSide}
      tipAlign={tipAlign}
      size={size}
      color={color}
    />
  );

  return (
    <div
      className={cn(
        "inline-flex items-start",
        isVertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{
        filter:
          "drop-shadow(0 0 1px rgba(0,0,0,0.4)) drop-shadow(0 6px 6px rgba(0,0,0,0.12))",
      }}
    >
      {showTip && tipFirst  && tipEl}
      {cardEl}
      {showTip && !tipFirst && tipEl}
    </div>
  );
}
