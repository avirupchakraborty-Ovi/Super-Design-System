import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PromoBanner } from "@/components/ui/PromoBanner";

// Placeholder 3D-style icon for stories — replace with actual asset
const SAMPLE_ICON = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a0-fe0f.png";

const meta: Meta<typeof PromoBanner> = {
  title: "Components/Content/Banner",
  component: PromoBanner,
  decorators: [
    (Story) => (
      <div className="p-400 max-w-2xl">
        <Story />
      </div>
    ),
  ],
  args: {
    image: SAMPLE_ICON,
    imageAlt: "Warning icon",
    title: "Uh oh...you have 5 unpublished products!",
    subtitle: "Upgrade now to publish these and start earning.",
    actionLabel: "Start Earning",
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    actionLabel: { control: "text" },
    image: { control: "text" },
    imageAlt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

/** Interactive playground */
export const Default: Story = {};

/** Without subtitle */
export const NoSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
};

/** Without CTA */
export const NoCTA: Story = {
  args: {
    actionLabel: undefined,
  },
};

/** Message only — no CTA, no subtitle */
export const MessageOnly: Story = {
  args: {
    subtitle: undefined,
    actionLabel: undefined,
  },
};
