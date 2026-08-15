

/**
 * The headline, one string per visual line. HeroSection joins them with <br>;
 * the prerender joins them with a space, since the static copy has no width to
 * break against.
 */
export const HERO_HEADLINE_LINES = ['I build backend systems.'];

/** The word in the headline carrying the shimmer gradient. */
export const HERO_HEADLINE_ACCENT = 'backend';

/**
 * The role line above the headline. Lives here for the same reason the headline
 * does: HeroSection and the prerender both render it, and it was previously
 * typed out in both — the one piece of hero copy this module didn't already
 * own, and so the one that could drift.
 */
export const HERO_EYEBROW = 'Software Engineer · Pune, India';

export const HERO_INTRO =
  "I'm Abhishek — a Software Engineer from VIT Pune focused on backend systems, automation workflows, and AI-powered applications with Java, Spring Boot, REST APIs, databases, and cloud platforms. ";

/** The word in the intro rendered at a brighter weight. */
export const HERO_INTRO_EMPHASIS = 'Abhishek';

/**
 * Splits `text` into the part before `word`, the word, and the part after, so a
 * caller can wrap the middle in whatever element it likes. Returns the whole
 * string as `before` when the word isn't found, which degrades to unstyled text
 * rather than dropping copy.
 *
 * @param {string} text
 * @param {string} word
 * @returns {{before: string, match: string, after: string}}
 */
export const splitAround = (text, word) => {
  const at = text.indexOf(word);
  if (at === -1) return { before: text, match: '', after: '' };
  return { before: text.slice(0, at), match: word, after: text.slice(at + word.length) };
};
