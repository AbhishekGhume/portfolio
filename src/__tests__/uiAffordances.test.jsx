

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';

// Navigation reads matchMedia through motion and useThrottledScroll; jsdom has no
// implementation, so give it one that answers "no preference".
beforeEach(() => {
  window.matchMedia ??= query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
  document.documentElement.style.overflow = '';
});

const renderNav = () =>
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

/** Opens the mobile sheet and returns the toggle. */
const openMenu = async () => {
  const toggle = screen.getByRole('button', { name: /open menu/i });
  fireEvent.click(toggle);
  await waitFor(() => expect(screen.getByRole('button', { name: /close menu/i })).toBeTruthy());
  return toggle;
};

describe('mobile menu dismissal', () => {
  it('closes on Escape', async () => {
    renderNav();
    await openMenu();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('button', { name: /close menu/i })).toBeNull());
    expect(screen.getByRole('button', { name: /open menu/i })).toBeTruthy();
  });

  it('closes on a press outside the nav', async () => {
    renderNav();
    await openMenu();

    // pointerdown, not click: the listener uses pointerdown so a press-outside
    // then drag-back-inside still dismisses.
    fireEvent.pointerDown(document.body);

    await waitFor(() => expect(screen.queryByRole('button', { name: /close menu/i })).toBeNull());
  });

  it('does not close on a press inside the nav', async () => {
    renderNav();
    await openMenu();

    // The toggle lives inside the ref'd <nav>, which is what stops the very press
    // that opened the sheet from being read as an outside press.
    fireEvent.pointerDown(screen.getByRole('button', { name: /close menu/i }));

    expect(screen.getByRole('button', { name: /close menu/i })).toBeTruthy();
  });

  it('locks page scroll while open and restores it on close', async () => {
    renderNav();
    await openMenu();

    expect(document.documentElement.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(document.documentElement.style.overflow).toBe(''));
  });

  it('names the sheet it controls', async () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu/i });
    // aria-expanded alone says "something expanded" without saying what.
    expect(toggle.getAttribute('aria-controls')).toBe('mobile-menu');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /close menu/i }).getAttribute('aria-expanded')
      ).toBe('true')
    );
    expect(document.getElementById('mobile-menu')).toBeTruthy();
  });
});
