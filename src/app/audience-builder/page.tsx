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
  IconPlus,
  IconTrash,
  IconX,
  IconUsersGroup,
  IconUserMinus,
  IconInfoCircle,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { SuperProfileLogo } from "@/components/ui/SuperProfileLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OperatorChip } from "@/components/ui/OperatorChip";
import {
  DropdownMenu,
  DropdownMenuCompactTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/DropdownMenu";

// ── Types ─────────────────────────────────────────────────────────────────────

type GroupOperator = "AND" | "OR";

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface RuleGroup {
  id: string;
  conditionOperator: GroupOperator;
  conditions: Condition[];
}

interface AudienceSection {
  groupOperator: GroupOperator;
  groups: RuleGroup[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FIELDS = [
  "Location",
  "Age",
  "Gender",
  "Interest",
  "Device",
  "Platform",
  "Engagement",
  "Purchase history",
];

const OPERATORS: Record<string, string[]> = {
  Location: ["is", "is not"],
  Age: ["is", "greater than", "less than", "between"],
  Gender: ["is", "is not"],
  Interest: ["includes", "excludes"],
  Device: ["is", "is not"],
  Platform: ["is", "is not"],
  Engagement: ["greater than", "less than"],
  "Purchase history": ["has purchased", "has not purchased"],
};

const VALUES: Record<string, string[]> = {
  Location: ["India", "USA", "UK", "Germany", "Singapore", "Australia"],
  Age: ["18–24", "25–34", "35–44", "45–54", "55+"],
  Gender: ["Male", "Female", "Non-binary"],
  Interest: ["Technology", "Fashion", "Food & Dining", "Travel", "Fitness", "Finance"],
  Device: ["Mobile", "Desktop", "Tablet"],
  Platform: ["Instagram", "Facebook", "YouTube", "Twitter"],
  Engagement: ["1 time", "2+ times", "5+ times", "10+ times"],
  "Purchase history": ["Any product", "Electronics", "Clothing", "Subscription"],
};

const DEFAULT_OPERATOR: Record<string, string> = {
  Location: "is",
  Age: "is",
  Gender: "is",
  Interest: "includes",
  Device: "is",
  Platform: "is",
  Engagement: "greater than",
  "Purchase history": "has purchased",
};

const DEFAULT_VALUE: Record<string, string> = {
  Location: "India",
  Age: "25–34",
  Gender: "Male",
  Interest: "Technology",
  Device: "Mobile",
  Platform: "Instagram",
  Engagement: "2+ times",
  "Purchase history": "Any product",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

function makeCondition(field = "Location"): Condition {
  return {
    id: uid(),
    field,
    operator: DEFAULT_OPERATOR[field] ?? "is",
    value: DEFAULT_VALUE[field] ?? "",
  };
}

function makeGroup(): RuleGroup {
  return {
    id: uid(),
    conditionOperator: "AND",
    conditions: [makeCondition()],
  };
}

// ── Nav icons ─────────────────────────────────────────────────────────────────

const AutoDMIcon = () => (
  <img src="/icons/nav/image 126.png" width={20} height={20} alt="" />
);
const LeadMagnetIcon = () => (
  <img
    src="/icons/nav/Magnet 3D Icon Model For Science (HD) 1.png"
    width={20}
    height={20}
    alt=""
  />
);
const PaymentPagesIcon = () => (
  <img src="/icons/nav/3dicons.png" width={20} height={20} alt="" />
);

// ── Condition row ─────────────────────────────────────────────────────────────

interface ConditionRowProps {
  condition: Condition;
  onUpdate: (updates: Partial<Condition>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function ConditionRow({
  condition,
  onUpdate,
  onRemove,
  canRemove,
}: ConditionRowProps) {
  const operators = OPERATORS[condition.field] ?? ["is"];
  const values = VALUES[condition.field] ?? [];

  return (
    <div className="flex items-center gap-100 flex-wrap">
      <DropdownMenu>
        <DropdownMenuCompactTrigger>{condition.field}</DropdownMenuCompactTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuRadioGroup
            value={condition.field}
            onValueChange={(f) =>
              onUpdate({
                field: f,
                operator: DEFAULT_OPERATOR[f] ?? "is",
                value: DEFAULT_VALUE[f] ?? "",
              })
            }
          >
            {FIELDS.map((f) => (
              <DropdownMenuRadioItem key={f} value={f}>
                {f}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuCompactTrigger>{condition.operator}</DropdownMenuCompactTrigger>
        <DropdownMenuContent width={180}>
          <DropdownMenuRadioGroup
            value={condition.operator}
            onValueChange={(op) => onUpdate({ operator: op })}
          >
            {operators.map((op) => (
              <DropdownMenuRadioItem key={op} value={op}>
                {op}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuCompactTrigger>{condition.value}</DropdownMenuCompactTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuRadioGroup
            value={condition.value}
            onValueChange={(v) => onUpdate({ value: v })}
          >
            {values.map((v) => (
              <DropdownMenuRadioItem key={v} value={v}>
                {v}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {canRemove && (
        <IconButton
          icon={IconX}
          variant="ghost"
          size="xs"
          onClick={onRemove}
          aria-label="Remove condition"
        />
      )}
    </div>
  );
}

// ── Rule group card ───────────────────────────────────────────────────────────

interface RuleGroupCardProps {
  group: RuleGroup;
  groupIndex: number;
  sectionGroupOperator: GroupOperator;
  onSectionGroupOperatorChange: (v: GroupOperator) => void;
  onConditionOperatorChange: (v: GroupOperator) => void;
  onConditionUpdate: (conditionId: string, updates: Partial<Condition>) => void;
  onConditionRemove: (conditionId: string) => void;
  onConditionAdd: () => void;
  onGroupRemove: () => void;
  canRemoveGroup: boolean;
}

function RuleGroupCard({
  group,
  groupIndex,
  sectionGroupOperator,
  onSectionGroupOperatorChange,
  onConditionOperatorChange,
  onConditionUpdate,
  onConditionRemove,
  onConditionAdd,
  onGroupRemove,
  canRemoveGroup,
}: RuleGroupCardProps) {
  return (
    <div className="flex flex-col gap-150">
      {/* Between-group connector */}
      {groupIndex > 0 && (
        <div className="flex items-center gap-150">
          <div className="flex-1 h-px bg-border-color-level2" />
          <OperatorChip
            value={sectionGroupOperator}
            onChange={(v) => onSectionGroupOperatorChange(v as GroupOperator)}
          />
          <div className="flex-1 h-px bg-border-color-level2" />
        </div>
      )}

      {/* Group box */}
      <div className="flex flex-col gap-150 p-200 rounded-100 border border-border-color-level2 bg-surface-level1">
        {/* Group header */}
        <div className="flex items-center justify-between">
          <span className="text-supporting font-semibold text-text-level3">
            Group {groupIndex + 1}
          </span>
          {canRemoveGroup && (
            <IconButton
              icon={IconTrash}
              variant="ghost"
              size="xs"
              onClick={onGroupRemove}
              aria-label="Remove group"
            />
          )}
        </div>

        {/* Conditions */}
        <div className="flex flex-col gap-100">
          {group.conditions.map((condition, condIdx) => (
            <div key={condition.id} className="flex flex-col gap-100">
              {condIdx > 0 && (
                <div className="pl-25">
                  <OperatorChip
                    value={group.conditionOperator}
                    onChange={(v) => onConditionOperatorChange(v as GroupOperator)}
                  />
                </div>
              )}
              <ConditionRow
                condition={condition}
                onUpdate={(updates) => onConditionUpdate(condition.id, updates)}
                onRemove={() => onConditionRemove(condition.id)}
                canRemove={group.conditions.length > 1}
              />
            </div>
          ))}
        </div>

        {/* Add condition */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            shape="full-rounded"
            leadingIcon={IconPlus}
            onClick={onConditionAdd}
          >
            Add condition
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Rule section ──────────────────────────────────────────────────────────────

interface RuleSectionProps {
  title: string;
  description: string;
  icon: typeof IconUsersGroup;
  section: AudienceSection;
  onSectionChange: (section: AudienceSection) => void;
}

function RuleSection({
  title,
  description,
  icon: SectionIcon,
  section,
  onSectionChange,
}: RuleSectionProps) {
  function updateGroup(groupId: string, updates: Partial<RuleGroup>) {
    onSectionChange({
      ...section,
      groups: section.groups.map((g) =>
        g.id === groupId ? { ...g, ...updates } : g
      ),
    });
  }

  function addGroup() {
    onSectionChange({
      ...section,
      groups: [...section.groups, makeGroup()],
    });
  }

  function removeGroup(groupId: string) {
    onSectionChange({
      ...section,
      groups: section.groups.filter((g) => g.id !== groupId),
    });
  }

  function addCondition(groupId: string) {
    onSectionChange({
      ...section,
      groups: section.groups.map((g) =>
        g.id === groupId
          ? { ...g, conditions: [...g.conditions, makeCondition()] }
          : g
      ),
    });
  }

  function removeCondition(groupId: string, conditionId: string) {
    onSectionChange({
      ...section,
      groups: section.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: g.conditions.filter((c) => c.id !== conditionId),
            }
          : g
      ),
    });
  }

  function updateCondition(
    groupId: string,
    conditionId: string,
    updates: Partial<Condition>
  ) {
    onSectionChange({
      ...section,
      groups: section.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: g.conditions.map((c) =>
                c.id === conditionId ? { ...c, ...updates } : c
              ),
            }
          : g
      ),
    });
  }

  return (
    <div className="flex flex-col gap-200 p-250 rounded-100 border border-border-color-level2 bg-surface-level1">
      {/* Section header */}
      <SectionHeader
        label={title}
        subText={description}
        icon={SectionIcon}
        trailingButton="Add group"
        trailingButtonIcon={IconPlus}
        onTrailingButtonClick={addGroup}
      />

      {/* Rule groups */}
      {section.groups.length > 0 && (
        <div className="flex flex-col gap-0">
          {section.groups.map((group, groupIdx) => (
            <RuleGroupCard
              key={group.id}
              group={group}
              groupIndex={groupIdx}
              sectionGroupOperator={section.groupOperator}
              onSectionGroupOperatorChange={(v) =>
                onSectionChange({ ...section, groupOperator: v })
              }
              onConditionOperatorChange={(v) =>
                updateGroup(group.id, { conditionOperator: v })
              }
              onConditionUpdate={(condId, updates) =>
                updateCondition(group.id, condId, updates)
              }
              onConditionRemove={(condId) => removeCondition(group.id, condId)}
              onConditionAdd={() => addCondition(group.id)}
              onGroupRemove={() => removeGroup(group.id)}
              canRemoveGroup={section.groups.length > 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Reach Estimator ───────────────────────────────────────────────────────────

interface ReachEstimatorProps {
  inclusionGroups: number;
  exclusionGroups: number;
}

function ReachEstimator({
  inclusionGroups,
  exclusionGroups,
}: ReachEstimatorProps) {
  const baseReach = 24500;
  const exclusionPenalty = exclusionGroups * 1800;
  const inclusionBoost = inclusionGroups * 1200;
  const estimatedReach = Math.max(
    500,
    baseReach + inclusionBoost - exclusionPenalty
  );
  const matchRate = Math.min(95, 52 + inclusionGroups * 4 - exclusionGroups * 3);
  const overlap = Math.max(2, 18 - inclusionGroups * 2 - exclusionGroups);

  return (
    <div className="flex flex-col gap-200 p-250 rounded-100 border border-border-color-level2 bg-surface-level1 h-fit">
      {/* Header */}
      <div className="flex items-center gap-100">
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-100 bg-surface-brand-primary-subtle flex-none">
          <Icon icon={IconTrendingUp} size="md" noOffset className="text-text-brand-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-body font-semibold text-text-level1">
            Reach Estimator
          </span>
          <span className="text-supporting text-text-level3">Live preview</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-color-level2" />

      {/* Metrics */}
      <div className="flex flex-col gap-150">
        {/* Estimated Reach */}
        <div className="flex flex-col gap-25">
          <span className="text-supporting text-text-level3">Estimated reach</span>
          <span className="text-h3 font-bold text-text-level1">
            {estimatedReach.toLocaleString("en-IN")}
          </span>
          <span className="text-supporting text-text-level3">people</span>
        </div>

        <div className="h-px bg-border-color-level2" />

        {/* Match rate */}
        <div className="flex items-center justify-between">
          <span className="text-body text-text-level3">Match rate</span>
          <span className="text-body font-semibold text-text-level1">
            {matchRate}%
          </span>
        </div>

        {/* Overlap */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-50">
            <span className="text-body text-text-level3">Overlap</span>
            <Icon icon={IconInfoCircle} size="md" noOffset className="text-text-level4" />
          </div>
          <span className="text-body font-semibold text-text-level1">
            {overlap}%
          </span>
        </div>

        {/* Rule summary */}
        <div className="flex items-center justify-between">
          <span className="text-body text-text-level3">Inclusion groups</span>
          <Badge colour="primary" fill="light" type="full-rounded" border={false} shadow={false}>
            {inclusionGroups}
          </Badge>
        </div>

        {exclusionGroups > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-body text-text-level3">Exclusion groups</span>
            <Badge
              colour="warning"
              fill="light"
              type="full-rounded"
              shadow={false}
            >
              {exclusionGroups}
            </Badge>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border-color-level2" />

      {/* Note */}
      <p className="text-supporting text-text-level3">
        Estimates are based on your current rule configuration and may vary at
        campaign launch.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AudienceBuilderPage() {
  const [audienceName, setAudienceName] = useState("");

  const [inclusion, setInclusion] = useState<AudienceSection>({
    groupOperator: "OR",
    groups: [makeGroup()],
  });

  const [exclusion, setExclusion] = useState<AudienceSection>({
    groupOperator: "OR",
    groups: [],
  });

  const totalInclusionConditions = inclusion.groups.reduce(
    (sum, g) => sum + g.conditions.length,
    0
  );

  return (
    <div className="flex h-screen overflow-hidden bg-surface-level1">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <Sidebar
        className="hidden lg:flex"
        logo={<SuperProfileLogo />}
        sections={[
          {
            items: [
              { icon: IconSmartHome, label: "Home" },
              { icon: IconWorld, label: "Store" },
              { icon: IconWallet, label: "Payments" },
              { icon: IconTarget, label: "Ads Manager" },
              { icon: IconSchool, label: "Learn" },
              { icon: IconUsers, label: "Audience", active: true },
              { icon: IconCurrencyRupee, label: "Refer & Earn" },
            ],
          },
          {
            label: "YOUR APPS",
            items: [
              { icon: AutoDMIcon, label: "AutoDM" },
              { icon: LeadMagnetIcon, label: "Lead Magnet" },
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

      {/* ── Content area ────────────────────────────────────────────────────── */}
      <main className="flex flex-col flex-1 overflow-hidden bg-surface-level1">
        {/* ── Non-scrolling page header ──────────────────────────────────── */}
        <div className="flex-none px-200 pt-200 pb-300 md:px-300 md:pt-300 lg:px-400 lg:pt-400 border-b border-border-color-level2">
          {/* aside-panel layout — page header mirrors column structure per S14 */}
          <div className="flex gap-300 w-fit mx-auto items-center">
            <div className="w-[var(--layout-content-max-width)] min-w-0 flex flex-col gap-50">
              <h1 className="text-h2 font-bold text-text-level1">
                Create Audience
              </h1>
              <p className="text-body text-text-level3">
                Define who to include or exclude from this segment
              </p>
            </div>
            {/* SP8 exception: w-[260px] — matches aside panel width */}
            <div className="w-[260px] flex-none flex items-center justify-end gap-100">
              <Button variant="outline" size="md" shape="full-rounded">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                shape="full-rounded"
                disabled={
                  !audienceName.trim() || totalInclusionConditions === 0
                }
              >
                Save Audience
              </Button>
            </div>
          </div>
        </div>

        {/* ── Scrollable content — aside-panel layout per S12 ───────────── */}
        <div className="flex-1 overflow-y-auto px-200 py-300 md:px-300 lg:px-400">
          {/* aside-panel layout — S10/S12 */}
          <div className="flex gap-300 w-fit mx-auto items-start">
            {/* ── Left column — form ───────────────────────────────────── */}
            <div className="flex flex-col gap-300 w-[var(--layout-content-max-width)] min-w-0">
              {/* Audience name */}
              <div className="flex flex-col gap-100 p-250 rounded-100 border border-border-color-level2 bg-surface-level1">
                <Input
                  label="Audience name"
                  required
                  size="md"
                  shape="semi-rounded"
                  placeholder="e.g. High-intent Indian mobile users"
                  value={audienceName}
                  onChange={(e) => setAudienceName(e.target.value)}
                  helpText="Give this audience a descriptive name so it's easy to find later"
                />
              </div>

              {/* Inclusion section */}
              <RuleSection
                title="Include"
                description="People who match these rules will be part of this audience"
                icon={IconUsersGroup}
                section={inclusion}
                onSectionChange={setInclusion}
              />

              {/* Exclusion section */}
              <RuleSection
                title="Exclude"
                description="People who match these rules will be removed from the audience"
                icon={IconUserMinus}
                section={exclusion}
                onSectionChange={setExclusion}
              />
            </div>

            {/* ── Right column — Reach Estimator (xl+) ────────────────── */}
            {/* SP8 exception: w-[260px] — Figma-specified aside panel width */}
            <div className="hidden xl:block w-[260px] flex-none sticky top-0">
              <ReachEstimator
                inclusionGroups={inclusion.groups.length}
                exclusionGroups={exclusion.groups.length}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
