"use client";

import { type ComponentType, type SVGProps } from "react";
import {
  IconX,
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

export type NudgeType = "critical" | "warning" | "normal";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface NudgeProps {
  /** Severity — controls background, border, and icon colour */
  type?: NudgeType;
  /**
   * md (default) — standard padding p-200, text-body, 20px icon
   * sm — compact padding py-100 px-200, text-supporting, 16px icon;
   *      for slim bars like plan status strips or social proof bars
   */
  size?: "md" | "sm";
  /**
   * start (default) — icon and text top-aligned, content left-aligned
   * center — icon and text vertically and horizontally centered within the bar
   */
  align?: "start" | "center";
  /**
   * default — uses the type's semantic background color
   * surface-2 — uses bg-surface-level2 (neutral gray); useful for non-semantic info strips
   */
  bg?: "default" | "surface-2";
  /** Show the semantic type icon (circle / triangle / info) before the message */
  showIcon?: boolean;
  /** URL of the leading image (36×36). Note: no 36px spacing token exists — flagged as token gap */
  image?: string;
  /** Alt text for the leading image */
  imageAlt?: string;
  /** Optional bold heading rendered above the message */
  heading?: string;
  /** Message text */
  message: string;
  /** Show a coloured 1px inset border matching the type */
  stroke?: boolean;
  /** Label for the inline CTA */
  actionLabel?: string;
  /**
   * button (default) — pill button positioned to the right of the text
   * link — underlined text stacked below the message inside the text column
   */
  actionVariant?: "button" | "link";
  onAction?: () => void;
  /** Show the dismiss (×) button */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// ─── Per-type tokens ───────────────────────────────────────────────────────────

type NudgeConfig = {
  bg: string;
  strokeClass: string;
  defaultIcon: TablerIcon;
  iconClass: string;
  linkClass: string;
};

const typeConfig: Record<NudgeType, NudgeConfig> = {
  critical: {
    bg: "bg-surface-critical-1",
    strokeClass: "ring-border-color-critical",
    defaultIcon: IconAlertCircle,
    iconClass: "text-text-critical-3",
    linkClass: "text-text-critical-3",
  },
  warning: {
    bg: "bg-surface-warning-1",
    strokeClass: "ring-border-color-warning",
    defaultIcon: IconAlertTriangle,
    iconClass: "text-text-warning-1",
    linkClass: "text-text-warning-1",
  },
  normal: {
    bg: "bg-surface-brand-primary-subtle",
    strokeClass: "ring-border-color-primary",
    defaultIcon: IconInfoCircle,
    iconClass: "text-text-brand-primary",
    linkClass: "text-text-brand-primary",
  },
};

// ─── Nudge ─────────────────────────────────────────────────────────────────────

export function Nudge({
  type = "normal",
  size = "md",
  bg = "default",
  align = "start",
  showIcon = true,
  image,
  imageAlt = "",
  heading,
  message,
  stroke = true,
  actionLabel,
  actionVariant = "button",
  onAction,
  dismissible = true,
  onDismiss,
  className,
}: NudgeProps) {
  const config = typeConfig[type];
  const isSm = size === "sm";
  const isCenter = align === "center";
  const textSize = isSm ? "text-supporting" : "text-body";
  const iconSize = isSm ? "sm" : "md";
  const isSurface2 = bg === "surface-2";
  const bgClass = isSurface2 ? "bg-surface-level2" : config.bg;
  const strokeClass = isSurface2 ? "ring-border-color-level3" : config.strokeClass;
  const iconClass = isSurface2 ? "text-text-level3" : config.iconClass;

  return (
    <div
      className={cn(
        "flex gap-100 rounded-100 w-full",
        isCenter ? "items-center justify-center" : "items-start",
        isSm ? "py-100 px-200" : "p-200",
        bgClass,
        stroke && ["ring-1 ring-inset", strokeClass],
        className,
      )}
    >
      {/* ── Content ───────────────────────────────────────────── */}
      <div className={cn(
        "flex gap-300",
        isCenter ? "items-center justify-center" : "flex-1 items-start justify-between",
      )}>

        {/* Left group — icon + image + message */}
        <div className={cn("flex gap-100 min-w-0", isCenter ? "items-center" : "items-start flex-1")}>
          {showIcon && (
            <Icon
              icon={config.defaultIcon}
              size={iconSize}
              noOffset
              className={cn("shrink-0", iconClass)}
            />
          )}
          {image && (
            <img
              src={image}
              alt={imageAlt}
              className="w-[36px] h-[36px] rounded-050 object-cover shrink-0"
            />
          )}
          {heading ? (
            <div className="flex flex-col gap-25 min-w-0">
              <p className={cn(textSize, "font-semibold text-text-level1")}>{heading}</p>
              <p className={cn(textSize, "text-text-level1")}>{message}</p>
              {actionLabel && actionVariant === "link" && (
                <Button
                  variant="link"
                  size="inline"
                  onClick={onAction}
                  className={cn("underline font-semibold p-0 justify-start h-auto", textSize, isSurface2 ? "text-text-level3" : config.linkClass)}
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          ) : (
            <p className={cn(textSize, "text-text-level1 min-w-0")}>{message}</p>
          )}
        </div>

        {actionLabel && actionVariant === "button" && (
          <Button
            size="inline"
            shape="full-rounded"
            variant="primary"
            onClick={onAction}
            className="shrink-0"
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {/* ── Dismiss ───────────────────────────────────────────── */}
      {dismissible && (
        <IconButton
          variant="ghost"
          size="inline"
          icon={IconX}
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-text-level3 hover:text-text-level1"
        />
      )}
    </div>
  );
}
