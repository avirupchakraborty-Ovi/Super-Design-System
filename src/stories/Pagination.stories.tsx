import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Primitives/Table/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
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
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    return (
      <Pagination
        currentPage={page}
        totalPages={5}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const FirstPage: Story = {
  render: () => (
    <Pagination
      currentPage={1}
      totalPages={5}
      pageSize={12}
      onPageChange={() => {}}
    />
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination
      currentPage={5}
      totalPages={5}
      pageSize={12}
      onPageChange={() => {}}
    />
  ),
};

export const SinglePage: Story = {
  render: () => (
    <Pagination
      currentPage={1}
      totalPages={1}
      pageSize={12}
      onPageChange={() => {}}
    />
  ),
};
