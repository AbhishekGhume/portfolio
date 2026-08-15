
/**
 * Three hues in a repeating cycle rather than six distinct ones: adjacent
 * sections need roughly 20° of hue separation to read as different colours at
 * all, and six hues spread over the emerald→violet range leaves only 12–16°
 * between neighbours. The cycle brand(156°) → cyan(187°) → indigo(230°) keeps
 * every adjacent pair ≥31° apart.
 *
 * Every value is a literal class string. Tailwind scans source text, so a class
 * built by interpolating a variable is never emitted and the accent silently
 * renders as nothing — the same constraint documented on SkillsSection's `edge`
 * and `dot` fields. Reading a whole literal out of this map is fine; building
 * one from a fragment is not.
 */
export const SECTION_ACCENTS = {
  brand: {
    seam: 'section-seam seam-brand',
    label: 'text-brand-300',
    number: 'text-brand-500/70',
  },
  cyan: {
    seam: 'section-seam seam-cyan',
    label: 'text-cyan-300',
    number: 'text-cyan-500/70',
  },
  indigo: {
    seam: 'section-seam seam-indigo',
    label: 'text-indigo-300',
    number: 'text-indigo-400/70',
  },
};


export const sectionAccent = accent => (SECTION_ACCENTS[accent] ?? SECTION_ACCENTS.brand).seam;
