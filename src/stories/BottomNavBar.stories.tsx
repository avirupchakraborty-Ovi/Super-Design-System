import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  IconHome,
  IconBuildingStore,
  IconApps,
  IconCreditCard,
  IconCurrencyRupee,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import { BottomNavBar } from "@/components/ui/BottomNavBar";

const meta: Meta<typeof BottomNavBar> = {
  title: "Components/Navigation/Bottom Nav Bar",
  component: BottomNavBar,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=11865-15543",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavBar>;

// ── Shared items ───────────────────────────────────────────────────────────────

const directItems = [
  { id: "home",     icon: IconHome,          label: "Home"     },
  { id: "store",    icon: IconBuildingStore,  label: "Store"    },
  { id: "apps",     icon: IconApps,           label: "Apps"     },
  { id: "payments", icon: IconCreditCard,     label: "Payments" },
];

const overflowItems = [
  {
    id: "refer",
    icon: IconCurrencyRupee,
    label: "Refer & Earn",
    subText: "Earn passive income for every successful referral",
  },
  {
    id: "learn",
    icon: IconSchool,
    label: "Learn",
    subText: "Learn how to grow and sell with SuperProfile (OMM Masterclass)",
  },
  {
    id: "audience",
    icon: IconUsers,
    label: "Audience",
    subText: "Everyone who signed up, purchased or engaged with you, all here.",
  },
];

// ── Default — first direct item active ────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    const items = directItems.map((item) => ({
      ...item,
      onClick: () => setActive(item.id),
    }));
    return (
      <div className="relative h-[200px] bg-surface-level2">
        <BottomNavBar items={items} activeItem={active} />
      </div>
    );
  },
};

// ── With overflow — "More" trigger visible ────────────────────────────────────

export const WithOverflow: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    const items = directItems.map((item) => ({
      ...item,
      onClick: () => setActive(item.id),
    }));
    const overflow = overflowItems.map((item) => ({
      ...item,
      onClick: () => setActive(item.id),
    }));
    return (
      <div className="relative h-[200px] bg-surface-level2">
        <BottomNavBar items={items} overflowItems={overflow} activeItem={active} />
      </div>
    );
  },
};

// ── Overflow item active — "More" shows active state ─────────────────────────

export const OverflowItemActive: Story = {
  render: () => {
    const [active, setActive] = useState("learn");
    const items = directItems.map((item) => ({
      ...item,
      onClick: () => setActive(item.id),
    }));
    const overflow = overflowItems.map((item) => ({
      ...item,
      onClick: () => setActive(item.id),
    }));
    return (
      <div className="relative h-[200px] bg-surface-level2">
        <p className="p-400 text-body text-text-level2">
          Active item is in overflow — "More" shows brand-primary active state.
        </p>
        <BottomNavBar items={items} overflowItems={overflow} activeItem={active} />
      </div>
    );
  },
};
