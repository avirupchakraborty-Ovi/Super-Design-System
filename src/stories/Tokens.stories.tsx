import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const ColorSwatch = ({
  name,
  cssVar,
}: {
  name: string;
  cssVar: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className="h-10 w-10 shrink-0 rounded-lg border border-border-color-level2"
      style={{ backgroundColor: `var(${cssVar})` }}
    />
    <div className="min-w-0">
      <div className="text-sm font-medium text-text-level1">{name}</div>
      <div className="truncate text-xs text-text-level3">{cssVar}</div>
    </div>
  </div>
);

const ColorGroup = ({
  title,
  description,
  colors,
}: {
  title: string;
  description?: string;
  colors: { name: string; cssVar: string }[];
}) => (
  <div className="mb-10">
    <h3 className="mb-1 text-base font-semibold text-text-level1">{title}</h3>
    {description && (
      <p className="mb-4 text-sm text-text-level3">{description}</p>
    )}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {colors.map((c) => (
        <ColorSwatch key={c.cssVar} {...c} />
      ))}
    </div>
  </div>
);

const SpacingBlock = ({ label, size }: { label: string; size: string }) => (
  <div className="flex items-center gap-3">
    <div
      className="h-6 rounded bg-surface-brand-primary"
      style={{ width: size, minWidth: "2px" }}
    />
    <span className="text-xs text-text-level2">
      {label} — {size}
    </span>
  </div>
);

const RadiusBlock = ({ label, radius }: { label: string; radius: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="h-16 w-16 border-2 border-border-color-primary bg-surface-brand-primary-subtle"
      style={{ borderRadius: radius }}
    />
    <span className="text-xs font-medium text-text-level2">{label}</span>
    <span className="text-xs text-text-level3">{radius}</span>
  </div>
);

const WidthBlock = ({
  label,
  width,
  value,
}: {
  label: string;
  width: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className="h-10 w-20 rounded-lg bg-surface-level2"
      style={{ border: `${width} solid var(--border-color-primary)` }}
    />
    <div>
      <span className="text-xs font-medium text-text-level2">{label}</span>
      <div className="text-xs text-text-level3">{value}</div>
    </div>
  </div>
);

const TypographyRow = ({
  name,
  size,
  lineHeight,
  weight,
  letterSpacing,
}: {
  name: string;
  size: string;
  lineHeight: string;
  weight: string;
  letterSpacing?: string;
}) => (
  <div className="flex items-baseline justify-between border-b border-border-color-level1 py-3">
    <span
      className="text-text-level1"
      style={{
        fontSize: size,
        lineHeight,
        fontWeight: weight,
        letterSpacing: letterSpacing || "normal",
      }}
    >
      {name}
    </span>
    <span className="shrink-0 text-xs text-text-level3">
      {size} / {lineHeight} / {weight}
      {letterSpacing ? ` / ${letterSpacing}` : ""}
    </span>
  </div>
);

const ShadowSwatch = ({
  name,
  cssVar,
  description,
}: {
  name: string;
  cssVar: string;
  description: string;
}) => (
  <div className="flex flex-col gap-3">
    <div
      className="h-16 w-full rounded-150 bg-surface-level1 border border-border-color-level2"
      style={{ boxShadow: `var(${cssVar})` }}
    />
    <div>
      <div className="text-sm font-semibold text-text-level1">{name}</div>
      <div className="text-xs text-text-level3">{cssVar}</div>
      <div className="text-xs text-text-level2 mt-1">{description}</div>
    </div>
  </div>
);

const SectionDivider = ({ title }: { title: string }) => (
  <div className="mb-6 mt-12 border-b-2 border-border-color-level2 pb-2">
    <h2 className="text-xl font-bold text-text-level1">{title}</h2>
  </div>
);

function TokenShowcase() {
  return (
    <div className="max-w-5xl space-y-2 bg-surface-level1 p-8">
      <h1 className="text-3xl font-bold text-text-level1">Design Tokens</h1>
      <p className="text-text-level2">
        All tokens extracted from Design System 2026 Figma file. Toggle
        Light/Dark mode using the toolbar above.
      </p>

      {/* ═══ SURFACE TOKENS ═══ */}
      <SectionDivider title="Surface Colors" />

      <ColorGroup
        title="Surface — Levels"
        description="10-step neutral scale from lightest to darkest. Inverts in dark mode."
        colors={[
          ...Array.from({ length: 10 }, (_, i) => ({
            name: `Level ${i + 1}`,
            cssVar: `--surface-level${i + 1}`,
          })),
          { name: "Level 1 Hover", cssVar: "--surface-level1-hover" },
          { name: "Inverted", cssVar: "--surface-inverted" },
        ]}
      />

      <ColorGroup
        title="Surface — Brand"
        description="Primary (blue) and secondary (purple) brand surfaces."
        colors={[
          { name: "Brand Primary", cssVar: "--surface-brand-primary" },
          { name: "Primary Subtle", cssVar: "--surface-brand-primary-subtle" },
          { name: "Primary Hover", cssVar: "--surface-brand-primary-hover" },
          { name: "Brand Secondary", cssVar: "--surface-brand-secondary" },
          {
            name: "Secondary Subtle",
            cssVar: "--surface-brand-secondary-subtle",
          },
          {
            name: "Secondary Hover",
            cssVar: "--surface-brand-secondary-hover",
          },
        ]}
      />

      <ColorGroup
        title="Surface — Critical (Red)"
        description="4 levels for error and destructive states."
        colors={[1, 2, 3, 4].map((n) => ({
          name: `Critical Level ${n}`,
          cssVar: `--surface-critical-level${n}`,
        }))}
      />

      <ColorGroup
        title="Surface — Warning (Yellow)"
        description="4 levels for warning states."
        colors={[1, 2, 3, 4].map((n) => ({
          name: `Warning Level ${n}`,
          cssVar: `--surface-warning-level${n}`,
        }))}
      />

      <ColorGroup
        title="Surface — Success (Green)"
        description="4 levels for success states."
        colors={[1, 2, 3, 4].map((n) => ({
          name: `Success Level ${n}`,
          cssVar: `--surface-success-level${n}`,
        }))}
      />

      <ColorGroup
        title="Surface — Special"
        description="Image placeholders, toggle backgrounds."
        colors={[
          {
            name: "Image Placeholder",
            cssVar: "--surface-image-placeholder",
          },
          { name: "Toggle Inactive", cssVar: "--surface-toggle-inactive" },
        ]}
      />

      <ColorGroup
        title="Surface — Sidebar (Fixed)"
        description="Sidebar colors stay the same in Light and Dark mode."
        colors={[
          { name: "Sidebar Background", cssVar: "--surface-sidebar" },
          { name: "Nav Active", cssVar: "--surface-nav-active" },
          { name: "Nav Hover", cssVar: "--surface-nav-hover" },
          { name: "Nav Settings", cssVar: "--surface-nav-settings" },
          { name: "Sidebar Inner", cssVar: "--surface-sidebar-inner" },
        ]}
      />

      {/* ═══ TEXT TOKENS ═══ */}
      <SectionDivider title="Text Colors" />

      <ColorGroup
        title="Text — Levels"
        description="5-step hierarchy from primary text to muted."
        colors={[
          { name: "Level 1 (Primary)", cssVar: "--text-level1" },
          { name: "Level 2 (Secondary)", cssVar: "--text-level2" },
          { name: "Level 3 (Tertiary)", cssVar: "--text-level3" },
          { name: "Level 4 (Muted)", cssVar: "--text-level4" },
          { name: "Level 5 (Faint)", cssVar: "--text-level5" },
          { name: "Inverted", cssVar: "--text-inverted" },
        ]}
      />

      <ColorGroup
        title="Text — Brand"
        description="Brand-colored text for links, accents, and emphasis."
        colors={[
          { name: "Brand Primary", cssVar: "--text-brand-primary" },
          { name: "Primary Subtle", cssVar: "--text-brand-primary-subtle" },
          { name: "Primary Hover", cssVar: "--text-brand-primary-hover" },
          { name: "Brand Secondary", cssVar: "--text-brand-secondary" },
          {
            name: "Secondary Subtle",
            cssVar: "--text-brand-secondary-subtle",
          },
          {
            name: "Secondary Hover",
            cssVar: "--text-brand-secondary-hover",
          },
          { name: "Link", cssVar: "--text-link" },
        ]}
      />

      <ColorGroup
        title="Text — Status"
        description="Text colors for critical, warning, and success states."
        colors={[
          { name: "Critical Level 1", cssVar: "--text-critical-level1" },
          { name: "Critical Level 2", cssVar: "--text-critical-level2" },
          { name: "Critical Level 3", cssVar: "--text-critical-level3" },
          { name: "Warning Level 1", cssVar: "--text-warning-level1" },
          { name: "Warning Level 2", cssVar: "--text-warning-level2" },
          { name: "Success Level 1", cssVar: "--text-success-level1" },
          { name: "Success Level 2", cssVar: "--text-success-level2" },
        ]}
      />

      {/* ═══ BORDER TOKENS ═══ */}
      <SectionDivider title="Border" />

      <ColorGroup
        title="Border — Color"
        description="Border/stroke colors. Renamed from 'stroke' in Figma for code clarity."
        colors={[
          { name: "Level 1", cssVar: "--border-color-level1" },
          { name: "Level 2", cssVar: "--border-color-level2" },
          { name: "Level 3", cssVar: "--border-color-level3" },
          { name: "Inverted", cssVar: "--border-color-inverted" },
          { name: "Primary", cssVar: "--border-color-primary" },
          { name: "Primary Hover", cssVar: "--border-color-primary-hover" },
          { name: "Primary Subtle", cssVar: "--border-color-primary-subtle" },
          { name: "Primary Wash", cssVar: "--border-color-primary-wash" },
          { name: "Secondary", cssVar: "--border-color-secondary" },
          {
            name: "Secondary Subtle",
            cssVar: "--border-color-secondary-subtle",
          },
          { name: "Secondary Wash", cssVar: "--border-color-secondary-wash" },
          { name: "Critical", cssVar: "--border-color-critical" },
          { name: "Warning", cssVar: "--border-color-warning" },
          { name: "Success", cssVar: "--border-color-success" },
        ]}
      />

      <div className="mb-10">
        <h3 className="mb-1 text-base font-semibold text-text-level1">
          Border — Width
        </h3>
        <p className="mb-4 text-sm text-text-level3">
          Border thickness values. Renamed from &apos;border&apos; in Figma for
          clarity.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <WidthBlock label="0" width="0px" value="0px" />
          <WidthBlock label="0165" width="0.66px" value="0.66px" />
          <WidthBlock label="025" width="1px" value="1px" />
          <WidthBlock label="030" width="1.2px" value="1.2px" />
          <WidthBlock label="050" width="2px" value="2px" />
          <WidthBlock label="100" width="4px" value="4px" />
        </div>
      </div>

      {/* ═══ PRIMITIVE COLORS ═══ */}
      <SectionDivider title="Primitive Colors" />

      <ColorGroup
        title="Gray"
        description="Neutral scale used to build surface, text, and border semantic tokens."
        colors={[0, 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
          (n) => ({
            name: `${n}`,
            cssVar: `--color-gray-${n}`,
          })
        )}
      />

      <ColorGroup
        title="Pink"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-pink-${n}`,
        }))}
      />

      <ColorGroup
        title="Brand Primary (Blue)"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-brand-primary-${n}`,
        }))}
      />

      <ColorGroup
        title="Brand Secondary (Purple)"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-brand-secondary-${n}`,
        }))}
      />

      <ColorGroup
        title="Critical (Red)"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-critical-${n}`,
        }))}
      />

      <ColorGroup
        title="Warning (Yellow)"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-warning-${n}`,
        }))}
      />

      <ColorGroup
        title="Success (Green)"
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `${n}`,
          cssVar: `--color-success-${n}`,
        }))}
      />

      <ColorGroup
        title="Chart — Data Visualization"
        description="Fixed colors used exclusively for chart/graph rendering. Not theme-inverted."
        colors={[
          { name: "Uptrend Fill", cssVar: "--color-chart-uptrend-fill" },
          { name: "Neutral", cssVar: "--color-chart-neutral" },
        ]}
      />

      {/* ═══ SPACING ═══ */}
      <SectionDivider title="Spacing" />

      <div className="mb-10">
        <p className="mb-4 text-sm text-text-level3">
          21-step spacing scale from 0 to 128px. Same in Light and Dark mode.
        </p>
        <div className="space-y-2">
          {[
            ["0", "0px"],
            ["25", "2px"],
            ["50", "4px"],
            ["62", "5px"],
            ["75", "6px"],
            ["100", "8px"],
            ["125", "10px"],
            ["150", "12px"],
            ["175", "14px"],
            ["200", "16px"],
            ["250", "20px"],
            ["300", "24px"],
            ["400", "32px"],
            ["500", "40px"],
            ["600", "48px"],
            ["700", "56px"],
            ["800", "64px"],
            ["900", "72px"],
            ["1000", "80px"],
            ["1200", "96px"],
            ["1400", "112px"],
            ["1600", "128px"],
          ].map(([label, size]) => (
            <SpacingBlock key={label} label={label} size={size} />
          ))}
        </div>
      </div>

      {/* ═══ BORDER RADIUS ═══ */}
      <SectionDivider title="Border Radius" />

      <div className="mb-10">
        <p className="mb-4 text-sm text-text-level3">
          10-step radius scale. 500 (9999px) creates fully rounded / pill shapes.
        </p>
        <div className="flex flex-wrap gap-6">
          {[
            ["0", "0px"],
            ["050", "4px"],
            ["075", "6px"],
            ["100", "8px"],
            ["125", "10px"],
            ["150", "12px"],
            ["200", "16px"],
            ["300", "24px"],
            ["400", "32px"],
            ["500", "9999px"],
          ].map(([label, r]) => (
            <RadiusBlock key={label} label={label} radius={r} />
          ))}
        </div>
      </div>

      {/* ═══ BREAKPOINTS ═══ */}
      <SectionDivider title="Breakpoints" />

      <div className="mb-10">
        <div className="overflow-hidden rounded-lg border border-border-color-level2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-surface-level2">
                <th className="px-4 py-2 font-semibold text-text-level1">
                  Name
                </th>
                <th className="px-4 py-2 font-semibold text-text-level1">
                  Min Width
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["xs", "0px"],
                ["sm", "600px"],
                ["md", "840px"],
                ["lg", "1200px"],
                ["xl", "1440px"],
              ].map(([name, value]) => (
                <tr key={name} className="border-t border-border-color-level1">
                  <td className="px-4 py-2 font-medium text-text-level1">
                    {name}
                  </td>
                  <td className="px-4 py-2 text-text-level2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ TYPOGRAPHY ═══ */}
      <SectionDivider title="Typography" />

      <div className="mb-10">
        <p className="mb-4 text-sm text-text-level3">
          8 size scales, each with 4 weights (Regular, Medium, Semibold, Bold).
          41 text styles total. Supporting sizes use 2% letter spacing.
        </p>
        <div className="space-y-1">
          {[
            {
              name: "H0",
              size: "36px",
              lineHeight: "54px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "H1",
              size: "26px",
              lineHeight: "39px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "H2",
              size: "24px",
              lineHeight: "36px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "H3",
              size: "20px",
              lineHeight: "30px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "H4",
              size: "18px",
              lineHeight: "27px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "Title",
              size: "16px",
              lineHeight: "22px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "Body",
              size: "14px",
              lineHeight: "21px",
              weights: ["400", "500", "600", "700"],
            },
            {
              name: "Supporting",
              size: "12px",
              lineHeight: "16px",
              weights: ["400", "500", "600", "700"],
              letterSpacing: "0.02em",
            },
          ].flatMap((scale) =>
            scale.weights.map((w) => {
              const weightName =
                w === "400"
                  ? "Regular"
                  : w === "500"
                    ? "Medium"
                    : w === "600"
                      ? "Semibold"
                      : "Bold";
              return (
                <TypographyRow
                  key={`${scale.name}-${w}`}
                  name={`${scale.name} / ${weightName}`}
                  size={scale.size}
                  lineHeight={scale.lineHeight}
                  weight={w}
                  letterSpacing={scale.letterSpacing}
                />
              );
            })
          )}
        </div>
      </div>

      {/* ═══ SHADOWS ═══ */}
      <SectionDivider title="Shadows" />

      <div className="mb-10">
        <p className="mb-4 text-sm text-text-level3">
          7 elevation shadows. Applied via <code>box-shadow</code> using CSS variable tokens.
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <ShadowSwatch
            name="Pill Tab"
            cssVar="--shadow-pill-tab"
            description="0 1px 4px rgba(0,0,0,0.1)"
          />
          <ShadowSwatch
            name="Badge"
            cssVar="--shadow-badge"
            description="0 2px 8px rgba(0,0,0,0.12)"
          />
          <ShadowSwatch
            name="Card"
            cssVar="--shadow-card"
            description="0 2px 8px rgba(0,0,0,0.16)"
          />
          <ShadowSwatch
            name="Tooltip"
            cssVar="--shadow-tooltip"
            description="0 0px 1px rgba(0,0,0,0.4), 0 6px 6px -6px rgba(0,0,0,0.16)"
          />
          <ShadowSwatch
            name="Dropdown"
            cssVar="--shadow-dropdown"
            description="0 8px 24px rgba(0,0,0,0.16), 0 0px 1px rgba(0,0,0,0.4)"
          />
          <ShadowSwatch
            name="Toggle"
            cssVar="--shadow-toggle"
            description="0 2px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.08)"
          />
          <ShadowSwatch
            name="Chart"
            cssVar="--shadow-chart"
            description="0 0px 2px rgba(0,0,0,0.04)"
          />
        </div>
      </div>

      {/* ═══ LAYOUT STRUCTURE ═══ */}
      <SectionDivider title="Layout Structure" />

      <div className="mb-10">
        <p className="mb-4 text-sm text-text-level3">
          Structural layout constants. Used as CSS variables — not spacing utilities.
          Reference as <code>var(--layout-sidebar-width)</code> in code.
        </p>
        <div className="overflow-hidden rounded-lg border border-border-color-level2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-surface-level2">
                <th className="px-4 py-2 font-semibold text-text-level1">Token</th>
                <th className="px-4 py-2 font-semibold text-text-level1">Value</th>
                <th className="px-4 py-2 font-semibold text-text-level1">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--layout-sidebar-width",     "230px", "Fixed sidebar width (sidebar + content shell)"],
                ["--layout-content-max-width",  "720px", "Max-width for centered layout type"],
              ].map(([token, value, usage]) => (
                <tr key={token} className="border-t border-border-color-level1">
                  <td className="px-4 py-2 font-mono text-xs text-text-brand-primary">{token}</td>
                  <td className="px-4 py-2 font-medium text-text-level1">{value}</td>
                  <td className="px-4 py-2 text-text-level3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ SUMMARY ═══ */}
      <SectionDivider title="Token Count Summary" />

      <div className="overflow-hidden rounded-lg border border-border-color-level2">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-surface-level2">
              <th className="px-4 py-2 font-semibold text-text-level1">
                Category
              </th>
              <th className="px-4 py-2 font-semibold text-text-level1">
                Count
              </th>
              <th className="px-4 py-2 font-semibold text-text-level1">
                Figma Name
              </th>
              <th className="px-4 py-2 font-semibold text-text-level1">
                Code Name
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Surface Colors", "37", "surface/*", "surface-*"],
              ["Text Colors", "20", "text/*", "text-*"],
              [
                "Border Colors",
                "14",
                "stroke/* (renaming to border/color-*)",
                "border-color-*",
              ],
              [
                "Border Widths",
                "6",
                "border/* (renaming to border/width-*)",
                "border-width-*",
              ],
              ["Spacing", "21", "spacing/*", "spacing-*"],
              ["Border Radius", "10", "radius/*", "radius-*"],
              ["Breakpoints", "5", "breakpoints/*", "breakpoint-*"],
              ["Typography", "41 styles", "Text styles", "font utilities"],
              [
                "Primitive Colors",
                "82",
                "color/gray, pink, brand, etc.",
                "color-gray-*, color-pink-*, etc.",
              ],
              ["Layout Structure", "2", "layout/*", "layout-*"],
            ].map(([cat, count, figma, code]) => (
              <tr key={cat} className="border-t border-border-color-level1">
                <td className="px-4 py-2 font-medium text-text-level1">
                  {cat}
                </td>
                <td className="px-4 py-2 text-text-level2">{count}</td>
                <td className="px-4 py-2 text-text-level3">{figma}</td>
                <td className="px-4 py-2 text-text-level3">{code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Foundation/Tokens",
  component: TokenShowcase,
};

export default meta;
type Story = StoryObj;

export const AllTokens: Story = {};
