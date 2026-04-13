"use client";

import { useState } from "react";
import {
  IconSmartHome,
  IconWorld,
  IconWallet,
  IconSchool,
  IconUsers,
  IconCurrencyRupee,
  IconTarget,
  IconMapPin,
  IconDevices,
} from "@tabler/icons-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StatCard } from "@/components/ui/StatCard";
import { Nudge } from "@/components/ui/Nudge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Label } from "@/components/ui/Label";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { ToggleRow } from "@/components/ui/ToggleRow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import {
  DropdownMenu,
  DropdownMenuChevronTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/DropdownMenu";

// ── Data ──────────────────────────────────────────────────────────────────────

const LOCATIONS = ["India", "USA", "UK", "Germany", "Singapore", "Australia", "Canada", "UAE"];
const INTERESTS = ["Technology", "Fashion", "Food & Dining", "Travel", "Fitness", "Finance", "Gaming", "Education"];
const BEHAVIORS = ["Has purchased before", "Engaged with brand", "New visitor", "Repeat visitor"];
const BIDDING_STRATEGIES = ["Lowest cost", "Cost cap", "Bid cap", "Target ROAS"];
const PLACEMENTS = [
  "Instagram Feed", "Instagram Stories", "Instagram Reels",
  "Facebook Feed", "Facebook Stories", "Facebook Reels",
  "Audience Network",
];

const DATE_RANGES_BUDGET = ["Daily", "Lifetime"];

// ── Nav icons ─────────────────────────────────────────────────────────────────

const AutoDMIcon = () => <img src="/icons/nav/image 126.png" width={20} height={20} alt="" />;
const LeadMagnetIcon = () => <img src="/icons/nav/Magnet 3D Icon Model For Science (HD) 1.png" width={20} height={20} alt="" />;
const PaymentPagesIcon = () => <img src="/icons/nav/3dicons.png" width={20} height={20} alt="" />;

// ── Reach estimator ───────────────────────────────────────────────────────────

function estimateReach(
  locations: string[],
  ageMin: string,
  ageMax: string,
  interests: string[],
  behaviors: string[],
): number {
  let base = 14_000_000;
  if (locations.length > 0) base *= Math.min(1, 0.3 + locations.length * 0.15);
  const min = parseInt(ageMin) || 18;
  const max = parseInt(ageMax) || 65;
  const range = Math.max(1, max - min);
  base *= Math.min(1, range / 47);
  base *= Math.pow(0.82, interests.length);
  base *= Math.pow(0.78, behaviors.length);
  return Math.max(40_000, Math.round(base / 10_000) * 10_000);
}

function formatReach(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdSetBuilderPage() {
  // ── Accordion open state ────────────────────────────────────────────────────
  const [openSection, setOpenSection] = useState("audience");

  // ── Audience targeting ──────────────────────────────────────────────────────
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["India"]);
  const [ageMin, setAgeMin] = useState("18");
  const [ageMax, setAgeMax] = useState("45");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);

  // ── Budget & schedule ───────────────────────────────────────────────────────
  const [budgetType, setBudgetType] = useState("Daily");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noEndDate, setNoEndDate] = useState(false);
  const [biddingStrategy, setBiddingStrategy] = useState("Lowest cost");

  // ── Placements ───────────────────────────────────────────────────────────────
  const [autoPlacement, setAutoPlacement] = useState(true);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([
    "Instagram Feed", "Instagram Stories", "Facebook Feed",
  ]);

  // ── Computed reach ───────────────────────────────────────────────────────────
  const reach = estimateReach(selectedLocations, ageMin, ageMax, selectedInterests, selectedBehaviors);
  const estDailyImpressions = Math.round(reach * 0.018);
  const estDailyClicks = Math.round(estDailyImpressions * 0.014);

  // ── Nudge message ────────────────────────────────────────────────────────────
  const nudgeType: "normal" | "warning" =
    reach < 300_000 ? "warning" : "normal";
  const nudgeMessage =
    reach > 5_000_000
      ? "Your audience is very broad. Add interests or behaviors to improve relevance."
      : reach < 300_000
      ? "Your audience is very narrow. You may see limited delivery and higher CPM."
      : "Audience size looks good. Balanced audiences between 500K–3M tend to perform well.";

  // ── Toggle helpers ───────────────────────────────────────────────────────────
  function toggleLocation(loc: string) {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );
  }

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  }

  function toggleBehavior(behavior: string) {
    setSelectedBehaviors((prev) =>
      prev.includes(behavior) ? prev.filter((b) => b !== behavior) : [...prev, behavior],
    );
  }

  function togglePlacement(placement: string) {
    setSelectedPlacements((prev) =>
      prev.includes(placement) ? prev.filter((p) => p !== placement) : [...prev, placement],
    );
  }

  const canSave = selectedLocations.length > 0 && budgetAmount.trim() !== "";

  return (
    <div className="flex h-screen overflow-hidden bg-surface-level1">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <Sidebar
        className="hidden lg:flex"
        logo={<SuperProfileLogo />}
        sections={[
          {
            items: [
              { icon: IconSmartHome,     label: "Home" },
              { icon: IconWorld,         label: "Store" },
              { icon: IconWallet,        label: "Payments" },
              { icon: IconTarget,        label: "Ads Manager", active: true },
              { icon: IconSchool,        label: "Learn" },
              { icon: IconUsers,         label: "Audience" },
              { icon: IconCurrencyRupee, label: "Refer & Earn" },
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

      {/* ── Content area ────────────────────────────────────────────────── */}
      <main className="flex flex-col flex-1 overflow-hidden bg-surface-level1">

        {/* ── Non-scrolling page header ──────────────────────────────────
            aside-panel layout — page header mirrors column structure per S13 */}
        <div className="flex-none px-200 pt-400 pb-300 md:px-300 lg:px-400 border-b border-border-color-level2">
          <div className="flex gap-300 w-fit mx-auto items-center">
            {/* Heading — matches main column width */}
            <div className="w-[var(--layout-content-max-width)] min-w-0 flex flex-col gap-50">
              <h1 className="text-h2 font-semibold text-text-level1">Create Ad Set</h1>
              <p className="text-body font-normal text-text-level3">Define your audience, budget, and where your ads will appear</p>
            </div>
            {/* Actions — matches aside panel width (SP8 exception: w-[260px]) */}
            <div className="w-[260px] flex-none flex items-center justify-end gap-100">
              <Button variant="outline" size="md" shape="full-rounded">
                Cancel
              </Button>
              <Button variant="primary" size="md" shape="full-rounded" disabled={!canSave}>
                Save Ad Set
              </Button>
            </div>
          </div>
        </div>

        {/* ── Scrollable content — aside-panel layout per S12 ────────────── */}
        <div className="flex-1 overflow-y-auto px-200 pt-400 pb-300 md:px-300 lg:px-400">
          <div className="flex gap-300 w-fit mx-auto items-start">

            {/* ── Main column ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-200 w-[var(--layout-content-max-width)] min-w-0">

              {/* Ad set name */}
              <div className="flex flex-col gap-100 p-250 rounded-100 border border-border-color-level2 bg-surface-level1">
                <Input
                  label="Ad Set Name"
                  required
                  size="md"
                  shape="semi-rounded"
                  placeholder="e.g. India — Mobile — 25–34 — Tech"
                  helpText="Give this ad set a descriptive name so it's easy to identify later"
                />
              </div>

              {/* ── Accordion — 3 sections, one open at a time ─────────────── */}
              <Accordion
                type="single"
                collapsible
                value={openSection}
                onValueChange={(val) => setOpenSection(val ?? "")}
              >

                {/* ── 1. Audience Targeting ─────────────────────────────── */}
                <AccordionItem
                  value="audience"
                  label="Audience Targeting"
                  subText="Define who sees your ads"
                  leadingIcon={IconUsers}
                >
                  <div className="flex flex-col gap-300 pt-100">

                    {/* Demographics — SP5: gap-200 between SectionHeader and fields */}
                    <div className="flex flex-col gap-200">
                      <SectionHeader label="Demographics" subText="Location and age range" />

                      {/* Fields group — SP3: gap-150 between peer field groups */}
                      <div className="flex flex-col gap-150">

                        {/* Location */}
                        <div className="flex flex-col gap-50">
                          <Label label="Locations" variant="supporting-medium" />
                          <DropdownMenu>
                            <DropdownMenuChevronTrigger variant="form" icon={IconMapPin}>
                              {selectedLocations.length === 0
                                ? "Select locations"
                                : selectedLocations.length === 1
                                ? selectedLocations[0]
                                : `${selectedLocations.length} locations selected`}
                            </DropdownMenuChevronTrigger>
                            <DropdownMenuContent width={300}>
                              {LOCATIONS.map((loc) => (
                                <DropdownMenuCheckboxItem
                                  key={loc}
                                  checked={selectedLocations.includes(loc)}
                                  onCheckedChange={() => toggleLocation(loc)}
                                >
                                  {loc}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Age range — compact related pair, grouped horizontally */}
                        <div className="grid grid-cols-2 gap-100">
                          <Input
                            label="Minimum Age"
                            labelVariant="supporting-medium"
                            size="md"
                            shape="semi-rounded"
                            placeholder="18"
                            value={ageMin}
                            onChange={(e) => setAgeMin(e.target.value)}
                            helpText="Minimum: 18"
                          />
                          <Input
                            label="Maximum Age"
                            labelVariant="supporting-medium"
                            size="md"
                            shape="semi-rounded"
                            placeholder="65"
                            value={ageMax}
                            onChange={(e) => setAgeMax(e.target.value)}
                            helpText="Maximum: 65"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Interests & Behaviors — SP5: gap-200 between SectionHeader and fields */}
                    <div className="flex flex-col gap-200">
                      <SectionHeader
                        label="Interests & Behaviors"
                        subText="Target people based on what they care about and how they act"
                      />

                      <div className="grid grid-cols-2 gap-100">
                        {/* Interests */}
                        <div className="flex flex-col gap-50">
                          <Label label="Interests" variant="supporting-medium" />
                          <DropdownMenu>
                            <DropdownMenuChevronTrigger variant="form">
                              {selectedInterests.length === 0
                                ? "Select interests"
                                : selectedInterests.length === 1
                                ? selectedInterests[0]
                                : `${selectedInterests.length} selected`}
                            </DropdownMenuChevronTrigger>
                            <DropdownMenuContent width={260}>
                              {INTERESTS.map((interest) => (
                                <DropdownMenuCheckboxItem
                                  key={interest}
                                  checked={selectedInterests.includes(interest)}
                                  onCheckedChange={() => toggleInterest(interest)}
                                >
                                  {interest}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Behaviors */}
                        <div className="flex flex-col gap-50">
                          <Label label="Behaviors" variant="supporting-medium" />
                          <DropdownMenu>
                            <DropdownMenuChevronTrigger variant="form">
                              {selectedBehaviors.length === 0
                                ? "Select behaviors"
                                : selectedBehaviors.length === 1
                                ? selectedBehaviors[0]
                                : `${selectedBehaviors.length} selected`}
                            </DropdownMenuChevronTrigger>
                            <DropdownMenuContent width={260}>
                              {BEHAVIORS.map((behavior) => (
                                <DropdownMenuCheckboxItem
                                  key={behavior}
                                  checked={selectedBehaviors.includes(behavior)}
                                  onCheckedChange={() => toggleBehavior(behavior)}
                                >
                                  {behavior}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* ── 2. Budget & Schedule ─────────────────────────────── */}
                <AccordionItem
                  value="budget"
                  label="Budget & Schedule"
                  subText="Set your spend and run dates"
                  leadingIcon={IconWallet}
                >
                  <div className="flex flex-col gap-300 pt-100">

                    {/* Budget — SP5: gap-200 between SectionHeader and fields */}
                    <div className="flex flex-col gap-200">
                      <SectionHeader label="Budget" subText="How much you want to spend" />

                      {/* SP3: gap-150 between peer field groups within Budget */}
                      <div className="flex flex-col gap-150">

                        {/* Budget type + amount — compound field, grouped horizontally */}
                        <div className="grid grid-cols-2 gap-100">
                          <div className="flex flex-col gap-50">
                            <Label label="Budget type" variant="supporting-medium" />
                            <DropdownMenu>
                              <DropdownMenuChevronTrigger variant="form">
                                {budgetType}
                              </DropdownMenuChevronTrigger>
                              <DropdownMenuContent width={200}>
                                <DropdownMenuRadioGroup value={budgetType} onValueChange={setBudgetType}>
                                  {DATE_RANGES_BUDGET.map((b) => (
                                    <DropdownMenuRadioItem key={b} value={b}>{b}</DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <Input
                            label={`${budgetType} budget (₹)`}
                            labelVariant="supporting-medium"
                            required
                            size="md"
                            shape="semi-rounded"
                            placeholder={budgetType === "Daily" ? "e.g. 1000" : "e.g. 30000"}
                            value={budgetAmount}
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            helpText={
                              budgetType === "Daily"
                                ? "Minimum daily budget: ₹100"
                                : "Minimum lifetime budget: ₹1,000"
                            }
                          />
                        </div>

                        {/* Bidding strategy — peer field within Budget group */}
                        <div className="flex flex-col gap-50">
                          <Label
                            label="Bidding strategy"
                            variant="supporting-medium"
                            tooltip
                            tooltipContent="How you want to bid for your results"
                          />
                          <DropdownMenu>
                            <DropdownMenuChevronTrigger variant="form">
                              {biddingStrategy}
                            </DropdownMenuChevronTrigger>
                            <DropdownMenuContent width={300}>
                              <DropdownMenuRadioGroup value={biddingStrategy} onValueChange={setBiddingStrategy}>
                                {BIDDING_STRATEGIES.map((s) => (
                                  <DropdownMenuRadioItem key={s} value={s}>{s}</DropdownMenuRadioItem>
                                ))}
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Schedule — SP5: gap-200 between SectionHeader and fields */}
                    <div className="flex flex-col gap-200">
                      <SectionHeader label="Schedule" subText="When your ads will run" />

                      {/* SP3: gap-200 between date grid and toggle — toggle is a peer component */}
                      <div className="flex flex-col gap-200">

                        {/* Start + End date — compact related pair, grouped horizontally */}
                        <div className="grid grid-cols-2 gap-100">
                          <Input
                            label="Start date"
                            labelVariant="supporting-medium"
                            size="md"
                            shape="semi-rounded"
                            placeholder="DD/MM/YYYY"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <Input
                            label="End date"
                            labelVariant="supporting-medium"
                            size="md"
                            shape="semi-rounded"
                            placeholder="DD/MM/YYYY"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={noEndDate}
                          />
                        </div>

                        <ToggleRow
                          label="No end date"
                          subText="Your ad set will run continuously until paused"
                          checked={noEndDate}
                          onChange={setNoEndDate}
                          padding="none"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* ── 3. Placements ────────────────────────────────────── */}
                <AccordionItem
                  value="placements"
                  label="Placements"
                  subText="Choose where your ads will appear"
                  leadingIcon={IconDevices}
                >
                  <div className="flex flex-col gap-300 pt-100">

                    <ToggleRow
                      label="Use automatic placements"
                      subText="Maximise reach by letting us choose the best placements for your budget"
                      checked={autoPlacement}
                      onChange={setAutoPlacement}
                      padding="none"
                    />

                    {/* Manual placements — shown only when auto is off */}
                    {!autoPlacement && (
                      <div className="flex flex-col gap-200">
                        <SectionHeader
                          label="Manual placements"
                          subText="Select where you want your ads to appear"
                          icon={IconDevices}
                        />
                        <div className="flex flex-col rounded-100 border border-border-color-level2 overflow-hidden">
                          {PLACEMENTS.map((placement) => (
                            <CheckboxRow
                              key={placement}
                              label={placement}
                              checked={selectedPlacements.includes(placement)}
                              onChange={() => togglePlacement(placement)}
                              position="end"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionItem>
              </Accordion>

              {/* ── Form actions (bottom) ──────────────────────────────── */}
              <div className="flex items-center justify-end gap-100 pb-400">
                <Button variant="outline" size="md" shape="full-rounded">
                  Cancel
                </Button>
                <Button variant="primary" size="md" shape="full-rounded" disabled={!canSave}>
                  Save Ad Set
                </Button>
              </div>
            </div>

            {/* ── Aside panel — Reach estimator (xl+ only) ─────────────── */}
            {/* SP8 exception: w-[260px] — matches audience-builder aside width */}
            <div className="hidden xl:block w-[260px] flex-none sticky top-0">
              <div className="flex flex-col gap-200">

                {/* Estimated Reach */}
                <StatCard
                  heading="Estimated Reach"
                  value={formatReach(reach)}
                  delta="people per day"
                  trend="neutral"
                  showDelta={true}
                />

                {/* Est. Daily Results */}
                <StatCard
                  heading="Est. Daily Impressions"
                  value={formatReach(estDailyImpressions)}
                  delta={`~${estDailyClicks.toLocaleString()} clicks`}
                  trend="neutral"
                  showDelta={true}
                />

                {/* Contextual tip */}
                <Nudge
                  type={nudgeType}
                  size="md"
                  message={nudgeMessage}
                  dismissible={false}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
