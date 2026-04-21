import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type PageHeaderLayout =
  | "full-stretch"
  | "centered"
  | "aside-panel"
  | "proportional-split";

export interface PageHeaderProps {
  /** Page heading — rendered as h1 */
  title: string;
  /** Optional description below the heading */
  subtext?: string;
  /** Trailing actions (Buttons, IconButtons, Badges) — right-aligned */
  actions?: ReactNode;
  /**
   * Layout type — determines the responsive inner structure.
   * Per LAYOUT.md S13 and S15.
   */
  layout: PageHeaderLayout;
  /**
   * Tailwind class for the actions column width at Wide breakpoint.
   * Required when layout="aside-panel" — mirrors the aside panel width.
   * e.g. "lg:w-[260px]" (SP8 exception — must be commented at call site).
   */
  asideWidthClass?: string;
  className?: string;
}

export function PageHeader({
  title,
  subtext,
  actions,
  layout,
  asideWidthClass,
  className,
}: PageHeaderProps) {
  const heading = (
    <>
      <h1 className="text-h2 font-semibold text-text-level1">{title}</h1>
      {subtext && (
        <p className="text-body font-normal text-text-level3">{subtext}</p>
      )}
    </>
  );

  return (
    // R16: hidden md:block — TaskHeader owns Mobile/Tablet
    <div
      className={cn(
        "hidden md:block flex-none",
        "bg-surface-level1 border-b border-border-color-level2",
        // S6: responsive horizontal padding
        "px-200 sm:px-300 md:px-400",
        "py-250",
        className,
      )}
    >
      {layout === "aside-panel" ? (
        // S13 aside-panel: centered at content-max-width at Desktop, column-mirrored at Wide
        <div className="flex gap-300 items-center w-full md:w-[var(--layout-content-max-width)] md:mx-auto lg:w-fit">
          <div className="flex-1 min-w-0 flex flex-col gap-50 lg:w-[var(--layout-content-max-width)] lg:flex-none">
            {heading}
          </div>
          {actions && (
            <div
              className={cn(
                "flex-none flex items-center justify-end gap-100",
                asideWidthClass,
              )}
            >
              {actions}
            </div>
          )}
        </div>
      ) : layout === "centered" ? (
        // S13 centered: constrained to content-max-width, centered
        <div className="w-[var(--layout-content-max-width)] mx-auto flex items-center">
          <div className="flex-1 min-w-0 flex flex-col gap-50">{heading}</div>
          {actions && (
            <div className="flex-none flex items-center justify-end gap-100">
              {actions}
            </div>
          )}
        </div>
      ) : (
        // S13 full-stretch & proportional-split: full-width flex
        <div className="flex items-center">
          <div className="flex-1 min-w-0 flex flex-col gap-50">{heading}</div>
          {actions && (
            <div className="flex-none flex items-center justify-end gap-100">
              {actions}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
