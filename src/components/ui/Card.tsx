"use client";

import { type ReactNode } from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

// ── Types ──────────────────────────────────────────────────────────────────────

export type CardOrientation = "vertical" | "horizontal";
export type CardImageType = "stretched" | "padded";
export type CardImagePosition = "top" | "below" | "left" | "right";

export interface CardProps {
  orientation?: CardOrientation;
  /** Stretched: image fills edge-to-edge. Padded: image is inset with 20px margin and rounded-100 corners. */
  imageType?: CardImageType;
  /** Top/Below for vertical; Left/Right for horizontal. */
  imagePosition?: CardImagePosition;
  showTitle?: boolean;
  showImage?: boolean;
  showFooter?: boolean;
  title?: string;
  onClose?: () => void;
  image?: string;
  imageAlt?: string;
  /** Body slot content */
  children?: ReactNode;
  /** Footer slot content */
  footer?: ReactNode;
  /** Compact: reduces image and body padding from 20px to 12px */
  compact?: boolean;
  className?: string;
}

// ── Internal sub-sections ──────────────────────────────────────────────────────

function CardHeader({ title, onClose }: { title?: string; onClose?: () => void }) {
  return (
    <div className="flex items-center gap-[10px] px-[20px] py-[16px] border-b border-border-color-level2 bg-surface-level1 shrink-0">
      <span className="flex-1 text-body font-semibold text-text-level1 truncate">{title}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex items-center justify-center w-[32px] h-[32px] cursor-pointer rounded-100 hover:bg-surface-level2"
        >
          <Icon icon={IconX} size="md" noOffset className="text-text-level2" />
        </button>
      )}
    </div>
  );
}

function CardBody({ children, className, compact }: { children?: ReactNode; className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex-1 bg-surface-level1", compact ? "px-[12px] py-[12px]" : "px-[20px] py-[16px]", className)}>
      {children}
    </div>
  );
}

function CardFooter({ children, noBorder }: { children?: ReactNode; noBorder?: boolean }) {
  return (
    <div className={cn("flex items-center gap-[16px] px-[20px] py-[16px] bg-surface-level1 shrink-0", !noBorder && "border-t border-border-color-level2")}>
      {children}
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────────

export function Card({
  orientation = "vertical",
  imageType = "stretched",
  imagePosition = "top",
  showTitle = true,
  showImage = true,
  showFooter = true,
  title,
  onClose,
  image,
  imageAlt = "",
  children,
  footer,
  compact = false,
  className,
}: CardProps) {
  const isHorizontal = orientation === "horizontal";

  const imgPad = compact ? "p-[12px]" : "p-[20px]";
  const imgPadTop = compact ? "pt-[12px] px-[12px]" : "pt-[20px] px-[20px]";

  // ── Horizontal layout ────────────────────────────────────────────────────────
  if (isHorizontal) {
    // Image fills remaining space; content side is fixed at 450px (matches vertical card width)
    const imageEl = showImage && image ? (
      imageType === "padded" ? (
        <div className={cn("flex-1 bg-surface-level1 self-stretch min-h-0", imgPad)}>
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full rounded-100 object-cover"
          />
        </div>
      ) : (
        <div className="flex-1 self-stretch overflow-hidden min-h-0">
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
      )
    ) : null;

    const isPadded = imageType === "padded";

    const contentCol = (
      <div className="flex flex-col w-[450px] shrink-0">
        {showTitle && !isPadded && <CardHeader title={title} onClose={onClose} />}
        <CardBody compact={compact}>{children}</CardBody>
        {showFooter && <CardFooter noBorder={isPadded}>{footer}</CardFooter>}
      </div>
    );

    return (
      <div
        className={cn(
          "flex flex-row w-[860px] rounded-150 overflow-hidden bg-surface-level1 border border-border-color-level2",
          className,
        )}
      >
        {imagePosition === "right" ? (
          <>{contentCol}{imageEl}</>
        ) : (
          <>{imageEl}{contentCol}</>
        )}
      </div>
    );
  }

  // ── Vertical layout ──────────────────────────────────────────────────────────
  // Image fills the card width and maintains its natural aspect ratio.
  const imageEl = showImage && image ? (
    imageType === "padded" ? (
      <div className={cn("bg-surface-level1 shrink-0", imgPadTop)}>
        <img src={image} alt={imageAlt} className="w-full rounded-100" />
      </div>
    ) : (
      <img src={image} alt={imageAlt} className="w-full shrink-0" />
    )
  ) : null;

  return (
    <div
      className={cn(
        "flex flex-col w-[450px] rounded-150 overflow-hidden bg-surface-level1 border border-border-color-level2",
        className,
      )}
    >
      {showTitle && <CardHeader title={title} onClose={onClose} />}
      {imagePosition === "top" ? (
        <>{imageEl}<CardBody compact={compact}>{children}</CardBody></>
      ) : (
        <><CardBody compact={compact}>{children}</CardBody>{imageEl}</>
      )}
      {showFooter && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}
