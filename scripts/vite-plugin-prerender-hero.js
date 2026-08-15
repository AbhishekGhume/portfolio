

import {
  HERO_HEADLINE_LINES,
  HERO_HEADLINE_ACCENT,
  HERO_EYEBROW,
  HERO_INTRO,
  HERO_INTRO_EMPHASIS,
  splitAround,
} from '../src/data/heroContent.js';

/** Minimal HTML-escape for text interpolated into the shell. */
const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * The static hero. Deliberately plain: no Tailwind utilities, because this is
 * replaced within a frame of the bundle executing and styling it would mean a
 * second copy of the hero's design to keep in step. The inline styles below
 * exist only so the pre-paint frame is dark-on-dark rather than a flash of
 * black serif text on the #060a13 background painted by the shell's <style>.
 */
export function renderHeroShell() {
  const headline = HERO_HEADLINE_LINES.join(' ');
  const h = splitAround(headline, HERO_HEADLINE_ACCENT);
  const p = splitAround(HERO_INTRO, HERO_INTRO_EMPHASIS);

  const headlineHtml = h.match
    ? `${esc(h.before)}<span style="color:#34d399">${esc(h.match)}</span>${esc(h.after)}`
    : esc(h.before);
  const introHtml = p.match
    ? `${esc(p.before)}<strong style="color:#e2e8f0;font-weight:600">${esc(p.match)}</strong>${esc(p.after)}`
    : esc(p.before);

  return (
    `<div id="hero-shell" style="max-width:56rem;margin:0 auto;padding:8rem 1.5rem 0;text-align:center;color:#94a3b8;font-family:system-ui,sans-serif">` +
    `<p style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:#34d399">${esc(HERO_EYEBROW)}</p>` +
    `<h1 style="margin:1.25rem 0 0;font-size:2.25rem;line-height:1.05;font-weight:700;color:#fff">${headlineHtml}</h1>` +
    `<p style="margin:1rem auto 0;max-width:42rem;line-height:1.625">${introHtml}</p>` +
    `</div>`
  );
}

export default function prerenderHero() {
  return {
    name: 'prerender-hero',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const root = '<div id="root"></div>';
        if (!html.includes(root)) {
          // Loud rather than silent: a renamed or reformatted root element would
          // otherwise drop the prerender and leave the shell empty again, with
          // nothing in CI to notice — the same failure mode this plugin fixes.
          throw new Error(
            `[prerender-hero] could not find \`${root}\` in index.html; the hero was not injected.`
          );
        }
        return html.replace(root, `<div id="root">${renderHeroShell()}</div>`);
      },
    },
  };
}
