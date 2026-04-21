import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  IconCurrencyRupee,
  IconSchool,
  IconUsers,
  IconStar,
  IconBell,
} from "@tabler/icons-react";
import { BottomSheetListItem } from "@/components/ui/BottomSheetListItem";

const meta: Meta<typeof BottomSheetListItem> = {
  title: "Primitives/Bottom Sheet List Item",
  component: BottomSheetListItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=11864-41",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400 w-[390px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheetListItem>;

// ── Default ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    icon: IconSchool,
    label: "Learn",
    subText: "Learn how to grow and sell with SuperProfile (OMM Masterclass)",
    selected: false,
  },
};

// ── Selected ───────────────────────────────────────────────────────────────────

export const Selected: Story = {
  args: {
    icon: IconSchool,
    label: "Learn",
    subText: "Learn how to grow and sell with SuperProfile (OMM Masterclass)",
    selected: true,
  },
};

// ── All states ─────────────────────────────────────────────────────────────────
// Static snapshot: default and selected (hover is CSS-only, not statically renderable).

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <BottomSheetListItem
        icon={IconCurrencyRupee}
        label="Default"
        subText="This item is in its default resting state."
      />
      <BottomSheetListItem
        icon={IconSchool}
        label="Selected"
        subText="This item has been selected by the user."
        selected
      />
    </div>
  ),
};

// ── Interactive list ───────────────────────────────────────────────────────────

export const InteractiveList: Story = {
  render: () => {
    const [active, setActive] = useState("learn");

    const items = [
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
      {
        id: "favourites",
        icon: IconStar,
        label: "Favourites",
        subText: "Your saved items and bookmarked content in one place.",
      },
      {
        id: "notifications",
        icon: IconBell,
        label: "Notifications",
        subText: "Stay updated with the latest activity across your account.",
      },
    ];

    return (
      <div className="flex flex-col gap-50">
        {items.map((item) => (
          <BottomSheetListItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            subText={item.subText}
            selected={active === item.id}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>
    );
  },
};
