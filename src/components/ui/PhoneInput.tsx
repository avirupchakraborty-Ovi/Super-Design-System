"use client";

import { useId, useState, type ChangeEvent } from "react";
import { IconInfoCircle, IconChevronDown } from "@tabler/icons-react";
import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export type PhoneInputSize = "sm" | "md" | "lg";
export type PhoneInputShape = "full-rounded" | "semi-rounded";

export interface Country {
  /** ISO 3166-1 alpha-2 country code */
  code: string;
  dialCode: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: "IN", dialCode: "+91",  name: "India" },
  { code: "US", dialCode: "+1",   name: "United States" },
  { code: "GB", dialCode: "+44",  name: "United Kingdom" },
  { code: "AU", dialCode: "+61",  name: "Australia" },
  { code: "CA", dialCode: "+1",   name: "Canada" },
  { code: "SG", dialCode: "+65",  name: "Singapore" },
  { code: "AE", dialCode: "+971", name: "UAE" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia" },
  { code: "DE", dialCode: "+49",  name: "Germany" },
  { code: "FR", dialCode: "+33",  name: "France" },
  { code: "NL", dialCode: "+31",  name: "Netherlands" },
  { code: "ES", dialCode: "+34",  name: "Spain" },
  { code: "IT", dialCode: "+39",  name: "Italy" },
  { code: "JP", dialCode: "+81",  name: "Japan" },
  { code: "KR", dialCode: "+82",  name: "South Korea" },
  { code: "CN", dialCode: "+86",  name: "China" },
  { code: "ID", dialCode: "+62",  name: "Indonesia" },
  { code: "BR", dialCode: "+55",  name: "Brazil" },
  { code: "ZA", dialCode: "+27",  name: "South Africa" },
  { code: "NG", dialCode: "+234", name: "Nigeria" },
];

export interface PhoneInputProps {
  size?: PhoneInputSize;
  shape?: PhoneInputShape;
  /** Label rendered above the field */
  label?: string;
  /** Shows a mandatory asterisk (*) after the label */
  required?: boolean;
  /** Shows a tooltip info icon after the label */
  tooltip?: boolean;
  /** Click handler for the tooltip icon */
  onTooltipClick?: () => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Controlled selected country code (e.g. "IN").
   * When provided, the component is in controlled mode for country selection.
   */
  countryCode?: string;
  /** Default country to pre-select in uncontrolled mode. Defaults to "IN". */
  defaultCountryCode?: string;
  onCountryChange?: (country: Country) => void;
  disabled?: boolean;
  /** Error message — activates error state; replaces helpText */
  error?: string;
  /** Descriptive text rendered below the field (hidden when error is set) */
  helpText?: string;
  id?: string;
  name?: string;
  className?: string;
}

// Fixed heights match Figma spec: sm=36px, md=40px, lg=44px (px-150 = 12px horizontal padding)
const sizeStyles: Record<PhoneInputSize, string> = {
  sm: "h-[36px] px-150 gap-100",
  md: "h-[40px] px-150 gap-100",
  lg: "h-[44px] px-150 gap-100",
};

// Flag dimensions — Figma spec: 24×16px (3:2 ratio)
const FLAG_WIDTH = 24;
const FLAG_HEIGHT = 16;

export function PhoneInput({
  size = "md",
  shape = "semi-rounded",
  label,
  required = false,
  tooltip = false,
  onTooltipClick,
  placeholder = "Enter phone number",
  value,
  defaultValue,
  onChange,
  countryCode,
  defaultCountryCode = "IN",
  onCountryChange,
  disabled = false,
  error,
  helpText,
  id,
  name,
  className,
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = !!error;

  // Internal state used when countryCode prop is not supplied (uncontrolled mode)
  const [internalCode, setInternalCode] = useState(
    countryCode ?? defaultCountryCode,
  );

  const activeCode = countryCode ?? internalCode;
  const currentCountry = COUNTRIES.find((c) => c.code === activeCode) ?? COUNTRIES[0];

  // Resolve the SVG flag component for the active country code
  const FlagIcon = Flags[activeCode as keyof typeof Flags] ?? null;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COUNTRIES.find((c) => c.code === e.target.value);
    if (!selected) return;
    if (countryCode === undefined) setInternalCode(selected.code);
    onCountryChange?.(selected);
  };

  const labelTextClass = hasError
    ? "text-text-critical-3"
    : disabled
    ? "text-text-level4"
    : "text-text-level1";

  const iconClasses = cn("text-text-level3", disabled && "text-text-level4");

  const fieldClasses = cn(
    "flex items-center transition-shadow text-body",
    sizeStyles[size],
    shape === "full-rounded" ? "rounded-500" : "rounded-100",
    disabled ? "bg-surface-level2" : "bg-surface-level1",
    hasError
      ? "ring-2 ring-inset ring-border-color-critical"
      : disabled
      ? "ring-1 ring-inset ring-border-color-level2"
      : "ring-1 ring-inset ring-border-color-level3 focus-within:ring-2 focus-within:ring-border-color-primary",
  );

  return (
    <div className={cn("flex flex-col gap-50", className)}>

      {/* ── Label row ────────────────────────────────────────────── */}
      {label && (
        <div className="inline-flex items-center gap-50">
          <label
            htmlFor={inputId}
            className={cn("text-body font-medium", labelTextClass)}
          >
            {label}
          </label>
          {required && (
            <span
              className={cn(
                "text-body font-normal",
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

        {/* Country selector — SVG flag + chevron + dial code overlaid with a native <select> */}
        <div className="relative flex items-center gap-50 shrink-0">
          {FlagIcon && (
            <span className="shrink-0 overflow-hidden rounded-[2px]">
              <FlagIcon
                width={FLAG_WIDTH}
                height={FLAG_HEIGHT}
                aria-label={currentCountry.name}
              />
            </span>
          )}
          <Icon
            icon={IconChevronDown}
            size="sm"
            noOffset
            className={iconClasses}
          />
          <span className={cn("text-body", disabled ? "text-text-level4" : "text-text-level2")}>
            {currentCountry.dialCode}
          </span>
          {/* Native select is invisible but covers the entire selector area,
              providing keyboard and pointer interaction at zero visual cost */}
          <select
            value={activeCode}
            onChange={handleCountryChange}
            disabled={disabled}
            aria-label="Select country code"
            className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.dialCode})
              </option>
            ))}
          </select>
        </div>

        {/* Phone number text input */}
        <input
          id={inputId}
          name={name}
          type="tel"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none text-body",
            "text-text-level1 placeholder:text-text-level4",
            disabled && "text-text-level4 cursor-not-allowed",
          )}
        />
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
