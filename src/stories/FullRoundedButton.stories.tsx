import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconPlus, IconDownload, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Full Rounded",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10231-34640",
    },
  },
  args: {
    children: "Button",
    variant: "brand",
    size: "md",
    shape: "full-rounded",
    destructive: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline", "link"],
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
      <Button variant="brand">Brand</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="blue-outline">Blue Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/** All sizes */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">XSmall</Button>
      <Button size="inline">Inline</Button>
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
            <Button size={size} leadingIcon={IconPlus}>Leading</Button>
            <Button size={size} trailingIcon={IconArrowRight}>Trailing</Button>
            <Button size={size} leadingIcon={IconDownload} trailingIcon={IconArrowRight}>Both</Button>
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
      <Button variant="brand">Brand</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="blue-outline">Blue Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/** Destructive state */
export const Destructive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button destructive size="lg">Large</Button>
      <Button destructive size="md">Medium</Button>
      <Button destructive size="sm">Small</Button>
      <Button destructive size="xs">XSmall</Button>
    </div>
  ),
};

/** Disabled state — across all variants */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-100">
      <Button disabled variant="brand">Brand</Button>
      <Button disabled variant="primary">Primary</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="tertiary">Tertiary</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="blue-outline">Blue Outline</Button>
      <Button disabled variant="link">Link</Button>
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
            {(["brand", "primary", "secondary", "tertiary", "ghost", "outline", "blue-outline", "link"] as const).map((variant) => (
              <Button key={variant} variant={variant} size={size}>Button</Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
