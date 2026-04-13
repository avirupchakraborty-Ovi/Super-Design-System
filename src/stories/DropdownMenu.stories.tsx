import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  IconUser,
  IconSettings,
  IconBell,
  IconStar,
  IconDownload,
  IconTrash,
  IconEdit,
  IconMail,
  IconFilter,
  IconSortAscending,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuChevronTrigger,
  DropdownMenuCompactTrigger,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuSearch,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuUpgradeCTA,
} from "@/components/ui/DropdownMenu";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=64&h=64&fit=crop";

const meta: Meta = {
  title: "Components/Overlays/DropdownMenu",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10368-41061",
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-400 min-h-[400px] flex items-start justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Chevron Trigger Sizes ──────────────────────────────────────────────────────

/** md (40px) vs sm (36px) — fixed heights match Input size scale */
export const ChevronTriggerSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-300">
      <div className="flex flex-col gap-100">
        <p className="text-supporting text-text-level3">md — h-[40px] · matches Input md</p>
        <DropdownMenu>
          <DropdownMenuChevronTrigger size="md">Select an option</DropdownMenuChevronTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Overview</DropdownMenuItem>
            <DropdownMenuItem>Activity</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting text-text-level3">sm — h-[36px] · matches Input sm</p>
        <DropdownMenu>
          <DropdownMenuChevronTrigger size="sm">Select an option</DropdownMenuChevronTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Overview</DropdownMenuItem>
            <DropdownMenuItem>Activity</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

// ── Chevron Trigger Variants ───────────────────────────────────────────────────

/** "default" vs "form" — use "form" inside form layouts alongside Input fields */
export const ChevronTriggerVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-300 w-[280px]">
      <div className="flex flex-col gap-100">
        <p className="text-supporting text-text-level3">default — border-color-level2 · rounded-[5px]</p>
        <DropdownMenu>
          <DropdownMenuChevronTrigger variant="default">Select an option</DropdownMenuChevronTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Overview</DropdownMenuItem>
            <DropdownMenuItem>Activity</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting text-text-level3">form — ring-inset border-color-level3 · rounded-100 · use alongside Input fields</p>
        <DropdownMenu>
          <DropdownMenuChevronTrigger variant="form">Select an option</DropdownMenuChevronTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Overview</DropdownMenuItem>
            <DropdownMenuItem>Activity</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting text-text-level3">form — alongside an Input field</p>
        <DropdownMenu>
          <DropdownMenuChevronTrigger variant="form">Budget type</DropdownMenuChevronTrigger>
        </DropdownMenu>
      </div>
    </div>
  ),
};

// ── Basic ──────────────────────────────────────────────────────────────────────

/** Chevron trigger + plain items */
export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuChevronTrigger>Select an option</DropdownMenuChevronTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Overview</DropdownMenuItem>
        <DropdownMenuItem>Activity</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Billing (unavailable)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Compact bordered triggers with trailing chevron — Filter, Sort, Export */
export const CompactTriggers: Story = {
  render: () => (
    <div className="flex items-center gap-200">
      <DropdownMenu>
        <DropdownMenuCompactTrigger icon={IconFilter}>Filter</DropdownMenuCompactTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={IconStar}>Starred</DropdownMenuItem>
          <DropdownMenuItem icon={IconMail}>Unread</DropdownMenuItem>
          <DropdownMenuItem icon={IconBell}>Notifications</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuCompactTrigger icon={IconSortAscending}>Sort</DropdownMenuCompactTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Name A–Z</DropdownMenuItem>
          <DropdownMenuItem>Name Z–A</DropdownMenuItem>
          <DropdownMenuItem>Date added</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuCompactTrigger icon={IconDownload}>Export</DropdownMenuCompactTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Export as CSV</DropdownMenuItem>
          <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

// ── With Header + Search ───────────────────────────────────────────────────────

/** Header title, subtitle, and search box */
export const WithHeaderAndSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const options = ["Lead Magnets", "Email Sequences", "Landing Pages", "Webinars", "Courses"];
    const filtered = options.filter((o) =>
      o.toLowerCase().includes(query.toLowerCase())
    );
    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuChevronTrigger>Filter by source</DropdownMenuChevronTrigger>
        <DropdownMenuContent>
          <DropdownMenuHeader
            title="Filter by source"
            subtitle="Show contacts who came from this source."
          />
          <DropdownMenuSearch
            value={query}
            onChange={setQuery}
            placeholder="Search sources..."
          />
          {filtered.map((o) => (
            <DropdownMenuItem key={o}>{o}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ── With Icons ─────────────────────────────────────────────────────────────────

/** Items with leading icons */
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuChevronTrigger>Actions</DropdownMenuChevronTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={IconEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={IconDownload}>Export</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={IconTrash} disabled>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ── With Images ────────────────────────────────────────────────────────────────

/** Items with leading thumbnail images */
export const WithImages: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuChevronTrigger>Select contact</DropdownMenuChevronTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          image={SAMPLE_IMAGE}
          imageAlt="Alice"
          subText="alice@example.com"
          counter={12}
        >
          Alice Johnson
        </DropdownMenuItem>
        <DropdownMenuItem
          image={SAMPLE_IMAGE}
          imageAlt="Bob"
          subText="bob@example.com"
          badge="Pro"
        >
          Bob Smith
        </DropdownMenuItem>
        <DropdownMenuItem
          image={SAMPLE_IMAGE}
          imageAlt="Carol"
          subText="carol@example.com"
        >
          Carol White
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ── Checkbox Items ─────────────────────────────────────────────────────────────

/** Multi-select with checkboxes */
export const CheckboxItems: Story = {
  render: () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({
      leadMagnets: true,
      emailSeq: false,
      webinars: false,
      courses: true,
    });
    const toggle = (key: string) =>
      setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuChevronTrigger>Filter by type</DropdownMenuChevronTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Content type</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={checked.leadMagnets}
            onCheckedChange={() => toggle("leadMagnets")}
            icon={IconStar}
          >
            Lead Magnets
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.emailSeq}
            onCheckedChange={() => toggle("emailSeq")}
            icon={IconMail}
          >
            Email Sequences
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.webinars}
            onCheckedChange={() => toggle("webinars")}
            icon={IconBell}
          >
            Webinars
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.courses}
            onCheckedChange={() => toggle("courses")}
            icon={IconDownload}
          >
            Courses
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ── Radio Items ────────────────────────────────────────────────────────────────

/** Single-select with radio buttons */
export const RadioItems: Story = {
  render: () => {
    const [value, setValue] = useState("name");
    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuChevronTrigger>Sort by</DropdownMenuChevronTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort order</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuRadioItem value="name" icon={IconUser}>Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date" icon={IconSortAscending}>Date added</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="activity" icon={IconBell}>Last activity</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating" icon={IconStar}>Rating</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ── Grouped ────────────────────────────────────────────────────────────────────

/** Items grouped with labels and separators */
export const Grouped: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuChevronTrigger>Filter by First Interaction date</DropdownMenuChevronTrigger>
      <DropdownMenuContent>
        <DropdownMenuHeader
          title="Filter by First Interaction date"
          subtitle="Show all contacts who have interacted with you."
        />
        <DropdownMenuSearch placeholder="Search products" />
        <DropdownMenuLabel>Lead Magnets</DropdownMenuLabel>
        <DropdownMenuItem image={SAMPLE_IMAGE} imageAlt="Option 1" subText="This is a placeholder sub text" counter={12}>
          Option 1
        </DropdownMenuItem>
        <DropdownMenuItem image={SAMPLE_IMAGE} imageAlt="Option 2" subText="This is a placeholder sub text">
          Option 2
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Email Sequences</DropdownMenuLabel>
        <DropdownMenuItem icon={IconMail}>Morning sequence</DropdownMenuItem>
        <DropdownMenuItem icon={IconMail}>Onboarding flow</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuUpgradeCTA />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ── Borderless ─────────────────────────────────────────────────────────────────

/** Panel with no border — useful for compact pickers like page size selectors */
export const Borderless: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuChevronTrigger>12</DropdownMenuChevronTrigger>
      <DropdownMenuContent width={100} borderless>
        <DropdownMenuItem>12</DropdownMenuItem>
        <DropdownMenuItem>24</DropdownMenuItem>
        <DropdownMenuItem>48</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ── With Upgrade CTA ───────────────────────────────────────────────────────────

/** Full dropdown with locked upgrade footer */
export const WithUpgradeCTA: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuChevronTrigger>Select feature</DropdownMenuChevronTrigger>
      <DropdownMenuContent>
        <DropdownMenuHeader title="Advanced filters" subtitle="Narrow down your contact list." />
        <DropdownMenuItem icon={IconStar}>Lead score</DropdownMenuItem>
        <DropdownMenuItem icon={IconSettings}>Custom fields</DropdownMenuItem>
        <DropdownMenuItem icon={IconUser} disabled>Segment builder</DropdownMenuItem>
        <DropdownMenuUpgradeCTA label="Upgrade to unlock" />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
