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

export type AlertType = "critical" | "warning" | "warning-subtle" | "info";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface AlertProps {
  /** Visual style — maps to Figma: critical, warning, warning-subtle (light), info */
  type?: AlertType;
  /** Override the default leading icon */
  icon?: TablerIcon;
  /** Primary message text */
  message: string;
  /** Optional secondary text shown after the timer */
  detail?: string;
  /**
   * Countdown / timer string to display, e.g. "01:30:00".
   * Renders as styled HH:MM:SS boxes. No countdown logic — pass a live value from outside.
   */
  timer?: string;
  /** Label for the inline CTA button */
  actionLabel?: string;
  onAction?: () => void;
  /** Show the dismiss (×) button — default true */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// ─── per-type tokens ───────────────────────────────────────────────────────────

type TypeConfig = {
  bg: string;
  text: string;
  timerBoxBg: string;
  timerBoxText: string;
  timerSep: string;
  buttonVariant: "secondary" | "primary";
  defaultIcon: TablerIcon;
};

const typeConfig: Record<AlertType, TypeConfig> = {
  critical: {
    bg: "bg-surface-critical-4",
    text: "text-text-inverted",
    timerBoxBg: "bg-surface-level1",
    timerBoxText: "text-text-level1",
    timerSep: "text-text-inverted",
    buttonVariant: "secondary",
    defaultIcon: IconAlertCircle,
  },
  warning: {
    bg: "bg-surface-warning-3",
    text: "text-text-level1",
    timerBoxBg: "bg-surface-level1",
    timerBoxText: "text-text-level1",
    timerSep: "text-text-level1",
    buttonVariant: "primary",
    defaultIcon: IconAlertTriangle,
  },
  "warning-subtle": {
    bg: "bg-surface-warning-2",
    text: "text-text-level1",
    timerBoxBg: "bg-surface-level1",
    timerBoxText: "text-text-level1",
    timerSep: "text-text-level1",
    buttonVariant: "primary",
    defaultIcon: IconAlertTriangle,
  },
  info: {
    bg: "bg-surface-brand-primary",
    text: "text-text-inverted",
    timerBoxBg: "bg-surface-level1",
    timerBoxText: "text-text-level1",
    timerSep: "text-text-inverted",
    buttonVariant: "secondary",
    defaultIcon: IconInfoCircle,
  },
};

// ─── Timer display ─────────────────────────────────────────────────────────────

function TimerDisplay({ value, config }: { value: string; config: TypeConfig }) {
  const parts = value.split(":");
  return (
    <div className="flex items-center gap-50">
      {parts.map((segment, i) => (
        <div key={i} className="flex items-center gap-50">
          {i > 0 && (
            <span className={cn("text-body font-semibold", config.timerSep)}>:</span>
          )}
          <span
            className={cn(
              "inline-flex items-center justify-center min-w-[2ch] p-50",
              "rounded-[2px] text-supporting font-semibold tabular-nums",
              config.timerBoxBg,
              config.timerBoxText,
            )}
          >
            {segment}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Alert ─────────────────────────────────────────────────────────────────────

export function Alert({
  type = "info",
  icon,
  message,
  detail,
  timer,
  actionLabel,
  onAction,
  dismissible = true,
  onDismiss,
  className,
}: AlertProps) {
  const config = typeConfig[type];
  const IconComponent = icon ?? config.defaultIcon;

  return (
    <div
      className={cn(
        "flex w-full items-center py-125 px-200 gap-100",
        config.bg,
        className,
      )}
    >
      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center gap-300">
        <div className="flex items-center gap-100 min-w-0">
          <Icon icon={IconComponent} size="md" className={cn("shrink-0", config.text)} />
          <span className={cn("text-body", config.text)}>{message}</span>
          {timer && <TimerDisplay value={timer} config={config} />}
          {detail && (
            <span className={cn("text-body shrink-0", config.text)}>{detail}</span>
          )}
        </div>
        {actionLabel && (
          <Button
            size="xs"
            shape="full-rounded"
            variant={config.buttonVariant}
            onClick={onAction}
            className="shrink-0"
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {/* ── Dismiss ─────────────────────────────────────────────── */}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={cn(
            "inline-flex items-center justify-center w-400 h-400 shrink-0 rounded-500",
            "transition-opacity opacity-70 hover:opacity-100",
            config.text,
          )}
        >
          <Icon icon={IconX} size="md" noOffset />
        </button>
      )}
    </div>
  );
}
