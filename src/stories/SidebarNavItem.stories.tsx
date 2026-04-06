import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconHome,
  IconUsers,
  IconSpeakerphone,
  IconChartPie,
} from "@tabler/icons-react";
import { SidebarNavItem } from "@/components/ui/SidebarNavItem";

const meta: Meta<typeof SidebarNavItem> = {
  title: "Primitives/Sidebar/SidebarNavItem",
  component: SidebarNavItem,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="bg-surface-sidebar p-[16px] w-[225px] rounded-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarNavItem>;

export const Default: Story = {
  render: () => (
    <SidebarNavItem icon={IconHome} label="Home" />
  ),
};

export const Active: Story = {
  render: () => (
    <SidebarNavItem icon={IconHome} label="Home" active />
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[8px]">
      <SidebarNavItem icon={IconHome} label="Home" active />
      <SidebarNavItem icon={IconUsers} label="Contacts" />
      <SidebarNavItem icon={IconSpeakerphone} label="Campaigns" />
      <SidebarNavItem icon={IconChartPie} label="Analytics" />
    </div>
  ),
};
