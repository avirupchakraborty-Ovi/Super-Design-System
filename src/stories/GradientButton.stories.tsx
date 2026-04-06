import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconArrowRight, IconSparkles, IconDownload } from "@tabler/icons-react";
import { GradientButton } from "@/components/ui/GradientButton";

// A simple decorative shape to demonstrate the illustration slot.
// Uses viewBox="0 0 100 100" + preserveAspectRatio="none" so coordinates are
// percentage-based and the shapes fill correctly at any button size.
const DemoIllustration = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <ellipse cx="85" cy="50" rx="32" ry="70" fill="white" fillOpacity="0.15" />
    <ellipse cx="100" cy="20" rx="18" ry="45" fill="white" fillOpacity="0.10" />
  </svg>
);

const meta: Meta<typeof GradientButton> = {
  title: "Components/Buttons/Gradient Button",
  component: GradientButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10628-36876",
    },
  },
  args: {
    children: "Upgrade to Pro",
    size: "md",
    gradientFrom: "#4A7CFE",
    gradientTo: "#6EA8F9",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
    },
    gradientFrom: { control: "color" },
    gradientTo: { control: "color" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof GradientButton>;

/** Default — md, blue gradient */
export const Default: Story = {};

/** All sizes */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <GradientButton size="lg">Upgrade to Pro</GradientButton>
      <GradientButton size="md">Upgrade to Pro</GradientButton>
      <GradientButton size="sm">Upgrade to Pro</GradientButton>
      <GradientButton size="xs">Upgrade</GradientButton>
    </div>
  ),
};

/** With leading and trailing icons */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-100">
      {(["lg", "md", "sm", "xs"] as const).map((size) => (
        <div key={size}>
          <p className="mb-50 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-wrap items-center gap-100">
            <GradientButton size={size} leadingIcon={IconSparkles}>
              {size === "xs" ? "Upgrade" : "Upgrade to Pro"}
            </GradientButton>
            <GradientButton size={size} trailingIcon={IconArrowRight}>
              {size === "xs" ? "Upgrade" : "Upgrade to Pro"}
            </GradientButton>
            <GradientButton size={size} leadingIcon={IconSparkles} trailingIcon={IconArrowRight}>
              {size === "xs" ? "Upgrade" : "Upgrade to Pro"}
            </GradientButton>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** With background illustration — the slot accepts any ReactNode */
export const WithIllustration: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <GradientButton size="lg" illustration={<DemoIllustration />} leadingIcon={IconSparkles}>
        Upgrade to Pro
      </GradientButton>
      <GradientButton size="md" illustration={<DemoIllustration />} leadingIcon={IconSparkles}>
        Upgrade to Pro
      </GradientButton>
      <GradientButton size="sm" illustration={<DemoIllustration />}>
        Upgrade to Pro
      </GradientButton>
      <GradientButton size="xs" illustration={<DemoIllustration />}>
        Upgrade
      </GradientButton>
    </div>
  ),
};

/** Custom gradient colors — component accepts any CSS color */
export const CustomGradients: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-100">
      <GradientButton gradientFrom="#4A7CFE" gradientTo="#6EA8F9">
        Blue (default)
      </GradientButton>
      <GradientButton gradientFrom="#7C3AED" gradientTo="#A78BFA">
        Purple
      </GradientButton>
      <GradientButton gradientFrom="#059669" gradientTo="#34D399">
        Green
      </GradientButton>
      <GradientButton gradientFrom="#DC2626" gradientTo="#F87171">
        Red
      </GradientButton>
      <GradientButton gradientFrom="#D97706" gradientTo="#FCD34D">
        Amber
      </GradientButton>
    </div>
  ),
};

/** Download CTA — a realistic usage example */
export const DownloadCTA: Story = {
  render: () => (
    <GradientButton
      size="lg"
      leadingIcon={IconDownload}
      trailingIcon={IconArrowRight}
      illustration={<DemoIllustration />}
    >
      Download Report
    </GradientButton>
  ),
};
