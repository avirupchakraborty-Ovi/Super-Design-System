import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FollowerCount } from "@/components/ui/FollowerCount";

const meta: Meta<typeof FollowerCount> = {
  title: "Primitives/Table/FollowerCount",
  component: FollowerCount,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-400">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FollowerCount>;

export const Zero: Story = {
  render: () => <FollowerCount state="zero" />,
};

export const NA: Story = {
  render: () => <FollowerCount state="na" />,
};

export const Positive: Story = {
  render: () => <FollowerCount state="positive" count={2} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <FollowerCount state="zero" />
      <FollowerCount state="na" />
      <FollowerCount state="positive" count={2} />
      <FollowerCount state="positive" count={148} />
    </div>
  ),
};
