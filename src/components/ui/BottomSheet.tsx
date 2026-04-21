"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  /** Optional heading rendered below the drag handle */
  title?: string;
  children?: ReactNode;
  className?: string;
}

// ── BottomSheet ────────────────────────────────────────────────────────────────

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset drag offset when sheet closes
  useEffect(() => {
    if (!open) setDragY(0);
  }, [open]);

  // Escape key to dismiss
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // ── Swipe-to-dismiss touch handlers ─────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    // Only allow downward drag
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    // Dismiss if dragged more than 100px down
    if (dragY > 100) {
      onClose?.();
    } else {
      setDragY(0);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col justify-end",
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

      {/* Sheet panel */}
      <div
        className={cn(
          "relative flex flex-col w-full bg-surface-level1 rounded-t-150 overflow-hidden",
          "max-h-[80vh]", /* SP8 exception — 80vh cap from COMPONENT_MAP.md spec; no layout token maps to this value */
          "transition-transform duration-300 ease-in-out",
          open ? "translate-y-0" : "translate-y-full",
          className,
        )}
        // Override transition during active drag for immediate feedback
        style={
          dragY > 0
            ? { transform: `translateY(${dragY}px)`, transition: "none" }
            : undefined
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-125 pb-75 shrink-0">
          {/* SP8 exception — 36×2px Figma-spec drag handle; no spacing token maps to these values */}
          <div className="w-[36px] h-[2px] rounded-500 bg-border-color-level2" />
        </div>

        {/* Optional title */}
        {title && (
          <div className="px-150 pt-150 pb-100 shrink-0">
            <span className="text-title font-semibold text-text-level1">
              {title}
            </span>
          </div>
        )}

        {/* Scrollable content — px-150 pt-150 left/right/top; bottom uses safe-area calc (R15) */}
        <div
          className="flex-1 overflow-y-auto px-150 pt-150"
          style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
