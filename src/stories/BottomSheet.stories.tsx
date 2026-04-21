import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  IconCurrencyRupee,
  IconSchool,
  IconUsers,
  IconStar,
  IconBell,
} from "@tabler/icons-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { BottomSheetListItem } from "@/components/ui/BottomSheetListItem";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/Overlays/Bottom Sheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=11864-41",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// ── Trigger button ─────────────────────────────────────────────────────────────

function TriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-200 py-100 rounded-500 border border-border-color-level2 text-body font-medium text-text-level1 cursor-pointer hover:bg-surface-level2"
    >
      Open Bottom Sheet
    </button>
  );
}

// ── Default — generic content ──────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-400">
        <TriggerButton onClick={() => setOpen(true)} />
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <p className="text-body font-normal text-text-level2">
            This is generic content inside the bottom sheet. The sheet accepts
            any children and handles scroll, backdrop, and swipe-to-dismiss.
          </p>
        </BottomSheet>
      </div>
    );
  },
};

// ── With Title ─────────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-400">
        <TriggerButton onClick={() => setOpen(true)} />
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="More options"
        >
          <p className="text-body font-normal text-text-level2">
            Content below an optional title heading.
          </p>
        </BottomSheet>
      </div>
    );
  },
};

// ── Nav Overflow — primary use case ───────────────────────────────────────────
// Simulates the BottomNavBar "More" overflow menu.

export const NavOverflow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
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
    ];

    return (
      <div className="p-400">
        <TriggerButton onClick={() => setOpen(true)} />
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-50">
            {items.map((item) => (
              <BottomSheetListItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                subText={item.subText}
                selected={active === item.id}
                onClick={() => {
                  setActive(item.id);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// ── Long content — internal scroll ────────────────────────────────────────────

const scrollIcons = [IconCurrencyRupee, IconSchool, IconUsers, IconStar, IconBell];

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<number | null>(null);
    return (
      <div className="p-400">
        <TriggerButton onClick={() => setOpen(true)} />
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Long list"
        >
          <div className="flex flex-col gap-50">
            {Array.from({ length: 20 }, (_, i) => (
              <BottomSheetListItem
                key={i}
                icon={scrollIcons[i % scrollIcons.length]}
                label={`List item ${i + 1}`}
                subText="A short description that explains what this item does."
                selected={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};
