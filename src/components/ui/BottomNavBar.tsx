"use client";

import { type ComponentType, type SVGProps, useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { BottomSheetListItem } from "@/components/ui/BottomSheetListItem";

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface BottomNavItem {
  id: string;
  icon: TablerIcon;
  label: string;
  onClick?: () => void;
}

export interface BottomNavOverflowItem {
  id: string;
  icon: TablerIcon;
  label: string;
  subText: string;
  onClick?: () => void;
}

export interface BottomNavBarProps {
  /** Direct nav items shown in the bar (max 4 when overflowItems present, max 5 without) */
  items: BottomNavItem[];
  /** Secondary items shown in the overflow BottomSheet — triggers a "More" slot */
  overflowItems?: BottomNavOverflowItem[];
  /** ID of the currently active item (may be a direct item or an overflow item) */
  activeItem: string;
  className?: string;
}

// ── NavSlot ────────────────────────────────────────────────────────────────────

function NavSlot({
  icon: NavIcon,
  label,
  isActive,
  iconStroke,
  activeIconStroke,
  onClick,
}: {
  icon: TablerIcon;
  label: string;
  isActive: boolean;
  /** Stroke weight for inactive state at size=24. Scaled from Figma's measured value at the inner clip-frame size. */
  iconStroke: number;
  /** Stroke weight for active state at size=24. Defaults to iconStroke if omitted. */
  activeIconStroke?: number;
  onClick?: () => void;
}) {
  const stroke = isActive ? (activeIconStroke ?? iconStroke) : iconStroke;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 flex-col items-center justify-center cursor-pointer",
        "bg-transparent appearance-none border-0",
        // Active: 2px top border indicator. Inactive: no border — full 57px for centering (matches Figma)
        isActive
          ? "border-t-2 border-text-brand-primary text-text-brand-primary"
          : "text-text-level3",
      )}
    >
      {/* SP8 exception — 24×24px icon container; no Icon size token maps to 24px (Figma-spec nav icon size) */}
      {/* SP8 exception — nav icons: inactive stroke=1.06, active stroke=1.8 */}
      {/* SP8 exception — More trigger: inactive stroke=1.2, active stroke=1.8 */}
      <span className="inline-flex w-6 h-6 items-center justify-center shrink-0">
        <NavIcon size={24} stroke={stroke} />
      </span>
      <span
        className={cn(
          "text-supporting",
          isActive ? "font-semibold" : "font-normal",
        )}
        style={{ letterSpacing: "0.02em" }} /* SP8 exception — 2% Figma spec; no Tailwind tracking token maps to this value */
      >
        {label}
      </span>
    </button>
  );
}

// ── BottomNavBar ───────────────────────────────────────────────────────────────

export function BottomNavBar({
  items,
  overflowItems,
  activeItem,
  className,
}: BottomNavBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasOverflow = overflowItems && overflowItems.length > 0;
  const isOverflowActive = hasOverflow
    ? overflowItems.some((item) => item.id === activeItem)
    : false;

  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 flex lg:hidden",
          "bg-surface-level1 shadow-bottom-nav",
          className,
        )}
        style={{
          // Height grows to absorb safe area; padding pushes content up
          height:
            "calc(var(--layout-bottom-nav-height) + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {items.map((item) => (
          <NavSlot
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            iconStroke={1.06}
            activeIconStroke={1.8}
            onClick={item.onClick}
          />
        ))}

        {hasOverflow && (
          <NavSlot
            icon={IconMenu2}
            label="More"
            isActive={isOverflowActive}
            iconStroke={1.2}
            activeIconStroke={1.8}
            onClick={() => setSheetOpen(true)}
          />
        )}
      </nav>

      {hasOverflow && (
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div className="flex flex-col gap-50">
            {overflowItems.map((item) => (
              <BottomSheetListItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                subText={item.subText}
                selected={activeItem === item.id}
                onClick={() => {
                  item.onClick?.();
                  setSheetOpen(false);
                }}
              />
            ))}
          </div>
        </BottomSheet>
      )}
    </>
  );
}
