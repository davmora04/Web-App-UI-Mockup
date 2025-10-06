import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider, useApp } from '../../components/AppContext';
import { ReactNode } from 'react';

// Test component to access context
const TestComponent = ({ children }: { children?: ReactNode }) => {
  const {
    language,
    theme,
    currentPage,
    selectedLeague,
    selectedSeason,
    favorites,
    setLanguage,
    setTheme,
    setCurrentPage,
    setSelectedLeague,
    setSelectedSeason,
    addToFavorites,
    removeFromFavorites,
    t
  } = useApp();

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="currentPage">{currentPage}</div>
      <div data-testid="selectedLeague">{selectedLeague}</div>
      <div data-testid="selectedSeason">{selectedSeason}</div>
      <div data-testid="favoritesCount">{favorites.length}</div>
      <div data-testid="translation">{t('home')}</div>
      
      <button onClick={() => setLanguage('en')} data-testid="setLanguageEn">
        Set English
      </button>
      <button onClick={() => setLanguage('es')} data-testid="setLanguageEs">
        Set Spanish
      </button>
      <button onClick={() => setTheme('light')} data-testid="setThemeLight">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="setThemeDark">
        Set Dark
      </button>
      <button onClick={() => setCurrentPage('news')} data-testid="setPageNews">
        Set News Page
      </button>
      <button onClick={() => setSelectedLeague('premier')} data-testid="setLeaguePremier">
        Set Premier League
      </button>
      <button onClick={() => setSelectedSeason('2023/24')} data-testid="setSeason2023">
        Set 2023/24 Season
      </button>
      <button 
        onClick={() => addToFavorites({
          id: 'test-team',
          name: 'Test Team',
          logo: '⚽',
          position: 1,
          points: 30
        })} 
        data-testid="addFavorite"
      >
        Add Favorite
      </button>
      <button onClick={() => removeFromFavorites('test-team')} data-testid="removeFavorite">
        Remove Favorite
      </button>
      {children}
    </div>
  );
};

describe('AppContext Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide default context values', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('es');
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('currentPage')).toHaveTextContent('home');
    expect(screen.getByTestId('selectedLeague')).toHaveTextContent('laliga');
    expect(screen.getByTestId('selectedSeason')).toHaveTextContent('2024/25');
    expect(screen.getByTestId('favoritesCount')).toHaveTextContent('0');
  });

  it('should handle language changes', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('translation')).toHaveTextContent('Inicio');

    await user.click(screen.getByTestId('setLanguageEn'));

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('Home');

    await user.click(screen.getByTestId('setLanguageEs'));

    expect(screen.getByTestId('language')).toHaveTextContent('es');
    expect(screen.getByTestId('translation')).toHaveTextContent('Inicio');
  });

  it('should handle theme changes', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    await user.click(screen.getByTestId('setThemeLight'));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');

    await user.click(screen.getByTestId('setThemeDark'));

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should handle page navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('currentPage')).toHaveTextContent('home');

    await user.click(screen.getByTestId('setPageNews'));

    expect(screen.getByTestId('currentPage')).toHaveTextContent('news');
  });

  it('should handle league selection', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('selectedLeague')).toHaveTextContent('laliga');

    await user.click(screen.getByTestId('setLeaguePremier'));

    expect(screen.getByTestId('selectedLeague')).toHaveTextContent('premier');
  });

  it('should handle season selection', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('selectedSeason')).toHaveTextContent('2024/25');

    await user.click(screen.getByTestId('setSeason2023'));

    expect(screen.getByTestId('selectedSeason')).toHaveTextContent('2023/24');
  });

  it('should handle favorites management', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('favoritesCount')).toHaveTextContent('0');

    await user.click(screen.getByTestId('addFavorite'));

    expect(screen.getByTestId('favoritesCount')).toHaveTextContent('1');

    await user.click(screen.getByTestId('removeFavorite'));

    expect(screen.getByTestId('favoritesCount')).toHaveTextContent('0');
  });

  it('should persist language and theme to localStorage', async () => {
    const user = userEvent.setup();
    
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await user.click(screen.getByTestId('setLanguageEn'));
    await user.click(screen.getByTestId('setThemeLight'));

    // Check localStorage calls
    expect(localStorage.setItem).toHaveBeenCalledWith('statfut-language', '"en"');
    expect(localStorage.setItem).toHaveBeenCalledWith('statfut-theme', '"light"');
  });

  it('should handle context provider error', () => {
    // Test component outside provider should throw error
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useApp must be used within an AppProvider');
  });
});