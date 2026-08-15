
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = relative => readFileSync(resolve(repoRoot, relative), 'utf8');

describe('source map exposure', () => {
  it('excludes *.map from the published assets', () => {
    const assetsignore = read('public/.assetsignore');
    const patterns = assetsignore
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
    expect(patterns).toContain('*.map');
  });

  it("builds source maps as 'hidden' so nothing references them", () => {
    // 'hidden' still emits .map files (uploadable to an error tracker) but omits the
    // //# sourceMappingURL comment. Plain `true` would advertise them to browsers.
    expect(read('vite.config.js')).toMatch(/sourcemap:\s*'hidden'/);
  });
});
