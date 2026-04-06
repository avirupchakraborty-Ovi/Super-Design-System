import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconPlus,
  IconDots,
  IconShare,
} from "@tabler/icons-react";
import { TableActionGroup } from "@/components/ui/TableActionGroup";

const meta: Meta<typeof TableActionGroup> = {
  title: "Primitives/Table/TableActionGroup",
  component: TableActionGroup,
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
type Story = StoryObj<typeof TableActionGroup>;

export const Default: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconPlus, label: "Add", onClick: () => {} },
        { icon: IconPlus, label: "Add second", onClick: () => {} },
        { icon: IconPlus, label: "Add third", onClick: () => {} },
      ]}
    />
  ),
};

export const EditDeleteView: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconEye,   label: "View",   onClick: () => {} },
        { icon: IconEdit,  label: "Edit",   onClick: () => {} },
        { icon: IconTrash, label: "Delete", onClick: () => {} },
      ]}
    />
  ),
};

export const ShareAndMore: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconShare, label: "Share", onClick: () => {} },
        { icon: IconDots,  label: "More",  onClick: () => {} },
      ]}
    />
  ),
};
