import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChartFullWidth } from "@/components/ui/ChartFullWidth";

const meta: Meta<typeof ChartFullWidth> = {
  title: "Components/Charts and KPI/Chart Full Width",
  component: ChartFullWidth,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10528-59709",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartFullWidth>;

export const NoData: Story = {
  args: {
    type: "no-data",
    heading: "Chart heading",
    value: "10,000",
    delta: "7% v/s last week",
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
    value: "10,000",
    delta: "7% v/s last week",
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
    delta: "7% v/s last week",
  },
};
