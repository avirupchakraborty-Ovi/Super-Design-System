import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconPlus, IconTrash, IconDownload, IconSearch, IconEdit } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/Buttons/Icon Button",
  component: IconButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10231-40831",
    },
  },
  args: {
    variant: "brand",
    size: "md",
    shape: "circle",
    destructive: false,
    disabled: false,
    icon: IconPlus,
    "aria-label": "Add",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs", "inline"],
    },
    shape: {
      control: "select",
      options: ["circle", "semi-rounded"],
    },
    destructive: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// ── Circle ─────────────────────────────────────────────────────────────────────

/** Default — Brand md, circle */
export const Default: Story = {};

/** All variants — circle */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** All sizes — circle */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton size="lg"     icon={IconPlus} aria-label="Add" />
      <IconButton size="md"     icon={IconPlus} aria-label="Add" />
      <IconButton size="sm"     icon={IconPlus} aria-label="Add" />
      <IconButton size="xs"     icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Inline size — 28×28px, circle */
export const InlineSize: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton size="inline" variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton size="inline" variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Hover state — all variants, circle */
export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Destructive state — circle */
export const Destructive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton destructive size="lg" icon={IconTrash} aria-label="Delete" />
      <IconButton destructive size="md" icon={IconTrash} aria-label="Delete" />
      <IconButton destructive size="sm" icon={IconTrash} aria-label="Delete" />
      <IconButton destructive size="xs" icon={IconTrash} aria-label="Delete" />
    </div>
  ),
};

/** Disabled state — all variants, circle */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton disabled variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton disabled variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Complete matrix — all variants × sizes, circle */
export const CompleteMatrix: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs", "inline"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            {(["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline"] as const).map((variant) => (
              <IconButton key={variant} variant={variant} size={size} icon={IconPlus} aria-label="Add" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Common use cases — different icons, circle */
export const IconShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton variant="brand"        size="md" icon={IconPlus}     aria-label="Add" />
      <IconButton variant="primary"      size="md" icon={IconEdit}     aria-label="Edit" />
      <IconButton variant="outline"      size="md" icon={IconSearch}   aria-label="Search" />
      <IconButton variant="ghost"        size="md" icon={IconDownload} aria-label="Download" />
      <IconButton destructive            size="md" icon={IconTrash}    aria-label="Delete" />
    </div>
  ),
};

// ── Semi-Rounded ───────────────────────────────────────────────────────────────

/** Default — Brand md, semi-rounded (8px) */
export const SemiRoundedDefault: Story = {
  args: { shape: "semi-rounded" },
};

/** All variants — semi-rounded */
export const SemiRoundedVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** All sizes — semi-rounded */
export const SemiRoundedSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" size="lg"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="md"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="sm"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="xs"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Inline size — 28×28px, semi-rounded */
export const SemiRoundedInlineSize: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" size="inline" variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" size="inline" variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Hover state — all variants, semi-rounded */
export const SemiRoundedHover: Story = {
  parameters: { pseudo: { hover: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Destructive state — semi-rounded */
export const SemiRoundedDestructive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" destructive size="lg" icon={IconTrash} aria-label="Delete" />
      <IconButton shape="semi-rounded" destructive size="md" icon={IconTrash} aria-label="Delete" />
      <IconButton shape="semi-rounded" destructive size="sm" icon={IconTrash} aria-label="Delete" />
      <IconButton shape="semi-rounded" destructive size="xs" icon={IconTrash} aria-label="Delete" />
    </div>
  ),
};

/** Disabled state — all variants, semi-rounded */
export const SemiRoundedDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" disabled variant="brand"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="primary"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="secondary"    icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="tertiary"     icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="ghost"        icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="outline"      icon={IconPlus} aria-label="Add" />
      <IconButton shape="semi-rounded" disabled variant="blue-outline" icon={IconPlus} aria-label="Add" />
    </div>
  ),
};

/** Complete matrix — all variants × sizes, semi-rounded */
export const SemiRoundedCompleteMatrix: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs", "inline"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            {(["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline"] as const).map((variant) => (
              <IconButton key={variant} shape="semi-rounded" variant={variant} size={size} icon={IconPlus} aria-label="Add" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Common use cases — different icons, semi-rounded */
export const SemiRoundedIconShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <IconButton shape="semi-rounded" variant="brand"        size="md" icon={IconPlus}     aria-label="Add" />
      <IconButton shape="semi-rounded" variant="primary"      size="md" icon={IconEdit}     aria-label="Edit" />
      <IconButton shape="semi-rounded" variant="outline"      size="md" icon={IconSearch}   aria-label="Search" />
      <IconButton shape="semi-rounded" variant="ghost"        size="md" icon={IconDownload} aria-label="Download" />
      <IconButton shape="semi-rounded" destructive            size="md" icon={IconTrash}    aria-label="Delete" />
    </div>
  ),
};
