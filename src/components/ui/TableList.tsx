"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TableListProps {
  /** Square thumbnail image URL */
  image?: string;
  imageAlt?: string;
  /** Primary title */
  title: string;
  /** Secondary line — e.g. a handle or sub-label */
  subtitle?: string;
  /** Icon shown between subtitle and platform label */
  platformIcon?: ReactNode;
  /** Text label after the platform icon */
  platformLabel?: string;
  /** Badge label (e.g. "Dynamic", "Static") */
  badge?: string;
  /** Action buttons rendered on the right */
  actions?: ReactNode;
  className?: string;
}

export function TableList({
  image,
  imageAlt = "",
  title,
  subtitle,
  platformIcon,
  platformLabel,
  badge,
  actions,
  className,
}: TableListProps) {
  return (
    <div className={cn("flex items-center gap-[12px]", className)}>
      {/* Thumbnail — 52×52, rounded-100 (8px, closest token to Figma's 6px) */}
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="w-[52px] h-[52px] rounded-100 object-cover shrink-0"
        />
      )}

      {/* Content */}
      <div className="flex flex-1 min-w-0 items-center gap-[12px]">
        <div className="flex flex-1 min-w-0 flex-col gap-[8px]">
          {/* Title */}
          <span className="text-body font-semibold text-text-level1 truncate">{title}</span>

          {/* Subtitle row */}
          {(subtitle || platformIcon || platformLabel) && (
            <div className="flex items-center gap-[8px]">
              {subtitle && (
                <span className="text-body text-text-level3 truncate">{subtitle}</span>
              )}
              {(platformIcon || platformLabel) && (
                <>
                  {subtitle && <div className="w-px h-[16px] bg-border-color-level2 shrink-0" />}
                  <div className="flex shrink-0 items-center gap-[8px]">
                    {platformIcon && <span className="shrink-0">{platformIcon}</span>}
                    {platformLabel && (
                      <span className="text-body text-text-level3 whitespace-nowrap">{platformLabel}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Badge */}
        {badge && (
          <span className="shrink-0 inline-flex items-center px-[8px] py-[4px] rounded-150 bg-surface-level2 text-supporting font-semibold text-text-level2">
            {badge}
          </span>
        )}

        {/* Actions */}
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
