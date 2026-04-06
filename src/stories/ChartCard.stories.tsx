import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChartCard } from "@/components/ui/ChartCard";

const meta: Meta<typeof ChartCard> = {
  title: "Components/Charts and KPI/Chart Card",
  component: ChartCard,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10527-59394",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 362 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChartCard>;

export const NoData: Story = {
  args: {
    type: "no-data",
    heading: "Chart heading",
    value: "0",
    showDelta: false,
  },
};

export const Uptrend: Story = {
  args: {
    type: "uptrend",
    heading: "Chart heading",
    value: "10,000",
    delta: "245 in last 7 days",
  },
};

export const Downtrend: Story = {
  args: {
    type: "downtrend",
    heading: "Chart heading",
    value: "₹10,000",
    delta: "12% v/s last 7 days",
  },
};

export const NeutralUp: Story = {
  args: {
    type: "neutral-up",
    heading: "Chart heading",
    value: "10,000",
    delta: "245 in last 7 days",
  },
};

export const NeutralDown: Story = {
  args: {
    type: "neutral-down",
    heading: "Chart heading",
    value: "10,000",
    delta: "12% v/s last 7 days",
  },
};

export const NoHeading: Story = {
  args: {
    type: "uptrend",
    value: "10,000",
    delta: "245 in last 7 days",
    showHeading: false,
  },
};

export const NoDelta: Story = {
  args: {
    type: "uptrend",
    heading: "Chart heading",
    value: "10,000",
    showDelta: false,
  },
};
