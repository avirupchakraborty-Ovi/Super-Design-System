import type { Meta, StoryObj } from "@storybook/nextjs-vite";

function Introduction() {
  return (
    <div className="max-w-2xl space-y-300 bg-surface-level1 p-400">
      <h1 className="text-3xl font-bold text-text-level1">
        Super Design System
      </h1>
      <p className="text-text-level2">
        Built from the <strong>Design System 2026</strong> Figma file.
      </p>

      <div className="space-y-100">
        <h2 className="text-xl font-semibold text-text-level1">Stack</h2>
        <ul className="list-inside list-disc space-y-50 text-text-level2">
          <li>Next.js 15 + React 19 + TypeScript</li>
          <li>Tailwind CSS 4 for styling</li>
          <li>Radix UI for accessible interactive primitives</li>
          <li>Tabler Icons for iconography</li>
          <li>Storybook 10.3 for documentation & testing</li>
        </ul>
      </div>

      <div className="space-y-100">
        <h2 className="text-xl font-semibold text-text-level1">
          Theme Toggle
        </h2>
        <p className="text-text-level2">
          Use the <strong>sun/moon icon</strong> in the Storybook toolbar above
          to switch between Light and Dark mode.
        </p>
      </div>

      <div className="rounded-150 border border-border-color-level2 bg-surface-brand-primary-subtle p-200">
        <p className="text-sm text-text-brand-primary">
          All design tokens (colors, spacing, radius, typography) are extracted
          from Figma and support Light/Dark mode.
        </p>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Introduction",
  component: Introduction,
};

export default meta;
type Story = StoryObj;

export const Welcome: Story = {};
