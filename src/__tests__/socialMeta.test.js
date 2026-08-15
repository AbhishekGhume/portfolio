
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const html = readFileSync(resolve(repoRoot, 'index.html'), 'utf8');
const head = new DOMParser().parseFromString(html, 'text/html');

/** Every <meta> whose og:/twitter: key sits on the given attribute. */
const keysOn = (attr, prefix) =>
  [...head.querySelectorAll(`meta[${attr}^="${prefix}"]`)].map(m => m.getAttribute(attr));

describe('social preview meta tags', () => {
  it('declares Open Graph tags with property=', () => {
    expect(keysOn('property', 'og:')).toContain('og:image');
    expect(keysOn('name', 'og:')).toEqual([]);
  });

  it('declares Twitter card tags with name=', () => {
    expect(keysOn('name', 'twitter:')).toEqual(
      expect.arrayContaining([
        'twitter:card',
        'twitter:url',
        'twitter:title',
        'twitter:description',
        'twitter:image',
        'twitter:image:alt',
      ])
    );
    expect(keysOn('property', 'twitter:')).toEqual([]);
  });

  it('points both card images at the same absolute URL', () => {
    // Relative paths resolve against the crawler, not the page, so a preview
    // image has to be absolute. Both specs need their own copy of it.
    const og = head.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const twitter = head.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
    expect(og).toMatch(/^https:\/\//);
    expect(twitter).toBe(og);
  });
});
