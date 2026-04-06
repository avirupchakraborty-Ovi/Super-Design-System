"use client";

import {
  type ComponentType,
  type SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Icon sizes matching the Figma design system:
 *
 * | Variant | Frame  | Vector | Stroke |
 * |---------|--------|--------|--------|
 * | sm      | 16x16  | 10x10  | 0.9px  |
 * | md      | 20x20  | 14x14  | 1.2px  |
 *
 * The rendered viewBox is dynamically tightened to the icon's actual path
 * bounding box (via getBBox), so every Tabler icon — regardless of its
 * internal padding — fills the vector frame at the correct visual size.
 * This replicates Figma's "fit vector to frame" behaviour universally.
 */

export type IconSize = "sm" | "md";

const sizeConfig = {
  sm: { frame: 16, vector: 10, stroke: 0.9 },
  md: { frame: 20, vector: 14, stroke: 1.2 },
} as const;

// useLayoutEffect on the client (fires before paint — no flash),
// useEffect on the server (never fires — safe for SSR/Next.js).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface IconProps {
  /** A Tabler icon component — e.g. IconStar from @tabler/icons-react */
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }>;
  /** Icon size variant */
  size?: IconSize;
  /** Use filled variant (no stroke) */
  filled?: boolean;
  /** Override stroke width (defaults to 0.9 for sm, 1.2 for md) */
  strokeWidth?: number;
  /** Additional CSS classes on the outer frame */
  className?: string;
  /** Color — inherits from parent by default */
  color?: string;
  /**
   * Suppresses the -translate-y-px optical offset.
   * Use for icons inside flex containers that center independently (e.g. input fields),
   * where the global text-baseline nudge causes visible misalignment.
   */
  noOffset?: boolean;
}

export function Icon({
  icon: TablerIcon,
  size = "sm",
  filled = false,
  strokeWidth,
  className,
  color,
  noOffset = false,
}: IconProps) {
  const config = sizeConfig[size];
  const resolvedStroke = filled ? 0 : (strokeWidth ?? config.stroke);
  // Tabler icons use a 24×24 viewBox. Stroke-width is in viewBox units —
  // scale to preserve the intended visual px weight at config.vector px.
  const svgStroke = resolvedStroke === 0 ? 0 : resolvedStroke * (24 / config.vector);

  const containerRef = useRef<HTMLSpanElement>(null);
  const [viewBox, setViewBox] = useState("0 0 24 24");

  useIsomorphicLayoutEffect(() => {
    let raf: number;

    const measure = () => {
      const svg = containerRef.current?.querySelector("svg") as SVGSVGElement | null;
      if (!svg) return;

      const bbox = svg.getBBox();
      if (!bbox.width || !bbox.height) {
        // SVG not yet laid out — retry on the next animation frame
        raf = requestAnimationFrame(measure);
        return;
      }

      // Expand bbox by half the stroke width on every side so the outermost
      // stroke pixel is never clipped at the viewBox boundary.
      const pad = svgStroke / 2;
      const x = bbox.x - pad;
      const y = bbox.y - pad;
      const w = bbox.width + pad * 2;
      const h = bbox.height + pad * 2;

      const next = `${x.toFixed(3)} ${y.toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}`;
      setViewBox((prev) => (prev === next ? prev : next));
    };

    measure();
    return () => cancelAnimationFrame(raf);
  }, [TablerIcon, svgStroke]);

  return (
    <span
      ref={containerRef}
      className={cn(
        // -translate-y-px nudges icons 1px up to optically align with Hind Madurai's
        // visual cap height, which sits above the CSS line box's mathematical center
        // due to Devanagari-extended ascender metrics. Applied here (not per-component)
        // so alignment is correct in badges, buttons, nav items, and all future components.
        // Pass noOffset=true to suppress this for icons inside flex-centred containers
        // (e.g. input fields) where the nudge causes visible misalignment.
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        !noOffset && "-translate-y-px",
        className,
      )}
      style={{ width: config.frame, height: config.frame }}
    >
      <TablerIcon
        size={config.vector}
        stroke={svgStroke}
        color={color}
        viewBox={viewBox}
        style={{
          width: config.vector,
          height: config.vector,
          minWidth: config.vector,
          minHeight: config.vector,
        }}
      />
    </span>
  );
}
