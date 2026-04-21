import type { Meta, StoryObj } from "@storybook/react";
import { IconLayoutGrid, IconChartLine } from "@tabler/icons-react";
import { MobilePageHeader } from "@/components/ui/MobilePageHeader";

const meta: Meta<typeof MobilePageHeader> = {
  title: "Primitives/Mobile Page Header",
  component: MobilePageHeader,
  parameters: {
    layout: "fullscreen",
    // Lock all stories to a mobile viewport so lg:hidden doesn't hide the component
    viewport: { defaultViewport: "mobile1" },
  },
};
export default meta;

type Story = StoryObj<typeof MobilePageHeader>;

const mockUser = {
  name: "Vijai Kanth",
  avatar: "https://picsum.photos/seed/user/36/36",
};

const mockLinks = [
  { label: "Campaigns", icon: IconLayoutGrid, onClick: () => {} },
  { label: "Reports",   icon: IconChartLine,  onClick: () => {} },
];

/** Standard — compact logo, page title, user avatar, no secondary links */
export const Default: Story = {
  args: {
    title: "Ads Manager",
    user: mockUser,
  },
};

/** With secondary links — two-row layout matching CollapsiblePageHeader links */
export const WithSecondaryLinks: Story = {
  args: {
    title: "Ads Manager",
    user: mockUser,
    secondaryLinks: mockLinks,
  },
};

/** Avatar fallback — no image, shows initial on brand-primary-600 bg */
export const AvatarFallback: Story = {
  args: {
    title: "Ads Manager",
    user: { name: "Vijai Kanth" },
  },
};

/** Avatar fallback + secondary links */
export const AvatarFallbackWithLinks: Story = {
  args: {
    title: "Ads Manager",
    user: { name: "Vijai Kanth" },
    secondaryLinks: mockLinks,
  },
};

/** Long page title — truncates with ellipsis */
export const LongTitle: Story = {
  args: {
    title: "Brand Awareness Campaign Manager Q2",
    user: mockUser,
    secondaryLinks: mockLinks,
  },
};

/** With filler content — shows header sitting above page content */
export const WithPageContent: Story = {
  args: {
    title: "Ads Manager",
    user: mockUser,
    secondaryLinks: mockLinks,
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-level1 min-h-screen">
        <Story />
        {/* Content offset by mobile header height (dynamic via ResizeObserver) */}
        <div style={{ paddingTop: "var(--layout-mobile-header-height, 89px)" }}>
          <div className="px-200 py-300 flex flex-col gap-200">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="h-[56px] rounded-100 bg-surface-level2 border border-border-color-level2"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  ],
};
