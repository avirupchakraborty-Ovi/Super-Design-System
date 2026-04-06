"use client";

import {
  IconSmartHome,
  IconWorld,
  IconWallet,
  IconSchool,
  IconUsers,
  IconCurrencyRupee,
  IconPlus,
} from "@tabler/icons-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";
import { Button } from "@/components/ui/Button";
import { Nudge } from "@/components/ui/Nudge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";

// ── Static data (from Figma) ───────────────────────────────────────────────────

const POST_CARDS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/autodm1/400/400",
    caption: "Caption Caption Caption Caption Caption Caption Caption Caption",
    date: "August 27th",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/autodm2/400/400",
    caption: "Caption Caption Caption",
    date: "August 27th",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/autodm3/400/400",
    caption: "Caption Caption Caption",
    date: "August 27th",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/autodm4/400/400",
    caption: "Caption Caption Caption",
    date: "August 27th",
  },
];

// ── App nav icons (raster, matching Storybook) ────────────────────────────────

const AutoDMIcon = () => <img src="/icons/nav/image 126.png" width={20} height={20} alt="" />;
const LeadMagnetIcon = () => <img src="/icons/nav/Magnet 3D Icon Model For Science (HD) 1.png" width={20} height={20} alt="" />;
const PaymentPagesIcon = () => <img src="/icons/nav/3dicons.png" width={20} height={20} alt="" />;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AutoDMPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-level1">

      {/* ── Sidebar — hidden below lg (1200px) ───────────────────────────── */}
      <Sidebar
        className="hidden lg:flex"
        logo={<SuperProfileLogo />}
        sections={[
          {
            items: [
              { icon: IconSmartHome,     label: "Home" },
              { icon: IconWorld,         label: "Store" },
              { icon: IconWallet,        label: "Payments" },
              { icon: IconSchool,        label: "Learn" },
              { icon: IconUsers,         label: "Audience" },
              { icon: IconCurrencyRupee, label: "Refer & Earn" },
            ],
          },
          {
            label: "YOUR APPS",
            items: [
              { icon: AutoDMIcon,       label: "AutoDM",        active: true },
              { icon: LeadMagnetIcon,   label: "Lead Magnet" },
              { icon: PaymentPagesIcon, label: "Payment Pages" },
            ],
            footerButton: { label: "Explore All Apps" },
          },
        ]}
        upgradeCard={{
          title: "You're on Free Plan",
          description: "Unlock unlimited access to all features and get paid.",
          ctaLabel: "Explore Now",
        }}
        user={{
          name: "Vijai Kanth",
          avatar: "https://picsum.photos/seed/user/24/24",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex flex-col flex-1 overflow-y-auto bg-surface-level1">

        {/* ── Section 1: Title + Nudge + Pills ─────────────────────────── */}
        <div className="flex flex-col gap-200 px-200 pt-200 sm:px-300 sm:pt-300 lg:px-500 lg:pt-500">

          {/* Top bar — stacked on mobile, inline on sm+ */}
          <div className="flex flex-col gap-200 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-h2 font-bold text-text-level1">AutoDMs</h1>
            <Button
              shape="full-rounded"
              variant="primary"
              size="md"
              leadingIcon={IconPlus}
              className="w-full sm:w-auto"
            >
              Create automations
            </Button>
          </div>

          {/* Nudge — warning banner */}
          <Nudge
            type="warning"
            heading="Instagram is experiencing a high failure rate for account connections"
            message="This is due to technical issues on Meta's servers. Don't worry, we have notified Meta about this, and you will be able to connect your Instagram very soon."
            actionLabel="Notify me when it works"
            actionVariant="link"
            dismissible
          />

          {/* Automations / Settings pills */}
          <Tabs defaultValue="automations" variant="pill">
            <TabsList>
              <TabsTrigger value="automations">Automations</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* ── Section 2: Content card ───────────────────────────────────── */}
        <div className="px-200 pt-300 pb-200 sm:px-300 sm:pb-300 lg:px-500 lg:pb-500">
          <div
            className="bg-surface-level1 border border-border-color-level2 rounded-150 px-200 pt-200 pb-150 sm:px-300 sm:pt-300 sm:pb-200"
            style={{ boxShadow: "var(--shadow-card)" }}
          >

            {/* Subheading */}
            <h2 className="text-h4 font-bold text-text-level1 mb-200">
              Jump right in and automate your Instagram
            </h2>

            {/* Post type filter tabs */}
            <Tabs defaultValue="posts" variant="line">
              <TabsList>
                <TabsTrigger value="posts">Post/Reels</TabsTrigger>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="iglive">IG Live</TabsTrigger>
                <TabsTrigger value="dms">DMs</TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                {/* ── Post cards — 1 col mobile, 2 col tablet, 4 col desktop ── */}
                <div className="grid grid-cols-1 gap-200 sm:grid-cols-2 lg:grid-cols-4">
                  {POST_CARDS.map((post) => (
                    <Card
                      key={post.id}
                      compact
                      showTitle={false}
                      imageType="padded"
                      image={post.image}
                      imageAlt={post.caption}
                      showFooter={false}
                      className="w-full"
                    >
                      <div className="flex flex-col gap-100">
                        <div className="flex flex-col gap-[4px]">
                          <p className="text-body font-semibold text-text-level1 line-clamp-1">
                            {post.caption}
                          </p>
                          <p className="text-supporting font-normal text-text-level3">
                            Posted on: {post.date}
                          </p>
                        </div>
                        <Button
                          shape="full-rounded"
                          variant="tertiary"
                          size="md"
                          className="w-full"
                        >
                          Setup automation
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* View more */}
                <div className="mt-300 flex justify-center">
                  <Button variant="link" size="sm" leadingIcon={IconPlus} className="text-text-brand-primary">
                    View more
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="story">
                <p className="text-body text-text-level3">No stories yet.</p>
              </TabsContent>

              <TabsContent value="iglive">
                <p className="text-body text-text-level3">No IG Live automations yet.</p>
              </TabsContent>

              <TabsContent value="dms">
                <p className="text-body text-text-level3">No DM automations yet.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
