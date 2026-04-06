import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Lock } from "@/components/ui/Lock";

const meta: Meta<typeof Lock> = {
  title: "Components/Buttons/Lock",
  component: Lock,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10231-37065",
    },
  },
  args: {
    size: "sm",
    colour: "blue",
    label: "Unlock",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "xs"],
    },
    colour: {
      control: "select",
      options: ["blue", "purple"],
    },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Lock>;

/** Default — sm, blue */
export const Default: Story = {};

/** Both colours — sm */
export const Colours: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Lock colour="blue" label="Unlock" />
      <Lock colour="purple" label="Unlock" />
    </div>
  ),
};

/** Both sizes */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Lock size="sm" colour="blue" label="Unlock" />
      <Lock size="xs" colour="blue" label="Unlock" />
    </div>
  ),
};

/** Complete matrix — all Size × Colour combinations */
export const CompleteMatrix: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-text-level1">sm</p>
        <div className="flex flex-wrap gap-3">
          <Lock size="sm" colour="blue" label="Unlock" />
          <Lock size="sm" colour="purple" label="Unlock" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-text-level1">xs</p>
        <div className="flex flex-wrap gap-3">
          <Lock size="xs" colour="blue" label="Unlock" />
          <Lock size="xs" colour="purple" label="Unlock" />
        </div>
      </div>
    </div>
  ),
};
