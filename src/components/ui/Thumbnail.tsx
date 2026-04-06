import { cn } from "@/lib/cn";

export type ThumbnailSize = "lg" | "md" | "sm" | "xs";
export type ThumbnailType = "square" | "circle";

export interface ThumbnailProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Size variant — lg: 52px, md: 44px, sm: 36px, xs: 24px */
  size?: ThumbnailSize;
  /** Shape — square uses radius-100 (8px), circle is fully rounded */
  type?: ThumbnailType;
  /** Additional CSS classes */
  className?: string;
}

const sizePx: Record<ThumbnailSize, number> = {
  lg: 52,
  md: 44,
  sm: 36,
  xs: 24,
};

export function Thumbnail({
  src,
  alt = "",
  size = "md",
  type = "square",
  className,
}: ThumbnailProps) {
  const px = sizePx[size];

  return (
    <div
      className={cn("shrink-0 overflow-hidden", className)}
      style={{
        width: px,
        height: px,
        // radius-050 token = 4px. Circle uses 9999px (fully rounded at any size).
        borderRadius: type === "circle" ? 9999 : 4,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
