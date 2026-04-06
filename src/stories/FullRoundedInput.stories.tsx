import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconSearch, IconMail, IconEyeOff, IconX } from "@tabler/icons-react";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";

const meta: Meta<typeof Input> = {
  title: "Components/Inputs/Full Rounded",
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/0nontsqdr01bHosOjrywDH/Design-System-2026?node-id=10244-29391",
    },
  },
  args: {
    shape: "full-rounded",
    size: "md",
    label: "Label",
    placeholder: "Type here",
    helpText: "This is a description text informing on how to use the input field.",
    disabled: false,
    required: false,
    tooltip: false,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { table: { disable: true } },
    multiline: { table: { disable: true } },
    rows: { table: { disable: true } },
    type: { control: "select", options: ["text", "email", "tel", "url", "password"] },
    error: { control: "text" },
    helpText: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    tooltip: { control: "boolean" },
    copyable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Interactive playground */
export const Default: Story = {};

/** sm, md, lg */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-sm">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input key={size} shape="full-rounded" size={size} label={`Size: ${size}`} placeholder="Type here" />
      ))}
    </div>
  ),
};

/** Default, filled, error, disabled */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-sm">
      <Input shape="full-rounded" label="Default" placeholder="Type here" helpText="Helper text goes here." />
      <Input shape="full-rounded" label="Filled" defaultValue="Hello world" helpText="Helper text goes here." />
      <Input shape="full-rounded" label="Error" placeholder="Type here" error="This is an error message stating the error and steps to recover." />
      <Input shape="full-rounded" label="Disabled" placeholder="Type here" helpText="This field cannot be edited." disabled />
    </div>
  ),
};

/** Plain, required, tooltip, required + tooltip */
export const LabelVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-sm">
      <Input shape="full-rounded" label="Plain label" placeholder="Type here" />
      <Input shape="full-rounded" label="Required field" placeholder="Type here" required helpText="This field is mandatory." />
      <Input shape="full-rounded" label="With tooltip" placeholder="Type here" tooltip helpText="Click the icon for more information." />
      <Input shape="full-rounded" label="Required with tooltip" placeholder="Type here" required tooltip helpText="Mandatory field with extra context." />
    </div>
  ),
};

/** Leading icon, trailing icon, email, password */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-300 max-w-sm">
      <Input shape="full-rounded" label="Search" placeholder="Search..." leadingIcon={IconSearch} />
      <Input shape="full-rounded" label="Search with clear" placeholder="Search..." leadingIcon={IconSearch} trailingIcon={IconX} />
      <Input shape="full-rounded" label="Email" placeholder="you@example.com" leadingIcon={IconMail} type="email" />
      <Input shape="full-rounded" label="Password" placeholder="Enter password" trailingIcon={IconEyeOff} type="password" />
    </div>
  ),
};

/** All sizes × button-only / icon+button / button+trailing / disabled */
export const InlineButton: Story = {
  render: () => (
    <div className="flex flex-col gap-400 max-w-sm">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-200">
          <p className="text-supporting font-medium text-text-level3">{size}</p>
          <Input shape="full-rounded" size={size} label="Button only" placeholder="Type here" inlineButton={{ label: "Apply" }} />
          <Input shape="full-rounded" size={size} label="Leading icon + button" placeholder="Enter coupon code" leadingIcon={IconSearch} inlineButton={{ label: "Redeem" }} />
          <Input shape="full-rounded" size={size} label="Button + trailing icon" placeholder="Type here" inlineButton={{ label: "Apply" }} trailingIcon={IconX} />
          <Input shape="full-rounded" size={size} label="Disabled" placeholder="Type here" inlineButton={{ label: "Apply" }} disabled />
        </div>
      ))}
    </div>
  ),
};

/** Read-only field with copy button — all sizes */
export const CopyLink: Story = {
  render: () => (
    <div className="flex flex-col gap-400 max-w-sm">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-200">
          <p className="text-supporting font-medium text-text-level3">{size}</p>
          <Input shape="full-rounded" size={size} label="Share link" defaultValue="https://example.com/share/abc123" copyable onCopy={() => alert("Copied!")} helpText="Share this link with others." />
          <Input shape="full-rounded" size={size} label="Disabled" defaultValue="https://example.com/share/abc123" copyable disabled helpText="This field is read-only." />
        </div>
      ))}
    </div>
  ),
};

/** Counter only and counter + inline button — all sizes */
export const CharacterCount: Story = {
  render: () => (
    <div className="flex flex-col gap-500 max-w-sm">
      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">Counter only</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-100">
            <Input shape="full-rounded" size={size} label={`${size} — empty`} placeholder="Type something..." value="" maxLength={50} onChange={() => {}} />
            <Input shape="full-rounded" size={size} label={`${size} — partial`} value="Hello world" maxLength={50} onChange={() => {}} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">Counter + inline button</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-100">
            <Input shape="full-rounded" size={size} label={`${size} — empty`} placeholder="Enter coupon" value="" maxLength={20} onChange={() => {}} inlineButton={{ label: "Apply" }} />
            <Input shape="full-rounded" size={size} label={`${size} — partial`} value="SAVE10" maxLength={20} onChange={() => {}} inlineButton={{ label: "Apply" }} />
            <Input shape="full-rounded" size={size} label={`${size} — disabled`} value="" maxLength={20} onChange={() => {}} inlineButton={{ label: "Apply" }} disabled />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** Sizes, states, label variants, country selector */
export const PhoneNumber: Story = {
  render: () => (
    <div className="flex flex-col gap-500 max-w-sm">
      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">Sizes</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <PhoneInput key={size} shape="full-rounded" size={size} label={`Size: ${size}`} defaultCountryCode="IN" />
        ))}
      </div>

      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">States</p>
        <PhoneInput shape="full-rounded" label="Default" defaultCountryCode="IN" helpText="Enter your phone number with country code." />
        <PhoneInput shape="full-rounded" label="Filled" defaultCountryCode="US" defaultValue="415 555 0100" />
        <PhoneInput shape="full-rounded" label="Error" defaultCountryCode="IN" error="Please enter a valid phone number." />
        <PhoneInput shape="full-rounded" label="Disabled" defaultCountryCode="IN" disabled helpText="This field cannot be edited." />
      </div>

      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">Label variants</p>
        <PhoneInput shape="full-rounded" label="Required" defaultCountryCode="IN" required helpText="This field is mandatory." />
        <PhoneInput shape="full-rounded" label="With tooltip" defaultCountryCode="IN" tooltip />
      </div>

      <div className="flex flex-col gap-200">
        <p className="text-body font-medium text-text-level2">Country selector</p>
        <PhoneInput shape="full-rounded" label="India" defaultCountryCode="IN" />
        <PhoneInput shape="full-rounded" label="United States" defaultCountryCode="US" />
        <PhoneInput shape="full-rounded" label="United Kingdom" defaultCountryCode="GB" />
        <PhoneInput shape="full-rounded" label="UAE" defaultCountryCode="AE" />
        <PhoneInput shape="full-rounded" label="Singapore" defaultCountryCode="SG" />
      </div>
    </div>
  ),
};

/** Full grid — sizes × all variants */
export const CompleteMatrix: Story = {
  render: () => (
    <div className="space-y-500">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="mb-100 text-supporting font-medium text-text-level3">{size}</p>
          <div className="flex flex-col gap-200 max-w-sm">
            <Input shape="full-rounded" size={size} label="Default" placeholder="Type here" />
            <Input shape="full-rounded" size={size} label="With leading icon" placeholder="Search..." leadingIcon={IconSearch} />
            <Input shape="full-rounded" size={size} label="Inline button" placeholder="Type here" inlineButton={{ label: "Apply" }} />
            <Input shape="full-rounded" size={size} label="Copy link" defaultValue="https://example.com/link" copyable />
            <Input shape="full-rounded" size={size} label="Character count" value="Hello world" maxLength={50} onChange={() => {}} />
            <Input shape="full-rounded" size={size} label="Required + tooltip" placeholder="Type here" required tooltip />
            <Input shape="full-rounded" size={size} label="Error" placeholder="Type here" error="This field is required." />
            <Input shape="full-rounded" size={size} label="Disabled" placeholder="Cannot edit" disabled />
            <PhoneInput shape="full-rounded" size={size} label="Phone number" defaultCountryCode="IN" />
          </div>
        </div>
      ))}
    </div>
  ),
};
