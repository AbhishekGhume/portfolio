import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main portfolio content', async () => {
    render(<App />);

    // Wait for the loading to complete and check if the main content loads
    await waitFor(
      () => {
        expect(screen.getAllByText('Abhishek').length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });

  it('renders navigation links', async () => {
    render(<App />);

    // Wait for navigation links to be present
    await waitFor(
      () => {
        const navLinks = screen.getAllByRole('link');
        expect(navLinks.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Check for specific navigation items. These labels appear in both the
    // nav and the corresponding section eyebrow, so match on ≥1 occurrence.
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
  });
});
