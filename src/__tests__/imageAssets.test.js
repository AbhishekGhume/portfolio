

import { describe, it, expect } from 'vitest';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const at = relative => resolve(repoRoot, relative);

/**
 * Pixel dimensions from the file header — no image library needed, and this repo
 * deliberately has none it can rely on (`sharp` is present transitively but
 * absent from package.json, so it vanishes on `npm ci`).
 */
const dimensions = file => {
  const buf = readFileSync(file);
  // PNG: IHDR width/height are the two big-endian u32s at byte 16.
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  throw new Error(`not a PNG: ${file}`);
};

/**
 * The logos, with the box they render into. 48 CSS px of content, so 96 covers a
 * 2× display exactly; 3× phones downscale a touch, which is invisible on a logo
 * and cheaper than shipping 144px to everyone.
 */
const LOGOS = [{ file: 'public/WhirlpoolCorp.png', maxEdge: 96, maxBytes: 8_000 }];

describe('company logos', () => {
  it('are sized for the 48px box they render into', () => {
    for (const logo of LOGOS) {
      const { width, height } = dimensions(at(logo.file));
      expect(Math.max(width, height), `${logo.file} is ${width}×${height}`).toBeLessThanOrEqual(
        logo.maxEdge
      );
      // Guard the other direction too: a 1×1 placeholder would pass the above.
      expect(Math.max(width, height), `${logo.file} looks degenerate`).toBeGreaterThan(32);
    }
  });

  it('cost kilobytes, not tens of kilobytes', () => {
    for (const logo of LOGOS) {
      const { size } = statSync(at(logo.file));
      expect(size, `${logo.file} is ${size} B`).toBeLessThan(logo.maxBytes);
    }
  });

  it('are the files the experience data actually points at', () => {
    // The size guard is worthless if the component renders some other file.
    // The data builds the URL as `${import.meta.env.BASE_URL}<file>`, so match
    // on the filename rather than a literal '/path'.
    const data = readFileSync(at('src/data/experienceData.js'), 'utf8');
    for (const logo of LOGOS) {
      const filename = logo.file.replace(/^public\//, '');
      expect(data, `${filename} is not referenced`).toContain(filename);
    }
  });

  it('render at an explicit width and height, so they reserve layout space', () => {
    // Without both attributes the card reflows when the logo arrives — a CLS hit
    // that Lighthouse scores and that this repo has already paid for elsewhere.
    const entry = readFileSync(at('src/components/ExperienceEntry.jsx'), 'utf8');
    expect(entry).toMatch(/width=\{\d+\}/);
    expect(entry).toMatch(/height=\{\d+\}/);
  });
});

describe('dimension parsing', () => {
  // A header reader is the kind of code that silently returns a plausible wrong
  // number, so pin it against the real files' known sizes.
  it('reads PNG IHDR dimensions', () => {
    expect(dimensions(at('public/WhirlpoolCorp.png'))).toEqual({
      width: 96,
      height: 32,
    });
    // og-image.png is generated at exactly 1200×630 — a second, independent PNG
    // to prove the reader isn't just echoing the expectation.
    expect(dimensions(at('public/og-image.png'))).toEqual({ width: 1200, height: 630 });
  });
});
