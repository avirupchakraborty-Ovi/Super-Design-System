import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { IconTopologyRing3 } from "@tabler/icons-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Feedback/Badge",
  component: Badge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10509-797",
    },
  },
  args: {
    children: "Dynamic",
    colour: "neutral",
    fill: "light",
    type: "full-rounded",
    border: true,
    shadow: true,
  },
  argTypes: {
    colour: {
      control: "select",
      options: ["neutral", "critical", "warning", "success", "primary"],
    },
    fill: {
      control: "select",
      options: ["light", "dark", "no-fill"],
    },
    type: {
      control: "select",
      options: ["full-rounded", "semi-rounded"],
    },
    border: { control: "boolean" },
    shadow: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/** Default badge — Light fill, Neutral colour, Full Rounded */
export const Default: Story = {};

/** All 5 colour options with Light fill */
export const Colours: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge colour="neutral">Neutral</Badge>
      <Badge colour="critical">Critical</Badge>
      <Badge colour="warning">Warning</Badge>
      <Badge colour="success">Success</Badge>
      <Badge colour="primary">Primary</Badge>
    </div>
  ),
};

/** Light fill — tinted background with matching border */
export const FillLight: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge fill="light" colour="neutral">Neutral</Badge>
      <Badge fill="light" colour="critical">Critical</Badge>
      <Badge fill="light" colour="warning">Warning</Badge>
      <Badge fill="light" colour="success">Success</Badge>
      <Badge fill="light" colour="primary">Primary</Badge>
    </div>
  ),
};

/** Dark fill — solid background, white text */
export const FillDark: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge fill="dark" colour="neutral">Neutral</Badge>
      <Badge fill="dark" colour="critical">Critical</Badge>
      <Badge fill="dark" colour="warning">Warning</Badge>
      <Badge fill="dark" colour="success">Success</Badge>
      <Badge fill="dark" colour="primary">Primary</Badge>
    </div>
  ),
};

/** No fill — transparent background, outline only */
export const FillNone: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge fill="no-fill" colour="neutral">Neutral</Badge>
      <Badge fill="no-fill" colour="critical">Critical</Badge>
      <Badge fill="no-fill" colour="warning">Warning</Badge>
      <Badge fill="no-fill" colour="success">Success</Badge>
      <Badge fill="no-fill" colour="primary">Primary</Badge>
    </div>
  ),
};

/** Semi Rounded — rectangular badge with 4px radius */
export const SemiRounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge type="semi-rounded" colour="neutral">Neutral</Badge>
      <Badge type="semi-rounded" colour="critical">Critical</Badge>
      <Badge type="semi-rounded" colour="warning">Warning</Badge>
      <Badge type="semi-rounded" colour="success">Success</Badge>
      <Badge type="semi-rounded" colour="primary">Primary</Badge>
    </div>
  ),
};

/** With border vs without border */
export const BorderVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Badge border={true} colour="primary">With Border</Badge>
        <Badge border={true} colour="critical">With Border</Badge>
        <Badge border={true} colour="success">With Border</Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge border={false} colour="primary">No Border</Badge>
        <Badge border={false} colour="critical">No Border</Badge>
        <Badge border={false} colour="success">No Border</Badge>
      </div>
    </div>
  ),
};

/** With shadow vs without shadow */
export const ShadowVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Badge shadow={true} colour="primary">With Shadow</Badge>
        <Badge shadow={true} colour="warning">With Shadow</Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge shadow={false} colour="primary">No Shadow</Badge>
        <Badge shadow={false} colour="warning">No Shadow</Badge>
      </div>
    </div>
  ),
};

/** Toggle leading/trailing icons — use the controls panel to show/hide */
export const IconVisibility: Story = {
  args: {
    colour: "primary",
    leadingIcon: <Icon icon={IconTopologyRing3} size="sm" />,
    trailingIcon: <Icon icon={IconTopologyRing3} size="sm" />,
    showLeadingIcon: true,
    showTrailingIcon: true,
    children: "Dynamic",
  },
};

/** With leading and trailing icons */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge
        colour="primary"
        leadingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
        trailingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
      >
        Dynamic
      </Badge>
      <Badge
        colour="critical"
        leadingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
        trailingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
      >
        Dynamic
      </Badge>
      <Badge
        colour="success"
        leadingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
        trailingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
      >
        Dynamic
      </Badge>
      <Badge
        colour="warning"
        leadingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
        trailingIcon={<Icon icon={IconTopologyRing3} size="sm" />}
      >
        Dynamic
      </Badge>
    </div>
  ),
};

/** Complete matrix — all Fill x Colour combinations, Full Rounded */
export const CompleteMatrix: Story = {
  render: () => {
    const colours = ["neutral", "critical", "warning", "success", "primary"] as const;
    const fills = ["light", "dark", "no-fill"] as const;
    const fillLabels = { light: "Light", dark: "Dark", "no-fill": "No Fill" };

    return (
      <div className="space-y-6">
        {fills.map((fill) => (
          <div key={fill}>
            <h3 className="mb-2 text-sm font-semibold text-text-level1">
              Fill: {fillLabels[fill]}
            </h3>
            <div className="flex flex-wrap gap-3">
              {colours.map((colour) => (
                <Badge key={colour} fill={fill} colour={colour}>
                  {colour.charAt(0).toUpperCase() + colour.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
