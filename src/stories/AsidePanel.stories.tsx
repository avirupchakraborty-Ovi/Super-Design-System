import type { Meta, StoryObj } from "@storybook/react";
import { AsidePanel } from "@/components/ui/AsidePanel";
import { StatCard } from "@/components/ui/StatCard";
import { Nudge } from "@/components/ui/Nudge";

const meta: Meta<typeof AsidePanel> = {
  title: "Primitives/Aside Panel",
  component: AsidePanel,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="flex gap-300 p-400">
        {/* Simulated main column */}
        <div className="flex-1 min-w-0 rounded-100 border border-border-color-level2 p-200">
          <p className="text-body text-text-level2">
            Main column content — resize viewport to 1440px+ to see the aside
            panel appear.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AsidePanel>;

/** Default — visible at Wide (lg: 1440px+) with 260px width */
export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-200">
        <StatCard
          heading="Estimated Reach"
          value="1.2M"
          delta="people per day"
          trend="neutral"
          showDelta
        />
        <StatCard
          heading="Est. Daily Impressions"
          value="21.6K"
          delta="~302 clicks"
          trend="neutral"
          showDelta
        />
        <Nudge
          type="normal"
          size="md"
          message="Audience size looks good. Balanced audiences between 500K–3M tend to perform well."
          dismissible={false}
        />
      </div>
    ),
  },
};

/** Custom width — SP8 exception */
export const CustomWidth: Story = {
  args: {
    width: "w-[320px]", // SP8 exception — wider aside for preview content
    children: (
      <div className="flex flex-col gap-200">
        <div className="rounded-100 border border-border-color-level2 p-200 bg-surface-level2">
          <p className="text-body text-text-level2">Preview panel at 320px</p>
        </div>
      </div>
    ),
  },
};
