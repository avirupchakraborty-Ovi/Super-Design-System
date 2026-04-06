import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconBell,
  IconUser,
  IconSettings,
  IconShield,
  IconCreditCard,
} from "@tabler/icons-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10478-34234",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400 max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleContent = (label: string) => (
  <p className="text-body text-text-level2">
    Content for <strong>{label}</strong>. This panel appears when the tab is selected.
  </p>
);

// ── Pill ──────────────────────────────────────────────────────────────────────

/** Default pill style — primary tab group */
export const Pill: Story = {
  render: () => (
    <Tabs variant="pill" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">{sampleContent("Overview")}</TabsContent>
      <TabsContent value="activity">{sampleContent("Activity")}</TabsContent>
      <TabsContent value="settings">{sampleContent("Settings")}</TabsContent>
    </Tabs>
  ),
};

/** Pill with leading icons */
export const PillWithIcons: Story = {
  render: () => (
    <Tabs variant="pill" defaultValue="notifications">
      <TabsList>
        <TabsTrigger value="notifications" icon={IconBell}>Notifications</TabsTrigger>
        <TabsTrigger value="profile" icon={IconUser}>Profile</TabsTrigger>
        <TabsTrigger value="security" icon={IconShield}>Security</TabsTrigger>
        <TabsTrigger value="billing" icon={IconCreditCard}>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="notifications">{sampleContent("Notifications")}</TabsContent>
      <TabsContent value="profile">{sampleContent("Profile")}</TabsContent>
      <TabsContent value="security">{sampleContent("Security")}</TabsContent>
      <TabsContent value="billing">{sampleContent("Billing")}</TabsContent>
    </Tabs>
  ),
};

/** Pill with 5 tabs */
export const PillFiveTabs: Story = {
  render: () => (
    <Tabs variant="pill" defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab one</TabsTrigger>
        <TabsTrigger value="tab2">Tab two</TabsTrigger>
        <TabsTrigger value="tab3">Tab three</TabsTrigger>
        <TabsTrigger value="tab4">Tab four</TabsTrigger>
        <TabsTrigger value="tab5">Tab five</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">{sampleContent("Tab one")}</TabsContent>
      <TabsContent value="tab2">{sampleContent("Tab two")}</TabsContent>
      <TabsContent value="tab3">{sampleContent("Tab three")}</TabsContent>
      <TabsContent value="tab4">{sampleContent("Tab four")}</TabsContent>
      <TabsContent value="tab5">{sampleContent("Tab five")}</TabsContent>
    </Tabs>
  ),
};

// ── Line ──────────────────────────────────────────────────────────────────────

/** Line / underline indicator style */
export const Line: Story = {
  render: () => (
    <Tabs variant="line" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">{sampleContent("Overview")}</TabsContent>
      <TabsContent value="activity">{sampleContent("Activity")}</TabsContent>
      <TabsContent value="settings">{sampleContent("Settings")}</TabsContent>
    </Tabs>
  ),
};

/** Line with icons */
export const LineWithIcons: Story = {
  render: () => (
    <Tabs variant="line" defaultValue="notifications">
      <TabsList>
        <TabsTrigger value="notifications" icon={IconBell}>Notifications</TabsTrigger>
        <TabsTrigger value="profile" icon={IconUser}>Profile</TabsTrigger>
        <TabsTrigger value="security" icon={IconShield}>Security</TabsTrigger>
        <TabsTrigger value="billing" icon={IconCreditCard}>Billing</TabsTrigger>
        <TabsTrigger value="settings" icon={IconSettings}>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="notifications">{sampleContent("Notifications")}</TabsContent>
      <TabsContent value="profile">{sampleContent("Profile")}</TabsContent>
      <TabsContent value="security">{sampleContent("Security")}</TabsContent>
      <TabsContent value="billing">{sampleContent("Billing")}</TabsContent>
      <TabsContent value="settings">{sampleContent("Settings")}</TabsContent>
    </Tabs>
  ),
};

// ── Blue Gradient ─────────────────────────────────────────────────────────────

/** Blue gradient branded pill */
export const BlueGradient: Story = {
  render: () => (
    <Tabs variant="blue-gradient" defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1" icon={IconBell}>Tab one</TabsTrigger>
        <TabsTrigger value="tab2" icon={IconUser}>Tab two</TabsTrigger>
        <TabsTrigger value="tab3" icon={IconShield}>Tab three</TabsTrigger>
        <TabsTrigger value="tab4" icon={IconCreditCard}>Tab four</TabsTrigger>
        <TabsTrigger value="tab5" icon={IconSettings}>Tab five</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">{sampleContent("Tab one")}</TabsContent>
      <TabsContent value="tab2">{sampleContent("Tab two")}</TabsContent>
      <TabsContent value="tab3">{sampleContent("Tab three")}</TabsContent>
      <TabsContent value="tab4">{sampleContent("Tab four")}</TabsContent>
      <TabsContent value="tab5">{sampleContent("Tab five")}</TabsContent>
    </Tabs>
  ),
};

// ── Purple Gradient ───────────────────────────────────────────────────────────

/** Purple gradient branded pill */
export const PurpleGradient: Story = {
  render: () => (
    <Tabs variant="purple-gradient" defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1" icon={IconBell}>Tab one</TabsTrigger>
        <TabsTrigger value="tab2" icon={IconUser}>Tab two</TabsTrigger>
        <TabsTrigger value="tab3" icon={IconShield}>Tab three</TabsTrigger>
        <TabsTrigger value="tab4" icon={IconCreditCard}>Tab four</TabsTrigger>
        <TabsTrigger value="tab5" icon={IconSettings}>Tab five</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">{sampleContent("Tab one")}</TabsContent>
      <TabsContent value="tab2">{sampleContent("Tab two")}</TabsContent>
      <TabsContent value="tab3">{sampleContent("Tab three")}</TabsContent>
      <TabsContent value="tab4">{sampleContent("Tab four")}</TabsContent>
      <TabsContent value="tab5">{sampleContent("Tab five")}</TabsContent>
    </Tabs>
  ),
};

// ── Pill 2 ────────────────────────────────────────────────────────────────────

/** Pill 2 — secondary ghost pill, used when a Pill tab bar is already present */
export const Pill2: Story = {
  render: () => (
    <Tabs variant="pill2" defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1" icon={IconBell}>Tab one</TabsTrigger>
        <TabsTrigger value="tab2" icon={IconUser}>Tab two</TabsTrigger>
        <TabsTrigger value="tab3" icon={IconShield}>Tab three</TabsTrigger>
        <TabsTrigger value="tab4" icon={IconCreditCard}>Tab four</TabsTrigger>
        <TabsTrigger value="tab5" icon={IconSettings}>Tab five</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">{sampleContent("Tab one")}</TabsContent>
      <TabsContent value="tab2">{sampleContent("Tab two")}</TabsContent>
      <TabsContent value="tab3">{sampleContent("Tab three")}</TabsContent>
      <TabsContent value="tab4">{sampleContent("Tab four")}</TabsContent>
      <TabsContent value="tab5">{sampleContent("Tab five")}</TabsContent>
    </Tabs>
  ),
};

// ── All variants ──────────────────────────────────────────────────────────────

/** All 5 variants stacked for comparison */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-500">
      {(
        [
          { variant: "pill",             label: "Pill (default)" },
          { variant: "line",             label: "Line" },
          { variant: "blue-gradient",    label: "Blue Gradient" },
          { variant: "purple-gradient",  label: "Purple Gradient" },
          { variant: "pill2",            label: "Pill 2" },
        ] as const
      ).map(({ variant, label }) => (
        <div key={variant}>
          <p className="mb-150 text-supporting text-text-level3">{label}</p>
          <Tabs variant={variant} defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1" icon={IconBell}>Tab one</TabsTrigger>
              <TabsTrigger value="tab2" icon={IconUser}>Tab two</TabsTrigger>
              <TabsTrigger value="tab3" icon={IconSettings}>Tab three</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

/** Disabled tabs */
export const WithDisabled: Story = {
  render: () => (
    <Tabs variant="pill" defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">{sampleContent("Available")}</TabsContent>
      <TabsContent value="tab3">{sampleContent("Another")}</TabsContent>
    </Tabs>
  ),
};
