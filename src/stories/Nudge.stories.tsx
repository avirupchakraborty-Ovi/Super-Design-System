import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Nudge } from "@/components/ui/Nudge";

const SAMPLE_MESSAGE =
  "Attention! This is a contextual notification for the user. It will be updated with relevant information soon.";

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=80&h=80&fit=crop";

const meta: Meta<typeof Nudge> = {
  title: "Components/Feedback/Nudge",
  component: Nudge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10508-35055",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-400">
        <Story />
      </div>
    ),
  ],
  args: {
    type: "normal",
    message: SAMPLE_MESSAGE,
    showIcon: true,
    stroke: true,
    dismissible: true,
  },
  argTypes: {
    type: { control: "select", options: ["critical", "warning", "normal"] },
    size: { control: "select", options: ["md", "sm"] },
    bg: { control: "select", options: ["default", "surface-2"] },
    align: { control: "select", options: ["start", "center"] },
    message: { control: "text" },
    showIcon: { control: "boolean" },
    stroke: { control: "boolean" },
    dismissible: { control: "boolean" },
    actionLabel: { control: "text" },
    image: { control: "text" },
    imageAlt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Nudge>;

/** Interactive playground */
export const Default: Story = {};

/** 4 colour variants — Critical (red), Warning (amber), Normal (blue), Grey (surface-2) */
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge type="critical"                message={SAMPLE_MESSAGE} />
      <Nudge type="warning"                 message={SAMPLE_MESSAGE} />
      <Nudge type="normal"                  message={SAMPLE_MESSAGE} />
      <Nudge type="normal" bg="surface-2"   message={SAMPLE_MESSAGE} />
    </div>
  ),
};

/** md (default) vs sm (compact) — all 4 colour variants */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-2xl">
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">md — default</p>
        <Nudge type="critical"              message={SAMPLE_MESSAGE} />
        <Nudge type="warning"               message={SAMPLE_MESSAGE} />
        <Nudge type="normal"                message={SAMPLE_MESSAGE} />
        <Nudge type="normal" bg="surface-2" message={SAMPLE_MESSAGE} />
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">sm — compact</p>
        <Nudge size="sm" type="critical"              message={SAMPLE_MESSAGE} />
        <Nudge size="sm" type="warning"               message={SAMPLE_MESSAGE} />
        <Nudge size="sm" type="normal"                message={SAMPLE_MESSAGE} />
        <Nudge size="sm" type="normal" bg="surface-2" message={SAMPLE_MESSAGE} />
      </div>
    </div>
  ),
};

/** Stroke ON vs OFF — all 4 colour variants */
export const Stroke: Story = {
  render: () => (
    <div className="flex flex-col gap-400 max-w-2xl">
      {(["critical", "warning", "normal"] as const).map((type) => (
        <div key={type} className="flex flex-col gap-100">
          <p className="text-supporting font-medium text-text-level3">{type}</p>
          <Nudge type={type} stroke   message={SAMPLE_MESSAGE} />
          <Nudge type={type} stroke={false} message={SAMPLE_MESSAGE} />
        </div>
      ))}
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3">grey (surface-2)</p>
        <Nudge type="normal" bg="surface-2" stroke   message={SAMPLE_MESSAGE} />
        <Nudge type="normal" bg="surface-2" stroke={false} message={SAMPLE_MESSAGE} />
      </div>
    </div>
  ),
};

/** With leading image — all 4 colour variants */
export const WithImage: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge type="critical"              image={SAMPLE_IMAGE} imageAlt="Landscape" message="Your upload encountered an issue. Please check the file and try again." />
      <Nudge type="warning"               image={SAMPLE_IMAGE} imageAlt="Landscape" message="This image may not meet the minimum resolution requirements." />
      <Nudge type="normal"                image={SAMPLE_IMAGE} imageAlt="Landscape" message="Your image has been processed and is ready to publish." />
      <Nudge type="normal" bg="surface-2" image={SAMPLE_IMAGE} imageAlt="Landscape" message="Your image has been processed and is ready to publish." />
    </div>
  ),
};

/** Image only — no type icon, all 4 colour variants */
export const ImageNoIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge type="critical"              image={SAMPLE_IMAGE} imageAlt="Landscape" showIcon={false} message="Your upload encountered an issue. Please check the file and try again." />
      <Nudge type="warning"               image={SAMPLE_IMAGE} imageAlt="Landscape" showIcon={false} message="This image may not meet the minimum resolution requirements." />
      <Nudge type="normal"                image={SAMPLE_IMAGE} imageAlt="Landscape" showIcon={false} message="Your image has been processed and is ready to publish." />
      <Nudge type="normal" bg="surface-2" image={SAMPLE_IMAGE} imageAlt="Landscape" showIcon={false} message="Your image has been processed and is ready to publish." />
    </div>
  ),
};

/** With CTA button — all 4 colour variants */
export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge type="critical"              message="Your session is about to expire. Save your progress now." actionLabel="Save" />
      <Nudge type="warning"               message="You are running low on storage. Upgrade to continue." actionLabel="Upgrade" />
      <Nudge type="normal"                message="A new version of the app is available with improvements." actionLabel="Update" />
      <Nudge type="normal" bg="surface-2" message="A new version of the app is available with improvements." actionLabel="Update" />
    </div>
  ),
};

/** Non-dismissible — all 4 colour variants */
export const NoDismiss: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge type="critical"              dismissible={false} message="This action cannot be undone. Please review carefully before proceeding." actionLabel="Review" />
      <Nudge type="warning"               dismissible={false} message="Your account requires verification before you can continue." actionLabel="Verify" />
      <Nudge type="normal"                dismissible={false} message="You are in view-only mode. Contact your admin for edit access." />
      <Nudge type="normal" bg="surface-2" dismissible={false} message="You are in view-only mode. Contact your admin for edit access." />
    </div>
  ),
};

/** Bold heading + message + action button — all 4 colour variants */
export const WithHeading: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge
        type="critical"
        heading="Critical: Action required immediately"
        message="Your account has been flagged for unusual activity. Please review and confirm your identity."
        actionLabel="Review now"
      />
      <Nudge
        type="warning"
        heading="Instagram is experiencing a high failure rate for account connections"
        message="This is due to technical issues on Meta's servers. Your automations may not fire as expected."
        actionLabel="Notify me when it works"
      />
      <Nudge
        type="normal"
        heading="New features are available"
        message="We've added Analytics 2.0 and improved DM performance. Check out what's new."
        actionLabel="See what's new"
      />
      <Nudge
        type="normal"
        bg="surface-2"
        heading="New features are available"
        message="We've added Analytics 2.0 and improved DM performance. Check out what's new."
        actionLabel="See what's new"
      />
    </div>
  ),
};

/** Heading + body + inline underlined link — all 4 colour variants */
export const WithHeadingLink: Story = {
  render: () => (
    <div className="flex flex-col gap-200 max-w-2xl">
      <Nudge
        type="critical"
        heading="Critical: Action required immediately"
        message="Your account has been flagged for unusual activity. Please review and confirm your identity."
        actionLabel="Review now"
        actionVariant="link"
      />
      <Nudge
        type="warning"
        heading="Instagram is experiencing a high failure rate for account connections"
        message="This is due to technical issues on Meta's servers. Don't worry, we have notified Meta about this, and you will be able to connect your Instagram very soon."
        actionLabel="Notify me when it works"
        actionVariant="link"
      />
      <Nudge
        type="normal"
        heading="New features are available"
        message="We've added Analytics 2.0 and improved DM performance. Check out what's new."
        actionLabel="See what's new"
        actionVariant="link"
      />
      <Nudge
        type="normal"
        bg="surface-2"
        heading="New features are available"
        message="We've added Analytics 2.0 and improved DM performance. Check out what's new."
        actionLabel="See what's new"
        actionVariant="link"
      />
    </div>
  ),
};

/** Center aligned — icon + one-liner text, no dismiss, both sizes, all 4 colour variants */
export const CenterAligned: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-2xl">
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">md — default</p>
        <Nudge align="center" dismissible={false} type="critical" message="Your account has been flagged for unusual activity." />
        <Nudge align="center" dismissible={false} type="warning"  message="Instagram is experiencing a high failure rate for account connections." />
        <Nudge align="center" dismissible={false} type="normal"   message="Creators like you gained 59,078 new followers in the last 24 hours." />
        <Nudge align="center" dismissible={false} type="normal" bg="surface-2" message="Creators like you gained 59,078 new followers in the last 24 hours." />
      </div>
      <div className="flex flex-col gap-100">
        <p className="text-supporting font-medium text-text-level3 mb-50">sm — compact</p>
        <Nudge align="center" size="sm" dismissible={false} type="critical" message="Your account has been flagged for unusual activity." />
        <Nudge align="center" size="sm" dismissible={false} type="warning"  message="Instagram is experiencing a high failure rate for account connections." />
        <Nudge align="center" size="sm" dismissible={false} type="normal"   message="Creators like you gained 59,078 new followers in the last 24 hours." />
        <Nudge align="center" size="sm" dismissible={false} type="normal" bg="surface-2" message="Creators like you gained 59,078 new followers in the last 24 hours." />
      </div>
    </div>
  ),
};

/** All types × stroke × features */
export const CompleteMatrix: Story = {
  render: () => {
    const types = ["critical", "warning", "normal"] as const;
    const rows: { label: string; props: Partial<Parameters<typeof Nudge>[0]> }[] = [
      { label: "Icon only",                props: {} },
      { label: "Icon — stroke off",        props: { stroke: false } },
      { label: "No icon",                  props: { showIcon: false } },
      { label: "With image + icon",        props: { image: SAMPLE_IMAGE, imageAlt: "Photo" } },
      { label: "With image — no icon",     props: { image: SAMPLE_IMAGE, imageAlt: "Photo", showIcon: false } },
      { label: "With action",              props: { actionLabel: "Take action" } },
      { label: "Image + action",           props: { image: SAMPLE_IMAGE, imageAlt: "Photo", actionLabel: "Act now" } },
      { label: "No dismiss",               props: { dismissible: false } },
      { label: "Full featured",            props: { image: SAMPLE_IMAGE, imageAlt: "Photo", actionLabel: "Act now" } },
    ];

    return (
      <div className="flex flex-col gap-500 max-w-2xl">
        {rows.map(({ label, props }) => (
          <div key={label}>
            <p className="mb-100 text-supporting font-medium text-text-level3">{label}</p>
            <div className="flex flex-col gap-100">
              {types.map((type) => (
                <Nudge
                  key={type}
                  type={type}
                  message="This is a contextual notification for the user."
                  dismissible
                  {...props}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
