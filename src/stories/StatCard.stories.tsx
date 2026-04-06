import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard } from "@/components/ui/StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Components/Charts and KPI/Stat Card",
  component: StatCard,
  decorators: [
    (Story) => (
      <div className="p-400 max-w-2xl">
        <Story />
      </div>
    ),
  ],
  args: {
    heading: "Total Followers",
    value: "12,345",
    delta: "245 in last 7 days",
    trend: "up",
    showHeading: true,
    showDelta: true,
  },
  argTypes: {
    heading: { control: "text" },
    value: { control: "text" },
    delta: { control: "text" },
    trend: { control: "select", options: ["up", "down", "neutral"] },
    showHeading: { control: "boolean" },
    showInfo: { control: "boolean" },
    showDelta: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

/** Interactive playground */
export const Default: Story = {};

/** All 3 trend variants */
export const Trends: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <StatCard heading="Total Followers" value="12,345" delta="245 in last 7 days"  trend="up"      />
      <StatCard heading="Total Followers" value="12,345" delta="245 in last 7 days"  trend="down"    />
      <StatCard heading="Total Followers" value="12,345" delta="245 in last 7 days"  trend="neutral" />
    </div>
  ),
};

/** 3-column grid — as used on Home/Analytics screens */
export const ThreeColumnGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-200">
      <StatCard heading="Total Followers"  value="12,345"  delta="245 in last 7 days"   trend="up"      />
      <StatCard heading="Total Reach"      value="84,210"  delta="1,200 in last 7 days" trend="up"      />
      <StatCard heading="Link Clicks"      value="3,892"   delta="58 in last 7 days"    trend="down"    />
    </div>
  ),
};

/** 2-column grid */
export const TwoColumnGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-200">
      <StatCard heading="Total Followers"  value="12,345"  delta="245 in last 7 days"  trend="up"   />
      <StatCard heading="Total Reach"      value="84,210"  delta="1,200 in last 7 days" trend="up"  />
      <StatCard heading="Link Clicks"      value="3,892"   delta="58 in last 7 days"   trend="down" />
      <StatCard heading="Avg. Engagement"  value="4.6%"    delta="0.2% in last 7 days" trend="neutral" />
    </div>
  ),
};

/** 3-column grid without the info icon */
export const NoTooltip: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-200">
      <StatCard showInfo={false} heading="Total Followers"  value="12,345"  delta="245 in last 7 days"   trend="up"   />
      <StatCard showInfo={false} heading="Total Reach"      value="84,210"  delta="1,200 in last 7 days" trend="up"   />
      <StatCard showInfo={false} heading="Link Clicks"      value="3,892"   delta="58 in last 7 days"    trend="down" />
    </div>
  ),
};

/** No heading */
export const NoHeading: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-200">
      <StatCard showHeading={false} value="12,345"  delta="245 in last 7 days"   trend="up"   />
      <StatCard showHeading={false} value="84,210"  delta="1,200 in last 7 days" trend="up"   />
      <StatCard showHeading={false} value="3,892"   delta="58 in last 7 days"    trend="down" />
    </div>
  ),
};

/** No delta */
export const NoDelta: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-200">
      <StatCard showDelta={false} heading="Total Followers" value="12,345" trend="up"   />
      <StatCard showDelta={false} heading="Total Reach"     value="84,210" trend="up"   />
      <StatCard showDelta={false} heading="Link Clicks"     value="3,892"  trend="down" />
    </div>
  ),
};
