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
    variant: "body-medium",
    mandatory: false,
    tooltip: false,
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: [
        "body-regular",
        "body-medium",
        "supporting-medium",
        "supporting-semibold",
        "supporting-caps",
      ],
    },
    mandatory: { control: "boolean" },
    tooltip: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/** Default — body-medium */
export const Default: Story = {};

/** body-regular — lowest visual weight, descriptive or secondary text */
export const BodyRegular: Story = {
  args: { variant: "body-regular" },
};

/** body-medium — standard label weight, clear and neutral */
export const BodyMedium: Story = {
  args: { variant: "body-medium" },
};

/** supporting-medium — compact, de-emphasised field label */
export const SupportingMedium: Story = {
  args: { variant: "supporting-medium" },
};

/** supporting-semibold — compact but prominent, stands out at small size */
export const SupportingSemibold: Story = {
  args: { variant: "supporting-semibold" },
};

/** supporting-caps — category / metadata marker. NOT for direct field labels. */
export const SupportingCaps: Story = {
  args: { variant: "supporting-caps", label: "Category label" },
};

/** With mandatory asterisk */
export const WithMandatory: Story = {
  args: { mandatory: true },
};

/** With tooltip icon */
export const WithTooltip: Story = {
  args: { tooltip: true },
};

/** All variants — hierarchy overview */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-200 p-200">
      {(
        [
          { variant: "body-regular",        label: "body-regular",        note: "Lowest visual weight — descriptive, secondary" },
          { variant: "body-medium",          label: "body-medium",          note: "Standard label weight — clear, neutral" },
          { variant: "supporting-medium",    label: "supporting-medium",    note: "Compact, receded — de-emphasised" },
          { variant: "supporting-semibold",  label: "supporting-semibold",  note: "Compact but prominent — stands out at small size" },
          { variant: "supporting-caps",      label: "Category label",       note: "Category and metadata marker — not a field label" },
        ] as const
      ).map(({ variant, label, note }) => (
        <div key={variant} className="flex items-center gap-200">
          <div className="w-[180px] flex-none">
            <Label label={label} variant={variant} />
          </div>
          <span className="text-supporting font-normal text-text-level3">{note}</span>
        </div>
      ))}
    </div>
  ),
};
