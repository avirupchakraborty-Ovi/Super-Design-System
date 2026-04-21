"use client";

import {
  type ComponentType,
  type SVGProps,
  Fragment,
  useLayoutEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";
import { Icon } from "@/components/ui/Icon";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface MobilePageHeaderUser {
  name: string;
  avatar?: string;
  onSettingsClick?: () => void;
}

export interface MobilePageHeaderLink {
  label: string;
  icon?: TablerIcon;
  onClick: () => void;
}

export interface MobilePageHeaderProps {
  /** Current page name — MUST match the CollapsiblePageHeader title on the same screen */
  title: string;
  /**
   * User data — MUST be the same object passed to Sidebar's user prop.
   * Passing different data to Sidebar and MobilePageHeader is PROHIBITED (UX_RULES U-Mobile-1).
   */
  user: MobilePageHeaderUser;
  /**
   * Secondary navigation links — renders a second row below the dark bar.
   * MUST match CollapsiblePageHeader's secondaryLinks exactly (UX_RULES U-Mobile-2).
   */
  secondaryLinks?: MobilePageHeaderLink[];
  /** Called when the compact logo is tapped — typically navigates to home/dashboard */
  onLogoClick?: () => void;
  /** Called when the user avatar is tapped — typically opens profile/settings */
  onAvatarClick?: () => void;
  className?: string;
}

// S16: MobilePageHeader — fixed top navigation for sidebar+content screens at Mobile + Tablet (lg:hidden)
export function MobilePageHeader({
  title,
  user,
  secondaryLinks,
  onLogoClick,
  onAvatarClick,
  className,
}: MobilePageHeaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // S15: ResizeObserver keeps --layout-mobile-header-height in sync with actual rendered height.
  // Dynamic because height changes when secondaryLinks are present (~52px without, ~89px with).
  // useLayoutEffect (not useEffect) — fires synchronously before the browser paints, ensuring
  // the CSS variable is set to the correct value on the first frame. useEffect would fire after
  // the first paint with the fallback 52px, causing a reflow and broken sticky positions.
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--layout-mobile-header-height",
        `${el.offsetHeight}px`,
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        // S16: visible only at Mobile and Tablet (0–1023px) — hidden at Desktop/Wide
        "lg:hidden",
        "fixed top-0 left-0 right-0 z-30",
        // R15: safe area inset — pushes content below notch/status bar
        "pt-[env(safe-area-inset-top)]",
        // Adaptive surface — dark in light mode, white in dark mode
        "bg-surface-inverted",
        className,
      )}
    >
      {/* ── Row 1: dark bar — logo | title | avatar ── */}
      <div className="flex items-center justify-between px-200 py-100">

        {/* [logo] — compact SuperProfile icon, 34×34 */}
        <button
          type="button"
          onClick={onLogoClick}
          className="shrink-0"
          aria-label="Home"
        >
          <SuperProfileLogo variant="compact" />
        </button>

        {/* [title] — current page name, centered */}
        <span className="flex-1 text-center text-title font-medium text-text-inverted truncate px-200">
          {title}
        </span>

        {/* [avatar] — user avatar or initial fallback, w-450 h-450 (36×36) */}
        {/* Same data as Sidebar user row — see UX_RULES U-Mobile-1 */}
        <button
          type="button"
          onClick={onAvatarClick ?? user.onSettingsClick}
          className="shrink-0"
          aria-label={`${user.name} — profile settings`}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-450 h-450 rounded-500 object-cover ring-1 ring-border-color-inverted"
            />
          ) : (
            // Fallback: bg-brand-primary-600 + text-text-on-brand — works on both dark (light mode) and light (dark mode) bar
            <div className="flex items-center justify-center w-450 h-450 rounded-500 bg-brand-primary-600 text-supporting font-semibold text-text-on-brand ring-1 ring-border-color-inverted">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </button>

      </div>

      {/* ── Row 2: secondary links bar — conditional ── */}
      {/* U-Mobile-2: MUST match CollapsiblePageHeader's secondaryLinks exactly */}
      {secondaryLinks && secondaryLinks.length > 0 && (
        <div className="bg-surface-level1 border-b border-border-color-level2 shadow-bottom-nav">
          {/* Each link is flex-1 + justify-center — fills width equally, centers content (matches Figma FILL + CENTER) */}
          <div className="flex items-center px-200 py-100">
            {secondaryLinks.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && (
                  <span
                    className="shrink-0 bg-border-color-level2 mx-200"
                    style={{ width: 1, height: 16 }}
                  />
                )}
                <button
                  type="button"
                  onClick={link.onClick}
                  className="flex-1 flex items-center justify-center gap-50 text-body text-text-level2 font-medium"
                >
                  {link.icon && (
                    <Icon icon={link.icon} size="sm" className="text-text-level2" />
                  )}
                  {link.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
