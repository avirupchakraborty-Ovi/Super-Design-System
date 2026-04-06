import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const SAMPLE_IMAGE = "https://picsum.photos/800/500?grayscale";

const SAMPLE_BODY = (
  <div className="flex flex-col gap-[8px]">
    <p className="text-body font-semibold text-text-level1">Modal heading</p>
    <p className="text-supporting text-text-level3">
      This is placeholder body content for the modal. Add your own components, text, or media here
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

const TriggerButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-[16px] py-[8px] rounded-500 bg-surface-inverted text-supporting font-medium text-text-inverted cursor-pointer"
  >
    Open Modal
  </button>
);

const meta: Meta = {
  title: "Components/Overlays/Modal",
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10503-37304",
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Close Inside / Vertical / Stretched ────────────────────────────────────────

/** Default: close button inside the header */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="inside"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── Close Outside / Vertical / Stretched ───────────────────────────────────────

/** Close button floats above the modal */
export const CloseOutside: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="outside"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── Padded Image ───────────────────────────────────────────────────────────────

/** Vertical modal with padded image */
export const PaddedImage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="inside"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          imageType="padded"
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── Image Below ────────────────────────────────────────────────────────────────

/** Image positioned below body content */
export const ImageBelow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="inside"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          imagePosition="below"
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── Horizontal / Left ──────────────────────────────────────────────────────────

/** Horizontal modal — image on the left */
export const HorizontalLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="outside"
          orientation="horizontal"
          imagePosition="left"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── Horizontal / Right ─────────────────────────────────────────────────────────

/** Horizontal modal — image on the right */
export const HorizontalRight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="outside"
          orientation="horizontal"
          imagePosition="right"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── No Image ───────────────────────────────────────────────────────────────────

/** Modal without image */
export const NoImage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="inside"
          title="Title comes here"
          showImage={false}
          footer={SAMPLE_FOOTER}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};

// ── No Footer ──────────────────────────────────────────────────────────────────

/** Modal without footer */
export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closePosition="inside"
          title="Title comes here"
          image={SAMPLE_IMAGE}
          showFooter={false}
        >
          {SAMPLE_BODY}
        </Modal>
      </>
    );
  },
};
