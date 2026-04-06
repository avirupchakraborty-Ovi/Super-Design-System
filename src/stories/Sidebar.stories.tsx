import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  IconSmartHome,
  IconWorld,
  IconWallet,
  IconSchool,
  IconUsers,
  IconCurrencyRupee,
} from "@tabler/icons-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10515-38793",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ── Logo ───────────────────────────────────────────────────────────────────────

// Illustrative app icons from Figma (raster 3D icons)
const AutoDMIcon = () => <img src="/icons/nav/image 126.png" width={20} height={20} alt="" />;
const LeadMagnetIcon = () => <img src="/icons/nav/Magnet 3D Icon Model For Science (HD) 1.png" width={20} height={20} alt="" />;
const PaymentPagesIcon = () => <img src="/icons/nav/3dicons.png" width={20} height={20} alt="" />;

// ── Full Sidebar ───────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <Sidebar
        logo={<SuperProfileLogo />}
        sections={[
          {
            items: [
              { icon: IconSmartHome,     label: "Home",        active: active === "home",     onClick: () => setActive("home") },
              { icon: IconWorld,         label: "Store",       active: active === "store",    onClick: () => setActive("store") },
              { icon: IconWallet,        label: "Payments",    active: active === "payments", onClick: () => setActive("payments") },
              { icon: IconSchool,        label: "Learn",       active: active === "learn",    onClick: () => setActive("learn") },
              { icon: IconUsers,         label: "Audience",    active: active === "audience", onClick: () => setActive("audience") },
              { icon: IconCurrencyRupee, label: "Refer & Earn",active: active === "refer",    onClick: () => setActive("refer") },
            ],
          },
          {
            label: "YOUR APPS",
            items: [
              { icon: AutoDMIcon,       label: "AutoDM",        active: active === "autodm",  onClick: () => setActive("autodm") },
              { icon: LeadMagnetIcon,   label: "Lead Magnet",   active: active === "magnet",  onClick: () => setActive("magnet") },
              { icon: PaymentPagesIcon, label: "Payment Pages", active: active === "payment", onClick: () => setActive("payment") },
            ],
            footerButton: { label: "Explore All Apps", onClick: () => {} },
          },
        ]}
        upgradeCard={{
          title: "You're on Free Plan",
          description: "Unlock unlimited access to all features and get paid.",
          ctaLabel: "Explore Now",
          onCtaClick: () => {},
        }}
        user={{
          name: "Vijai Kanth",
          avatar: "https://picsum.photos/seed/user/24/24",
          onSettingsClick: () => {},
        }}
      />
    );
  },
};

// ── Without Upgrade Card ───────────────────────────────────────────────────────

export const WithoutUpgradeCard: Story = {
  render: () => (
    <Sidebar
      logo={<SuperProfileLogo />}
      sections={[
        {
          items: [
            { icon: IconSmartHome, label: "Home",     active: true },
            { icon: IconUsers,     label: "Audience" },
            { icon: IconWallet,    label: "Payments" },
            { icon: IconSchool,    label: "Learn" },
          ],
        },
      ]}
      user={{
        name: "Vijai Kanth",
        onSettingsClick: () => {},
      }}
    />
  ),
};

// ── Minimal ────────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  render: () => (
    <Sidebar
      logo={<SuperProfileLogo />}
      sections={[
        {
          items: [
            { icon: IconSmartHome, label: "Home",     active: true },
            { icon: IconUsers,     label: "Audience" },
            { icon: IconWallet,    label: "Payments" },
          ],
        },
      ]}
    />
  ),
};
