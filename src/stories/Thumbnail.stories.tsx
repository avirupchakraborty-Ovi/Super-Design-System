import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Thumbnail } from "@/components/ui/Thumbnail";

const PLACEHOLDER = "https://placehold.co/52x52/e2e8f0/64748b?text=img";

const meta: Meta<typeof Thumbnail> = {
  title: "Primitives/Thumbnail",
  component: Thumbnail,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10462-41403",
    },
  },
  args: {
    src: PLACEHOLDER,
    alt: "Thumbnail image",
    size: "md",
    type: "square",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
    },
    type: {
      control: "select",
      options: ["square", "circle"],
    },
    src: { control: "text" },
    alt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

/** Default — md square */
export const Default: Story = {};

/** All 4 sizes — Square */
export const SizesSquare: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Thumbnail src={PLACEHOLDER} size="lg" type="square" alt="lg" />
      <Thumbnail src={PLACEHOLDER} size="md" type="square" alt="md" />
      <Thumbnail src={PLACEHOLDER} size="sm" type="square" alt="sm" />
      <Thumbnail src={PLACEHOLDER} size="xs" type="square" alt="xs" />
    </div>
  ),
};

/** All 4 sizes — Circle */
export const SizesCircle: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Thumbnail src={PLACEHOLDER} size="lg" type="circle" alt="lg" />
      <Thumbnail src={PLACEHOLDER} size="md" type="circle" alt="md" />
      <Thumbnail src={PLACEHOLDER} size="sm" type="circle" alt="sm" />
      <Thumbnail src={PLACEHOLDER} size="xs" type="circle" alt="xs" />
    </div>
  ),
};

/** Square vs Circle — same size */
export const TypeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Thumbnail src={PLACEHOLDER} size="md" type="square" alt="square" />
      <Thumbnail src={PLACEHOLDER} size="md" type="circle" alt="circle" />
    </div>
  ),
};

/** Complete matrix — all Size × Type combinations */
export const CompleteMatrix: Story = {
  render: () => {
    const sizes = ["lg", "md", "sm", "xs"] as const;
    const types = ["square", "circle"] as const;

    return (
      <div className="space-y-4">
        {types.map((type) => (
          <div key={type}>
            <p className="mb-2 text-sm font-semibold capitalize text-text-level1">{type}</p>
            <div className="flex items-end gap-4">
              {sizes.map((size) => (
                <Thumbnail key={size} src={PLACEHOLDER} size={size} type={type} alt={`${type} ${size}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
