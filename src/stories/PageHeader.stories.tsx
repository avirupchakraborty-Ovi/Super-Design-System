import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof PageHeader> = {
  title: "Primitives/Page Header",
  component: PageHeader,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PageHeader>;

/** full-stretch — heading and actions span full width */
export const FullStretch: Story = {
  args: {
    title: "Dashboard",
    subtext: "Overview of your account performance",
    layout: "full-stretch",
    actions: (
      <>
        <Button variant="outline" size="md" shape="full-rounded">
          Export
        </Button>
        <Button variant="primary" size="md" shape="full-rounded">
          Create Campaign
        </Button>
      </>
    ),
  },
};

/** centered — content constrained to content-max-width */
export const Centered: Story = {
  args: {
    title: "Edit Profile",
    subtext: "Update your account details and preferences",
    layout: "centered",
    actions: (
      <>
        <Button variant="outline" size="md" shape="full-rounded">
          Cancel
        </Button>
        <Button variant="primary" size="md" shape="full-rounded">
          Save Changes
        </Button>
      </>
    ),
  },
};

/** aside-panel — full-width flex at Desktop, column-mirrored at Wide (lg) */
export const AsidePanelLayout: Story = {
  args: {
    title: "Create Ad Set",
    subtext: "Define your audience, budget, and where your ads will appear",
    layout: "aside-panel",
    asideWidthClass: "lg:w-[260px]", // SP8 exception — matches aside panel width
    actions: (
      <>
        <Button variant="outline" size="md" shape="full-rounded">
          Cancel
        </Button>
        <Button variant="primary" size="md" shape="full-rounded">
          Save Ad Set
        </Button>
      </>
    ),
  },
};

/** No actions — heading only */
export const HeadingOnly: Story = {
  args: {
    title: "Analytics",
    subtext: "Track engagement and conversion metrics",
    layout: "full-stretch",
  },
};

/** No subtext — title only with actions */
export const TitleOnly: Story = {
  args: {
    title: "Settings",
    layout: "centered",
    actions: (
      <Button variant="primary" size="md" shape="full-rounded">
        Save
      </Button>
    ),
  },
};
