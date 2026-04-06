"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export interface PromoBannerProps {
  /** URL of the 3D / illustrative icon (48×48px) */
  image: string;
  /** Alt text for the icon image */
  imageAlt?: string;
  /** Bold heading — text-title (16px) semibold */
  title: string;
  /** Supporting text below the title */
  subtitle?: string;
  /** CTA button label */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function PromoBanner({
  image,
  imageAlt = "",
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
}: PromoBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full",
        "flex items-center gap-200",
        "px-250 py-200 rounded-150",
        "bg-warning-50 border border-warning-100",
        className,
      )}
    >
      {/* Decorative circle — overflows top-right corner, matches Figma reference */}
      <span
        aria-hidden="true"
        className="absolute -top-[29px] -right-[25px] w-[150px] h-[150px] rounded-500 bg-warning-100 opacity-60 pointer-events-none"
      />

      {/* Icon image — 48×48px (w-600 h-600) */}
      <img
        src={image}
        alt={imageAlt}
        className="w-600 h-600 shrink-0 object-contain relative z-10"
      />

      {/* Text content */}
      <div className="flex flex-col gap-25 flex-1 min-w-0 relative z-10">
        <p className="text-title font-semibold text-text-level1">{title}</p>
        {subtitle && (
          <p className="text-body font-normal text-text-level2">{subtitle}</p>
        )}
      </div>

      {/* CTA */}
      {actionLabel && (
        <Button
          variant="primary"
          shape="full-rounded"
          size="sm"
          onClick={onAction}
          className="shrink-0 relative z-10"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
