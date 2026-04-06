import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SideSheet } from "@/components/ui/SideSheet";

const meta: Meta<typeof SideSheet> = {
  title: "Components/Overlays/Side Sheet",
  component: SideSheet,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10534-39160",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideSheet>;

function SideSheetDemo(args: React.ComponentProps<typeof SideSheet>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-400">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-150 border border-border-color-level2 px-200 py-100 text-body font-medium text-text-level1 cursor-pointer hover:bg-surface-level2"
      >
        Open Side Sheet
      </button>
      <SideSheet {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export const Stretched: Story = {
  args: {
    slotType: "stretched",
    heading: "Header Text",
    subtext: "Sub text explaining the header text",
    showHeading: true,
    showSubtext: true,
    showAction: true,
    actionLabel: "Button",
  },
  render: (args) => <SideSheetDemo {...args} />,
};

export const Padded: Story = {
  args: {
    slotType: "padded",
    heading: "Header Text",
    subtext: "Sub text explaining the header text",
    showHeading: true,
    showSubtext: true,
    showAction: true,
    actionLabel: "Button",
  },
  render: (args) => <SideSheetDemo {...args} />,
};

export const WithContent: Story = {
  args: {
    slotType: "padded",
    heading: "Settings",
    subtext: "Manage your preferences",
    showAction: true,
    actionLabel: "Save",
  },
  render: (args) => (
    <SideSheetDemo {...args}>
      <div className="flex flex-col gap-200">
        <div className="flex flex-col gap-50">
          <span className="text-body font-medium text-text-level1">Section heading</span>
          <span className="text-body font-normal text-text-level3">
            This is some content inside the padded side sheet. The content area
            has 20px left and right padding and 16px bottom padding.
          </span>
        </div>
        <div className="h-px bg-border-color-level2" />
        <div className="flex flex-col gap-50">
          <span className="text-body font-medium text-text-level1">Another section</span>
          <span className="text-body font-normal text-text-level3">
            More content here to demonstrate scrolling behaviour when the
            side sheet content is taller than the viewport.
          </span>
        </div>
      </div>
    </SideSheetDemo>
  ),
};

export const NoSubtext: Story = {
  args: {
    slotType: "padded",
    heading: "Header Text",
    showSubtext: false,
    showAction: true,
    actionLabel: "Button",
  },
  render: (args) => <SideSheetDemo {...args} />,
};

export const NoAction: Story = {
  args: {
    slotType: "padded",
    heading: "Header Text",
    subtext: "Sub text explaining the header text",
    showAction: false,
  },
  render: (args) => <SideSheetDemo {...args} />,
};

export const NoHeader: Story = {
  args: {
    slotType: "padded",
    showHeading: false,
  },
  render: (args) => (
    <SideSheetDemo {...args}>
      <div className="p-200 text-body text-text-level1">Content without a header.</div>
    </SideSheetDemo>
  ),
};
