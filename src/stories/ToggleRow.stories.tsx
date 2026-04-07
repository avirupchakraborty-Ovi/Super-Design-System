import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconBell, IconChevronRight, IconInfoCircle, IconUser, IconPhoto } from "@tabler/icons-react";
import { ToggleRow } from "@/components/ui/ToggleRow";
import { Button } from "@/components/ui/Button";

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=72&h=72&fit=crop";

const meta: Meta<typeof ToggleRow> = {
  title: "Components/Controls/ToggleRow",
  component: ToggleRow,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10445-35905",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg p-400">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Setting label",
    checked: false,
    size: "sm",
    disabled: false,
    position: "end",
  },
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "select", options: ["sm", "lg"] },
    disabled: { control: "boolean" },
    position: { control: "select", options: ["start", "end"] },
    padding: { control: "select", options: ["default", "none"] },
    label: { control: "text" },
    subText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleRow>;

/** Interactive playground */
export const Default: Story = {};

/** ON and OFF states */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <ToggleRow label="Dark mode" checked={false} />
      <ToggleRow label="Notifications enabled" checked />
      <ToggleRow label="Auto-save" checked={false} disabled />
      <ToggleRow label="Beta features" checked disabled />
    </div>
  ),
};

/** Both toggle sizes */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-lg">
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Small (default)</p>
        <div className="flex flex-col gap-50">
          <ToggleRow size="sm" label="Push notifications" checked />
          <ToggleRow size="sm" label="Email digest" />
        </div>
      </div>
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Large</p>
        <div className="flex flex-col gap-50">
          <ToggleRow size="lg" label="Push notifications" checked />
          <ToggleRow size="lg" label="Email digest" />
        </div>
      </div>
    </div>
  ),
};

/** Toggle position start vs end */
export const Position: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-lg">
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Position: End (default)</p>
        <div className="flex flex-col gap-50">
          <ToggleRow label="Dark mode" subText="Reduces eye strain in low-light environments" position="end" checked />
          <ToggleRow label="Notifications" position="end" />
        </div>
      </div>
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Position: Start</p>
        <div className="flex flex-col gap-50">
          <ToggleRow label="Dark mode" subText="Reduces eye strain in low-light environments" position="start" checked />
          <ToggleRow label="Notifications" position="start" />
        </div>
      </div>
    </div>
  ),
};

/** With sub text */
export const WithSubText: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <ToggleRow label="Dark mode" subText="Reduces eye strain in low-light environments" checked />
      <ToggleRow label="Push notifications" subText="Get notified about important account activity" />
      <ToggleRow label="Location access" subText="Required for nearby recommendations" disabled />
    </div>
  ),
};

/** With icons */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <ToggleRow label="Notifications" leadingIcon={IconBell} checked />
      <ToggleRow label="Profile visibility" leadingIcon={IconUser} subText="Control who can see your profile" />
      <ToggleRow label="More info" trailingIcon2={IconChevronRight} checked />
      <ToggleRow label="Notifications" leadingIcon={IconBell} trailingIcon={IconInfoCircle} trailingIcon2={IconChevronRight} />
      <ToggleRow label="Connected accounts" subText="Manage linked third-party services" trailingIcon2={IconChevronRight} checked />
    </div>
  ),
};

/** With leading image */
export const WithImage: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <ToggleRow label="Landscape notifications" subText="Alert when new photos are uploaded" image={SAMPLE_IMAGE} imageAlt="Landscape" checked />
      <ToggleRow label="Profile activity" image={SAMPLE_IMAGE} imageAlt="Profile" />
      <ToggleRow label="Archived album" image={SAMPLE_IMAGE} imageAlt="Archive" disabled />
    </div>
  ),
};

/** With slot content below the row */
export const WithSlot: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-lg">
      <ToggleRow
        label="Enable banner"
        subText="Show a promotional banner on your profile"
        checked
        slot={
          <div className="flex flex-col gap-150 pt-50">
            {/* Placeholder image with outline */}
            <div className="flex items-center justify-center w-full h-[120px] rounded-100 border border-dashed border-border-color-level3 bg-surface-level2">
              <div className="flex flex-col items-center gap-50 text-text-level4">
                <IconPhoto size={24} />
                <span className="text-supporting">Upload banner image</span>
              </div>
            </div>
            <Button size="sm" variant="primary" shape="full-rounded">
              Choose image
            </Button>
          </div>
        }
      />
    </div>
  ),
};

/** Padding variants — default vs none
 *  Use padding="none" inside bordered cards or form sections that already
 *  provide their own padding. Use padding="default" in standalone settings lists.
 */
export const PaddingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-lg">
      <div>
        <p className="mb-50 text-supporting text-text-level3">Default — standalone settings list</p>
        <div className="flex flex-col gap-50">
          <ToggleRow label="Push notifications" subText="Get notified about important activity" checked />
          <ToggleRow label="Email digest" subText="Weekly summary of your account" />
        </div>
      </div>
      <div>
        <p className="mb-50 text-supporting text-text-level3">None — inside a bordered form section</p>
        <div className="flex flex-col gap-100 p-200 rounded-100 border border-border-color-level2">
          <span className="text-body font-medium text-text-level1">Schedule</span>
          <div className="flex flex-col gap-100">
            <ToggleRow
              label="No end date"
              subText="Your ad set will run continuously until paused"
              padding="none"
            />
            <ToggleRow
              label="Use automatic placements"
              subText="Let us choose the best placements for your budget"
              padding="none"
              checked
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

/** Disabled states */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <ToggleRow label="Feature unavailable" disabled />
      <ToggleRow label="Always enabled" subText="Required for this plan" checked disabled />
      <ToggleRow label="Admin controlled" leadingIcon={IconBell} subText="Contact your admin to change this" disabled />
    </div>
  ),
};

/** Complete matrix */
export const CompleteMatrix: Story = {
  render: () => {
    const rows: { label: string; props: Partial<Parameters<typeof ToggleRow>[0]> }[] = [
      { label: "Default",              props: {} },
      { label: "Checked (ON)",         props: { checked: true } },
      { label: "With sub text",        props: { subText: "Secondary description text" } },
      { label: "With leading icon",    props: { leadingIcon: IconBell } },
      { label: "With image",           props: { image: SAMPLE_IMAGE, imageAlt: "Photo" } },
      { label: "With trailing icon 2", props: { trailingIcon2: IconChevronRight } },
      { label: "Position start",       props: { position: "start", checked: true } },
      { label: "Large toggle",         props: { size: "lg", checked: true } },
      { label: "Disabled",             props: { disabled: true } },
      { label: "Disabled ON",          props: { checked: true, disabled: true } },
    ];

    return (
      <div className="flex flex-col gap-400 max-w-lg">
        {rows.map(({ label, props }) => (
          <div key={label}>
            <p className="px-150 mb-50 text-supporting text-text-level3">{label}</p>
            <ToggleRow label="Setting label" {...props} />
          </div>
        ))}
      </div>
    );
  },
};
