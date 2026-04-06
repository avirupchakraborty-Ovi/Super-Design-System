import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "@/components/ui/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10424-41785",
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
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** Interactive playground */
export const Default: Story = {};

/** All four states */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-200 p-400">
      <Checkbox checked={false} />
      <Checkbox checked />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox checked disabled />
      <Checkbox indeterminate disabled />
    </div>
  ),
};
