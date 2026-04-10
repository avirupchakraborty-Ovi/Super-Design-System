"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export interface CoverImageUploadProps {
  label?: string;
  helpText?: string;
  error?: string;
  showUrlInput?: boolean;
  onFileChange?: (file: File) => void;
  onUrlSubmit?: (url: string) => void;
  className?: string;
}

export function CoverImageUpload({
  label = "Cover Image/Video",
  helpText = "Text describing eligible formats and sizes",
  error,
  showUrlInput = true,
  onFileChange,
  onUrlSubmit,
  className,
}: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileChange?.(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileChange?.(file);
  }

  function handleAdd() {
    const url = urlInputRef.current?.value ?? "";
    if (url) onUrlSubmit?.(url);
  }

  return (
    <div className={cn("flex flex-col gap-50 w-full", className)}>

      {/* Label */}
      <span className="text-body font-normal text-text-level1">{label}</span>

      {/* ── Single dashed-border upload zone (contains everything) ── */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center gap-200 w-full rounded-100 px-200 py-300 bg-surface-level1",
          "border-[length:var(--border-width-030)] border-dashed",
          error ? "border-border-color-critical" : "border-border-color-level3",
        )}
      >
        {/* Upload icon */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex items-center justify-center w-600 h-600 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-500 bg-surface-brand-primary-subtle" />
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative text-text-brand-primary"
          >
            <path
              d="M8.72 0L0 0L0 18L20 18L20 3L9.72 3L8.72 0ZM13.72 10.29L12.31 11.7L11 10.41L11 14L9 14L9 10.41L7.71 11.71L6.29 10.29L10 6.59L13.72 10.29Z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </button>

        {/* Title + subtitle */}
        <div className="flex flex-col items-center gap-50">
          <p className="text-body font-medium">
            <span className="text-text-brand-primary">Upload</span>
            <span className="text-text-level1"> or drag &amp; drop</span>
          </p>
          <p className="text-body font-normal text-text-level3 text-center">{helpText}</p>
        </div>

        {/* OR divider + URL input (optional) */}
        {showUrlInput && (
          <>
            {/* OR divider with gradient lines */}
            <div className="flex items-center gap-150 w-full">
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to right, var(--color-border-color-level1), var(--color-border-color-level3))" }}
              />
              <span className="text-supporting font-normal text-text-level4">OR</span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to left, var(--color-border-color-level1), var(--color-border-color-level3))" }}
              />
            </div>

            {/* URL input with embedded Add button */}
            <div className="flex w-full items-center rounded-500 bg-surface-level1 border-[length:var(--border-width-025)] border-border-color-level2 pl-150 pr-75 py-50 gap-100">
              <input
                ref={urlInputRef}
                type="url"
                placeholder="Enter URL"
                className="flex-1 text-body font-normal text-text-level1 bg-transparent outline-none placeholder:text-text-level3 min-w-0"
              />
              <Button
                variant="outline"
                shape="full-rounded"
                size="inline"
                onClick={handleAdd}
              >
                Add
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-body font-normal text-text-critical-3">{error}</p>
      )}
    </div>
  );
}
