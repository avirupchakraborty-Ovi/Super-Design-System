import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconStar,
  IconMail,
  IconBell,
  IconDownload,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";
import { MenuList, MenuListItem } from "@/components/ui/MenuList";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=64&h=64&fit=crop";

const meta: Meta = {
  title: "Primitives/Menu List",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10343-46749",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400 w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Default ────────────────────────────────────────────────────────────────────

/** Plain items — all 4 states */
export const Default: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Default"  state="default" />
      <MenuListItem label="Hover"    state="hover" />
      <MenuListItem label="Selected" state="selected" />
      <MenuListItem label="Disabled" state="disabled" />
    </MenuList>
  ),
};

// ── With Icon ──────────────────────────────────────────────────────────────────

/** Items with a leading icon */
export const WithIcon: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Notifications" icon={IconBell}     state="default" />
      <MenuListItem label="Profile"       icon={IconUser}     state="hover" />
      <MenuListItem label="Settings"      icon={IconSettings} state="default" />
      <MenuListItem label="Downloads"     icon={IconDownload} state="disabled" />
    </MenuList>
  ),
};

// ── With Sub-text ──────────────────────────────────────────────────────────────

/** Items with a secondary supporting line below the label */
export const WithSubText: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Option 1" subText="This is a placeholder sub text" icon={IconStar}     state="default" />
      <MenuListItem label="Option 2" subText="This is a placeholder sub text" icon={IconMail}     state="hover" />
      <MenuListItem label="Option 3" subText="This is a placeholder sub text" icon={IconBell}     state="default" />
      <MenuListItem label="Option 4" subText="This is a placeholder sub text" icon={IconDownload} state="disabled" />
    </MenuList>
  ),
};

// ── With Image ─────────────────────────────────────────────────────────────────

/** Items with a 32×32 leading thumbnail */
export const WithImage: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Alice Johnson" subText="alice@example.com" image={SAMPLE_IMAGE} state="default" />
      <MenuListItem label="Bob Smith"     subText="bob@example.com"   image={SAMPLE_IMAGE} state="hover" />
      <MenuListItem label="Carol White"   subText="carol@example.com" image={SAMPLE_IMAGE} state="default" />
      <MenuListItem label="David Lee"     subText="david@example.com" image={SAMPLE_IMAGE} state="disabled" />
    </MenuList>
  ),
};

// ── With Counter ───────────────────────────────────────────────────────────────

/** Items with a trailing numeric counter */
export const WithCounter: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Option 1" subText="This is a placeholder sub text" image={SAMPLE_IMAGE} counter={12}  state="default" />
      <MenuListItem label="Option 2" subText="This is a placeholder sub text" image={SAMPLE_IMAGE} counter={5}   state="hover" />
      <MenuListItem label="Option 3" subText="This is a placeholder sub text" image={SAMPLE_IMAGE} counter={128} state="default" />
      <MenuListItem label="Option 4" subText="This is a placeholder sub text" image={SAMPLE_IMAGE} counter={0}   state="disabled" />
    </MenuList>
  ),
};

// ── With Badge ─────────────────────────────────────────────────────────────────

/** Items with a trailing pill badge */
export const WithBadge: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Option 1" subText="This is a placeholder sub text" icon={IconStar}     badge="Earn with AutoDM" state="default" />
      <MenuListItem label="Option 2" subText="This is a placeholder sub text" icon={IconMail}     badge="Pro"              state="hover" />
      <MenuListItem label="Option 3" subText="This is a placeholder sub text" icon={IconBell}     badge="New"              state="default" />
      <MenuListItem label="Option 4" subText="This is a placeholder sub text" icon={IconDownload} badge="Earn with AutoDM" state="disabled" />
    </MenuList>
  ),
};

// ── With Inline Button ─────────────────────────────────────────────────────────

/** Items with a trailing outline action button */
export const WithInlineButton: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Option 1" subText="This is a placeholder sub text" icon={IconStar}     trailingButton="Connect" state="default" />
      <MenuListItem label="Option 2" subText="This is a placeholder sub text" icon={IconMail}     trailingButton="Connect" state="hover" />
      <MenuListItem label="Option 3" subText="This is a placeholder sub text" icon={IconBell}     trailingButton="Connect" state="default" />
      <MenuListItem label="Option 4" subText="This is a placeholder sub text" icon={IconDownload} trailingButton="Connect" state="disabled" />
    </MenuList>
  ),
};

// ── All Variants ───────────────────────────────────────────────────────────────

/** Every variant as its own single-row bordered list */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-150">
      <MenuList><MenuListItem label="Plain"                                                                                                   /></MenuList>
      <MenuList><MenuListItem label="With icon"        icon={IconBell}                                                                        /></MenuList>
      <MenuList><MenuListItem label="With sub-text"    icon={IconMail}    subText="This is a placeholder sub text"                            /></MenuList>
      <MenuList><MenuListItem label="With image"       image={SAMPLE_IMAGE} subText="This is a placeholder sub text"                         /></MenuList>
      <MenuList><MenuListItem label="With counter"     image={SAMPLE_IMAGE} subText="This is a placeholder sub text" counter={12}            /></MenuList>
      <MenuList><MenuListItem label="With badge"       icon={IconStar}    subText="This is a placeholder sub text"   badge="Earn with AutoDM" /></MenuList>
      <MenuList><MenuListItem label="With button"      icon={IconStar}    subText="This is a placeholder sub text"   trailingButton="Connect" /></MenuList>
      <MenuList><MenuListItem label="Disabled"         icon={IconDownload} subText="This is a placeholder sub text"  state="disabled"         /></MenuList>
    </div>
  ),
};
