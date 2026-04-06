import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconBrandInstagram, IconBrandYoutube, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { TableList } from "@/components/ui/TableList";
import { TableActionGroup } from "@/components/ui/TableActionGroup";

const SAMPLE_IMAGE = "https://picsum.photos/52/52?grayscale";

const ACTIONS = (
  <TableActionGroup
    actions={[
      { icon: IconEye,   label: "View",   onClick: () => {} },
      { icon: IconEdit,  label: "Edit",   onClick: () => {} },
      { icon: IconTrash, label: "Delete", onClick: () => {} },
    ]}
  />
);

const meta: Meta<typeof TableList> = {
  title: "Primitives/Table/TableList",
  component: TableList,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-400 w-[560px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TableList>;

export const Default: Story = {
  render: () => (
    <TableList
      image={SAMPLE_IMAGE}
      title="Customers"
      subtitle="@pranavpradeep3629"
      platformIcon={<IconBrandInstagram size={16} strokeWidth={1.5} />}
      platformLabel="Post or reel"
      badge="Dynamic"
      actions={ACTIONS}
    />
  ),
};

export const NoImage: Story = {
  render: () => (
    <TableList
      title="Newsletter Subscribers"
      subtitle="newsletter@domain.com"
      badge="Static"
      actions={ACTIONS}
    />
  ),
};

export const NoBadge: Story = {
  render: () => (
    <TableList
      image={SAMPLE_IMAGE}
      title="VIP Customers"
      subtitle="@vip_handle"
      platformIcon={<IconBrandYoutube size={16} strokeWidth={1.5} />}
      platformLabel="Short video"
      actions={ACTIONS}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px] w-[560px]">
      <TableList
        image={SAMPLE_IMAGE}
        title="Customers"
        subtitle="@pranavpradeep3629"
        platformIcon={<IconBrandInstagram size={16} strokeWidth={1.5} />}
        platformLabel="Post or reel"
        badge="Dynamic"
        actions={ACTIONS}
      />
      <TableList
        image={SAMPLE_IMAGE}
        title="Newsletter Subscribers"
        subtitle="newsletter@domain.com"
        badge="Static"
        actions={ACTIONS}
      />
      <TableList
        image={SAMPLE_IMAGE}
        title="VIP Customers"
        subtitle="@vip_handle"
        platformIcon={<IconBrandYoutube size={16} strokeWidth={1.5} />}
        platformLabel="Short video"
        badge="Dynamic"
        actions={ACTIONS}
      />
      <TableList
        title="Inactive Users"
        badge="Static"
        actions={ACTIONS}
      />
    </div>
  ),
};
