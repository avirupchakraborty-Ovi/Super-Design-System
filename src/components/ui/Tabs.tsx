"use client";

import { createContext, useContext, type ComponentType, type ReactNode, type SVGProps } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export type TabsVariant = "pill" | "line" | "blue-gradient" | "purple-gradient" | "pill2";

// ── Variant context ───────────────────────────────────────────────────────────
const VariantContext = createContext<TabsVariant>("pill");

// ── Styling maps ──────────────────────────────────────────────────────────────

const listStyles: Record<TabsVariant, string> = {
  "pill":             "flex flex-row flex-wrap gap-100",
  "line":             "flex flex-row border-b border-border-color-level2 gap-500 w-full",
  "blue-gradient":    "flex flex-row flex-wrap gap-100",
  "purple-gradient":  "flex flex-row flex-wrap gap-100",
  "pill2":            "flex flex-row flex-wrap gap-100 bg-surface-level2 rounded-500 p-[4px] w-fit",
};

// Base classes shared by all variants
const triggerBase =
  "inline-flex items-center gap-100 cursor-pointer text-body font-medium transition-colors outline-none select-none";

const triggerStyles: Record<TabsVariant, string> = {
  "pill": cn(
    triggerBase,
    "px-200 py-75 rounded-500 border",
    // Inactive
    "border-border-color-level2 text-text-level1",
    // Active
    "data-[state=active]:bg-surface-inverted data-[state=active]:text-text-inverted data-[state=active]:border-transparent",
  ),
  "line": cn(
    triggerBase,
    "py-200 border-b-2 border-transparent -mb-px relative",
    // Inactive
    "text-text-level3",
    // Active
    "data-[state=active]:text-text-brand-primary data-[state=active]:border-border-color-primary",
  ),
  "blue-gradient": cn(
    triggerBase,
    "px-200 py-125 rounded-100 border",
    // Inactive
    "bg-white text-text-level3 border-border-color-level2",
    // Active
    "data-[state=active]:text-text-level1",
    "data-[state=active]:border-border-color-primary-wash",
    "data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-[#C7E4FF]",
  ),
  "purple-gradient": cn(
    triggerBase,
    "px-200 py-125 rounded-100 border",
    // Inactive
    "bg-white text-text-level3 border-border-color-level2",
    // Active
    "data-[state=active]:text-text-level1",
    "data-[state=active]:border-border-color-secondary-wash",
    "data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-[#E5D1FF]",
  ),
  "pill2": cn(
    triggerBase,
    "px-200 py-125 rounded-500",
    // Inactive
    "text-text-level3",
    // Active
    "data-[state=active]:bg-surface-level1 data-[state=active]:text-text-level1",
    "data-[state=active]:[box-shadow:var(--shadow-pill-tab)]",
  ),
};

// ── Tabs root ─────────────────────────────────────────────────────────────────

export interface TabsProps {
  variant?: TabsVariant;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  variant = "pill",
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: TabsProps) {
  return (
    <VariantContext.Provider value={variant}>
      <RadixTabs.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={cn("flex flex-col", className)}
      >
        {children}
      </RadixTabs.Root>
    </VariantContext.Provider>
  );
}

// ── TabsList ──────────────────────────────────────────────────────────────────

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  const variant = useContext(VariantContext);
  return (
    <RadixTabs.List className={cn(listStyles[variant], className)}>
      {children}
    </RadixTabs.List>
  );
}

// ── TabsTrigger ───────────────────────────────────────────────────────────────

export interface TabsTriggerProps {
  value: string;
  icon?: TablerIcon;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabsTrigger({ value, icon, children, className, disabled }: TabsTriggerProps) {
  const variant = useContext(VariantContext);
  return (
    <RadixTabs.Trigger
      value={value}
      disabled={disabled}
      className={cn(
        triggerStyles[variant],
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {icon && (
        <span className="inline-flex shrink-0 items-center justify-center" style={{ width: 16, height: 20 }}>
          <Icon icon={icon} size="md" noOffset />
        </span>
      )}
      {children}
    </RadixTabs.Trigger>
  );
}

// ── TabsContent ───────────────────────────────────────────────────────────────

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <RadixTabs.Content
      value={value}
      className={cn("mt-300 outline-none", className)}
    >
      {children}
    </RadixTabs.Content>
  );
}
