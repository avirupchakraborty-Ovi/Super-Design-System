import type { Meta, StoryObj } from "@storybook/react";
import { IconEye } from "@tabler/icons-react";
import { TaskHeader } from "@/components/ui/TaskHeader";

const meta: Meta<typeof TaskHeader> = {
  title: "Primitives/Task Header",
  component: TaskHeader,
  parameters: { layout: "fullscreen" },
  args: {
    onClose: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof TaskHeader>;

/** Single-step flow — StepIndicator is hidden */
export const SingleStep: Story = {
  args: {
    title: "Create Ad Set",
  },
};

/** Multi-step flow — StepIndicator visible */
export const Step1Of3: Story = {
  args: {
    title: "New lead magnet",
    currentStep: 1,
    totalSteps: 3,
  },
};

export const Step2Of3: Story = {
  args: {
    title: "New lead magnet",
    currentStep: 2,
    totalSteps: 3,
  },
};

export const FinalStep: Story = {
  args: {
    title: "New lead magnet",
    currentStep: 3,
    totalSteps: 3,
  },
};

/** Secondary action — only for proportional-split layout screens */
export const WithSecondaryAction: Story = {
  args: {
    title: "New lead magnet",
    currentStep: 2,
    totalSteps: 3,
    secondaryAction: {
      label: "Preview",
      icon: IconEye,
      onClick: () => {},
    },
  },
};

export const LongTitle: Story = {
  args: {
    title: "Very long task title that should truncate on narrow screens",
    currentStep: 2,
    totalSteps: 5,
  },
};
