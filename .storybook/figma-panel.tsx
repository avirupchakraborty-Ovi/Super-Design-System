import React from "react";
import { addons, types, useParameter } from "storybook/manager-api";

const ADDON_ID = "figma-designs";
const PANEL_ID = `${ADDON_ID}/panel`;

interface DesignParam {
  type: "figma";
  url: string;
}

function FigmaPanel() {
  const design = useParameter<DesignParam | null>("design", null);

  if (!design || design.type !== "figma") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#999",
          fontFamily: "sans-serif",
          fontSize: 13,
        }}
      >
        No Figma design linked to this story.
      </div>
    );
  }

  const embedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(design.url)}`;

  return (
    <iframe
      src={embedUrl}
      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      allowFullScreen
    />
  );
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Design",
    render: ({ active }: { active: boolean }) =>
      active ? <FigmaPanel /> : null,
  });
});
