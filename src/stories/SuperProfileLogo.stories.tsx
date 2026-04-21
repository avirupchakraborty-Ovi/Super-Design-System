import type { Meta, StoryObj } from "@storybook/react";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";

const meta: Meta<typeof SuperProfileLogo> = {
  title: "Primitives/SuperProfile Logo",
  component: SuperProfileLogo,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["full", "compact"],
      description: '"full" — icon + wordmark (sidebar). "compact" — icon only, 34×34 (mobile header).',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SuperProfileLogo>;

/** Full logo — icon mark + wordmark. Used in the desktop sidebar. */
export const Full: Story = {
  args: { variant: "full" },
};

/** Compact logo — icon mark only, 34×34. Used in the mobile page header. */
export const Compact: Story = {
  args: { variant: "compact" },
};

/** Full logo as rendered in the sidebar context */
export const FullInSidebar: Story = {
  render: () => (
    <div className="flex items-center px-400 h-[56px] bg-surface-sidebar rounded-100">
      <SuperProfileLogo variant="full" />
    </div>
  ),
};

/** Compact logo as rendered in the mobile header context */
export const CompactInMobileHeader: Story = {
  render: () => (
    <div
      className="flex items-center justify-between px-[16px] py-[8px] rounded-100"
      style={{ background: "rgb(12, 16, 20)", width: 412 }}
    >
      <SuperProfileLogo variant="compact" />
      <span className="text-body font-medium text-text-on-brand">Ads Manager</span>
      <div className="w-[36px] h-[36px] rounded-500 bg-surface-level3" />
    </div>
  ),
};
