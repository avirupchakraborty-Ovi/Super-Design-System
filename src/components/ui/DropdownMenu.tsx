"use client";

import { type ReactNode, type ComponentType, type SVGProps } from "react";
import * as Radix from "@radix-ui/react-dropdown-menu";
import { IconChevronDown, IconChevronRight, IconSearch, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

// ── Re-exports ─────────────────────────────────────────────────────────────────
export const DropdownMenu       = Radix.Root;
export const DropdownMenuTrigger = Radix.Trigger;
export const DropdownMenuRadioGroup = Radix.RadioGroup;

// ── Chevron Trigger ────────────────────────────────────────────────────────────
// Note: cornerRadius 5px from Figma — no token exists, using rounded-[5px] (hardcoded)

export type DropdownMenuChevronTriggerSize = "md" | "sm";

export interface DropdownMenuChevronTriggerProps {
  children: ReactNode;
  /** Optional leading icon */
  icon?: TablerIcon;
  /** Size variant — md: 10px vertical padding (default), sm: 8px vertical padding */
  size?: DropdownMenuChevronTriggerSize;
  className?: string;
}

const chevronTriggerSizeStyles: Record<DropdownMenuChevronTriggerSize, string> = {
  md: "px-150 py-125",
  sm: "px-150 py-100",
};

export function DropdownMenuChevronTrigger({
  children,
  icon,
  size = "md",
  className,
}: DropdownMenuChevronTriggerProps) {
  return (
    <Radix.Trigger
      className={cn(
        "group inline-flex w-full items-center gap-100",
        // cornerRadius 5px from Figma — no token exists, using rounded-[5px] (hardcoded)
        "rounded-[5px]",
        chevronTriggerSizeStyles[size],
        "bg-surface-level1 border border-border-color-level2",
        "text-body text-text-level1 text-left cursor-pointer outline-none select-none",
        "data-[state=open]:border-border-color-level3 data-[state=open]:bg-surface-level1-hover",
        className,
      )}
    >
      {icon && (
        <Icon icon={icon} size={size === "sm" ? "sm" : "md"} noOffset className="shrink-0 text-text-level3" />
      )}
      <span className="flex-1 min-w-0 truncate">{children}</span>
      <span className="inline-flex shrink-0 items-center justify-center transition-transform group-data-[state=open]:rotate-180">
        <Icon
          icon={IconChevronDown}
          size={size === "sm" ? "sm" : "md"}
          noOffset
          className="text-text-level3"
        />
      </span>
    </Radix.Trigger>
  );
}

// ── Compact Trigger (Filter / Sort / Export style) ─────────────────────────────

export interface DropdownMenuCompactTriggerProps {
  children: ReactNode;
  icon?: TablerIcon;
  className?: string;
}

export function DropdownMenuCompactTrigger({
  children,
  icon,
  className,
}: DropdownMenuCompactTriggerProps) {
  return (
    <Radix.Trigger
      className={cn(
        "group inline-flex items-center gap-[8px]",
        "px-[12px] py-[8px] rounded-100",
        "border border-border-color-level2",
        "text-body font-medium text-text-level1 cursor-pointer outline-none select-none",
        "hover:bg-surface-level2 data-[state=open]:bg-surface-level2",
        "data-[state=open]:border-border-color-level3",
        className,
      )}
    >
      {icon && (
        <span className="inline-flex shrink-0 items-center justify-center" style={{ width: 16, height: 20 }}>
          <Icon icon={icon} size="md" noOffset className="text-text-level2" />
        </span>
      )}
      {children}
      <span className="inline-flex shrink-0 items-center justify-center transition-transform group-data-[state=open]:rotate-180">
        <Icon icon={IconChevronDown} size="sm" noOffset className="text-text-level3" />
      </span>
    </Radix.Trigger>
  );
}

// ── Content (panel) ────────────────────────────────────────────────────────────

export interface DropdownMenuContentProps {
  children: ReactNode;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  /** Panel width in px (default 330) */
  width?: number;
  /** Remove the border from the dropdown panel */
  borderless?: boolean;
  className?: string;
}

export function DropdownMenuContent({
  children,
  sideOffset = 4,
  align = "end",
  width = 330,
  borderless = false,
  className,
}: DropdownMenuContentProps) {
  return (
    <Radix.Portal>
      <Radix.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 rounded-150 bg-surface-level1",
          !borderless && "border border-border-color-level2",
          "px-[4px] pt-[16px] pb-[4px] overflow-hidden",
          className,
        )}
        style={{
          width,
          boxShadow: "var(--shadow-dropdown)",
        }}
      >
        {children}
      </Radix.Content>
    </Radix.Portal>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────

export interface DropdownMenuHeaderProps {
  title: string;
  subtitle?: string;
}

export function DropdownMenuHeader({ title, subtitle }: DropdownMenuHeaderProps) {
  return (
    <div className="px-[12px] pb-[12px]">
      <p className="text-body font-semibold text-text-level1">{title}</p>
      {subtitle && (
        <p className="mt-[2px] text-supporting text-text-level3">{subtitle}</p>
      )}
    </div>
  );
}

// ── Search ─────────────────────────────────────────────────────────────────────

export interface DropdownMenuSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function DropdownMenuSearch({
  value,
  onChange,
  placeholder = "Search...",
}: DropdownMenuSearchProps) {
  return (
    <div className="px-[12px] pb-[8px]">
      <div className="flex items-center gap-[8px] px-[10px] py-[8px] border border-border-color-level2 rounded-100 bg-surface-level1">
        <span className="inline-flex shrink-0 items-center justify-center" style={{ width: 16, height: 20 }}>
          <Icon icon={IconSearch} size="md" noOffset className="text-text-level3" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.stopPropagation()}
          className="flex-1 text-body text-text-level1 placeholder:text-text-level4 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

// ── Label (group header) ───────────────────────────────────────────────────────

export interface DropdownMenuLabelProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps) {
  return (
    <Radix.Label
      className={cn(
        "flex items-center justify-between px-[12px] py-[8px]",
        "text-body font-semibold text-text-level1",
        className,
      )}
    >
      {children}
      <Icon icon={IconChevronDown} size="md" noOffset className="text-text-level3 shrink-0" />
    </Radix.Label>
  );
}

// ── Separator ──────────────────────────────────────────────────────────────────

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <Radix.Separator
      className={cn("my-[4px] mx-[12px] border-t border-border-color-level1", className)}
    />
  );
}

// ── Item ───────────────────────────────────────────────────────────────────────

export interface DropdownMenuItemProps {
  children: ReactNode;
  subText?: string;
  icon?: TablerIcon;
  image?: string;
  imageAlt?: string;
  /** Numeric or string counter shown on trailing side */
  counter?: number | string;
  /** Pill badge label on trailing side */
  badge?: string;
  /** Inline action button label shown on trailing side */
  trailingButton?: string;
  onTrailingButtonClick?: () => void;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function DropdownMenuItem({
  children,
  subText,
  icon,
  image,
  imageAlt = "",
  counter,
  badge,
  trailingButton,
  onTrailingButtonClick,
  disabled,
  onSelect,
  className,
}: DropdownMenuItemProps) {
  return (
    <Radix.Item
      disabled={disabled}
      onSelect={onSelect}
      className={cn(
        "flex items-start gap-[8px] px-[12px] py-[8px] rounded-100",
        "cursor-pointer outline-none select-none",
        "data-[highlighted]:bg-surface-level1-hover",
        "data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed",
        className,
      )}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="w-[32px] h-[32px] rounded-100 object-cover shrink-0 mt-px"
        />
      )}
      {icon && !image && (
        <span className="inline-flex shrink-0 items-center justify-center mt-px" style={{ width: 16, height: 20 }}>
          <Icon icon={icon} size="md" noOffset className="text-text-level2" />
        </span>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-body font-medium text-text-level1 truncate">{children}</span>
        {subText && (
          <span className="text-supporting text-text-level3 truncate">{subText}</span>
        )}
      </div>
      {counter !== undefined && (
        <span className="shrink-0 text-supporting font-medium text-text-level3 mt-px">{counter}</span>
      )}
      {badge && (
        <span className="shrink-0 text-supporting font-medium text-text-brand-primary bg-surface-brand-primary-subtle px-[8px] py-[2px] rounded-500">
          {badge}
        </span>
      )}
      {trailingButton && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onTrailingButtonClick?.(); }}
          className="shrink-0 inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-500 border border-border-color-level2 text-supporting font-medium text-text-level1 cursor-pointer"
        >
          <span>+</span>
          <span>{trailingButton}</span>
          <span>+</span>
        </button>
      )}
    </Radix.Item>
  );
}

// ── Checkbox Item ──────────────────────────────────────────────────────────────

export interface DropdownMenuCheckboxItemProps {
  children: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: TablerIcon;
  image?: string;
  imageAlt?: string;
  disabled?: boolean;
  className?: string;
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  icon,
  image,
  imageAlt = "",
  disabled,
  className,
}: DropdownMenuCheckboxItemProps) {
  return (
    <Radix.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(
        "flex items-start gap-[8px] px-[12px] py-[8px] rounded-100",
        "cursor-pointer outline-none select-none",
        "data-[highlighted]:bg-surface-level1-hover",
        "data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed",
        className,
      )}
    >
      {image && (
        <img src={image} alt={imageAlt} className="w-[32px] h-[32px] rounded-100 object-cover shrink-0" />
      )}
      {icon && !image && (
        <span className="inline-flex shrink-0 items-center justify-center" style={{ width: 16, height: 20 }}>
          <Icon icon={icon} size="md" noOffset className="text-text-level2" />
        </span>
      )}
      <span className="flex-1 text-body font-medium text-text-level1">{children}</span>
      {/* Custom checkbox */}
      <span
        className={cn(
          "shrink-0 w-[16px] h-[16px] rounded-[4px] border flex items-center justify-center mt-px",
          checked
            ? "bg-surface-inverted border-transparent"
            : "border-border-color-level2",
        )}
      >
        <Radix.ItemIndicator>
          <Icon icon={IconCheck} size="sm" noOffset className="text-text-inverted" />
        </Radix.ItemIndicator>
      </span>
    </Radix.CheckboxItem>
  );
}

// ── Radio Item ─────────────────────────────────────────────────────────────────

export interface DropdownMenuRadioItemProps {
  children: ReactNode;
  value: string;
  icon?: TablerIcon;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function DropdownMenuRadioItem({
  children,
  value,
  icon,
  image,
  imageAlt = "",
  className,
}: DropdownMenuRadioItemProps) {
  return (
    <Radix.RadioItem
      value={value}
      className={cn(
        "flex items-start gap-[8px] px-[12px] py-[8px] rounded-100",
        "cursor-pointer outline-none select-none",
        "data-[highlighted]:bg-surface-level1-hover",
        className,
      )}
    >
      {/* Radio circle */}
      <span className="shrink-0 w-[16px] h-[16px] rounded-500 border border-border-color-level2 flex items-center justify-center mt-[2px]">
        <Radix.ItemIndicator>
          <span className="block w-[8px] h-[8px] rounded-500 bg-surface-inverted" />
        </Radix.ItemIndicator>
      </span>
      {image && (
        <img src={image} alt={imageAlt} className="w-[32px] h-[32px] rounded-100 object-cover shrink-0" />
      )}
      {icon && !image && (
        <span className="inline-flex shrink-0 items-center justify-center" style={{ width: 16, height: 20 }}>
          <Icon icon={icon} size="md" noOffset className="text-text-level2" />
        </span>
      )}
      <span className="flex-1 text-body font-medium text-text-level1">{children}</span>
    </Radix.RadioItem>
  );
}

// ── Upgrade CTA ────────────────────────────────────────────────────────────────

export interface DropdownMenuUpgradeCTAProps {
  label?: string;
  onClick?: () => void;
}

export function DropdownMenuUpgradeCTA({
  label = "Upgrade to unlock",
  onClick,
}: DropdownMenuUpgradeCTAProps) {
  return (
    <div className="flex items-center justify-center gap-[4px] px-[12px] py-[12px] bg-surface-brand-primary-subtle mt-[4px] -mx-[4px] -mb-[4px]">
      <button
        type="button"
        onClick={onClick}
        className="text-supporting font-medium text-text-brand-primary cursor-pointer"
      >
        {label}
      </button>
      <Icon icon={IconChevronRight} size="sm" noOffset className="text-text-brand-primary" />
    </div>
  );
}
