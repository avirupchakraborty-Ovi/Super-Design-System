"use client";

import { type ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { TooltipCard, type TooltipCardProps } from "@/components/ui/TooltipCard";

export interface TooltipProps
  extends Omit<TooltipCardProps, "className" | "showTip"> {
  /** The element that triggers the tooltip on hover/focus */
  children: ReactNode;
  /** Delay before the tooltip opens (ms) */
  delayDuration?: number;
  /** Gap between trigger and tooltip card (px) */
  sideOffset?: number;
  /** Controlled open state */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  children,
  delayDuration = 400,
  sideOffset = 8,
  open,
  defaultOpen,
  onOpenChange,
  tipSide = "top",
  tipAlign = "start",
  color = "black",
  size = "md",
  ...cardProps
}: TooltipProps) {
  // tipSide = which edge of the card the arrow sits on.
  // The card appears on the OPPOSITE side of the trigger from the arrow,
  // so the Radix side must be inverted.
  const radixSide = (
    { top: "bottom", bottom: "top", left: "right", right: "left" } as const
  )[tipSide];

  const radixAlign = (
    { start: "start", center: "center", end: "end" } as const
  )[tipAlign];

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={radixSide}
            align={radixAlign}
            sideOffset={sideOffset}
            className="z-50 outline-none"
          >
            <TooltipCard
              color={color}
              size={size}
              tipSide={tipSide}
              tipAlign={tipAlign}
              showTip
              {...cardProps}
            />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
