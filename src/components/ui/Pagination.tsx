"use client";

import { IconArrowLeft, IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [12, 24, 48],
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/* Left — page size selector; label hidden on mobile, dropdown always visible */}
      <div className="flex items-center gap-[8px]">
        <span className="hidden sm:inline text-body text-text-level3">Items per page</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-[6px] px-[10px] py-[6px] rounded-050 border border-border-color-level2 bg-surface-level1 text-body text-text-level1 hover:bg-surface-level2 outline-none cursor-pointer data-[state=open]:bg-surface-level1-hover"
            >
              {pageSize}
              <IconChevronDown size={12} strokeWidth={1.5} className="text-text-level3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={100} align="start" borderless>
            {pageSizeOptions.map((opt) => (
              <DropdownMenuItem key={opt} onSelect={() => onPageSizeChange?.(opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right — navigation */}
      <div className="flex items-center gap-[16px]">
        {/* Previous — icon-only on mobile, labelled button on sm+ */}
        <IconButton
          className="sm:hidden"
          shape="semi-rounded"
          variant="outline"
          size="sm"
          icon={IconArrowLeft}
          aria-label="Previous page"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <Button
          className="hidden sm:inline-flex"
          variant="outline"
          size="sm"
          shape="semi-rounded"
          leadingIcon={IconArrowLeft}
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {/* Page number + total */}
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center justify-center h-[36px] w-[36px] rounded-100 ring-1 ring-inset ring-border-color-level2 bg-surface-level1 text-body text-text-level1">
            {currentPage}
          </div>
          <span className="text-body text-text-level3">of {totalPages}</span>
        </div>

        {/* Next — icon-only on mobile, labelled button on sm+ */}
        <IconButton
          className="sm:hidden"
          shape="semi-rounded"
          variant="outline"
          size="sm"
          icon={IconArrowRight}
          aria-label="Next page"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
        />
        <Button
          className="hidden sm:inline-flex"
          variant="outline"
          size="sm"
          shape="semi-rounded"
          trailingIcon={IconArrowRight}
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
