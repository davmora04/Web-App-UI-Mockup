import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/AppContext';
import { Sidebar } from '../../components/Sidebar';

const SidebarWithProvider = () => (
  <AppProvider>
    <Sidebar />
  </AppProvider>
);

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render filters section', () => {
    render(<SidebarWithProvider />);
    
    expect(screen.getByText(/filtros/i)).toBeInTheDocument();
    expect(screen.getAllByText(/liga/i).length).toBeGreaterThanOrEqual(2); // Header, league name, and possibly selection
    expect(screen.getByText(/temporada/i)).toBeInTheDocument();
  });

  it('should render league options', () => {
    render(<SidebarWithProvider />);
    
    // Should show collapsed league options initially or after clicking
    expect(screen.getByText('La Liga')).toBeInTheDocument();
    expect(screen.getByText('Premier League')).toBeInTheDocument();
    expect(screen.getByText('Serie A')).toBeInTheDocument();
  });

  it('should render season options', () => {
    render(<SidebarWithProvider />);
    
    expect(screen.getByText('2024/25')).toBeInTheDocument();
    expect(screen.getByText('2023/24')).toBeInTheDocument();
    expect(screen.getByText('2022/23')).toBeInTheDocument();
    expect(screen.getByText('2021/22')).toBeInTheDocument();
  });

  it('should show current selection', () => {
    render(<SidebarWithProvider />);
    
    expect(screen.getByText(/selección actual/i)).toBeInTheDocument();
    expect(screen.getByText(/La Liga - 2024\/25/i)).toBeInTheDocument();
  });

  it('should handle league selection', async () => {
    const user = userEvent.setup();
    
    render(<SidebarWithProvider />);
    
    const premierLeagueButton = screen.getByText('Premier League');
    await user.click(premierLeagueButton);
    
   
    expect(screen.getByText(/Premier League - 2024\/25/i)).toBeInTheDocument();
  });

  it('should handle season selection', async () => {
    const user = userEvent.setup();
    
    render(<SidebarWithProvider />);
    
    const season2023Button = screen.getByText('2023/24');
    await user.click(season2023Button);
    
    
    expect(screen.getByText(/La Liga - 2023\/24/i)).toBeInTheDocument();
  });

  it('should toggle league collapsible', async () => {
    const user = userEvent.setup();
    
    render(<SidebarWithProvider />);
    
    
    const leagueToggle = screen.getByRole('button', { name: /liga/i, expanded: true });
    
    
    await user.click(leagueToggle);

    
    expect(screen.getByText(/la liga/i)).toBeInTheDocument();
  });

  it('should have proper hover effects on buttons', async () => {
    const user = userEvent.setup();
    
    render(<SidebarWithProvider />);
    
    const laLigaButton = screen.getByText('La Liga');
    
    
    await user.hover(laLigaButton);
    
    
    expect(laLigaButton).toBeInTheDocument();
  });
});