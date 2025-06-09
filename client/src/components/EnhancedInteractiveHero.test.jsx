import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { useInView } from 'framer-motion';

import EnhancedInteractiveHero from './EnhancedInteractiveHero';

// Mock the useInView hook to simulate being in view
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: () => true,  // Simulate component in view
  };
});

describe('EnhancedInteractiveHero', () => {
  test('renders name and title', () => {
    render(<EnhancedInteractiveHero />);
    expect(screen.getByText('Mark Waweru Thuku')).toBeInTheDocument();
    expect(
      screen.getByText(/Software Engineer · Business Strategist · Solutions Architect/)
    ).toBeInTheDocument();
  });

  test('renders social links', () => {
    render(<EnhancedInteractiveHero />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/Waweru37');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/markwaweru37/');
  });

  test('sound toggle works correctly', () => {
    render(<EnhancedInteractiveHero />);
    const soundButton = screen.getByRole('button', { name: /enable sound/i });

    fireEvent.click(soundButton);
    expect(
      screen.getByRole('button', { name: /disable sound/i })
    ).toBeInTheDocument();
  });

  test('resume download button is present', () => {
    render(<EnhancedInteractiveHero />);
    const downloadLink = screen.getByRole('link', { name: /download resume/i });
    expect(downloadLink).toHaveAttribute('download');
  });
});
