import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconPlus, IconDownload, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Semi Rounded",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10506-47468",
    },
  },
  args: {
    children: "Button",
    variant: "brand",
    size: "md",
    shape: "semi-rounded",
    destructive: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline", "dash-primary", "dash-outline", "link"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs", "inline"],
    },
    shape: { table: { disable: true } },
    destructive: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Default — Brand md */
export const Default: Story = {};

/** All variants */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button shape="semi-rounded" variant="brand">Brand</Button>
      <Button shape="semi-rounded" variant="primary">Primary</Button>
      <Button shape="semi-rounded" variant="secondary">Secondary</Button>
      <Button shape="semi-rounded" variant="tertiary">Tertiary</Button>
      <Button shape="semi-rounded" variant="ghost">Ghost</Button>
      <Button shape="semi-rounded" variant="outline">Outline</Button>
      <Button shape="semi-rounded" variant="blue-outline">Blue Outline</Button>
      <Button shape="semi-rounded" variant="dash-primary">Dash Primary</Button>
      <Button shape="semi-rounded" variant="dash-outline">Dash Outline</Button>
      <Button shape="semi-rounded" variant="link">Link</Button>
    </div>
  ),
};

/** All sizes */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <Button shape="semi-rounded" size="lg">Large</Button>
      <Button shape="semi-rounded" size="md">Medium</Button>
      <Button shape="semi-rounded" size="sm">Small</Button>
      <Button shape="semi-rounded" size="xs">XSmall</Button>
      <Button shape="semi-rounded" size="inline">Inline</Button>
    </div>
  ),
};

/** Dash variants — exclusive to semi-rounded */
export const DashVariants: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs", "inline"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            <Button shape="semi-rounded" variant="dash-primary" size={size}>Dash Primary</Button>
            <Button shape="semi-rounded" variant="dash-outline" size={size}>Dash Outline</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** With leading and trailing icons — all sizes */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs", "inline"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            <Button shape="semi-rounded" size={size} leadingIcon={IconPlus}>Leading</Button>
            <Button shape="semi-rounded" size={size} trailingIcon={IconArrowRight}>Trailing</Button>
            <Button shape="semi-rounded" size={size} leadingIcon={IconDownload} trailingIcon={IconArrowRight}>Both</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Hover state — all variants */
export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button shape="semi-rounded" variant="brand">Brand</Button>
      <Button shape="semi-rounded" variant="primary">Primary</Button>
      <Button shape="semi-rounded" variant="secondary">Secondary</Button>
      <Button shape="semi-rounded" variant="tertiary">Tertiary</Button>
      <Button shape="semi-rounded" variant="ghost">Ghost</Button>
      <Button shape="semi-rounded" variant="outline">Outline</Button>
      <Button shape="semi-rounded" variant="blue-outline">Blue Outline</Button>
      <Button shape="semi-rounded" variant="dash-primary">Dash Primary</Button>
      <Button shape="semi-rounded" variant="dash-outline">Dash Outline</Button>
      <Button shape="semi-rounded" variant="link">Link</Button>
    </div>
  ),
};

/** Destructive state */
export const Destructive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button shape="semi-rounded" destructive size="lg">Large</Button>
      <Button shape="semi-rounded" destructive size="md">Medium</Button>
      <Button shape="semi-rounded" destructive size="sm">Small</Button>
      <Button shape="semi-rounded" destructive size="xs">XSmall</Button>
    </div>
  ),
};

/** Disabled state — across all variants */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button shape="semi-rounded" disabled variant="brand">Brand</Button>
      <Button shape="semi-rounded" disabled variant="primary">Primary</Button>
      <Button shape="semi-rounded" disabled variant="secondary">Secondary</Button>
      <Button shape="semi-rounded" disabled variant="tertiary">Tertiary</Button>
      <Button shape="semi-rounded" disabled variant="ghost">Ghost</Button>
      <Button shape="semi-rounded" disabled variant="outline">Outline</Button>
      <Button shape="semi-rounded" disabled variant="blue-outline">Blue Outline</Button>
      <Button shape="semi-rounded" disabled variant="dash-primary">Dash Primary</Button>
      <Button shape="semi-rounded" disabled variant="dash-outline">Dash Outline</Button>
      <Button shape="semi-rounded" disabled variant="link">Link</Button>
    </div>
  ),
};

/** Complete matrix — all variants × sizes */
export const CompleteMatrix: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs", "inline"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            {(["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline", "dash-primary", "dash-outline", "link"] as const).map((variant) => (
              <Button key={variant} shape="semi-rounded" variant={variant} size={size}>Button</Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
