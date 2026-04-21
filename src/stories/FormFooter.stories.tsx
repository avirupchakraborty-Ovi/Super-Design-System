import type { Meta, StoryObj } from "@storybook/react";
import { FormFooter } from "@/components/ui/FormFooter";

const meta: Meta<typeof FormFooter> = {
  title: "Primitives/Form Footer",
  component: FormFooter,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof FormFooter>;

export const Default: Story = {
  args: {
    showBack: true,
    backLabel: "Back",
    continueLabel: "Save & Continue",
  },
};

export const FirstStep: Story = {
  args: {
    showBack: false,
    continueLabel: "Get started",
  },
};

export const LastStep: Story = {
  args: {
    showBack: true,
    backLabel: "Back",
    continueLabel: "Publish",
  },
};

export const ContinueDisabled: Story = {
  args: {
    showBack: true,
    continueLabel: "Save & Continue",
    continueDisabled: true,
  },
};
