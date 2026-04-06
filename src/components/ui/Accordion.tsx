"use client";

import { type ComponentType, type ReactNode, type SVGProps } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

// ── AccordionItem ─────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  /** Unique value used to control open/close state */
  value: string;
  /** Header title */
  label: string;
  /** Optional secondary line below the header title */
  subText?: string;
  /** Optional leading icon */
  leadingIcon?: TablerIcon;
  /** Optional 40×40 leading thumbnail image */
  image?: string;
  imageAlt?: string;
  /** Body content rendered when expanded */
  children?: ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  label,
  subText,
  leadingIcon,
  image,
  imageAlt = "",
  children,
  className,
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item
      value={value}
      className={cn(
        "bg-surface-level1 border border-border-color-level2 rounded-100",
        className,
      )}
    >
      {/* ── Header / Trigger ─────────────────────────────────── */}
      <RadixAccordion.Header asChild>
        <RadixAccordion.Trigger
          className={cn(
            "group w-full flex items-start justify-between gap-[8px]",
            "p-200 cursor-pointer",
            // Remove default button styles
            "bg-transparent border-0 text-left",
          )}
        >
          {/* Left group: icon + image + text */}
          <div className="flex items-start gap-[8px] flex-1 min-w-0">
            {leadingIcon && (
              <Icon
                icon={leadingIcon}
                size="md"
                noOffset
                className="shrink-0 text-text-level2"
              />
            )}
            {image && (
              <img
                src={image}
                alt={imageAlt}
                className="w-[40px] h-[40px] rounded-050 object-cover shrink-0"
              />
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-body font-semibold text-text-level1 text-left">
                {label}
              </span>
              {subText && (
                <span className="text-supporting text-text-level3 truncate">
                  {subText}
                </span>
              )}
            </div>
          </div>

          {/* Chevron — rotates 180° when open, top-aligned with label */}
          <span className="shrink-0 mt-px transition-transform duration-200 group-data-[state=open]:rotate-180">
            <Icon icon={IconChevronDown} size="md" noOffset className="text-text-level3" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      {/* ── Expandable content ───────────────────────────────── */}
      <RadixAccordion.Content className="accordion-content overflow-hidden">
        <div className="px-200 pb-200 pt-0 flex flex-col gap-50">
          {children}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}

// ── Accordion root ────────────────────────────────────────────────────────────

export interface AccordionSingleProps {
  type: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export interface AccordionMultipleProps {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children: ReactNode;
  className?: string;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export function Accordion({ children, className, ...props }: AccordionProps) {
  return (
    <RadixAccordion.Root
      {...(props as AccordionSingleProps)}
      className={cn("flex flex-col gap-[8px]", className)}
    >
      {children}
    </RadixAccordion.Root>
  );
}
