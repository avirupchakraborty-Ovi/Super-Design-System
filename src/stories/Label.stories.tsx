import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "@/components/ui/Label";

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10231-37065",
    },
  },
  args: {
    label: "Label",
    mandatory: false,
    tooltip: false,
  },
  argTypes: {
    label: { control: "text" },
    mandatory: { control: "boolean" },
    tooltip: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/** Default — label only */
export const Default: Story = {};

/** With mandatory asterisk */
export const WithMandatory: Story = {
  args: { mandatory: true },
};

/** With tooltip icon */
export const WithTooltip: Story = {
  args: { tooltip: true },
};

/** Both — mandatory + tooltip */
export const Both: Story = {
  args: { mandatory: true, tooltip: true },
};

/** All 4 variants */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-100">
      <Label label="Label" />
      <Label label="Label" mandatory />
      <Label label="Label" tooltip />
      <Label label="Label" mandatory tooltip />
    </div>
  ),
};
