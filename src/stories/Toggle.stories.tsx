import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toggle } from "@/components/ui/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10445-36198",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400 flex items-center gap-200">
        <Story />
      </div>
    ),
  ],
  args: {
    checked: false,
    size: "sm",
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "select", options: ["sm", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/** Interactive playground */
export const Default: Story = {};

/** Both sizes, ON and OFF */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-300 p-400">
      <div className="flex items-center gap-200">
        <p className="text-supporting text-text-level3 w-[40px]">Small</p>
        <Toggle size="sm" checked={false} />
        <Toggle size="sm" checked />
      </div>
      <div className="flex items-center gap-200">
        <p className="text-supporting text-text-level3 w-[40px]">Large</p>
        <Toggle size="lg" checked={false} />
        <Toggle size="lg" checked />
      </div>
    </div>
  ),
};

/** Disabled states */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-200 p-400">
      <Toggle size="sm" checked={false} disabled />
      <Toggle size="sm" checked disabled />
      <Toggle size="lg" checked={false} disabled />
      <Toggle size="lg" checked disabled />
    </div>
  ),
};
