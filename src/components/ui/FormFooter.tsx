import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { IconChevronLeft } from "@tabler/icons-react";

export interface FormFooterProps {
  /** Label for the back button — defaults to "Back" */
  backLabel?: string;
  /** Label for the primary continue button — defaults to "Save & Continue" */
  continueLabel?: string;
  /** Hide the back button on the first step */
  showBack?: boolean;
  /** Called when Back is pressed */
  onBack?: () => void;
  /** Called when the primary continue button is pressed */
  onContinue?: () => void;
  /** Disable the continue button — e.g. while saving */
  continueDisabled?: boolean;
  className?: string;
}

export function FormFooter({
  backLabel = "Back",
  continueLabel = "Save & Continue",
  showBack = true,
  onBack,
  onContinue,
  continueDisabled = false,
  className,
}: FormFooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center gap-150",
        "bg-surface-level1 border-t border-border-color-level2",
        "px-200 py-150",
        // R15: safe area inset — additive to standard padding
        "pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      {showBack && (
        <Button
          variant="outline"
          size="sm"
          leadingIcon={IconChevronLeft}
          onClick={onBack}
          className="flex-1"
        >
          {backLabel}
        </Button>
      )}
      <Button
        variant="primary"
        size="sm"
        onClick={onContinue}
        disabled={continueDisabled}
        className="flex-1"
      >
        {continueLabel}
      </Button>
    </footer>
  );
}
