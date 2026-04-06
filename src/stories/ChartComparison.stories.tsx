import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChartComparison } from "@/components/ui/ChartComparison";

const meta: Meta<typeof ChartComparison> = {
  title: "Components/Charts and KPI/Chart Comparison",
  component: ChartComparison,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10528-59775",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartComparison>;

export const Default: Story = {
  args: {
    card: {
      type: "no-data",
      heading: "Chart heading",
      value: "0",
      showDelta: false,
    },
    chart: {
      type: "uptrend",
      heading: "Chart heading",
      value: "10,000",
      delta: "245 in last 7 days",
    },
  },
};

export const Downtrend: Story = {
  args: {
    card: {
      type: "downtrend",
      heading: "Chart heading",
      value: "₹10,000",
      delta: "12% v/s last 7 days",
    },
    chart: {
      type: "downtrend",
      heading: "Chart heading",
      value: "10,000",
      delta: "7% v/s last week",
    },
  },
};
