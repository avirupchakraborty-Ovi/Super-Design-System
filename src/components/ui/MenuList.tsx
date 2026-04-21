"use client";

import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export type MenuListItemState = "default" | "hover" | "selected" | "disabled";

export interface MenuListItemProps {
  /** Primary label */
  label: string;
  /** Secondary supporting line below the label */
  subText?: string;
  /** Leading icon (Tabler icon) — ignored if image is provided */
  icon?: TablerIcon;
  /** Leading image URL (32×32) */
  image?: string;
  imageAlt?: string;
  /** Trailing numeric or string counter */
  counter?: number | string;
  /** Trailing pill badge label */
  badge?: string;
  /** Trailing action button label — renders a Button outline pill */
  trailingButton?: string;
  onTrailingButtonClick?: () => void;
  /** Visual state — use "hover" / "selected" for static story demos */
  state?: MenuListItemState;
  onClick?: () => void;
  className?: string;
}

export interface MenuListProps {
  children: ReactNode;
  className?: string;
}

// ── MenuListItem ───────────────────────────────────────────────────────────────

export function MenuListItem({
  label,
  subText,
  icon,
  image,
  imageAlt = "",
  counter,
  badge,
  trailingButton,
  onTrailingButtonClick,
  state = "default",
  onClick,
  className,
}: MenuListItemProps) {
  const isDisabled = state === "disabled";

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      className={cn(
        "flex items-start gap-100 px-150 py-100 rounded-100",
        (state === "hover" || state === "selected") && "bg-surface-level1-hover",
        isDisabled && "opacity-40 cursor-not-allowed",
        !isDisabled && onClick && "cursor-pointer",
        className,
      )}
    >
      {/* Leading image — 32×32 */}
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="w-[32px] h-[32px] rounded-100 object-cover shrink-0 mt-px"
        />
      )}

      {/* Leading icon — only when no image */}
      {icon && !image && (
        <span
          className="inline-flex shrink-0 items-center justify-center mt-px"
          style={{ width: 16, height: 20 }}
        >
          <Icon icon={icon} size="md" noOffset className="text-text-level2" />
        </span>
      )}

      {/* Text content */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-body font-medium text-text-level1 truncate">{label}</span>
        {subText && (
          <span className="text-supporting text-text-level3 truncate">
            {subText}
          </span>
        )}
      </div>

      {/* Trailing counter */}
      {counter !== undefined && (
        <span className="shrink-0 text-supporting font-medium text-text-level3 mt-px">
          {counter}
        </span>
      )}

      {/* Trailing badge */}
      {badge && (
        <span className="shrink-0 text-supporting font-medium text-text-brand-primary bg-surface-brand-primary-subtle px-100 py-25 rounded-500">
          {badge}
        </span>
      )}

      {/* Trailing action button */}
      {trailingButton && (
        <Button
          variant="outline"
          shape="full-rounded"
          size="xs"
          onClick={onTrailingButtonClick}
          className="shrink-0"
        >
          {trailingButton}
        </Button>
      )}
    </div>
  );
}

// ── MenuList wrapper ───────────────────────────────────────────────────────────

export function MenuList({ children, className }: MenuListProps) {
  return (
    <div
      className={cn(
        "border border-border-color-level2 rounded-100 p-100 flex flex-col gap-50",
        className,
      )}
    >
      {children}
    </div>
  );
}
