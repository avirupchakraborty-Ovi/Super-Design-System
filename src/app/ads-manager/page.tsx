"use client";

import { useState } from "react";
import {
  IconSmartHome,
  IconWorld,
  IconWallet,
  IconSchool,
  IconUsers,
  IconCurrencyRupee,
  IconPlus,
  IconEye,
  IconEdit,
  IconPlayerPause,
  IconTrash,
  IconTarget,
  IconCalendar,
  IconChartBar,
} from "@tabler/icons-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { TableActionGroup } from "@/components/ui/TableActionGroup";
import { Thumbnail } from "@/components/ui/Thumbnail";
import {
  DropdownMenu,
  DropdownMenuCompactTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/DropdownMenu";

// ── Types ─────────────────────────────────────────────────────────────────────

type AdStatus = "Active" | "Paused" | "Completed";

interface AdRow {
  id: number;
  name: string;
  campaign: string;
  status: AdStatus;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  thumbnail: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const ALL_ADS: AdRow[] = [
  {
    id: 1,
    name: "Summer Sale — Stories",
    campaign: "Brand Awareness Q2",
    status: "Active",
    impressions: 1240000,
    clicks: 18600,
    ctr: 1.5,
    conversions: 342,
    spend: 4200,
    thumbnail: "https://picsum.photos/seed/ad1/80/80",
  },
  {
    id: 2,
    name: "New Product Launch — Feed",
    campaign: "Product Launch May",
    status: "Active",
    impressions: 875000,
    clicks: 13125,
    ctr: 1.5,
    conversions: 218,
    spend: 3100,
    thumbnail: "https://picsum.photos/seed/ad2/80/80",
  },
  {
    id: 3,
    name: "Retargeting — Abandoned Cart",
    campaign: "Retargeting Q2",
    status: "Active",
    impressions: 320000,
    clicks: 9600,
    ctr: 3.0,
    conversions: 512,
    spend: 2800,
    thumbnail: "https://picsum.photos/seed/ad3/80/80",
  },
  {
    id: 4,
    name: "Influencer Collab — Reels",
    campaign: "Influencer May",
    status: "Paused",
    impressions: 540000,
    clicks: 5400,
    ctr: 1.0,
    conversions: 87,
    spend: 1500,
    thumbnail: "https://picsum.photos/seed/ad4/80/80",
  },
  {
    id: 5,
    name: "Flash Sale 48h — Stories",
    campaign: "Flash Sale April",
    status: "Completed",
    impressions: 2100000,
    clicks: 42000,
    ctr: 2.0,
    conversions: 1248,
    spend: 8900,
    thumbnail: "https://picsum.photos/seed/ad5/80/80",
  },
  {
    id: 6,
    name: "Loyalty Program — Feed",
    campaign: "Loyalty Q1",
    status: "Completed",
    impressions: 680000,
    clicks: 8160,
    ctr: 1.2,
    conversions: 204,
    spend: 2200,
    thumbnail: "https://picsum.photos/seed/ad6/80/80",
  },
  {
    id: 7,
    name: "App Install — Reel",
    campaign: "App Downloads Q2",
    status: "Active",
    impressions: 430000,
    clicks: 10750,
    ctr: 2.5,
    conversions: 390,
    spend: 3400,
    thumbnail: "https://picsum.photos/seed/ad7/80/80",
  },
  {
    id: 8,
    name: "Brand Story — Carousel",
    campaign: "Brand Awareness Q2",
    status: "Paused",
    impressions: 190000,
    clicks: 2850,
    ctr: 1.5,
    conversions: 41,
    spend: 900,
    thumbnail: "https://picsum.photos/seed/ad8/80/80",
  },
  {
    id: 9,
    name: "Festive Offer — Stories",
    campaign: "Festive Season Q3",
    status: "Active",
    impressions: 980000,
    clicks: 14700,
    ctr: 1.5,
    conversions: 289,
    spend: 3600,
    thumbnail: "https://picsum.photos/seed/ad9/80/80",
  },
  {
    id: 10,
    name: "Creator Partnership — Feed",
    campaign: "Influencer May",
    status: "Active",
    impressions: 620000,
    clicks: 11160,
    ctr: 1.8,
    conversions: 174,
    spend: 2700,
    thumbnail: "https://picsum.photos/seed/ad10/80/80",
  },
  {
    id: 11,
    name: "Webinar Promo — Carousel",
    campaign: "Learn Q2",
    status: "Paused",
    impressions: 410000,
    clicks: 4100,
    ctr: 1.0,
    conversions: 63,
    spend: 1200,
    thumbnail: "https://picsum.photos/seed/ad11/80/80",
  },
  {
    id: 12,
    name: "Year-End Clearance — Reels",
    campaign: "Flash Sale April",
    status: "Completed",
    impressions: 1750000,
    clicks: 35000,
    ctr: 2.0,
    conversions: 980,
    spend: 7400,
    thumbnail: "https://picsum.photos/seed/ad12/80/80",
  },
  {
    id: 13,
    name: "Referral Drive — Stories",
    campaign: "Loyalty Q1",
    status: "Completed",
    impressions: 530000,
    clicks: 7420,
    ctr: 1.4,
    conversions: 156,
    spend: 1900,
    thumbnail: "https://picsum.photos/seed/ad13/80/80",
  },
  {
    id: 14,
    name: "Push Notification — Feed",
    campaign: "App Downloads Q2",
    status: "Active",
    impressions: 390000,
    clicks: 9360,
    ctr: 2.4,
    conversions: 311,
    spend: 2900,
    thumbnail: "https://picsum.photos/seed/ad14/80/80",
  },
  {
    id: 15,
    name: "Category Launch — Carousel",
    campaign: "Product Launch May",
    status: "Active",
    impressions: 710000,
    clicks: 10650,
    ctr: 1.5,
    conversions: 198,
    spend: 3300,
    thumbnail: "https://picsum.photos/seed/ad15/80/80",
  },
  {
    id: 16,
    name: "Checkout Abandonment — Feed",
    campaign: "Retargeting Q2",
    status: "Paused",
    impressions: 270000,
    clicks: 8100,
    ctr: 3.0,
    conversions: 437,
    spend: 2400,
    thumbnail: "https://picsum.photos/seed/ad16/80/80",
  },
];

const CAMPAIGNS = ["All Campaigns", "Brand Awareness Q2", "Product Launch May", "Retargeting Q2", "Influencer May", "Flash Sale April", "Loyalty Q1", "App Downloads Q2"];
const DATE_RANGES = ["Last 7 days", "Last 14 days", "Last 30 days", "Last 90 days", "Custom range"];
const PERFORMANCE_THRESHOLDS = ["All performance", "CTR > 2%", "CTR > 3%", "Spend > ₹5,000", "Conversions > 300"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatCurrency(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

const STATUS_BADGE_COLOUR: Record<AdStatus, "success" | "warning" | "neutral"> = {
  Active: "success",
  Paused: "warning",
  Completed: "neutral",
};

// ── Nav icons ─────────────────────────────────────────────────────────────────

const AutoDMIcon = () => <img src="/icons/nav/image 126.png" width={20} height={20} alt="" />;
const LeadMagnetIcon = () => <img src="/icons/nav/Magnet 3D Icon Model For Science (HD) 1.png" width={20} height={20} alt="" />;
const PaymentPagesIcon = () => <img src="/icons/nav/3dicons.png" width={20} height={20} alt="" />;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdsManagerPage() {
  const [statusTab, setStatusTab] = useState<"all" | "active" | "paused" | "completed">("all");
  const [campaign, setCampaign] = useState("All Campaigns");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [performance, setPerformance] = useState("All performance");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Filter data
  const filtered = ALL_ADS.filter((ad) => {
    const statusMatch =
      statusTab === "all" ||
      ad.status.toLowerCase() === statusTab;
    const campaignMatch =
      campaign === "All Campaigns" || ad.campaign === campaign;
    const searchMatch =
      !searchValue ||
      ad.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      ad.campaign.toLowerCase().includes(searchValue.toLowerCase());
    return statusMatch && campaignMatch && searchMatch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 whenever filters change
  function handleStatusTab(val: string) {
    setStatusTab(val as typeof statusTab);
    setCurrentPage(1);
  }

  const columns: DataTableColumn<AdRow>[] = [
    {
      key: "name",
      label: "Ad Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-200">
          <Thumbnail src={row.thumbnail} alt={row.name} size="sm" type="square" />
          <div className="flex flex-col gap-[2px]">
            <span className="text-body font-semibold text-text-level1">{row.name}</span>
            <span className="text-supporting text-text-level3">{row.campaign}</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: 115,
      render: (row) => (
        <Badge
          colour={STATUS_BADGE_COLOUR[row.status]}
          fill="light"
          type="full-rounded"
          shadow={false}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "impressions",
      label: "Impressions",
      sortable: true,
      render: (row) => (
        <span className="text-body text-text-level1">{formatNumber(row.impressions)}</span>
      ),
    },
    {
      key: "clicks",
      label: "Clicks",
      sortable: true,
      render: (row) => (
        <span className="text-body text-text-level1">{formatNumber(row.clicks)}</span>
      ),
    },
    {
      key: "ctr",
      label: "CTR",
      sortable: true,
      render: (row) => (
        <span className="text-body text-text-level1">{row.ctr.toFixed(1)}%</span>
      ),
    },
    {
      key: "conversions",
      label: "Conversions",
      sortable: true,
      render: (row) => (
        <span className="text-body text-text-level1">{row.conversions.toLocaleString()}</span>
      ),
    },
    {
      key: "spend",
      label: "Spend",
      sortable: true,
      render: (row) => (
        <span className="text-body font-medium text-text-level1">{formatCurrency(row.spend)}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <TableActionGroup
          actions={[
            { icon: IconEye, label: "View", onClick: () => {} },
            { icon: IconEdit, label: "Edit", onClick: () => {} },
            {
              icon: row.status === "Active" ? IconPlayerPause : IconTarget,
              label: row.status === "Active" ? "Pause" : "Activate",
              onClick: () => {},
            },
            { icon: IconTrash, label: "Delete", onClick: () => {} },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface-level1">

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <Sidebar
        className="hidden lg:flex"
        logo={<SuperProfileLogo />}
        sections={[
          {
            items: [
              { icon: IconSmartHome,      label: "Home" },
              { icon: IconWorld,          label: "Store" },
              { icon: IconWallet,         label: "Payments" },
              { icon: IconTarget,         label: "Ads Manager", active: true },
              { icon: IconSchool,         label: "Learn" },
              { icon: IconUsers,          label: "Audience" },
              { icon: IconCurrencyRupee,  label: "Refer & Earn" },
            ],
          },
          {
            label: "YOUR APPS",
            items: [
              { icon: AutoDMIcon,       label: "AutoDM" },
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

      {/* ── Content area ──────────────────────────────────────────────────── */}
      <main className="flex flex-col flex-1 overflow-hidden bg-surface-level1">

        {/* ── Non-scrolling top section (page-header + filter-bar) ──────── */}
        {/* pb-400 creates the 32px gap between filter-bar and the DataTable toolbar below */}
        <div className="flex-none flex flex-col gap-400 px-200 pt-200 pb-400 md:px-300 md:pt-300 lg:px-400 lg:pt-400">

          {/* ── [page-header] ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-200 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h2 font-bold text-text-level1">Ads Manager</h1>
              <p className="text-body text-text-level3">Track and manage your ad performance</p>
            </div>
            <div className="flex items-center gap-200">
              <Button variant="primary" size="md" shape="full-rounded" leadingIcon={IconPlus} className="flex-1 md:flex-none">
                Create Campaign
              </Button>
            </div>
          </div>

          {/* ── [filter-bar] ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-200 md:flex-row md:items-center md:justify-between">
            {/* Status tabs */}
            <Tabs value={statusTab} onValueChange={handleStatusTab} variant="pill">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filter dropdowns */}
            <div className="flex items-center gap-200 flex-wrap">
              {/* Campaign */}
              <DropdownMenu>
                <DropdownMenuCompactTrigger>
                  {campaign}
                </DropdownMenuCompactTrigger>
                <DropdownMenuContent width={220}>
                  <DropdownMenuRadioGroup value={campaign} onValueChange={setCampaign}>
                    {CAMPAIGNS.map((c) => (
                      <DropdownMenuRadioItem key={c} value={c}>{c}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Date range */}
              <DropdownMenu>
                <DropdownMenuCompactTrigger icon={IconCalendar}>
                  {dateRange}
                </DropdownMenuCompactTrigger>
                <DropdownMenuContent width={200}>
                  <DropdownMenuRadioGroup value={dateRange} onValueChange={setDateRange}>
                    {DATE_RANGES.map((d) => (
                      <DropdownMenuRadioItem key={d} value={d}>{d}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Performance */}
              <DropdownMenu>
                <DropdownMenuCompactTrigger icon={IconChartBar}>
                  {performance}
                </DropdownMenuCompactTrigger>
                <DropdownMenuContent width={220}>
                  <DropdownMenuRadioGroup value={performance} onValueChange={setPerformance}>
                    {PERFORMANCE_THRESHOLDS.map((p) => (
                      <DropdownMenuRadioItem key={p} value={p}>{p}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* ── Content — fills remaining height ──────────────────────────── */}
        <div className="flex-1 min-h-0 flex flex-col px-200 md:px-300 lg:px-400 overflow-hidden">

          {/* ── [content] — fillHeight DataTable or empty state ─────────── */}
          {pageData.length > 0 ? (
            // Pagination is passed into DataTable so it scrolls inside the table area
            <DataTable<AdRow>
              type="line"
              columns={columns}
              data={pageData}
              searchValue={searchValue}
              onSearch={(v) => { setSearchValue(v); setCurrentPage(1); }}
              onFilter={() => {}}
              onSort={() => {}}
              onExport={() => {}}
              firstColumnExtraPx={16}
              fillHeight
              className="flex-1 min-h-0"
              pagination={totalPages > 1 ? {
                currentPage,
                totalPages,
                pageSize,
                onPageChange: setCurrentPage,
                onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
              } : undefined}
            />
          ) : (
            /* ── Empty state (inline — EmptyState component not yet built) ── */
            <div className="flex-1 flex flex-col items-center justify-center gap-200 bg-surface-level1 rounded-150 border border-border-color-level2">
              <div className="flex items-center justify-center w-[56px] h-[56px] rounded-100 bg-surface-brand-primary-subtle">
                <IconTarget size={28} strokeWidth={1.5} className="text-text-brand-primary" />
              </div>
              <div className="flex flex-col items-center gap-[4px] text-center">
                <p className="text-body font-semibold text-text-level1">No ads found</p>
                <p className="text-body text-text-level3 max-w-[320px]">
                  {searchValue
                    ? `No results for "${searchValue}". Try adjusting your search or filters.`
                    : "No ads match the selected filters. Try changing the status or campaign filter."}
                </p>
              </div>
              <Button variant="primary" size="md" shape="full-rounded" leadingIcon={IconPlus}>
                Create Campaign
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
