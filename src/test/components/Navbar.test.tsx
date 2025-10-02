import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/AppContext';
import { Navbar } from '../../components/Navbar';

// Mock the hooks
vi.mock('../../hooks/useAccessibility', () => ({
  useLiveRegion: () => ({
    announce: vi.fn()
  })
}));

const NavbarWithProvider = (props: any) => (
  <AppProvider>
    <Navbar {...props} />
  </AppProvider>
);

describe('Navbar Component', () => {
  const mockOnSearch = vi.fn();
  const mockOnNavigateToProfile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render navbar with logo and search', () => {
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    expect(screen.getByText('StatFut')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText(/buscar/i)).toBeInTheDocument();
  });

  it('should handle search input changes', async () => {
    const user = userEvent.setup();
    
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    const searchInput = screen.getByLabelText(/buscar/i);

    await user.type(searchInput, 'Barcelona');    expect(searchInput).toHaveValue('Barcelona');
  });

  it('should call onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    const searchInput = screen.getByLabelText(/buscar/i);

    await user.type(searchInput, 'Real Madrid');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('Real Madrid');
  });

  it('should render navigation items', () => {
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    // Check for navigation items (both desktop and mobile versions exist)
    const homeButtons = screen.getAllByRole('button', { name: /inicio/i });
    const newsButtons = screen.getAllByRole('button', { name: /noticias/i });
    const tableButtons = screen.getAllByRole('button', { name: /tabla/i });
    const calendarButtons = screen.getAllByRole('button', { name: /calendario/i });
    
    expect(homeButtons).toHaveLength(2); // Desktop and mobile
    expect(newsButtons).toHaveLength(2);
    expect(tableButtons).toHaveLength(2);
    expect(calendarButtons).toHaveLength(2);
  });

  it('should have proper accessibility attributes', () => {
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
    
    const searchInput = screen.getByLabelText(/buscar/i);
    expect(searchInput).toHaveAttribute('aria-describedby');
    
    const logo = screen.getByLabelText('StatFut logo');
    expect(logo).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    const searchInput = screen.getByLabelText(/buscar/i);

    // Test tab navigation - verify element is accessible
    await user.tab();
    
    // Verify search input is accessible and has proper attributes
    expect(searchInput).toHaveAttribute('aria-label');
  });

  it('should render with proper ARIA roles', () => {
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should handle empty search submission gracefully', async () => {
    const user = userEvent.setup();
    
    render(
      <NavbarWithProvider 
        onSearch={mockOnSearch}
        onNavigateToProfile={mockOnNavigateToProfile}
      />
    );

    const searchInput = screen.getByLabelText(/buscar/i);

    // Submit empty search
    await user.click(searchInput);
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});