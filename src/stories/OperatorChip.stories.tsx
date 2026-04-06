import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { OperatorChip } from "@/components/ui/OperatorChip";

const meta: Meta<typeof OperatorChip> = {
  title: "Components/Inputs/OperatorChip",
  component: OperatorChip,
  args: {
    value: "AND",
    options: ["AND", "OR"],
  },
  argTypes: {
    value: { control: "text" },
    options: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof OperatorChip>;

/** Default — AND/OR toggle, controlled */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <OperatorChip
        value={value}
        options={args.options}
        onChange={setValue}
      />
    );
  },
};

/** Both options side by side */
export const BothStates: Story = {
  render: () => {
    const [val1, setVal1] = useState("AND");
    const [val2, setVal2] = useState("OR");
    return (
      <div className="flex items-center gap-[16px]">
        <OperatorChip value={val1} onChange={setVal1} />
        <OperatorChip value={val2} onChange={setVal2} />
      </div>
    );
  },
};

/** In context — between two condition rows, as it appears in the rule builder */
export const InContext: Story = {
  render: () => {
    const [operator, setOperator] = useState("AND");
    return (
      <div className="flex flex-col gap-[8px] p-[16px] rounded-100 border border-border-color-level2 bg-surface-level1 w-fit">
        <div className="flex items-center gap-[8px]">
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">Location</span>
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">is</span>
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">India</span>
        </div>
        <div className="pl-[2px]">
          <OperatorChip value={operator} onChange={setOperator} />
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">Age</span>
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">greater than</span>
          <span className="text-body text-text-level1 px-[12px] py-[8px] rounded-100 border border-border-color-level2">25–34</span>
        </div>
      </div>
    );
  },
};

/** Custom options — demonstrates the component works beyond AND/OR */
export const CustomOptions: Story = {
  render: () => {
    const [value, setValue] = useState("OR");
    return (
      <OperatorChip
        value={value}
        options={["AND", "OR", "NOT"]}
        onChange={setValue}
      />
    );
  },
};

/** Between groups — horizontal rule with chip centred */
export const BetweenGroups: Story = {
  render: () => {
    const [operator, setOperator] = useState("OR");
    return (
      <div className="flex items-center gap-[12px] w-[400px]">
        <div className="flex-1 h-px bg-border-color-level2" />
        <OperatorChip value={operator} onChange={setOperator} />
        <div className="flex-1 h-px bg-border-color-level2" />
      </div>
    );
  },
};
