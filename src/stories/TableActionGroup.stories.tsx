import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconCopy,
  IconShare,
  IconDownload,
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

export const OneAction: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconEye, label: "View", onClick: () => {} },
      ]}
    />
  ),
};

export const TwoActions: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconEye,  label: "View", onClick: () => {} },
        { icon: IconEdit, label: "Edit", onClick: () => {} },
      ]}
    />
  ),
};

export const ThreeActions: Story = {
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

export const WithOverflow: Story = {
  render: () => (
    <TableActionGroup
      actions={[
        { icon: IconEye,      label: "View",      onClick: () => {} },
        { icon: IconEdit,     label: "Edit",      onClick: () => {} },
        { icon: IconCopy,     label: "Duplicate", onClick: () => {} },
        { icon: IconShare,    label: "Share",     onClick: () => {} },
        { icon: IconDownload, label: "Export",    onClick: () => {} },
        { icon: IconTrash,    label: "Delete",    onClick: () => {} },
      ]}
    />
  ),
};
