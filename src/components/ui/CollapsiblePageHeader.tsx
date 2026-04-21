"use client";

import {
  type ReactNode,
  type ComponentType,
  type SVGProps,
  useState,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface CollapsiblePageHeaderLink {
  label: string;
  icon?: TablerIcon;
  onClick: () => void;
}

export interface CollapsiblePageHeaderProps {
  /** Page title — large centered in expanded, compact left in collapsed */
  title: string;
  /** Item count — shown as Badge next to title in collapsed state only */
  count?: number;
  /** Secondary navigation links — below title in expanded, right-aligned in collapsed */
  secondaryLinks?: CollapsiblePageHeaderLink[];
  /** CTA buttons — pinned top-right, always visible (never transitions between phases) */
  actions?: ReactNode;
  /**
   * Background slot for the expanded hero area — absolutely positioned behind content.
   * Accepts any ReactNode: gradient div, image, video, etc.
   * Not rendered in collapsed state.
   */
  background?: ReactNode;
  /** Optional content rendered inside the expanded hero area, below the title. Scrolls normally — does NOT appear in collapsed state. */
  children?: ReactNode;
  /**
   * Adds extra bottom padding to the hero so content placed immediately after
   * the component (e.g. a stat card row) can visually overlap the bottom of the
   * background. Does not affect collapsed state.
   */
  bottomOverhang?: boolean;
  className?: string;
}

type Phase = "expanded" | "collapsed-gradient" | "collapsed-white";

function SecondaryLinks({
  links,
  colorClass,
  sizeClass = "text-title",
}: {
  links: CollapsiblePageHeaderLink[];
  colorClass: string;
  sizeClass?: string;
}) {
  return (
    <div className="flex items-center gap-150">
      {links.map((link, i) => (
        <div key={link.label} className="flex items-center gap-150">
          {i > 0 && (
            <span
              className="shrink-0 bg-border-color-level2"
              style={{ width: 1, height: 20 }}
            />
          )}
          <button
            type="button"
            onClick={link.onClick}
            className={cn(
              "flex items-center gap-50 font-medium transition-all duration-300",
              sizeClass,
              colorClass,
            )}
          >
            {link.icon && (
              <Icon icon={link.icon} size="sm" className={colorClass} />
            )}
            {link.label}
          </button>
        </div>
      ))}
    </div>
  );
}

// R17: CollapsiblePageHeader — three-phase scroll-responsive page header
export function CollapsiblePageHeader({
  title,
  count,
  secondaryLinks,
  actions,
  background,
  children,
  bottomOverhang,
  className,
}: CollapsiblePageHeaderProps) {
  const [titleVisible, setTitleVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Keep --layout-collapsed-bar-height in sync with the actual rendered bar height.
  // Static calculation is unreliable (env safe-area, font scale, etc.) — measure directly.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--layout-collapsed-bar-height",
        `${bar.offsetHeight}px`,
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  // R17: scroll-driven phase transitions.
  // Uses a scroll event listener on the auto-detected scrollable ancestor.
  // IntersectionObserver with a non-document root proved unreliable in nested
  // overflow-y:auto containers — scroll listeners are the robust fallback.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Walk up the DOM to find the nearest scrollable ancestor
    let scrollParent: HTMLElement | null = hero.parentElement;
    while (scrollParent) {
      const { overflowY } = getComputedStyle(scrollParent);
      if (overflowY === "auto" || overflowY === "scroll") break;
      scrollParent = scrollParent.parentElement;
    }
    if (!scrollParent) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        // Phase 1 → 2: any scroll at all
        setTitleVisible(scrollParent!.scrollTop <= 0);
        // Phase 2 → 3: hero ≤ 50% visible (50% scrolled)
        const heroRect = hero!.getBoundingClientRect();
        const parentRect = scrollParent!.getBoundingClientRect();
        const visiblePx = Math.max(0, heroRect.bottom - parentRect.top);
        const total = hero!.offsetHeight;
        setHeroVisible(total > 0 && visiblePx / total > 0.5);
      });
    }

    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync initial state
    return () => scrollParent!.removeEventListener("scroll", onScroll);
  }, []);

  const phase: Phase = titleVisible
    ? "expanded"
    : heroVisible
      ? "collapsed-gradient"
      : "collapsed-white";

  const isCollapsed = phase !== "expanded";
  const isWhite = phase === "collapsed-white";

  // Text color for collapsed bar — transitions between phases
  const collapsedTitleColor = isWhite
    ? "text-text-level1"
    : "text-text-on-brand";
  const collapsedLinkColor = isWhite
    ? "text-text-level2"
    : "text-text-on-brand";

  return (
    <div className={cn("relative", className)}>
      {/* ── Fixed bar — always present, pointer-events-none so hero receives clicks ── */}
      {/* R17: position:fixed chosen over sticky because sticky is bounded by its containing block height.
           Once the hero scrolls away the sticky bar would disappear; fixed keeps it visible always. */}
      <div
        ref={barRef}
        className={cn(
          // S16: fixed bar visible only at Desktop/Wide — MobilePageHeader takes this role at Mobile/Tablet
          "hidden lg:block",
          "fixed top-0 right-0 z-20",
          // On desktop (lg+), offset left edge past the sidebar so title is visible
          "left-0 lg:left-[var(--layout-sidebar-width)]",
          // R15: safe area inset
          "pt-[env(safe-area-inset-top)]",
          // S6: responsive horizontal padding
          "px-200 sm:px-300 md:px-400",
          // Wrapper is inert — individual children opt into pointer-events
          "pointer-events-none",
        )}
      >
        {/* Background layer — transitions between transparent / white */}
        <div
          className={cn(
            "absolute inset-0",
            "transition-[background-color,border-color] duration-300 ease-in-out",
            isWhite
              ? "bg-surface-level1 border-b border-border-color-level2"
              : "bg-transparent border-b border-transparent",
          )}
        />

        <div className="relative flex items-center justify-between py-200">
          {/* Left: compact title + count badge — slides in from top */}
          <div
            className={cn(
              "flex items-center gap-100 min-w-0",
              "transition-all duration-300 ease-in-out",
              isCollapsed
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-4 opacity-0",
            )}
          >
            <h2
              className={cn(
                "text-h3 font-semibold truncate transition-colors duration-300",
                collapsedTitleColor,
              )}
            >
              {title}
            </h2>
            {count !== undefined && (
              <Badge colour="neutral" fill="light" type="full-rounded">
                {count}
              </Badge>
            )}
          </div>

          {/* Right: secondary links (slide in) + CTA (always visible) */}
          <div className="flex items-center gap-200 shrink-0">
            {secondaryLinks && secondaryLinks.length > 0 && (
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  isCollapsed
                    ? "translate-y-0 opacity-100 pointer-events-auto"
                    : "-translate-y-4 opacity-0",
                )}
              >
                <SecondaryLinks
                  links={secondaryLinks}
                  colorClass={collapsedLinkColor}
                  sizeClass="text-body"
                />
              </div>
            )}
            {/* CTA — always visible, never transitions. Fixed position eliminates Phase 1→2 glitch. */}
            {actions && (
              <div className="flex items-center gap-100 pointer-events-auto">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Expanded hero — scrolls normally ── */}
      <div ref={heroRef} className="relative">
        {/* Background slot — absolutely positioned, extends behind children */}
        {background && (
          <div className="absolute inset-0 overflow-hidden">{background}</div>
        )}

        <div className="relative">
          {/* Title + secondary links — centered, slides out to bottom when collapsed.
              pt-[80px] clears the fixed CTA bar height (replaces the removed CTA row). */}
          <div
            className={cn(
              "flex flex-col items-center gap-150 px-200 sm:px-300 md:px-400 pt-1000 pb-300",
              "transition-all duration-300 ease-in-out",
              isCollapsed
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100",
            )}
          >
            <h1 className="text-display font-semibold text-text-on-brand">
              {title}
            </h1>
            {secondaryLinks && secondaryLinks.length > 0 && (
              <SecondaryLinks
                links={secondaryLinks}
                colorClass="text-text-on-brand"
                sizeClass="text-title"
              />
            )}
          </div>

          {/* Optional hero content (children) */}
          {children && (
            <div className="px-200 sm:px-300 md:px-400 pb-300">
              {children}
            </div>
          )}

          {/* Bottom overhang spacer — creates space for external content to overlap the hero background */}
          {bottomOverhang && !children && (
            <div className="h-[56px]" />
          )}
        </div>
      </div>
    </div>
  );
}
