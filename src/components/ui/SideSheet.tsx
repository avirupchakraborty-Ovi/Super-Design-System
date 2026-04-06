"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconChevronsRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export type SideSheetSlotType = "stretched" | "padded";

export interface SideSheetProps {
  open: boolean;
  onClose?: () => void;
  heading?: string;
  subtext?: string;
  showHeading?: boolean;
  showSubtext?: boolean;
  /** Label for the optional action button in the header */
  actionLabel?: string;
  showAction?: boolean;
  onActionClick?: () => void;
  /**
   * stretched — content fills edge-to-edge (no side padding)
   * padded    — content has 20px left/right and 16px bottom padding
   */
  slotType?: SideSheetSlotType;
  children?: ReactNode;
  className?: string;
}

export function SideSheet({
  open,
  onClose,
  heading = "Header Text",
  subtext = "Sub text explaining the header text",
  showHeading = true,
  showSubtext = true,
  actionLabel = "Button",
  showAction = true,
  onActionClick,
  slotType = "stretched",
  children,
  className,
}: SideSheetProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-end",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative flex flex-col w-[464px] h-full bg-surface-level1",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        {showHeading && (
          <div className="flex items-start gap-150 pl-200 pr-250 py-200 border-b border-border-color-level2 shrink-0">
            {/* Collapse / close icon */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close side sheet"
              className="flex justify-center items-start pt-25 w-[32px] h-[32px] shrink-0 cursor-pointer text-text-level1 hover:text-text-level3 rounded-050"
            >
              <IconChevronsRight size={20} strokeWidth={1.5} />
            </button>

            {/* Title + subtext */}
            <div className="flex flex-col gap-50 flex-1 min-w-0">
              <span className="text-title font-semibold text-text-level1 truncate">
                {heading}
              </span>
              {showSubtext && (
                <span className="text-body font-normal text-text-level2">
                  {subtext}
                </span>
              )}
            </div>

            {/* Action button */}
            {showAction && (
              <Button
                shape="semi-rounded"
                variant="outline"
                size="sm"
                onClick={onActionClick}
                className="shrink-0"
              >
                {actionLabel}
              </Button>
            )}
          </div>
        )}

        {/* ── Content slot ────────────────────────────────────────── */}
        <div
          className={cn(
            "flex-1 overflow-y-auto mt-200",
            slotType === "padded" && "px-250 pb-200",
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
