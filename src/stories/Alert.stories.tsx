import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "@/components/ui/Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Feedback/Alert",
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10508-35051",
    },
    layout: "fullscreen",
  },
  args: {
    type: "info",
    message: "This is a sample alert text for the user.",
    dismissible: true,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["critical", "warning", "warning-subtle", "info"],
    },
    message: { control: "text" },
    detail: { control: "text" },
    timer: { control: "text" },
    actionLabel: { control: "text" },
    dismissible: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/** Interactive playground */
export const Default: Story = {};

/** All four severity types — message + dismiss only */
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert type="critical"      message="Critical: action required immediately. This issue affects all users." />
      <Alert type="warning"       message="Warning: please review this before continuing." />
      <Alert type="warning-subtle" message="Caution: this action may have unintended consequences." />
      <Alert type="info"          message="Info: your changes have been saved successfully." />
    </div>
  ),
};

/** All types with a live countdown timer */
export const WithTimer: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert type="critical"       message="Session expires in" timer="00:04:32" detail="Save your work now." />
      <Alert type="warning"        message="Sale ends in" timer="01:30:00" detail="Don't miss out." />
      <Alert type="warning-subtle" message="Maintenance window starts in" timer="00:45:00" />
      <Alert type="info"           message="Next sync in" timer="00:02:15" />
    </div>
  ),
};

/** All types with an inline action button */
export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert type="critical"       message="Your account has been suspended." actionLabel="Appeal" />
      <Alert type="warning"        message="Your trial ends in 3 days." actionLabel="Upgrade" />
      <Alert type="warning-subtle" message="Some features are unavailable in your region." actionLabel="Learn more" />
      <Alert type="info"           message="A new version is available." actionLabel="Update now" />
    </div>
  ),
};

/** All types with timer + detail secondary text */
export const WithDetail: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert type="critical"       message="Access blocked. Try again in" timer="00:10:00" detail="or contact support." />
      <Alert type="warning"        message="Flash sale ends in" timer="00:30:00" detail="Items in your cart are not reserved." />
      <Alert type="warning-subtle" message="Scheduled maintenance in" timer="02:00:00" detail="Some features may be unavailable." />
      <Alert type="info"           message="Free shipping offer expires in" timer="00:59:00" detail="Add ₹500 more to qualify." />
    </div>
  ),
};

/** All types with every feature enabled */
export const FullFeatured: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert
        type="critical"
        message="Account suspended. Restore access in"
        timer="00:10:00"
        detail="or you will be logged out."
        actionLabel="Restore"
        dismissible
      />
      <Alert
        type="warning"
        message="Limited offer ends in"
        timer="01:00:00"
        detail="Only 3 items left in stock."
        actionLabel="Buy now"
        dismissible
      />
      <Alert
        type="warning-subtle"
        message="Scheduled downtime in"
        timer="00:45:00"
        detail="Save your progress."
        actionLabel="Save now"
        dismissible
      />
      <Alert
        type="info"
        message="New features available. Update required in"
        timer="00:20:00"
        detail="Auto-update will begin after."
        actionLabel="Update"
        dismissible
      />
    </div>
  ),
};

/** Non-dismissible alerts — no close button */
export const NoDismiss: Story = {
  render: () => (
    <div className="flex flex-col gap-200">
      <Alert type="critical"       message="Your payment failed. Please update your billing details." dismissible={false} actionLabel="Update billing" />
      <Alert type="warning"        message="You are in read-only mode. Contact your admin to make changes." dismissible={false} />
      <Alert type="warning-subtle" message="You are viewing a cached version of this page." dismissible={false} />
      <Alert type="info"           message="You are currently offline. Changes will sync when reconnected." dismissible={false} />
    </div>
  ),
};

/** All types × feature combinations */
export const CompleteMatrix: Story = {
  render: () => {
    const types = ["critical", "warning", "warning-subtle", "info"] as const;
    const rows: { label: string; props: Partial<Parameters<typeof Alert>[0]> }[] = [
      { label: "Message only",              props: {} },
      { label: "With timer",               props: { timer: "00:30:00" } },
      { label: "With detail",              props: { timer: "00:30:00", detail: "Additional context here." } },
      { label: "With action",              props: { actionLabel: "Take action" } },
      { label: "Timer + action",           props: { timer: "00:30:00", actionLabel: "Act now" } },
      { label: "Full featured",            props: { timer: "00:30:00", detail: "Secondary text.", actionLabel: "Act now" } },
      { label: "No dismiss",               props: { dismissible: false } },
    ];

    return (
      <div className="flex flex-col gap-500">
        {rows.map(({ label, props }) => (
          <div key={label}>
            <p className="px-200 py-100 text-supporting font-medium text-text-level3">{label}</p>
            <div className="flex flex-col gap-200">
              {types.map((type) => (
                <Alert
                  key={type}
                  type={type}
                  message="This is a sample alert text for the user."
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
