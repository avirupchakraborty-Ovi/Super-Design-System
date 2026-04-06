"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/DropdownMenu";
import * as Radix from "@radix-ui/react-dropdown-menu";

export interface OperatorChipProps {
  /** Currently selected value */
  value: string;
  /** Available options shown in the dropdown */
  options?: string[];
  /** Called when the user selects a different option */
  onChange: (value: string) => void;
  className?: string;
}

export function OperatorChip({
  value,
  options = ["AND", "OR"],
  onChange,
  className,
}: OperatorChipProps) {
  return (
    <DropdownMenu>
      <Radix.Trigger
        className={cn(
          "group inline-flex items-center gap-[4px]",
          "px-100 py-50 rounded-050",
          "border border-border-color-level2",
          "text-supporting font-semibold text-text-level2",
          "cursor-pointer outline-none select-none",
          "hover:bg-surface-level2",
          "data-[state=open]:bg-surface-level2 data-[state=open]:border-border-color-level3",
          className,
        )}
      >
        {value}
        <span className="inline-flex shrink-0 items-center justify-center transition-transform group-data-[state=open]:rotate-180">
          <Icon icon={IconChevronDown} size="sm" noOffset className="text-text-level3" />
        </span>
      </Radix.Trigger>
      <DropdownMenuContent width={100} align="center">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((opt) => (
            <DropdownMenuRadioItem key={opt} value={opt}>
              {opt}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
