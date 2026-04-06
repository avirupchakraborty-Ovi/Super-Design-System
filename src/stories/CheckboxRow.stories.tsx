import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconBell, IconStar, IconUser } from "@tabler/icons-react";
import { CheckboxRow } from "@/components/ui/CheckboxRow";

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=72&h=72&fit=crop";

const meta: Meta<typeof CheckboxRow> = {
  title: "Components/Controls/CheckboxRow",
  component: CheckboxRow,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10424-41785",
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
    label: "Option label",
    checked: false,
    indeterminate: false,
    disabled: false,
    position: "end",
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    position: { control: "select", options: ["start", "end"] },
    label: { control: "text" },
    subText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxRow>;

/** Interactive playground */
export const Default: Story = {};

/** All checkbox states */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <CheckboxRow label="Unchecked" checked={false} />
      <CheckboxRow label="Checked" checked />
      <CheckboxRow label="Indeterminate" indeterminate />
      <CheckboxRow label="Disabled" disabled />
      <CheckboxRow label="Disabled checked" checked disabled />
    </div>
  ),
};

/** Checkbox at start vs end */
export const Position: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-lg">
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Position: End (default)</p>
        <div className="flex flex-col gap-50">
          <CheckboxRow label="Enable notifications" subText="Get notified about important updates" position="end" checked />
          <CheckboxRow label="Marketing emails" position="end" />
          <CheckboxRow label="Weekly digest" position="end" indeterminate />
        </div>
      </div>
      <div>
        <p className="px-150 mb-50 text-supporting text-text-level3">Position: Start</p>
        <div className="flex flex-col gap-50">
          <CheckboxRow label="Enable notifications" subText="Get notified about important updates" position="start" checked />
          <CheckboxRow label="Marketing emails" position="start" />
          <CheckboxRow label="Weekly digest" position="start" indeterminate />
        </div>
      </div>
    </div>
  ),
};

/** With sub text */
export const WithSubText: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <CheckboxRow label="Push notifications" subText="Receive alerts directly on your device" checked />
      <CheckboxRow label="Email updates" subText="Weekly summary of activity sent to your inbox" />
      <CheckboxRow label="SMS alerts" subText="Text messages for critical account changes" indeterminate />
      <CheckboxRow label="In-app messages" subText="Cannot be changed for your plan" disabled />
    </div>
  ),
};

/** With leading icon */
export const WithLeadingIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <CheckboxRow label="Notifications" leadingIcon={IconBell} checked />
      <CheckboxRow label="Profile visibility" leadingIcon={IconUser} />
      <CheckboxRow label="Starred items" leadingIcon={IconStar} indeterminate />
      <CheckboxRow label="Disabled option" leadingIcon={IconBell} disabled />
    </div>
  ),
};

/** With leading image */
export const WithImage: Story = {
  render: () => (
    <div className="flex flex-col gap-50 max-w-lg">
      <CheckboxRow label="Mountain landscape" subText="JPEG · 4.2 MB" image={SAMPLE_IMAGE} imageAlt="Landscape" checked />
      <CheckboxRow label="Sunset photo" subText="PNG · 2.8 MB" image={SAMPLE_IMAGE} imageAlt="Sunset" />
      <CheckboxRow label="Portrait shot" subText="RAW · 18.3 MB" image={SAMPLE_IMAGE} imageAlt="Portrait" disabled />
    </div>
  ),
};

/** Complete matrix */
export const CompleteMatrix: Story = {
  render: () => {
    const rows: { label: string; props: Partial<Parameters<typeof CheckboxRow>[0]> }[] = [
      { label: "Default",              props: {} },
      { label: "Checked",              props: { checked: true } },
      { label: "Indeterminate",        props: { indeterminate: true } },
      { label: "With sub text",        props: { checked: true, subText: "Secondary description text goes here" } },
      { label: "With leading icon",    props: { leadingIcon: IconBell } },
      { label: "With image",           props: { image: SAMPLE_IMAGE, imageAlt: "Photo" } },
      { label: "Position start",       props: { position: "start", checked: true } },
      { label: "Disabled",             props: { disabled: true } },
      { label: "Disabled checked",     props: { checked: true, disabled: true } },
    ];

    return (
      <div className="flex flex-col gap-400 max-w-lg">
        {rows.map(({ label, props }) => (
          <div key={label}>
            <p className="px-150 mb-50 text-supporting text-text-level3">{label}</p>
            <CheckboxRow label="Option label" {...props} />
          </div>
        ))}
      </div>
    );
  },
};
