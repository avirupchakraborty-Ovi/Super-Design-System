import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { IconBrandInstagram, IconBrandYoutube, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { BadgeWithText } from "@/components/ui/BadgeWithText";
import { Progress } from "@/components/ui/Progress";
import { FollowerCount } from "@/components/ui/FollowerCount";
import { TableList } from "@/components/ui/TableList";
import { TableActionGroup } from "@/components/ui/TableActionGroup";

// ── Sample data ────────────────────────────────────────────────────────────────

type Row = {
  name: string;
  type: string;
  contacts: number;
  opens: number;
  created: string;
  updated: string;
};

type RichRow = {
  image: string;
  name: string;
  handle: string;
  platformIcon: React.ReactNode;
  platformLabel: string;
  type: "Dynamic" | "Static";
  contacts: number;
  openRate: number;
};

const COLUMNS = [
  { key: "name",     label: "Name",         sortable: true,  info: false },
  { key: "type",     label: "Type",         sortable: true,  info: false },
  { key: "contacts", label: "Contacts",     sortable: true,  info: true  },
  { key: "opens",    label: "Opens",        sortable: true,  info: true  },
  { key: "created",  label: "Created",      sortable: true,  info: false },
  { key: "updated",  label: "Last Updated", sortable: true,  info: false },
];

const DATA: Row[] = [
  { name: "Instagram Contacts",    type: "Dynamic", contacts: 6,   opens: 0,  created: "01:37 PM, 17 Mar 2026", updated: "02:01 PM, 12 May 2025" },
  { name: "Free Photoshop Course", type: "Dynamic", contacts: 1,   opens: 0,  created: "01:04 AM, 22 Feb 2025", updated: "12:58 PM, 21 Feb 2025" },
  { name: "Newsletter Subscribers",type: "Static",  contacts: 142, opens: 38, created: "10:00 AM, 01 Jan 2026", updated: "09:15 AM, 15 Mar 2026" },
  { name: "VIP Customers",         type: "Static",  contacts: 24,  opens: 12, created: "03:22 PM, 05 Feb 2026", updated: "11:40 AM, 20 Mar 2026" },
  { name: "Inactive Users",        type: "Dynamic", contacts: 89,  opens: 2,  created: "08:00 AM, 10 Dec 2025", updated: "07:55 AM, 01 Mar 2026" },
];

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Components/Data/DataTable",
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10424-39024",
    },
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
type Story = StoryObj;

// ── Line ───────────────────────────────────────────────────────────────────────

/** Line table — column grid with header background */
export const Line: Story = {
  render: () => <DataTable columns={COLUMNS} data={DATA} />,
};

// ── Line With Toolbar ──────────────────────────────────────────────────────────

/** Line table with search + filter / sort / export */
export const LineWithToolbar: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    return (
      <DataTable
        columns={COLUMNS}
        data={DATA}
        searchValue={search}
        onSearch={setSearch}
        onFilter={() => {}}
        onSort={() => {}}
        onExport={() => {}}
      />
    );
  },
};

// ── Spaced ─────────────────────────────────────────────────────────────────────

/** Spaced table — each row is a unified bordered card */
export const Spaced: Story = {
  render: () => <DataTable type="spaced" columns={COLUMNS} data={DATA} />,
};

// ── Spaced With Toolbar ────────────────────────────────────────────────────────

/** Spaced table with toolbar */
export const SpacedWithToolbar: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    return (
      <DataTable
        type="spaced"
        columns={COLUMNS}
        data={DATA}
        searchValue={search}
        onSearch={setSearch}
        onFilter={() => {}}
        onSort={() => {}}
        onExport={() => {}}
      />
    );
  },
};

// ── Custom Cell Render ─────────────────────────────────────────────────────────

/** Demonstrates the render prop — Type column uses a Badge */
export const CustomCells: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: "name",     label: "Name",     sortable: true },
        {
          key: "type",
          label: "Type",
          sortable: true,
          render: (row: Row) => (
            <Badge colour="primary" fill="light" type="full-rounded" shadow={false}>{row.type}</Badge>
          ),
        },
        { key: "contacts", label: "Contacts", sortable: true, info: true },
        { key: "opens",    label: "Opens",    sortable: true, info: true },
        { key: "created",  label: "Created",  sortable: true },
      ]}
      data={DATA}
    />
  ),
};

// ── Rich Cells data ────────────────────────────────────────────────────────────

const RICH_DATA: RichRow[] = [
  { image: "https://picsum.photos/seed/a/52/52", name: "Instagram Contacts",     handle: "@pranavpradeep3629", platformIcon: <IconBrandInstagram size={16} strokeWidth={1.5} />, platformLabel: "Post or reel",  type: "Dynamic", contacts: 6,   openRate: 0  },
  { image: "https://picsum.photos/seed/b/52/52", name: "Free Photoshop Course",  handle: "@adobemaster",      platformIcon: <IconBrandYoutube   size={16} strokeWidth={1.5} />, platformLabel: "Short video",   type: "Dynamic", contacts: 1,   openRate: 20 },
  { image: "https://picsum.photos/seed/c/52/52", name: "Newsletter Subscribers", handle: "@newsletter",       platformIcon: <IconBrandInstagram size={16} strokeWidth={1.5} />, platformLabel: "Story",         type: "Static",  contacts: 142, openRate: 60 },
  { image: "https://picsum.photos/seed/d/52/52", name: "VIP Customers",          handle: "@vip_handle",       platformIcon: <IconBrandYoutube   size={16} strokeWidth={1.5} />, platformLabel: "Live stream",   type: "Static",  contacts: 24,  openRate: 80 },
  { image: "https://picsum.photos/seed/e/52/52", name: "Inactive Users",         handle: "@inactive",         platformIcon: <IconBrandInstagram size={16} strokeWidth={1.5} />, platformLabel: "Reel",          type: "Dynamic", contacts: 89,  openRate: 100 },
];

const ACTIONS_CELL = (
  <TableActionGroup
    actions={[
      { icon: IconEye,   label: "View",   onClick: () => {} },
      { icon: IconEdit,  label: "Edit",   onClick: () => {} },
      { icon: IconTrash, label: "Delete", onClick: () => {} },
    ]}
  />
);

const RICH_COLUMNS = [
  {
    key: "name",
    label: "Segment",
    sortable: true,
    render: (row: RichRow) => (
      <TableList
        image={row.image}
        title={row.name}
        subtitle={row.handle}
        platformIcon={row.platformIcon}
        platformLabel={row.platformLabel}
      />
    ),
  },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (row: RichRow) => (
      <Badge
        colour={row.type === "Dynamic" ? "primary" : "success"}
        fill="light"
        type="full-rounded"
        shadow={false}
      >
        {row.type}
      </Badge>
    ),
  },
  {
    key: "contacts",
    label: "Contacts",
    sortable: true,
    info: true,
    render: (row: RichRow) => (
      <FollowerCount
        state={row.contacts === 0 ? "zero" : "positive"}
        count={row.contacts}
      />
    ),
  },
  {
    key: "openRate",
    label: "Open Rate",
    sortable: true,
    info: true,
    render: (row: RichRow) => <Progress value={row.openRate} />,
  },
  {
    key: "actions",
    label: "Actions",
    render: () => ACTIONS_CELL,
  },
];

// ── Line — Rich Cells ──────────────────────────────────────────────────────────

/** Line table using all table primitive components as cell renderers */
export const LineRichCells: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    return (
      <DataTable
        columns={RICH_COLUMNS}
        data={RICH_DATA}
        searchValue={search}
        onSearch={setSearch}
        onFilter={() => {}}
        onSort={() => {}}
        onExport={() => {}}
      />
    );
  },
};

// ── Spaced — Rich Cells ────────────────────────────────────────────────────────

/** Spaced table using all table primitive components as cell renderers */
export const SpacedRichCells: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    return (
      <DataTable
        type="spaced"
        columns={RICH_COLUMNS}
        data={RICH_DATA}
        searchValue={search}
        onSearch={setSearch}
        onFilter={() => {}}
        onSort={() => {}}
        onExport={() => {}}
      />
    );
  },
};

// ── With Sorting Icons ─────────────────────────────────────────────────────────

/** Sort icons visible in column headers */
export const WithSortingIcons: Story = {
  render: () => <DataTable columns={COLUMNS} data={DATA} showSortIcons />,
};

/** Spaced table with sort icons */
export const SpacedWithSortingIcons: Story = {
  render: () => <DataTable type="spaced" columns={COLUMNS} data={DATA} showSortIcons />,
};

// ── With Pagination ────────────────────────────────────────────────────────────

/** Line table with pagination */
export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    return (
      <DataTable
        columns={COLUMNS}
        data={DATA}
        pagination={{
          currentPage: page,
          totalPages: 5,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
    );
  },
};

// ── Fill Height ────────────────────────────────────────────────────────────────

const TALL_DATA: Row[] = [
  ...DATA,
  { name: "Webinar Attendees",      type: "Static",  contacts: 310, opens: 95, created: "09:00 AM, 03 Jan 2026", updated: "10:30 AM, 02 Apr 2026" },
  { name: "Trial Signups",          type: "Dynamic", contacts: 57,  opens: 14, created: "02:15 PM, 14 Feb 2026", updated: "04:45 PM, 28 Mar 2026" },
  { name: "Referral Leads",         type: "Dynamic", contacts: 22,  opens: 6,  created: "11:00 AM, 20 Jan 2026", updated: "08:20 AM, 10 Apr 2026" },
  { name: "High Value Prospects",   type: "Static",  contacts: 18,  opens: 11, created: "03:00 PM, 25 Feb 2026", updated: "01:10 PM, 05 Apr 2026" },
  { name: "Cold Outreach Targets",  type: "Dynamic", contacts: 200, opens: 0,  created: "07:30 AM, 01 Mar 2026", updated: "07:30 AM, 01 Mar 2026" },
  { name: "Re-engagement Pool",     type: "Dynamic", contacts: 73,  opens: 3,  created: "05:00 PM, 08 Mar 2026", updated: "06:15 PM, 09 Apr 2026" },
  { name: "Beta Testers",           type: "Static",  contacts: 9,   opens: 9,  created: "10:45 AM, 12 Mar 2026", updated: "10:45 AM, 12 Mar 2026" },
  { name: "Unsubscribed",           type: "Static",  contacts: 441, opens: 0,  created: "12:00 PM, 15 Jan 2026", updated: "03:55 PM, 01 Apr 2026" },
];

/**
 * fillHeight mode — toolbar pinned above the scroll area, column header sticky,
 * data rows and pagination scroll together. Requires a parent with a determined
 * height (flex-1 inside flex-col + overflow-hidden, or explicit height).
 */
export const FillHeight: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const filtered = TALL_DATA.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / pageSize);
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

    return (
      // Simulates the "remaining height" a page gives the table
      <div className="h-[480px] flex flex-col overflow-hidden">
        <DataTable
          columns={COLUMNS}
          data={pageData}
          searchValue={search}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          onFilter={() => {}}
          onSort={() => {}}
          onExport={() => {}}
          fillHeight
          pagination={totalPages > 1 ? {
            currentPage: page,
            totalPages,
            pageSize,
            onPageChange: setPage,
            onPageSizeChange: (s) => { setPageSize(s); setPage(1); },
          } : undefined}
        />
      </div>
    );
  },
};

/**
 * fillHeight mode — spaced variant. Column header sticky, cards scroll.
 * Requires a parent with a determined height.
 */
export const FillHeightSpaced: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const filtered = TALL_DATA.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / pageSize);
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div className="h-[600px] flex flex-col overflow-hidden">
        <DataTable
          type="spaced"
          columns={COLUMNS}
          data={pageData}
          searchValue={search}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          onFilter={() => {}}
          onSort={() => {}}
          onExport={() => {}}
          fillHeight
          pagination={totalPages > 1 ? {
            currentPage: page,
            totalPages,
            pageSize,
            onPageChange: setPage,
            onPageSizeChange: (s) => { setPageSize(s); setPage(1); },
          } : undefined}
        />
      </div>
    );
  },
};

/** Spaced table with pagination */
export const SpacedWithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    return (
      <DataTable
        type="spaced"
        columns={COLUMNS}
        data={DATA}
        pagination={{
          currentPage: page,
          totalPages: 5,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
    );
  },
};

// ── Mobile ─────────────────────────────────────────────────────────────────────

/**
 * Line table at mobile viewport width (390px).
 * Toolbar collapses Filter / Sort / Export to icon-only buttons.
 * Pagination hides "Items per page" and collapses Previous / Next to icon buttons.
 */
export const LineMobile: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    return (
      <div style={{ width: 390 }}>
        <DataTable
          columns={COLUMNS}
          data={DATA}
          searchValue={search}
          onSearch={setSearch}
          onFilter={() => {}}
          onSort={() => {}}
          onExport={() => {}}
          pagination={{
            currentPage: page,
            totalPages: 5,
            pageSize,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </div>
    );
  },
};

/**
 * Spaced table at mobile viewport width (390px).
 * Toolbar collapses Filter / Sort / Export to icon-only buttons.
 * Pagination hides "Items per page" and collapses Previous / Next to icon buttons.
 */
export const SpacedMobile: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    return (
      <div style={{ width: 390 }}>
        <DataTable
          type="spaced"
          columns={COLUMNS}
          data={DATA}
          searchValue={search}
          onSearch={setSearch}
          onFilter={() => {}}
          onSort={() => {}}
          onExport={() => {}}
          pagination={{
            currentPage: page,
            totalPages: 5,
            pageSize,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </div>
    );
  },
};
