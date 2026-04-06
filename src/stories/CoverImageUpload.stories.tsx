import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CoverImageUpload } from "@/components/ui/CoverImageUpload";

const meta: Meta<typeof CoverImageUpload> = {
  title: "Components/Form/Cover Image Upload",
  component: CoverImageUpload,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10530-61176",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoverImageUpload>;

export const Default: Story = {
  args: {
    label: "Cover Image/Video",
    helpText: "Text describing eligible formats and sizes",
  },
};

export const FileOnly: Story = {
  args: {
    label: "Cover Image/Video",
    helpText: "Text describing eligible formats and sizes",
    showUrlInput: false,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Cover Image/Video",
    helpText: "Text describing eligible formats and sizes",
    error: "Format not supported. Upload recommended format.",
  },
};
