// Mirrors the CSS custom properties in app/globals.css (DESIGN.md §2).
// Keep these two files in sync when a beam color changes.

export type SectionId = "work" | "beyond" | "about";

// Note: the "about" section keeps the CSS token name `--beam-contact` /
// `beam-contact` in globals.css and Tailwind's theme (it's the same blue,
// just an internal name left over from before the Contact→About rename —
// not worth cascading a rename through the CSS layer for a label change).
export const beamColors: Record<SectionId, string> = {
  work: "#FF2A1A",
  beyond: "#FFD500",
  about: "#1E6FFF",
};

export interface SectionMeta {
  id: SectionId;
  label: string;
  subLabel: string;
  href: string;
  color: string;
}

export const sections: SectionMeta[] = [
  {
    id: "work",
    label: "Work",
    subLabel: "CAREER · PROJECTS",
    href: "/work",
    color: beamColors.work,
  },
  {
    id: "beyond",
    label: "Beyond",
    subLabel: "FOOTBALL · TABLA · GUITAR · F1",
    href: "/beyond",
    color: beamColors.beyond,
  },
  {
    id: "about",
    label: "About",
    subLabel: "CONTACT",
    href: "/about",
    color: beamColors.about,
  },
];
