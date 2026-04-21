import type { Meta, StoryObj } from "@storybook/react";
import { IconPlayerPlay, IconLayout } from "@tabler/icons-react";
import { CollapsiblePageHeader } from "@/components/ui/CollapsiblePageHeader";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { IconPlus } from "@tabler/icons-react";

const meta: Meta<typeof CollapsiblePageHeader> = {
  title: "Primitives/Collapsible Page Header",
  component: CollapsiblePageHeader,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-screen overflow-y-auto bg-surface-level1">
        <Story />
        {/* Filler content to enable scrolling */}
        <div className="px-400 py-300 space-y-200">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="p-250 rounded-100 border border-border-color-level2 bg-surface-level1"
            >
              <p className="text-body text-text-level2">
                Content row {i + 1} — scroll up to see the header collapse
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CollapsiblePageHeader>;

/** Full hero with gradient background, secondary links, metrics, and CTA */
export const Default: Story = {
  args: {
    title: "Ads Manager",
    count: 24,
    secondaryLinks: [
      {
        label: "View Demo",
        icon: IconPlayerPlay,
        onClick: () => {},
      },
      {
        label: "Resources",
        icon: IconLayout,
        onClick: () => {},
      },
    ],
    actions: (
      <Button
        variant="primary"
        shape="full-rounded"
        size="md"
        leadingIcon={IconPlus}
      >
        New Campaign
      </Button>
    ),
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700" />
    ),
    children: (
      <div className="grid grid-cols-3 gap-200">
        <StatCard
          heading="Total Spend"
          value="₹1.2L"
          delta="+12% vs last month"
          trend="up"
          showDelta
        />
        <StatCard
          heading="Impressions"
          value="4.8M"
          delta="+8% vs last month"
          trend="up"
          showDelta
        />
        <StatCard
          heading="Avg. CTR"
          value="2.4%"
          delta="-0.3% vs last month"
          trend="down"
          showDelta
        />
      </div>
    ),
  },
};

/** Without metrics — hero with title, links, and CTA only */
export const NoMetrics: Story = {
  args: {
    title: "Lead Magnet",
    count: 17,
    secondaryLinks: [
      {
        label: "View Demo",
        icon: IconPlayerPlay,
        onClick: () => {},
      },
      {
        label: "Resources",
        icon: IconLayout,
        onClick: () => {},
      },
    ],
    actions: (
      <Button
        variant="primary"
        shape="full-rounded"
        size="md"
        leadingIcon={IconPlus}
      >
        New Lead Magnet
      </Button>
    ),
    background: (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
    ),
  },
};

/** Minimal — title and CTA only, no links or metrics */
export const Minimal: Story = {
  args: {
    title: "Campaigns",
    count: 8,
    actions: (
      <Button
        variant="primary"
        shape="full-rounded"
        size="md"
        leadingIcon={IconPlus}
      >
        New Campaign
      </Button>
    ),
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-700" />
    ),
  },
};

/** With image background */
export const ImageBackground: Story = {
  args: {
    title: "Analytics",
    secondaryLinks: [
      {
        label: "Export Report",
        icon: IconLayout,
        onClick: () => {},
      },
    ],
    background: (
      <img
        src="https://picsum.photos/seed/hero/1600/400"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    ),
  },
};
