import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SAMPLE_IMAGE = "https://picsum.photos/800/500?grayscale";

const SAMPLE_BODY = (
  <div className="flex flex-col gap-[8px]">
    <p className="text-body font-semibold text-text-level1">Card heading</p>
    <p className="text-supporting text-text-level3">
      This is placeholder body content for the card. Add your own components, text, or media here
      using the children slot.
    </p>
  </div>
);

const SAMPLE_FOOTER = (
  <div className="flex items-center gap-[8px] w-full">
    <button
      type="button"
      className="flex-1 px-[16px] py-[8px] rounded-500 border border-border-color-level2 text-supporting font-medium text-text-level1 cursor-pointer"
    >
      Secondary
    </button>
    <button
      type="button"
      className="flex-1 px-[16px] py-[8px] rounded-500 bg-surface-inverted text-supporting font-medium text-text-inverted cursor-pointer"
    >
      Primary
    </button>
  </div>
);

const meta: Meta = {
  title: "Components/Content/Card",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10503-37682",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-400">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Vertical / Stretched / Top ─────────────────────────────────────────────────

/** Default: vertical card, image at top, stretched edge-to-edge */
export const Default: Story = {
  render: () => (
    <Card
      title="Title comes here"
      image={SAMPLE_IMAGE}
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Vertical / Padded / Top ────────────────────────────────────────────────────

/** Padded image — inset with margin and rounded corners */
export const PaddedImage: Story = {
  render: () => (
    <Card
      title="Title comes here"
      image={SAMPLE_IMAGE}
      imageType="padded"
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Vertical / Image Below ─────────────────────────────────────────────────────

/** Image positioned below the body content */
export const ImageBelow: Story = {
  render: () => (
    <Card
      title="Title comes here"
      image={SAMPLE_IMAGE}
      imagePosition="below"
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Horizontal / Left ──────────────────────────────────────────────────────────

/** Horizontal card — image on the left */
export const HorizontalLeft: Story = {
  render: () => (
    <Card
      orientation="horizontal"
      imagePosition="left"
      title="Title comes here"
      image={SAMPLE_IMAGE}
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Horizontal / Right ─────────────────────────────────────────────────────────

/** Horizontal card — image on the right */
export const HorizontalRight: Story = {
  render: () => (
    <Card
      orientation="horizontal"
      imagePosition="right"
      title="Title comes here"
      image={SAMPLE_IMAGE}
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Horizontal / Padded ────────────────────────────────────────────────────────

/** Horizontal card with padded image */
export const HorizontalPadded: Story = {
  render: () => (
    <Card
      orientation="horizontal"
      imagePosition="left"
      imageType="padded"
      title="Title comes here"
      image={SAMPLE_IMAGE}
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── No Image ───────────────────────────────────────────────────────────────────

/** Card with image hidden */
export const NoImage: Story = {
  render: () => (
    <Card
      title="Title comes here"
      showImage={false}
      footer={SAMPLE_FOOTER}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── No Footer ──────────────────────────────────────────────────────────────────

/** Card with footer hidden */
export const NoFooter: Story = {
  render: () => (
    <Card
      title="Title comes here"
      image={SAMPLE_IMAGE}
      showFooter={false}
    >
      {SAMPLE_BODY}
    </Card>
  ),
};

// ── Compact ────────────────────────────────────────────────────────────────────

/** Compact — 12px image and body padding, no title, padded image */
export const Compact: Story = {
  render: () => (
    <div className="flex gap-[16px] flex-wrap">
      <Card
        compact
        showTitle={false}
        imageType="padded"
        image={SAMPLE_IMAGE}
        showFooter={false}
        className="w-[252px]"
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-body font-semibold text-text-level1">Caption Caption Caption</p>
          <p className="text-supporting font-normal text-text-level3">Posted on: August 27th</p>
        </div>
      </Card>
      <Card
        compact
        showTitle={false}
        imageType="padded"
        image={SAMPLE_IMAGE}
        showFooter={false}
        className="w-[252px]"
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-body font-semibold text-text-level1">Caption Caption Caption Caption Caption Caption</p>
          <p className="text-supporting font-normal text-text-level3">Posted on: August 27th</p>
        </div>
      </Card>
    </div>
  ),
};

// ── Bug Report Card ────────────────────────────────────────────────────────────

const BUG_IMAGE = "https://picsum.photos/119/67";

/** Horizontal card — Bug Report / Support. Direct composition; layout differs from Card component. */
export const BugReport: Story = {
  render: () => (
    <div className="flex items-center gap-200 w-full max-w-[668px] h-1200 px-200 py-150 bg-surface-level1 border border-border-color-level2 rounded-100 overflow-hidden">
      {/* Image — fills card height, aspect ratio preserved */}
      <img
        src={BUG_IMAGE}
        alt="Bug report"
        className="h-full w-auto object-contain shrink-0 rounded-100"
      />

      {/* Text content */}
      <div className="flex flex-col gap-50 flex-1 min-w-0">
        <p className="text-title font-semibold text-text-level1">Have questions?</p>
        <p className="text-body font-normal text-text-level2">Whatever is on your mind, we&apos;re always here to assist you.</p>
      </div>

      {/* CTA button */}
      <Button variant="outline" shape="full-rounded" size="md" className="shrink-0">
        Start live chat
      </Button>
    </div>
  ),
};

// ── All Variants ───────────────────────────────────────────────────────────────

/** All 8 Figma variants at a glance */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[24px]">
      <div className="flex gap-[24px] flex-wrap">
        <div>
          <p className="text-supporting text-text-level3 mb-[8px]">Vertical · Stretched · Top</p>
          <Card title="Title comes here" image={SAMPLE_IMAGE} footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
        </div>
        <div>
          <p className="text-supporting text-text-level3 mb-[8px]">Vertical · Padded · Top</p>
          <Card title="Title comes here" image={SAMPLE_IMAGE} imageType="padded" footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
        </div>
      </div>
      <div className="flex gap-[24px] flex-wrap">
        <div>
          <p className="text-supporting text-text-level3 mb-[8px]">Vertical · Stretched · Below</p>
          <Card title="Title comes here" image={SAMPLE_IMAGE} imagePosition="below" footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
        </div>
        <div>
          <p className="text-supporting text-text-level3 mb-[8px]">Vertical · Padded · Below</p>
          <Card title="Title comes here" image={SAMPLE_IMAGE} imageType="padded" imagePosition="below" footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
        </div>
      </div>
      <div>
        <p className="text-supporting text-text-level3 mb-[8px]">Horizontal · Stretched · Left</p>
        <Card orientation="horizontal" imagePosition="left" title="Title comes here" image={SAMPLE_IMAGE} footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
      </div>
      <div>
        <p className="text-supporting text-text-level3 mb-[8px]">Horizontal · Padded · Left</p>
        <Card orientation="horizontal" imagePosition="left" imageType="padded" title="Title comes here" image={SAMPLE_IMAGE} footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
      </div>
      <div>
        <p className="text-supporting text-text-level3 mb-[8px]">Horizontal · Stretched · Right</p>
        <Card orientation="horizontal" imagePosition="right" title="Title comes here" image={SAMPLE_IMAGE} footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
      </div>
      <div>
        <p className="text-supporting text-text-level3 mb-[8px]">Horizontal · Padded · Right</p>
        <Card orientation="horizontal" imagePosition="right" imageType="padded" title="Title comes here" image={SAMPLE_IMAGE} footer={SAMPLE_FOOTER}>{SAMPLE_BODY}</Card>
      </div>
    </div>
  ),
};
