import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconPlus,
  IconWorld,
  IconCurrencyRupee,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconBook,
  IconBolt,
} from "@tabler/icons-react";
import { ActionCard } from "@/components/ui/ActionCard";

const meta: Meta<typeof ActionCard> = {
  title: "Components/Content/Action Card",
  component: ActionCard,
  decorators: [
    (Story) => (
      <div className="p-400 max-w-4xl">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    iconClassName: { control: "text" },
    shadow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

/** Interactive playground */
export const Default: Story = {
  args: {
    icon: IconPlus,
    label: "Create a product",
    iconClassName: "text-text-brand-primary",
    shadow: true,
  },
};

/** With shadow vs without shadow */
export const Shadow: Story = {
  render: () => (
    <div className="flex flex-col gap-300">
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">With shadow</p>
        <div className="grid grid-cols-3 gap-200">
          <ActionCard shadow icon={IconPlus}          iconClassName="text-text-brand-primary"   label="Create a product" />
          <ActionCard shadow icon={IconWorld}         iconClassName="text-text-brand-secondary" label="Edit your store" />
          <ActionCard shadow icon={IconCurrencyRupee} iconClassName="text-text-warning-1"       label="Refer and Earn" />
        </div>
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">Without shadow</p>
        <div className="grid grid-cols-3 gap-200">
          <ActionCard shadow={false} icon={IconPlus}          iconClassName="text-text-brand-primary"   label="Create a product" />
          <ActionCard shadow={false} icon={IconWorld}         iconClassName="text-text-brand-secondary" label="Edit your store" />
          <ActionCard shadow={false} icon={IconCurrencyRupee} iconClassName="text-text-warning-1"       label="Refer and Earn" />
        </div>
      </div>
    </div>
  ),
};

/** Icon colour variants */
export const IconColours: Story = {
  render: () => (
    <div className="flex flex-col gap-100">
      <ActionCard icon={IconPlus}          iconClassName="text-text-brand-primary"   label="Brand primary" />
      <ActionCard icon={IconWorld}         iconClassName="text-text-brand-secondary" label="Brand secondary" />
      <ActionCard icon={IconCurrencyRupee} iconClassName="text-text-warning-1"       label="Warning (amber)" />
      <ActionCard icon={IconBolt}          iconClassName="text-text-critical-3"      label="Critical (red)" />
      <ActionCard icon={IconBook}          iconClassName="text-text-success-1"       label="Success (green)" />
      <ActionCard icon={IconSettings}      iconClassName="text-text-level2"          label="Level 2 (grey)" />
    </div>
  ),
};

/** 3-column grid — as used on the Home screen */
export const ThreeColumnGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-200">
      <ActionCard icon={IconPlus}          iconClassName="text-text-brand-primary"   label="Create a product" />
      <ActionCard icon={IconWorld}         iconClassName="text-text-brand-secondary" label="Edit your store" />
      <ActionCard icon={IconCurrencyRupee} iconClassName="text-text-warning-1"       label="Refer and Earn" />
    </div>
  ),
};

/** 2-column grid */
export const TwoColumnGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-200">
      <ActionCard icon={IconPlus}     iconClassName="text-text-brand-primary"   label="Create a product" />
      <ActionCard icon={IconWorld}    iconClassName="text-text-brand-secondary" label="Edit your store" />
      <ActionCard icon={IconUsers}    iconClassName="text-text-brand-primary"   label="Manage audience" />
      <ActionCard icon={IconChartBar} iconClassName="text-text-brand-secondary" label="View analytics" />
    </div>
  ),
};
