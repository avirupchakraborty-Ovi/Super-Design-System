import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconBell,
  IconLock,
  IconUser,
  IconPalette,
  IconShield,
  IconCreditCard,
  IconPhoto,
} from "@tabler/icons-react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=80&h=80&fit=crop";

const meta: Meta<typeof AccordionItem> = {
  title: "Components/Controls/Accordion",
  component: AccordionItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10531-36430",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg p-400">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

/** Interactive playground — single expandable item */
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item1">
      <AccordionItem value="item1" label="Header" subText="A sample subtext describing the header">
        <p className="text-body text-text-level2">
          This is the expanded content area. Add any content here — text, forms,
          lists, or custom components. The accordion animates smoothly on
          open and close.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/** Collapsed and expanded states side by side */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-400 max-w-lg">
      <div>
        <p className="mb-100 text-supporting text-text-level3">Collapsed</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="collapsed" label="Collapsed item" subText="Click to expand">
            <p className="text-body text-text-level2">Hidden content.</p>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-100 text-supporting text-text-level3">Expanded</p>
        <Accordion type="single" defaultValue="expanded">
          <AccordionItem value="expanded" label="Expanded item" subText="Click to collapse">
            <p className="text-body text-text-level2">
              This content is visible because the accordion is in its expanded
              state. The chevron rotates 180° and the body slides open.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

/** With leading icon */
export const WithIcon: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="notifications">
      <AccordionItem value="notifications" label="Notifications" subText="Manage your alerts" leadingIcon={IconBell}>
        <p className="text-body text-text-level2">
          Configure which notifications you receive and through which channels
          — email, push, or SMS.
        </p>
      </AccordionItem>
      <AccordionItem value="privacy" label="Privacy & Security" subText="Control your data" leadingIcon={IconLock}>
        <p className="text-body text-text-level2">
          Review your privacy settings and manage who can see your activity.
        </p>
      </AccordionItem>
      <AccordionItem value="profile" label="Profile" leadingIcon={IconUser}>
        <p className="text-body text-text-level2">
          Update your name, bio, and profile picture.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/** With leading thumbnail image */
export const WithImage: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="landscape">
      <AccordionItem
        value="landscape"
        label="Landscape collection"
        subText="12 photos"
        image={SAMPLE_IMAGE}
        imageAlt="Landscape"
      >
        <p className="text-body text-text-level2">
          Browse all photos in this collection. You can download, share, or add
          them to an album from here.
        </p>
      </AccordionItem>
      <AccordionItem
        value="portraits"
        label="Portrait shots"
        subText="8 photos"
        image={SAMPLE_IMAGE}
        imageAlt="Portrait"
      >
        <p className="text-body text-text-level2">
          These portraits were taken during the summer session in 2024.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/** With both icon and image */
export const WithIconAndImage: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="gallery"
        label="Photo gallery"
        subText="Tap to browse all albums"
        leadingIcon={IconPhoto}
        image={SAMPLE_IMAGE}
        imageAlt="Gallery preview"
      >
        <p className="text-body text-text-level2">
          Your photo library contains 248 items across 6 albums.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/** Multiple items, single open at a time */
export const SingleOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="account">
      <AccordionItem value="account" label="Account" subText="Name, email, password" leadingIcon={IconUser}>
        <div className="flex flex-col gap-[8px]">
          <p className="text-body text-text-level2">Update your personal information and login credentials.</p>
        </div>
      </AccordionItem>
      <AccordionItem value="appearance" label="Appearance" subText="Theme, font size, display" leadingIcon={IconPalette}>
        <p className="text-body text-text-level2">Customise how the app looks on your device.</p>
      </AccordionItem>
      <AccordionItem value="security" label="Security" subText="2FA, sessions, devices" leadingIcon={IconShield}>
        <p className="text-body text-text-level2">Manage your security settings and active sessions.</p>
      </AccordionItem>
      <AccordionItem value="billing" label="Billing" subText="Plan, invoices, payment" leadingIcon={IconCreditCard}>
        <p className="text-body text-text-level2">View your plan details and billing history.</p>
      </AccordionItem>
    </Accordion>
  ),
};

/** Multiple items, multiple can be open at once */
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["account", "security"]}>
      <AccordionItem value="account" label="Account" subText="Name, email, password" leadingIcon={IconUser}>
        <p className="text-body text-text-level2">Update your personal information and login credentials.</p>
      </AccordionItem>
      <AccordionItem value="appearance" label="Appearance" subText="Theme, font size, display" leadingIcon={IconPalette}>
        <p className="text-body text-text-level2">Customise how the app looks on your device.</p>
      </AccordionItem>
      <AccordionItem value="security" label="Security" subText="2FA, sessions, devices" leadingIcon={IconShield}>
        <p className="text-body text-text-level2">Manage your security settings and active sessions.</p>
      </AccordionItem>
    </Accordion>
  ),
};

/** FAQ-style content with longer text */
export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="q1" label="What is included in the free plan?">
        <p className="text-body text-text-level2">
          The free plan includes up to 3 projects, 1GB of storage, and access
          to all core features. Collaboration is limited to 2 team members.
        </p>
      </AccordionItem>
      <AccordionItem value="q2" label="Can I upgrade or downgrade at any time?">
        <p className="text-body text-text-level2">
          Yes — you can change your plan at any time from your billing settings.
          Upgrades take effect immediately; downgrades apply at the next billing
          cycle.
        </p>
      </AccordionItem>
      <AccordionItem value="q3" label="How do I cancel my subscription?">
        <p className="text-body text-text-level2">
          You can cancel anytime from Settings → Billing → Cancel plan. Your
          access continues until the end of the current billing period.
        </p>
      </AccordionItem>
      <AccordionItem value="q4" label="Is my data safe?">
        <p className="text-body text-text-level2">
          All data is encrypted at rest and in transit using AES-256 and TLS
          1.3. We are SOC 2 Type II certified and perform regular third-party
          security audits.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/** All features together */
export const CompleteMatrix: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="full">
      <AccordionItem value="label-only" label="Label only">
        <p className="text-body text-text-level2">No icon, no image, no subtext.</p>
      </AccordionItem>
      <AccordionItem value="with-subtext" label="Label + subtext" subText="A secondary description line">
        <p className="text-body text-text-level2">Header has both title and subtext.</p>
      </AccordionItem>
      <AccordionItem value="with-icon" label="With leading icon" subText="Icon precedes the text" leadingIcon={IconBell}>
        <p className="text-body text-text-level2">Header includes a leading Tabler icon.</p>
      </AccordionItem>
      <AccordionItem
        value="with-image"
        label="With thumbnail"
        subText="Image precedes the text"
        image={SAMPLE_IMAGE}
        imageAlt="Photo"
      >
        <p className="text-body text-text-level2">Header includes a leading thumbnail image.</p>
      </AccordionItem>
      <AccordionItem
        value="full"
        label="Full — icon + image + subtext"
        subText="All optional elements shown"
        leadingIcon={IconPhoto}
        image={SAMPLE_IMAGE}
        imageAlt="Photo"
      >
        <p className="text-body text-text-level2">
          All optional header elements are shown: leading icon, thumbnail image,
          and subtext. The content body can contain any React node.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};
