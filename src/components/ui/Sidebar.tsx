"use client";

import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { SidebarNavItem } from "@/components/ui/SidebarNavItem";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
>;

export interface SidebarNavItemDef {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarSection {
  /** Optional section header label (e.g. "YOUR APPS") */
  label?: string;
  items: SidebarNavItemDef[];
  /** Full-width button at the bottom of the section */
  footerButton?: {
    label: string;
    leadingIcon?: TablerIcon;
    onClick?: () => void;
  };
}

export interface SidebarUpgradeCard {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export interface SidebarUser {
  name: string;
  avatar?: string;
  onSettingsClick?: () => void;
}

export interface SidebarProps {
  /** Logo / wordmark rendered in the top bar */
  logo?: ReactNode;
  sections: SidebarSection[];
  upgradeCard?: SidebarUpgradeCard;
  user?: SidebarUser;
  className?: string;
}

export function Sidebar({
  logo,
  sections,
  upgradeCard,
  user,
  className,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-[var(--layout-sidebar-width)] h-full bg-surface-sidebar",
        className,
      )}
    >
      {/* ── Logo bar ──────────────────────────────────────────────────────── */}
      <div className="h-900 flex items-center px-200 bg-surface-sidebar shrink-0 overflow-visible">
        <div className="pl-100 shrink-0">{logo}</div>
      </div>

      {/* ── Nav sections ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-y-auto pb-150">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            {/* Separator before every section after the first */}
            {sIdx > 0 && (
              <div className="h-px mx-0 my-200 bg-border-color-inverted" />
            )}

            {/* Section label */}
            {section.label && (
              <p className="pl-400 pr-200 mb-100 text-supporting font-semibold text-text-level3 uppercase">
                {section.label}
              </p>
            )}

            {/* Nav items */}
            <div className="flex flex-col gap-100 px-200">
              {section.items.map((item, iIdx) => (
                <SidebarNavItem
                  key={iIdx}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  onClick={item.onClick}
                />
              ))}
            </div>

            {/* Footer button */}
            {section.footerButton && (
              <div className="px-200 mt-100">
                {(() => {
                  const LeadIcon = section.footerButton.leadingIcon;
                  return (
                    <button
                      type="button"
                      onClick={section.footerButton.onClick}
                      className="flex w-full items-center justify-center gap-100 rounded-075 border border-border-color-inverted px-250 py-100 text-body font-medium text-text-inverted hover:bg-surface-nav-hover cursor-pointer"
                    >
                      {LeadIcon && <LeadIcon size={16} strokeWidth={1.5} className="shrink-0" />}
                      {section.footerButton.label}
                    </button>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Bottom ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-150 shrink-0">
        {/* Upgrade card */}
        {upgradeCard && (
          <div className="mx-100">
            <div
              className="relative rounded-125 px-150 py-175 overflow-hidden"
              style={{ background: "linear-gradient(to bottom, #125736, #23794F)" }}
            >
              {/* Decorative illustration (extracted from Figma) */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full"
                viewBox="0 0 209 133"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="upgrade-glow" x1="-1.5" y1="-26" x2="-1.5" y2="161" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.04" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Glow circle – left edge */}
                <circle cx="-1.5" cy="67.5" r="93.5" fill="url(#upgrade-glow)" />
                {/* Large sparkle – top right */}
                <path d="M179.688 8.47768C179.76 8.15737 180.24 8.15732 180.312 8.47761C183.039 20.6484 188.288 25.9378 200.529 28.6882C200.849 28.7601 200.849 29.2398 200.529 29.3117C188.285 32.0621 183.035 37.3515 180.312 49.5223C180.24 49.8426 179.76 49.8427 179.688 49.5224C176.962 37.3517 171.713 32.0596 159.472 29.3117C159.152 29.2398 159.152 28.76 159.472 28.6881C171.715 25.9376 176.965 20.6482 179.688 8.47768Z" fill="#77CFA4" fillOpacity="0.08" />
                {/* Small sparkle – top right */}
                <path d="M163.14 7.46385C163.235 7.14971 163.765 7.14965 163.86 7.46378C164.635 10.0208 165.971 11.3614 168.543 12.1408C168.857 12.236 168.857 12.764 168.543 12.8591C165.97 13.6385 164.634 14.9791 163.86 17.5361C163.765 17.8503 163.235 17.8503 163.14 17.5362C162.365 14.9794 161.029 13.6383 158.458 12.8591C158.144 12.764 158.144 12.2358 158.458 12.1407C161.03 11.3612 162.366 10.0206 163.14 7.46385Z" fill="#77CFA4" fillOpacity="0.08" />
              </svg>

              {/* Content */}
              <div className="relative flex flex-col gap-125">
                <div className="flex flex-col gap-25">
                  <p className="text-body font-normal text-text-inverted opacity-[0.72]">
                    {upgradeCard.title ?? "You're on Free Plan"}
                  </p>
                  <p className="text-body font-medium text-text-inverted">
                    {upgradeCard.description ?? "Unlock unlimited access to all features and get paid."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={upgradeCard.onCtaClick}
                  className="flex w-full items-center justify-center gap-50 rounded-500 bg-surface-level1 py-75 px-150 text-body font-medium text-text-level1 cursor-pointer hover:bg-surface-level1-hover"
                >
                  {upgradeCard.ctaLabel ?? "Explore Now"} 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User row */}
        {user && (
          <div>
            <div className="h-px bg-border-color-inverted" />
            <button
              type="button"
              onClick={user.onSettingsClick}
              className="flex w-full items-center gap-150 px-200 py-200 bg-surface-nav-settings cursor-pointer hover:bg-surface-nav-hover"
            >
              {/* Avatar */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-300 h-300 rounded-500 object-cover shrink-0 ring-1 ring-border-color-inverted"
                />
              ) : (
                <div className="flex items-center justify-center w-300 h-300 rounded-500 bg-surface-nav-active text-supporting font-semibold text-text-inverted shrink-0 ring-1 ring-border-color-inverted">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="flex-1 text-left text-body font-normal text-text-inverted truncate">
                {user.name}
              </span>
              <IconChevronUp size={16} strokeWidth={1.5} className="shrink-0 text-text-inverted" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
