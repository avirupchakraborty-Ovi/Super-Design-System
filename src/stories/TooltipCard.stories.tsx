import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconBell, IconInfoCircle, IconStar } from "@tabler/icons-react";
import { TooltipCard } from "@/components/ui/TooltipCard";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=124&h=124&fit=crop";

const meta: Meta<typeof TooltipCard> = {
  title: "Components/Overlays/TooltipCard",
  component: TooltipCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10301-78707",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400 flex items-start justify-start">
        <Story />
      </div>
    ),
  ],
  args: {
    color: "black",
    tipSide: "top",
    tipAlign: "start",
    showTip: true,
    size: "md",
    heading: "What does this setting do?",
    body: "This setting controls how your account behaves when you are away. You can change it at any time from your profile settings.",
  },
  argTypes: {
    color:    { control: "select", options: ["black", "white"] },
    tipSide:  { control: "select", options: ["top", "bottom", "left", "right"] },
    tipAlign: { control: "select", options: ["start", "center", "end"] },
    showTip:  { control: "boolean" },
    size:     { control: "select", options: ["md", "sm"] },
    heading:  { control: "text" },
    body:     { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TooltipCard>;

/** Interactive playground */
export const Default: Story = {};

/** Black (dark) vs White (light) */
export const Colors: Story = {
  render: () => (
    <div className="flex items-start gap-400 p-400">
      <div className="flex flex-col gap-150 items-start">
        <p className="text-supporting text-text-level3">Black</p>
        <TooltipCard
          color="black"
          heading="Dark tooltip"
          body="This tooltip uses the dark surface, ideal for light backgrounds."
          primaryAction="Learn more"
        />
      </div>
      <div className="flex flex-col gap-150 items-start">
        <p className="text-supporting text-text-level3">White</p>
        <TooltipCard
          color="white"
          heading="Light tooltip"
          body="This tooltip uses the light surface, ideal for dark backgrounds."
          primaryAction="Learn more"
        />
      </div>
    </div>
  ),
};

/** md vs sm */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-400 p-400">
      <div className="flex flex-col gap-150 items-start">
        <p className="text-supporting text-text-level3">Medium (default)</p>
        <TooltipCard
          size="md"
          heading="Medium tooltip"
          body="Standard size for most use cases. Padding 20px, card width 400px."
        />
      </div>
      <div className="flex flex-col gap-150 items-start">
        <p className="text-supporting text-text-level3">Small</p>
        <TooltipCard
          size="sm"
          heading="Small tooltip"
          body="Compact size for dense layouts. Padding 12px, card width 344px."
        />
      </div>
    </div>
  ),
};

/** All 12 tip positions */
export const TipPositions: Story = {
  render: () => {
    const positions: { label: string; tipSide: "top" | "bottom" | "left" | "right"; tipAlign: "start" | "center" | "end" }[] = [
      { label: "Top / Start",    tipSide: "top",    tipAlign: "start"  },
      { label: "Top / Center",   tipSide: "top",    tipAlign: "center" },
      { label: "Top / End",      tipSide: "top",    tipAlign: "end"    },
      { label: "Bottom / Start", tipSide: "bottom", tipAlign: "start"  },
      { label: "Bottom / Center",tipSide: "bottom", tipAlign: "center" },
      { label: "Bottom / End",   tipSide: "bottom", tipAlign: "end"    },
      { label: "Left / Start",   tipSide: "left",   tipAlign: "start"  },
      { label: "Left / Center",  tipSide: "left",   tipAlign: "center" },
      { label: "Left / End",     tipSide: "left",   tipAlign: "end"    },
      { label: "Right / Start",  tipSide: "right",  tipAlign: "start"  },
      { label: "Right / Center", tipSide: "right",  tipAlign: "center" },
      { label: "Right / End",    tipSide: "right",  tipAlign: "end"    },
    ];

    return (
      <div className="grid grid-cols-2 gap-[80px] p-400">
        {positions.map(({ label, tipSide, tipAlign }) => (
          <div key={label} className="flex flex-col gap-150 items-start">
            <p className="text-supporting text-text-level3">{label}</p>
            <TooltipCard
              size="sm"
              tipSide={tipSide}
              tipAlign={tipAlign}
              heading="Tip position"
              body="Arrow appears here."
            />
          </div>
        ))}
      </div>
    );
  },
};

/** All 12 tip positions — body text only, no heading */
export const TipPositionsBodyOnly: Story = {
  render: () => {
    const positions: { label: string; tipSide: "top" | "bottom" | "left" | "right"; tipAlign: "start" | "center" | "end" }[] = [
      { label: "Top / Start",    tipSide: "top",    tipAlign: "start"  },
      { label: "Top / Center",   tipSide: "top",    tipAlign: "center" },
      { label: "Top / End",      tipSide: "top",    tipAlign: "end"    },
      { label: "Bottom / Start", tipSide: "bottom", tipAlign: "start"  },
      { label: "Bottom / Center",tipSide: "bottom", tipAlign: "center" },
      { label: "Bottom / End",   tipSide: "bottom", tipAlign: "end"    },
      { label: "Left / Start",   tipSide: "left",   tipAlign: "start"  },
      { label: "Left / Center",  tipSide: "left",   tipAlign: "center" },
      { label: "Left / End",     tipSide: "left",   tipAlign: "end"    },
      { label: "Right / Start",  tipSide: "right",  tipAlign: "start"  },
      { label: "Right / Center", tipSide: "right",  tipAlign: "center" },
      { label: "Right / End",    tipSide: "right",  tipAlign: "end"    },
    ];

    return (
      <div className="grid grid-cols-2 gap-[80px] p-400">
        {positions.map(({ label, tipSide, tipAlign }) => (
          <div key={label} className="flex flex-col gap-150 items-start">
            <p className="text-supporting text-text-level3">{label}</p>
            <TooltipCard
              size="sm"
              tipSide={tipSide}
              tipAlign={tipAlign}
              body="Arrow appears here."
            />
          </div>
        ))}
      </div>
    );
  },
};

/** With a leading image */
export const WithImage: Story = {
  render: () => (
    <div className="flex items-start gap-400 p-400">
      <TooltipCard
        size="md"
        image={SAMPLE_IMAGE}
        imageAlt="Landscape"
        heading="Landscape photo"
        body="A beautiful landscape. Tap to view the full gallery and explore more shots from this location."
      />
      <TooltipCard
        size="sm"
        image={SAMPLE_IMAGE}
        imageAlt="Landscape"
        heading="Landscape"
        body="Tap to view the full gallery."
      />
    </div>
  ),
};

/** With a leading icon beside the heading */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-300 p-400">
      <TooltipCard
        color="black"
        icon={IconInfoCircle}
        heading="About this feature"
        body="This feature is currently in beta. Your feedback helps us improve it before the full release."
      />
      <TooltipCard
        color="white"
        icon={IconBell}
        heading="Notification settings"
        body="Control which notifications you receive and how often they are delivered."
      />
    </div>
  ),
};

/** With action buttons */
export const WithActions: Story = {
  render: () => (
    <div className="flex items-start gap-400 p-400">
      <TooltipCard
        color="black"
        heading="Need help?"
        body="Our support team is available 24/7 to answer your questions."
        primaryAction="Open chat"
        secondaryAction="Dismiss"
      />
      <TooltipCard
        color="white"
        heading="New feature available"
        body="You can now export your data in CSV format directly from the dashboard."
        primaryAction="Try it now"
        secondaryAction="Later"
      />
    </div>
  ),
};

/** Label — content-hugging variant for icon button tooltips */
export const Label: Story = {
  render: () => (
    <div className="flex items-end gap-300 p-400">
      <TooltipCard size="label" color="black" tipSide="top" tipAlign="center" body="View" />
      <TooltipCard size="label" color="black" tipSide="top" tipAlign="center" body="Edit" />
      <TooltipCard size="label" color="black" tipSide="top" tipAlign="center" body="Pause" />
      <TooltipCard size="label" color="black" tipSide="top" tipAlign="center" body="Delete" />
    </div>
  ),
};

/** No tip (card only) */
export const NoTip: Story = {
  render: () => (
    <div className="flex items-start gap-400 p-400">
      <TooltipCard
        showTip={false}
        color="black"
        heading="Card without tip"
        body="This is the tooltip card without the directional arrow — useful when positioning programmatically."
      />
    </div>
  ),
};

/** sm size, all positions */
export const CompleteMatrix: Story = {
  render: () => {
    const variants: { label: string; props: Partial<Parameters<typeof TooltipCard>[0]> }[] = [
      { label: "Black, md, tip top-start",    props: { color: "black", size: "md", tipSide: "top",    tipAlign: "start" } },
      { label: "Black, sm, tip top-start",    props: { color: "black", size: "sm", tipSide: "top",    tipAlign: "start" } },
      { label: "White, md, tip bottom-center",props: { color: "white", size: "md", tipSide: "bottom", tipAlign: "center" } },
      { label: "White, sm, tip bottom-center",props: { color: "white", size: "sm", tipSide: "bottom", tipAlign: "center" } },
      { label: "Black, md, tip left-start",   props: { color: "black", size: "md", tipSide: "left",   tipAlign: "start" } },
      { label: "Black, md, tip right-end",    props: { color: "black", size: "md", tipSide: "right",  tipAlign: "end"   } },
      { label: "With icon",                   props: { color: "black", icon: IconStar } },
      { label: "With image",                  props: { color: "black", image: SAMPLE_IMAGE, imageAlt: "photo" } },
      { label: "With actions",                props: { color: "black", primaryAction: "Open chat", secondaryAction: "Dismiss" } },
      { label: "No tip",                      props: { color: "black", showTip: false } },
    ];

    return (
      <div className="flex flex-col gap-500 p-400">
        {variants.map(({ label, props }) => (
          <div key={label}>
            <p className="mb-100 text-supporting text-text-level3">{label}</p>
            <TooltipCard
              heading="Setting label"
              body="Description text that explains this feature in more detail."
              {...props}
            />
          </div>
        ))}
      </div>
    );
  },
};
