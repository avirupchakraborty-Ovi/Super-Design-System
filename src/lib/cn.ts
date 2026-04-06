import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tell tailwind-merge that our custom text-* classes are font-size utilities,
// not color utilities — otherwise it strips them when a text-color class is present.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h0",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-title",
        "text-body",
        "text-supporting",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
