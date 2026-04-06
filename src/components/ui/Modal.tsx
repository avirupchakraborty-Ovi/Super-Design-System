"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ModalClosePosition = "inside" | "outside";
export type ModalOrientation = "vertical" | "horizontal";
export type ModalImageType = "stretched" | "padded";
export type ModalImagePosition = "top" | "below" | "left" | "right";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  /** Inside: X lives in the header. Outside: X floats above the modal (16px gap). */
  closePosition?: ModalClosePosition;
  orientation?: ModalOrientation;
  imageType?: ModalImageType;
  /** Top/Below for vertical; Left/Right for horizontal. */
  imagePosition?: ModalImagePosition;
  showImage?: boolean;
  showFooter?: boolean;
  title?: string;
  image?: string;
  imageAlt?: string;
  /** Body slot */
  children?: ReactNode;
  /** Footer slot */
  footer?: ReactNode;
  className?: string;
}

// ── Internal sub-components ────────────────────────────────────────────────────

function ModalHeader({ title, onClose }: { title?: string; onClose?: () => void }) {
  return (
    <div className="flex items-center gap-[10px] pl-[20px] pr-[12px] py-[16px] border-b border-border-color-level2 bg-surface-level1 shrink-0">
      <span className="flex-1 text-body font-semibold text-text-level1 truncate">{title}</span>
      {onClose && (
        <IconButton icon={IconX} size="xs" variant="ghost" aria-label="Close modal" onClick={onClose} />
      )}
    </div>
  );
}

function ModalBody({ children }: { children?: ReactNode }) {
  return (
    <div className="flex-1 px-[20px] py-[16px] bg-surface-level1">
      {children}
    </div>
  );
}

function ModalFooter({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center gap-[16px] px-[20px] py-[16px] border-t border-border-color-level2 bg-surface-level1 shrink-0">
      {children}
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  closePosition = "inside",
  orientation = "vertical",
  imageType = "stretched",
  imagePosition = "top",
  showImage = true,
  showFooter = true,
  title,
  image,
  imageAlt = "",
  children,
  footer,
  className,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!open || !mounted) return null;

  const isHorizontal = orientation === "horizontal";
  const isOutside = closePosition === "outside";

  // ── Image element ────────────────────────────────────────────────────────────
  const imageEl = showImage && image ? (
    imageType === "padded" ? (
      <div className="pt-[20px] px-[20px] bg-surface-level1 shrink-0">
        <img src={image} alt={imageAlt} className="w-full rounded-100" />
      </div>
    ) : isHorizontal ? (
      // Horizontal: image fills the panel height set by the content column
      <div className="flex-1 self-stretch overflow-hidden min-h-0">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
    ) : (
      // Vertical: image fills modal width, height from natural aspect ratio
      <img src={image} alt={imageAlt} className="w-full shrink-0" />
    )
  ) : null;

  // ── Modal shell ──────────────────────────────────────────────────────────────
  let shell: ReactNode;

  if (isHorizontal) {
    const contentCol = (
      <div className="flex flex-col w-[450px] shrink-0">
        <ModalHeader title={title} onClose={isOutside ? undefined : onClose} />
        <ModalBody>{children}</ModalBody>
        {showFooter && <ModalFooter>{footer}</ModalFooter>}
      </div>
    );

    shell = (
      <div className={cn(
        "flex flex-row w-[857px] rounded-150 overflow-hidden bg-surface-level1 border border-border-color-level2",
        className,
      )}>
        {imagePosition === "right" ? <>{contentCol}{imageEl}</> : <>{imageEl}{contentCol}</>}
      </div>
    );
  } else {
    shell = (
      <div className={cn(
        "flex flex-col w-[450px] rounded-150 overflow-hidden bg-surface-level1 border border-border-color-level2",
        className,
      )}>
        <ModalHeader title={title} onClose={isOutside ? undefined : onClose} />
        {imagePosition === "top" ? (
          <>{imageEl}<ModalBody>{children}</ModalBody></>
        ) : (
          <><ModalBody>{children}</ModalBody>{imageEl}</>
        )}
        {showFooter && <ModalFooter>{footer}</ModalFooter>}
      </div>
    );
  }

  // ── Backdrop + layout ────────────────────────────────────────────────────────
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {isOutside ? (
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-end">
            <IconButton icon={IconX} size="xs" variant="secondary" aria-label="Close modal" onClick={onClose} />
          </div>
          {shell}
        </div>
      ) : (
        shell
      )}
    </div>,
    document.body,
  );
}
