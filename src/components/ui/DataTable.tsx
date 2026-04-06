"use client";

import React, { type ReactNode, useLayoutEffect, useRef } from "react";
import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconArrowsSort,
  IconFileExport,
  IconInfoCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Pagination, type PaginationProps } from "@/components/ui/Pagination";
import { IconButton } from "@/components/ui/IconButton";

// ── Types ──────────────────────────────────────────────────────────────────────

export type DataTableType = "line" | "spaced";

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  info?: boolean;
  render?: (row: T, index: number) => ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>> {
  type?: DataTableType;
  columns: DataTableColumn<T>[];
  data: T[];
  searchValue?: string;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onSort?: () => void;
  onExport?: () => void;
  /** Show sort icons in column headers */
  showSortIcons?: boolean;
  /** Pagination config — omit to hide pagination */
  pagination?: PaginationProps;
  /** Extra pixels added to the auto-measured first column width */
  firstColumnExtraPx?: number;
  /** Stick the toolbar to the top of its scroll container */
  stickyToolbar?: boolean;
  /**
   * Fill the parent's remaining height.
   * The toolbar is pinned above the scroll area; the column header is sticky;
   * data rows scroll. Requires the parent to have a determined height (flex-1
   * inside a flex-col overflow-hidden container, or an explicit height).
   */
  fillHeight?: boolean;
  className?: string;
}

// ── Toolbar ────────────────────────────────────────────────────────────────────

function Toolbar({
  searchValue = "",
  onSearch,
  onFilter,
  onSort,
  onExport,
}: Pick<DataTableProps, "searchValue" | "onSearch" | "onFilter" | "onSort" | "onExport">) {
  return (
    <div className="flex items-center gap-[12px]">
      {onSearch && (
        <div className="flex flex-1 items-center gap-[10px] px-[12px] py-[8px] max-sm:h-[32px] max-sm:py-0 rounded-100 border border-border-color-level2 bg-surface-level1">
          <IconSearch size={16} strokeWidth={1.5} className="shrink-0 text-text-level3" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1 text-body text-text-level1 placeholder:text-text-level4 bg-transparent outline-none"
          />
        </div>
      )}

      {/* Individual outlined action buttons */}
      <div className="flex items-center gap-[8px]">
        {onFilter && (
          <>
            {/* Mobile — semi-rounded IconButton (adjacent to semi-rounded search bar) */}
            <IconButton
              className="sm:hidden"
              shape="semi-rounded"
              variant="outline"
              size="xs"
              icon={IconAdjustmentsHorizontal}
              aria-label="Filter"
              onClick={onFilter}
            />
            {/* Desktop — labelled button */}
            <button
              type="button"
              onClick={onFilter}
              className="hidden sm:flex items-center gap-[4px] px-[16px] py-[8px] rounded-100 border border-border-color-level2 bg-surface-level1 text-body text-text-level1 hover:bg-surface-level2 cursor-pointer"
            >
              <IconAdjustmentsHorizontal size={16} strokeWidth={1.5} />
              Filter
            </button>
          </>
        )}
        {onSort && (
          <>
            <IconButton
              className="sm:hidden"
              shape="semi-rounded"
              variant="outline"
              size="xs"
              icon={IconArrowsSort}
              aria-label="Sort"
              onClick={onSort}
            />
            <button
              type="button"
              onClick={onSort}
              className="hidden sm:flex items-center gap-[4px] px-[16px] py-[8px] rounded-100 border border-border-color-level2 bg-surface-level1 text-body text-text-level1 hover:bg-surface-level2 cursor-pointer"
            >
              <IconArrowsSort size={16} strokeWidth={1.5} />
              Sort
            </button>
          </>
        )}
        {onExport && (
          <>
            <IconButton
              className="sm:hidden"
              shape="semi-rounded"
              variant="outline"
              size="xs"
              icon={IconFileExport}
              aria-label="Export"
              onClick={onExport}
            />
            <button
              type="button"
              onClick={onExport}
              className="hidden sm:flex items-center gap-[4px] px-[16px] py-[8px] rounded-100 border border-border-color-level2 bg-surface-level1 text-body text-text-level1 hover:bg-surface-level2 cursor-pointer"
            >
              <IconFileExport size={16} strokeWidth={1.5} />
              Export
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Header cell ────────────────────────────────────────────────────────────────

function HeaderCell({
  col,
  isFirst,
  isLast,
  type,
  showSortIcons,
  roundTopCorners,
}: {
  col: DataTableColumn;
  isFirst: boolean;
  isLast: boolean;
  type: DataTableType;
  showSortIcons?: boolean;
  roundTopCorners?: boolean;
}) {
  // First column: flex-1, grows to absorb extra space (min-width locked by JS).
  // Others: flex-none, locked to exact measured content width by JS.
  const sizeClass = col.width
    ? undefined
    : isFirst
      ? "flex-1"
      : "flex-none";

  const style = col.width ? { width: col.width, flexShrink: 0 } : undefined;

  const inner = (
    // Outer gap=10 separates [label+info group] from sort icon
    <div className="flex items-center gap-[10px]">
      {/* Label + info icon are tightly coupled (gap=4) */}
      <div className="flex flex-1 min-w-0 items-center gap-[4px]">
        <span className="text-body font-medium text-text-level3 truncate">
          {col.label}
        </span>
        {col.info && (
          <IconInfoCircle size={14} strokeWidth={1.5} className="shrink-0 text-text-level3" />
        )}
      </div>
      {showSortIcons && col.sortable && (
        <IconArrowsSort size={14} strokeWidth={1.5} className="shrink-0 text-text-level3" />
      )}
    </div>
  );

  if (type === "line") {
    return (
      <div
        data-col-key={col.key}
        style={style}
        className={cn(
          sizeClass,
          "p-[12px] bg-surface-level2",
          "border-t border-b border-r border-border-color-level2",
          isFirst && "border-l border-border-color-level2",
          roundTopCorners && isFirst && "rounded-tl-100",
          roundTopCorners && isLast && "rounded-tr-100",
        )}
      >
        {inner}
      </div>
    );
  }

  // Spaced — no background, aligns with cell padding
  return (
    <div
      data-col-key={col.key}
      style={style}
      className={cn(sizeClass, "px-[16px]")}
    >
      {inner}
    </div>
  );
}

// ── DataTable ──────────────────────────────────────────────────────────────────

export function DataTable<T = Record<string, unknown>>({
  type = "line",
  columns,
  data,
  searchValue,
  onSearch,
  onFilter,
  onSort,
  onExport,
  showSortIcons = false,
  pagination,
  firstColumnExtraPx = 0,
  stickyToolbar = false,
  fillHeight = false,
  className,
}: DataTableProps<T>) {
  const hasToolbar = onSearch || onFilter || onSort || onExport;
  const isSpaced = type === "spaced";

  // ── Per-column width equalisation ────────────────────────────────────────────
  // Runs synchronously before paint. Two-pass approach:
  //
  // PASS 1 — measure true content widths:
  //   Temporarily set every cell to `flex:none; width:max-content` so even
  //   flex-1 cells size to their actual content (not their flex-allocated share).
  //   Force a reflow, then read getBoundingClientRect per column group.
  //
  // PASS 2 — lock widths:
  //   First column  → clear flex override, set `minWidth` (flex-1 in CSS grows to
  //                   absorb all extra space at wide viewports, but won't shrink
  //                   below its content width).
  //   Other columns → clear flex override, set exact `width` (flex-none in CSS).
  //                   Floor of 115px prevents tiny columns.
  //
  // First column absorbs extra space; other columns are pinned to content width.
  // Rows always fill the container (no double stroke from a floating frame border).
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;

      const allCells = Array.from(
        container.querySelectorAll<HTMLElement>("[data-col-key]"),
      );
      if (!allCells.length) return;

      // PASS 1: force every cell to size to its content so we measure true widths
      allCells.forEach((c) => {
        c.style.flex = "none";
        c.style.width = "max-content";
        c.style.minWidth = "";
      });
      void container.offsetHeight; // force reflow

      // Group cells by column key
      const groups = new Map<string, HTMLElement[]>();
      for (const cell of allCells) {
        const key = cell.dataset.colKey!;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(cell);
      }

      const firstColKey = columns[0]?.key;

      // PASS 2: restore flex, lock widths
      for (const [key, cells] of groups) {
        const isFirst = key === firstColKey;
        const measured = Math.max(...cells.map((c) => c.getBoundingClientRect().width));

        if (isFirst) {
          // flex-1 in CSS — set min-width so it grows but never shrinks below content
          const minWidth = Math.ceil(measured) + firstColumnExtraPx;
          cells.forEach((c) => {
            c.style.flex = "";
            c.style.minWidth = `${minWidth}px`;
            c.style.width = "";
          });
        } else {
          // flex-none in CSS — lock to exact measured content width (115px floor)
          const width = Math.ceil(Math.max(115, measured));
          cells.forEach((c) => {
            c.style.flex = "";
            c.style.width = `${width}px`;
            c.style.minWidth = "";
          });
        }
      }
    }

    // Initial measurement (may use fallback font if web font not yet loaded)
    measure();

    // Re-measure once web fonts finish loading — fixes wrong widths on first
    // load when the custom font hasn't downloaded yet.
    document.fonts?.ready.then(measure);
  });

  function cellValue(row: T, col: DataTableColumn<T>, index: number): ReactNode {
    if (col.render) return col.render(row, index);
    const val = (row as Record<string, unknown>)[col.key];
    return val !== undefined && val !== null ? String(val) : "";
  }

  // ── Shared row renderer ────────────────────────────────────────────────────────
  function renderLineRows(roundLastRowCorners = false) {
    return data.map((row, rowIdx) => {
      const isLastRow = rowIdx === data.length - 1;
      return (
        <div
          key={rowIdx}
          className={cn(
            "flex bg-surface-level1 hover:bg-surface-level1-hover cursor-pointer",
            rowIdx < data.length - 1 && "border-b border-border-color-level2",
          )}
        >
          {columns.map((col, colIdx) => {
            const isLastCol = colIdx === columns.length - 1;
            return (
              <div
                key={col.key}
                data-col-key={col.key}
                style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
                className={cn(
                  "flex items-center h-[68px] p-[12px]",
                  "text-body text-text-level1",
                  !col.width && (colIdx === 0 ? "flex-1" : "flex-none"),
                  "border-r border-border-color-level2",
                  colIdx === 0 && "border-l border-border-color-level2",
                  roundLastRowCorners && isLastRow && colIdx === 0 && "rounded-bl-100",
                  roundLastRowCorners && isLastRow && isLastCol && "rounded-br-100",
                )}
              >
                {cellValue(row, col, rowIdx)}
              </div>
            );
          })}
        </div>
      );
    });
  }

  // ── fillHeight mode ────────────────────────────────────────────────────────────
  // A single overflow:auto container handles both axes of scrolling.
  // The column header uses position:sticky (top-0 z-10) so it:
  //   • pins vertically as rows scroll past
  //   • scrolls horizontally with the content (shared scroll context)
  // The table frame (bordered) contains only header + rows so its border
  // terminates cleanly at the last row. Pagination sits outside the frame
  // and scrolls with the content area.
  // Corner clipping is done via per-cell border-radius rather than
  // overflow:hidden (which would break the sticky header).
  if (fillHeight) {
    return (
      <div ref={containerRef} className={cn("flex flex-col overflow-hidden gap-[20px]", className)}>
        {hasToolbar && (
          <div className="flex-none">
            <Toolbar
              searchValue={searchValue}
              onSearch={onSearch}
              onFilter={onFilter}
              onSort={onSort}
              onExport={onExport}
            />
          </div>
        )}

        {/* ── Line fillHeight ──────────────────────────────────────────────────── */}
        {!isSpaced && (
          // Single scroll container — header and rows share one scroll context.
          <div className="flex-1 min-h-0 overflow-auto">
            {/* Bordered table frame — header + rows only; border ends at last row.    */}
            {/* w-fit expands the frame when JS-measured min-widths exceed container;  */}
            {/* min-w-full keeps it full-width otherwise.                              */}
            <div className="flex flex-col rounded-100 border-b border-border-color-level2 w-fit min-w-full">
              {/* Column header — sticky in Y, scrolls in X with content */}
              <div className="flex sticky top-0 z-10">
                {columns.map((col, i) => (
                  <HeaderCell
                    key={col.key}
                    col={col}
                    isFirst={i === 0}
                    isLast={i === columns.length - 1}
                    type="line"
                    showSortIcons={showSortIcons}
                    roundTopCorners
                  />
                ))}
              </div>
              {/* Data rows — bottom corners rounded manually (no overflow:hidden) */}
              {renderLineRows(true)}
            </div>
            {/* sticky left-0 w-full pins pagination to the visible left edge when
                scrolling horizontally; w-full resolves to the scroll container's
                visible width (not the wider scrollable content width), so pagination
                never scrolls sideways but still appears after all rows vertically. */}
            {pagination && (
              <div className="sticky left-0 w-full pt-[20px] pb-400">
                <Pagination {...pagination} />
              </div>
            )}
          </div>
        )}

        {/* ── Spaced fillHeight ─────────────────────────────────────────────────── */}
        {isSpaced && (
          <div className="flex-1 min-h-0 overflow-auto">
            {/* Header — sticky in Y, scrolls in X. bg-surface-level1 prevents cards
                from bleeding under the labels when scrolling vertically. */}
            <div className="flex sticky top-0 z-10 bg-surface-level1 pb-[12px]">
              {columns.map((col, i) => (
                <HeaderCell
                  key={col.key}
                  col={col}
                  isFirst={i === 0}
                  isLast={i === columns.length - 1}
                  type="spaced"
                  showSortIcons={showSortIcons}
                />
              ))}
            </div>
            {/* Cards */}
            <div className="flex flex-col gap-[16px]">
              {data.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex rounded-100 border border-border-color-level2 overflow-hidden bg-surface-level1 hover:bg-surface-level1-hover cursor-pointer"
                >
                  {columns.map((col, colIdx) => (
                    <div
                      key={col.key}
                      data-col-key={col.key}
                      style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
                      className={cn(
                        "flex items-center h-[76px] p-[16px] text-body text-text-level1",
                        !col.width && (colIdx === 0 ? "flex-1" : "flex-none"),
                      )}
                    >
                      {cellValue(row, col, rowIdx)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {pagination && (
              <div className="sticky left-0 w-full pt-[20px] pb-400">
                <Pagination {...pagination} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Default (non-fillHeight) mode ──────────────────────────────────────────────
  return (
    <div ref={containerRef} className={cn("flex flex-col gap-[20px]", className)}>
      {hasToolbar && (
        <div className={cn(stickyToolbar && "sticky top-0 z-10 bg-surface-level1")}>
          <Toolbar
            searchValue={searchValue}
            onSearch={onSearch}
            onFilter={onFilter}
            onSort={onSort}
            onExport={onExport}
          />
        </div>
      )}

      {/* ── Line ──────────────────────────────────────────────────────────── */}
      {!isSpaced && (
        <div className="flex flex-col rounded-100 overflow-hidden border-b border-border-color-level2">
          <div className="flex">
            {columns.map((col, i) => (
              <HeaderCell
                key={col.key}
                col={col}
                isFirst={i === 0}
                isLast={i === columns.length - 1}
                type="line"
                showSortIcons={showSortIcons}
              />
            ))}
          </div>
          {renderLineRows()}
        </div>
      )}

      {/* ── Spaced ────────────────────────────────────────────────────────── */}
      {isSpaced && (
        <div className="flex flex-col gap-[12px]">
          {/* Header row — no background, aligns with card content */}
          <div className="flex">
            {columns.map((col, i) => (
              <HeaderCell
                key={col.key}
                col={col}
                isFirst={i === 0}
                isLast={i === columns.length - 1}
                type="spaced"
                showSortIcons={showSortIcons}
              />
            ))}
          </div>
          {/* Each row is a single rounded bordered card */}
          <div className="flex flex-col gap-[16px]">
            {data.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex rounded-100 border border-border-color-level2 overflow-hidden bg-surface-level1 hover:bg-surface-level1-hover cursor-pointer"
              >
                {columns.map((col, colIdx) => (
                  <div
                    key={col.key}
                    data-col-key={col.key}
                    style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
                    className={cn(
                      "flex items-center h-[76px] p-[16px] text-body text-text-level1",
                      !col.width && (colIdx === 0 ? "flex-1" : "flex-none"),
                    )}
                  >
                    {cellValue(row, col, rowIdx)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {pagination && <Pagination {...pagination} />}
    </div>
  );
}
