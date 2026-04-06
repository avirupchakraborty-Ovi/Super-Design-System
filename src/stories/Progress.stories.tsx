import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "@/components/ui/Progress";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Table/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-400 w-[240px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Zero: Story = {
  render: () => <Progress value={0} />,
};

export const TwentyPercent: Story = {
  render: () => <Progress value={20} />,
};

export const FiftyPercent: Story = {
  render: () => <Progress value={50} />,
};

export const EightyPercent: Story = {
  render: () => <Progress value={80} />,
};

export const Complete: Story = {
  render: () => <Progress value={100} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px] w-[240px]">
      <Progress value={0} />
      <Progress value={20} />
      <Progress value={40} />
      <Progress value={50} />
      <Progress value={60} />
      <Progress value={80} />
      <Progress value={100} />
    </div>
  ),
};
