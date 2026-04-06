import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BadgeWithText } from "@/components/ui/BadgeWithText";

const meta: Meta<typeof BadgeWithText> = {
  title: "Primitives/Table/BadgeWithText",
  component: BadgeWithText,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-400">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BadgeWithText>;

export const Success: Story = {
  render: () => (
    <BadgeWithText badge="Enabled" colour="success">
      Placeholder text
    </BadgeWithText>
  ),
};

export const Primary: Story = {
  render: () => (
    <BadgeWithText badge="Active" colour="primary">
      Placeholder text
    </BadgeWithText>
  ),
};

export const Neutral: Story = {
  render: () => (
    <BadgeWithText badge="Draft" colour="neutral">
      Placeholder text
    </BadgeWithText>
  ),
};

export const Critical: Story = {
  render: () => (
    <BadgeWithText badge="Disabled" colour="critical">
      Placeholder text
    </BadgeWithText>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <BadgeWithText badge="Enabled" colour="success">Newsletter Subscribers</BadgeWithText>
      <BadgeWithText badge="Active" colour="primary">Instagram Contacts</BadgeWithText>
      <BadgeWithText badge="Draft" colour="neutral">Free Photoshop Course</BadgeWithText>
      <BadgeWithText badge="Disabled" colour="critical">Inactive Users</BadgeWithText>
      <BadgeWithText badge="Warning" colour="warning">VIP Customers</BadgeWithText>
    </div>
  ),
};
