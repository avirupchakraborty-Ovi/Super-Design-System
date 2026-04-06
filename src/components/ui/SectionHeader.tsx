"use client";

import { type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface SectionHeaderProps {
  /** Primary label */
  label: string;
  /** Supporting line below the label */
  subText?: string;
  /** Leading icon (Tabler icon) — ignored if image is provided */
  icon?: TablerIcon;
  /** Leading image URL (32×32) */
  image?: string;
  imageAlt?: string;
  /** Trailing button label */
  trailingButton?: string;
  /** Leading icon for the trailing button */
  trailingButtonIcon?: TablerIcon;
  onTrailingButtonClick?: () => void;
  className?: string;
}

export function SectionHeader({
  label,
  subText,
  icon,
  image,
  imageAlt = "",
  trailingButton,
  trailingButtonIcon,
  onTrailingButtonClick,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-100",
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
        <span className="text-body font-medium text-text-level1">{label}</span>
        {subText && (
          <span className="text-supporting text-text-level3">{subText}</span>
        )}
      </div>

      {/* Trailing button */}
      {trailingButton && (
        <Button
          variant="outline"
          shape="full-rounded"
          size="sm"
          leadingIcon={trailingButtonIcon}
          onClick={onTrailingButtonClick}
          className="shrink-0"
        >
          {trailingButton}
        </Button>
      )}
    </div>
  );
}
