import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AsidePanelProps {
  children: ReactNode;
  /**
   * Tailwind class for aside width — e.g. "w-[260px]".
   * MUST be declared as SP8 exception with inline comment at call site.
   * Default: "w-[260px]"
   */
  width?: string;
  className?: string;
}

// R16: hidden lg:block — aside panel visible at Wide only (per LAYOUT.md S12, S15)
export function AsidePanel({
  children,
  width = "w-[260px]", // SP8 exception — default aside panel width
  className,
}: AsidePanelProps) {
  return (
    <div className={cn("hidden lg:block flex-none sticky top-0", width, className)}>
      {children}
    </div>
  );
}
