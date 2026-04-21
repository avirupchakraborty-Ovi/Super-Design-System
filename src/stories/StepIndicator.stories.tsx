import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepIndicator } from "@/components/ui/StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Primitives/Step Indicator",
  component: StepIndicator,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

// ── Step 1 of 3 — only the first dot filled ───────────────────────────────────

export const Step1Of3: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};

// ── Step 2 of 3 — two dots filled, one remaining ──────────────────────────────

export const Step2Of3: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
  },
};

// ── Final step — all dots filled ──────────────────────────────────────────────

export const FinalStep: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
  },
};

// ── Two-step flow ─────────────────────────────────────────────────────────────

export const TwoStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 2,
  },
};

// ── Five-step flow — showing max practical usage ──────────────────────────────

export const FiveStep: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
  },
};
