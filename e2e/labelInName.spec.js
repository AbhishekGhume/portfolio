
import { test, expect } from '@playwright/test';

/**
 * Compare the way a speech engine would: case-insensitive, whitespace
 * collapsed, and punctuation and accents dropped, so "Résumé" against
 * "View résumé (opens in a new tab)" does not produce a false failure.
 * Deliberately lenient — this should only fire on names that genuinely do not
 * contain the visible words.
 */
const normalise = s =>
  (s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Every link and button on the page, paired with its visible text and the
 * accessible name the browser actually computed for it.
 */
const controls = async scope =>
  scope.locator('a, button').evaluateAll(els =>
    els
      // Only what is actually rendered at this viewport. A display:none control
      // is not in the accessibility tree, so there is no computed name to check
      // it against — this page has responsive variants of the same button
      // (`sm:hidden` / `hidden sm:inline-flex`) and at any one width half of
      // them are inert. The test runs at two widths so both halves get covered.
      .filter(el => el.getClientRects().length > 0)
      .map(el => ({
        visible: el.innerText || el.textContent || '',
        // The name computation for the two shapes this page uses: an explicit
        // aria-label wins, otherwise the element is named by its own content.
        // Cross-checked against the browser's real computed names below, so if a
        // control ever appears that this doesn't model (aria-labelledby, a title,
        // a non-hidden icon contributing text) the test says so instead of
        // quietly checking the wrong string.
        accessible: el.getAttribute('aria-label') || el.textContent || '',
        tag: el.tagName.toLowerCase(),
      }))
  );

/**
 * The accessible names the browser actually computed, pulled out of Playwright's
 * aria snapshot — lines look like `- link "ghumeabhi04 — home":`.
 */
const computedNames = async scope => {
  const snapshot = await scope.ariaSnapshot();
  return [...snapshot.matchAll(/^\s*-\s+(?:link|button)\s+"([^"]*)"/gm)].map(m => normalise(m[1]));
};

// Both widths, because the page swaps controls at the `sm` breakpoint rather
// than restyling them: the hero's "Live chat" and the nav's menu sheet exist
// only below 640px, the résumé link only above. Sweeping one width silently
// skips whichever half is display:none.
for (const [label, viewport] of [
  ['desktop', { width: 1400, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  test(`every labelled control satisfies WCAG 2.5.3 Label in Name (${label})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    // `load`, not `networkidle`: every other spec in this repo waits on a
    // deterministic signal, and networkidle hangs on a page that keeps any
    // long-lived connection open. The locator below waits for what it needs.
    await page.goto('/', { waitUntil: 'load' });
    await page.locator('nav').first().waitFor();

    // Open the mobile menu so the sheet's links are rendered and checkable —
    // otherwise the whole mobile nav is display:none and gets skipped.
    const menu = page.getByRole('button', { name: /open menu/i });
    if (await menu.isVisible()) await menu.click();

    const labelled = (await controls(page)).filter(c => normalise(c.visible));

    // Guard the model above before trusting it: every name it derived must be
    // one the browser actually computed. Without this the sweep could compare
    // against a string no assistive tech ever sees and still report green.
    const real = await computedNames(page.locator('body'));
    const unmodelled = labelled.filter(c => !real.includes(normalise(c.accessible)));
    expect(
      unmodelled.map(c => `<${c.tag}> "${c.accessible}"`),
      'derived accessible name is not one the browser computed — the model in ' +
        'controls() no longer covers every control on this page'
    ).toEqual([]);

    const violations = labelled.filter(
      c => !normalise(c.accessible).includes(normalise(c.visible))
    );

    expect(
      violations,
      `accessible name must contain the visible label:\n${violations
        .map(v => `  <${v.tag}> visible "${v.visible.trim()}" vs accessible name "${v.accessible}"`)
        .join('\n')}`
    ).toEqual([]);

    // The sweep is only meaningful if it saw something; a selector that silently
    // matched nothing would also report zero violations.
    expect(labelled.length).toBeGreaterThan(10);
  });
}

test('the wordmark is reachable by the name it displays', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });

  // Scoped to the nav so the test still says what it means if the wordmark text
  // ever appears elsewhere on the page. getByRole matches on the *computed*
  // accessible name, so this passing is itself the assertion — a voice-control
  // user saying "ghumeabhi04" reaches this link.
  await expect(
    page
      .locator('nav')
      .first()
      .getByRole('link', { name: /ghumeabhi04/i })
  ).toBeVisible();
});
