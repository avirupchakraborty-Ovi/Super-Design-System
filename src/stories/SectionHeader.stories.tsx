import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconUsersGroup,
  IconUserMinus,
  IconSettings,
  IconFilter,
  IconPlus,
  IconDownload,
} from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Primitives/SectionHeader",
  component: SectionHeader,
  args: {
    label: "Section Title",
    subText: "A short description of what this section contains",
  },
  argTypes: {
    label: { control: "text" },
    subText: { control: "text" },
    trailingButton: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

/** Label only — no icon, no subtext, no button */
export const LabelOnly: Story = {
  args: {
    label: "Section Title",
    subText: undefined,
  },
};

/** Label + subtext */
export const WithSubText: Story = {};

/** With leading icon */
export const WithIcon: Story = {
  args: {
    label: "Include",
    subText: "People who match these rules will be part of this audience",
    icon: IconUsersGroup,
  },
};

/** With leading icon + trailing button */
export const WithIconAndButton: Story = {
  args: {
    label: "Include",
    subText: "People who match these rules will be part of this audience",
    icon: IconUsersGroup,
    trailingButton: "Add group",
    trailingButtonIcon: IconPlus,
  },
};

/** Exclusion variant */
export const ExcludeVariant: Story = {
  args: {
    label: "Exclude",
    subText: "People who match these rules will be removed from the audience",
    icon: IconUserMinus,
    trailingButton: "Add group",
    trailingButtonIcon: IconPlus,
  },
};

/** Trailing button without icon */
export const TrailingButtonNoIcon: Story = {
  args: {
    label: "Active Filters",
    subText: "Showing results based on the following rules",
    icon: IconFilter,
    trailingButton: "Clear all",
  },
};

/** With image instead of icon */
export const WithImage: Story = {
  args: {
    label: "Integration Settings",
    subText: "Manage your connected app configuration",
    image: "https://picsum.photos/seed/app/32/32",
    trailingButton: "Configure",
  },
};

/** All variants stacked */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col divide-y divide-border-color-level2 border border-border-color-level2 rounded-100">
      <SectionHeader
        label="Label only"
      />
      <SectionHeader
        label="With subtext"
        subText="Supporting description text below the label"
      />
      <SectionHeader
        label="With icon"
        subText="Leading icon matches MenuListItem sizing"
        icon={IconSettings}
      />
      <SectionHeader
        label="With icon and button"
        subText="Trailing button defaults to size sm"
        icon={IconUsersGroup}
        trailingButton="Add group"
        trailingButtonIcon={IconPlus}
      />
      <SectionHeader
        label="With image"
        subText="32×32 image replaces the icon"
        image="https://picsum.photos/seed/section/32/32"
        trailingButton="Export"
        trailingButtonIcon={IconDownload}
      />
    </div>
  ),
};
