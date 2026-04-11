"use client";

import { useId, type ChangeEvent, type ComponentType, type SVGProps } from "react";
import { IconInfoCircle, IconCopy } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { LabelVariant } from "@/components/ui/Label";

export type InputSize = "sm" | "md" | "lg";
export type InputShape = "full-rounded" | "semi-rounded";

type InputLabelVariant = Exclude<LabelVariant, "supporting-caps">;

const labelVariantClasses: Record<InputLabelVariant, string> = {
  "body-regular":        "text-body font-normal",
  "body-medium":         "text-body font-medium",
  "supporting-medium":   "text-supporting font-medium",
  "supporting-semibold": "text-supporting font-semibold",
};

const asteriskVariantClasses: Record<InputLabelVariant, string> = {
  "body-regular":        "text-body font-normal",
  "body-medium":         "text-body font-normal",
  "supporting-medium":   "text-supporting font-normal",
  "supporting-semibold": "text-supporting font-normal",
};

type TablerIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; stroke?: number | string }
>;

export interface InputProps {
  /** Field size */
  size?: InputSize;
  /** Border shape — pill or slightly-rounded rectangle */
  shape?: InputShape;
  /** Label rendered above the field */
  label?: string;
  /** Typography hierarchy for the label — defaults to body-medium */
  labelVariant?: InputLabelVariant;
  /** Shows a mandatory asterisk (*) after the label */
  required?: boolean;
  /** Shows a tooltip info icon after the label */
  tooltip?: boolean;
  /** Click handler for the tooltip icon */
  onTooltipClick?: () => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  /** Error message — activates error state; replaces helpText */
  error?: string;
  /** Descriptive text rendered below the field (hidden when error is set) */
  helpText?: string;
  /** Icon inside the leading (left) edge */
  leadingIcon?: TablerIcon;
  /** Pill button rendered inside the field on the trailing side */
  inlineButton?: { label: string; onClick?: () => void };
  /** Icon inside the trailing (right) edge */
  trailingIcon?: TablerIcon;
  /** When set, shows a "current / max" character counter inside the field */
  maxLength?: number;
  /** Shows a copy icon button at the far-right edge and makes the field read-only */
  copyable?: boolean;
  onCopy?: () => void;
  /** HTML input type attribute */
  type?: "text" | "email" | "tel" | "url" | "password";
  /** Renders as a <textarea> — intended for Semi Rounded usage per Figma */
  multiline?: boolean;
  /** Number of visible rows when multiline=true */
  rows?: number;
  id?: string;
  name?: string;
  className?: string;
}

// Fixed heights match Figma spec: sm=36px, md=40px, lg=44px (px-150 = 12px horizontal padding)
const sizeStyles: Record<InputSize, string> = {
  sm: "h-[36px] px-150 gap-100",
  md: "h-[40px] px-150 gap-100",
  lg: "h-[44px] px-150 gap-100",
};

// Multiline — Figma spec: fixed heights (sm=72px, md=80px, lg=88px),
// asymmetric padding pt=8px (100), pb=4px (50), px=12px (150), same for all sizes.
// Right padding is split out to the inner rows so the bottom row can use pr-50 (4px) to
// match the bottom inset when the inline button is the rightmost element.
const multilineSizeStyles: Record<InputSize, string> = {
  sm: "h-[72px] pt-100 pb-50 pl-150 gap-100",
  md: "h-[80px] pt-100 pb-50 pl-150 gap-100",
  lg: "h-[88px] pt-100 pb-50 pl-150 gap-100",
};

// When the inline button is the last element (no trailing icon/copy), override pr so
// the button has equal spacing on top, right, and bottom.
// Formula: (field height − inline button height) / 2
// Inline button height = 26px (py-62 × 2 + text-supporting line-height 16px)
const buttonLastPrStyles: Record<InputSize, string> = {
  sm: "pr-62",      // (36 − 26) / 2 = 5px
  md: "pr-[7px]",  // (40 − 26) / 2 = 7px
  lg: "pr-[9px]",  // (44 − 26) / 2 = 9px
};

// Copy button: square matching the field height, flush to the right edge (pr-0 on wrapper)
// Figma spec: copy button width = field height (36/40/44px), icon size="md" (20×20 frame)
const copyButtonWidths: Record<InputSize, string> = {
  sm: "w-[36px]",
  md: "w-[40px]",
  lg: "w-[44px]",
};

export function Input({
  size = "md",
  shape = "semi-rounded",
  label,
  labelVariant = "body-medium",
  required = false,
  tooltip = false,
  onTooltipClick,
  placeholder = "Type here",
  value,
  defaultValue,
  onChange,
  disabled = false,
  error,
  helpText,
  leadingIcon,
  inlineButton,
  trailingIcon,
  maxLength,
  copyable = false,
  onCopy,
  type = "text",
  multiline = false,
  rows = 3,
  id,
  name,
  className,
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = !!error;

  const labelTextClass = hasError
    ? "text-text-critical-3"
    : disabled
    ? "text-text-level4"
    : "text-text-level1";

  const iconClasses = cn("text-text-level3", disabled && "text-text-level4");
  // noOffset suppresses the global -translate-y-px on Icon (correct for inline text contexts
  // but wrong inside a flex items-center field where the icon is independently centred).
  // strokeWidth 0.9 keeps visual weight consistent — at size="md" the default is 1.2px which reads
  // heavy on simple geometric icons (e.g. ×) vs complex ones (e.g. search circle).
  const fieldIconProps = { size: "md" as const, strokeWidth: 0.9, noOffset: true, className: iconClasses };

  const buttonIsLast = !!inlineButton && !disabled && !trailingIcon && !copyable;

  const fieldClasses = cn(
    "flex transition-shadow text-body",
    multiline ? multilineSizeStyles[size] : sizeStyles[size],
    multiline && "flex-col",
    !multiline && buttonIsLast && buttonLastPrStyles[size],
    !multiline && copyable && "pr-0",
    !multiline && "items-center",
    shape === "full-rounded" ? "rounded-500" : "rounded-100",
    disabled ? "bg-surface-level2" : "bg-surface-level1",
    hasError
      ? "ring-2 ring-inset ring-border-color-critical"
      : disabled
      ? "ring-1 ring-inset ring-border-color-level2"
      : "ring-1 ring-inset ring-border-color-level3 focus-within:ring-2 focus-within:ring-border-color-primary",
  );

  const baseInputClasses = cn(
    "flex-1 min-w-0 bg-transparent outline-none text-body",
    "text-text-level1 placeholder:text-text-level4",
    disabled && "text-text-level4 cursor-not-allowed",
  );

  const charCount =
    maxLength !== undefined && value !== undefined
      ? `${value.length}/${maxLength}`
      : null;

  return (
    <div className={cn("flex flex-col gap-50", className)}>

      {/* ── Label row ────────────────────────────────────────────── */}
      {label && (
        <div className="inline-flex items-center gap-50">
          <label
            htmlFor={inputId}
            className={cn(labelVariantClasses[labelVariant], labelTextClass)}
          >
            {label}
          </label>
          {required && (
            <span
              className={cn(
                asteriskVariantClasses[labelVariant],
                disabled ? "text-text-level4" : "text-text-critical-3",
              )}
            >
              *
            </span>
          )}
          {tooltip && (
            <button
              type="button"
              onClick={onTooltipClick}
              className={cn("inline-flex items-center cursor-default", iconClasses)}
            >
              <Icon icon={IconInfoCircle} size="md" noOffset />
            </button>
          )}
        </div>
      )}

      {/* ── Field ────────────────────────────────────────────────── */}
      <div className={fieldClasses}>
        {multiline ? (
          <>
            {/* Top row: leading icon + textarea. pr-150 provides the right inset normally;
                the bottom row uses pr-50 when button/count is last to match pb-50 visually. */}
            <div className="flex items-start gap-100 flex-1 min-h-0 pr-150">
              {leadingIcon && (
                <Icon icon={leadingIcon} {...fieldIconProps} />
              )}
              <textarea
                id={inputId}
                name={name}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                maxLength={maxLength}
                rows={rows}
                className={cn(baseInputClasses, "resize-none self-stretch")}
              />
            </div>

            {/* Bottom row: right-aligned. pr-50 when button/count is rightmost (matches pb-50),
                pr-150 when trailing icon is rightmost (matches standard field inset). */}
            {((!disabled && (charCount || inlineButton)) || trailingIcon) && (
              <div className={cn(
                "flex items-center justify-end gap-100 shrink-0",
                trailingIcon ? "pr-150" : "pr-50",
              )}>
                {!disabled && charCount && (
                  <span className="shrink-0 text-supporting text-text-level4">{charCount}</span>
                )}
                {!disabled && inlineButton && (
                  <Button
                    size="inline"
                    shape={shape}
                    variant="outline"
                    onClick={inlineButton.onClick}
                    disabled={disabled}
                  >
                    {inlineButton.label}
                  </Button>
                )}
                {trailingIcon && (
                  <Icon icon={trailingIcon} {...fieldIconProps} />
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {leadingIcon && (
              <Icon icon={leadingIcon} {...fieldIconProps} />
            )}

            <input
              id={inputId}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              disabled={disabled}
              maxLength={maxLength}
              readOnly={copyable}
              className={baseInputClasses}
            />

            {!disabled && charCount && (
              <span className="shrink-0 text-supporting text-text-level4">{charCount}</span>
            )}

            {!disabled && inlineButton && (
              <span className="shrink-0">
                <Button
                  size="inline"
                  shape={shape}
                  variant="outline"
                  onClick={inlineButton.onClick}
                  disabled={disabled}
                >
                  {inlineButton.label}
                </Button>
              </span>
            )}

            {trailingIcon && (
              <Icon icon={trailingIcon} {...fieldIconProps} />
            )}

            {/* Copy button — square flush to right edge, separated by a left border stroke */}
            {copyable && (
              <button
                type="button"
                onClick={onCopy}
                disabled={disabled}
                aria-label="Copy"
                className={cn(
                  "self-stretch flex-none flex items-center justify-center",
                  "border-l border-border-color-level2 transition-colors",
                  copyButtonWidths[size],
                  disabled
                    ? "text-text-level4 cursor-not-allowed"
                    : "text-text-level3 hover:text-text-level1",
                )}
              >
                <Icon icon={IconCopy} size="md" noOffset />
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Supporting text ───────────────────────────────────────── */}
      {hasError ? (
        <p className="text-supporting text-text-critical-3">{error}</p>
      ) : helpText ? (
        <p className="text-supporting text-text-level3">{helpText}</p>
      ) : null}
    </div>
  );
}
