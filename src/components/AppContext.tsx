import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage, useFavorites } from '../hooks';

// Tipos de datos
export interface Team {
  id: string;
  name: string;
  logo: string;
  position?: number;
  points?: number;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  form?: ('W' | 'D' | 'L')[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  score?: { home: number; away: number };
  status: 'scheduled' | 'live' | 'finished';
  league: string;
  minute?: number;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  date: string;
  image: string;
  category: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  season: string;
}

// Datos mock
export const leagues: League[] = [
  { id: 'laliga', name: 'La Liga', country: 'España', logo: '🇪🇸', season: '2024/25' },
  { id: 'premier', name: 'Premier League', country: 'Inglaterra', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', season: '2024/25' },
  { id: 'seriea', name: 'Serie A', country: 'Italia', logo: '🇮🇹', season: '2024/25' }
];

export const teams: Team[] = [
  // La Liga
  { id: 'real-madrid', name: 'Real Madrid', logo: '⚪', position: 1, points: 45, played: 18, won: 14, drawn: 3, lost: 1, goalsFor: 42, goalsAgainst: 15, goalDifference: 27, form: ['W', 'W', 'D', 'W', 'W'] },
  { id: 'barcelona', name: 'Barcelona', logo: '🔵', position: 2, points: 41, played: 18, won: 13, drawn: 2, lost: 3, goalsFor: 45, goalsAgainst: 20, goalDifference: 25, form: ['W', 'L', 'W', 'W', 'D'] },
  { id: 'atletico', name: 'Atlético Madrid', logo: '🔴', position: 3, points: 38, played: 18, won: 11, drawn: 5, lost: 2, goalsFor: 28, goalsAgainst: 16, goalDifference: 12, form: ['D', 'W', 'W', 'D', 'W'] },
  
  // Premier League
  { id: 'liverpool', name: 'Liverpool', logo: '🔴', position: 1, points: 48, played: 19, won: 15, drawn: 3, lost: 1, goalsFor: 47, goalsAgainst: 19, goalDifference: 28, form: ['W', 'W', 'W', 'D', 'W'] },
  { id: 'arsenal', name: 'Arsenal', logo: '🔴', position: 2, points: 43, played: 19, won: 13, drawn: 4, lost: 2, goalsFor: 40, goalsAgainst: 20, goalDifference: 20, form: ['W', 'D', 'W', 'W', 'L'] },
  { id: 'chelsea', name: 'Chelsea', logo: '🔵', position: 3, points: 35, played: 19, won: 10, drawn: 5, lost: 4, goalsFor: 38, goalsAgainst: 25, goalDifference: 13, form: ['W', 'W', 'D', 'L', 'W'] },
  
  // Serie A
  { id: 'juventus', name: 'Juventus', logo: '⚫', position: 1, points: 47, played: 20, won: 14, drawn: 5, lost: 1, goalsFor: 35, goalsAgainst: 12, goalDifference: 23, form: ['W', 'D', 'W', 'W', 'W'] },
  { id: 'milan', name: 'AC Milan', logo: '🔴', position: 2, points: 43, played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 41, goalsAgainst: 22, goalDifference: 19, form: ['W', 'W', 'L', 'W', 'D'] },
  { id: 'inter', name: 'Inter Milan', logo: '🔵', position: 3, points: 42, played: 19, won: 13, drawn: 3, lost: 3, goalsFor: 43, goalsAgainst: 18, goalDifference: 25, form: ['W', 'W', 'W', 'L', 'W'] }
];

export const matches: Match[] = [
  {
    id: 'match1',
    homeTeam: teams.find(t => t.id === 'real-madrid')!,
    awayTeam: teams.find(t => t.id === 'barcelona')!,
    date: '2025-01-05T20:00:00Z',
    score: { home: 2, away: 1 },
    status: 'finished',
    league: 'laliga'
  },
  {
    id: 'match2',
    homeTeam: teams.find(t => t.id === 'liverpool')!,
    awayTeam: teams.find(t => t.id === 'arsenal')!,
    date: '2025-01-06T15:00:00Z',
    status: 'scheduled',
    league: 'premier'
  },
  {
    id: 'match3',
    homeTeam: teams.find(t => t.id === 'juventus')!,
    awayTeam: teams.find(t => t.id === 'milan')!,
    date: '2025-01-04T18:00:00Z',
    score: { home: 1, away: 0 },
    status: 'finished',
    league: 'seriea'
  },
  {
    id: 'match4',
    homeTeam: teams.find(t => t.id === 'chelsea')!,
    awayTeam: teams.find(t => t.id === 'liverpool')!,
    date: '2025-01-07T17:30:00Z',
    status: 'scheduled',
    league: 'premier'
  },
  {
    id: 'match5',
    homeTeam: teams.find(t => t.id === 'inter')!,
    awayTeam: teams.find(t => t.id === 'juventus')!,
    date: '2025-01-08T20:45:00Z',
    status: 'scheduled',
    league: 'seriea'
  }
];

export const news: News[] = [
  {
    id: 'news1',
    title: 'Real Madrid vence al Barcelona en El Clásico',
    summary: 'Los blancos se imponen 2-1 en Santiago Bernabéu con goles de Vinicius y Bellingham.',
    content: 'El Real Madrid se impuso por 2-1 al Barcelona en un emocionante Clásico disputado en el Santiago Bernabéu. Los goles de Vinicius Jr. en el minuto 23 y Jude Bellingham en el 67 dieron la victoria a los merengues, que mantienen así su liderato en La Liga. Robert Lewandowski había adelantado a los culés en el minuto 15, pero no fue suficiente para evitar la derrota. Con este resultado, el Real Madrid suma 45 puntos y mantiene cuatro puntos de ventaja sobre su eterno rival.',
    source: 'ESPN',
    date: '2025-01-05T22:30:00Z',
    image: 'https://images.unsplash.com/photo-1634813052369-3584119ccd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHN0YWRpdW18ZW58MXx8fHwxNzU2NTY1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'La Liga'
  },
  {
    id: 'news2',
    title: 'Liverpool mantiene el liderato en la Premier League',
    summary: 'Los Reds siguen invictos en casa y se consolidan en la primera posición.',
    content: 'El Liverpool continúa su impresionante campaña en la Premier League 2024/25. Con 48 puntos en 19 partidos, el equipo dirigido por Jürgen Klopp mantiene cinco puntos de ventaja sobre el Arsenal. Mohamed Salah lidera la tabla de goleadores con 18 tantos, seguido de cerca por Darwin Núñez con 14 goles. La próxima semana enfrentarán al Arsenal en Anfield en lo que promete ser un encuentro decisivo para el título.',
    source: 'Sky Sports',
    date: '2025-01-04T18:15:00Z',
    image: 'https://images.unsplash.com/photo-1728188498253-b1d3e2267842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllcnMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTY2MDc5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Premier League'
  },
  {
    id: 'news3',
    title: 'Juventus se acerca al título de la Serie A',
    summary: 'Los bianconeri vencen al Milan y amplían su ventaja en la cima.',
    content: 'La Juventus dio un paso importante hacia la conquista de la Serie A al vencer 1-0 al AC Milan en el Allianz Stadium. El gol de Federico Chiesa en el minuto 34 fue suficiente para que los turineses ampliaran su ventaja a cuatro puntos sobre sus perseguidores. Con esta victoria, la Vecchia Signora suma 47 puntos en 20 partidos y se perfila como el máximo candidato al Scudetto. El próximo domingo visitarán al Inter de Milán en el Derby d\'Italia.',
    source: 'Gazzetta dello Sport',
    date: '2025-01-04T20:45:00Z',
    image: 'https://images.unsplash.com/photo-1616778551732-6dd1289f567d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHRhY3RpY3MlMjBib2FyZHxlbnwxfHx8fDE3NTY2MDc5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Serie A'
  }
];

// Import translations from dedicated files
import { useTranslation } from '../hooks/useTranslation';

// Import types
import { Language, TranslationKey } from '../locales';

// Contexto
interface AppContextType {
  language: Language;
  theme: 'light' | 'dark';
  currentPage: string;
  selectedLeague: string;
  selectedSeason: string;
  favorites: Team[];
  setLanguage: (language: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentPage: (page: string) => void;
  setSelectedLeague: (league: string) => void;
  setSelectedSeason: (season: string) => void;
  addToFavorites: (team: Team) => void;
  removeFromFavorites: (teamId: string) => void;
  reorderFavorites: (teams: Team[]) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  formatRelativeTime: (date: Date | string) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Use custom hooks for persistent storage
  const [language, setLanguage] = useLocalStorage<'es' | 'en'>('statfut-language', 'es');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('statfut-theme', 'dark');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLeague, setSelectedLeague] = useLocalStorage('statfut-selected-league', 'laliga');
  const [selectedSeason, setSelectedSeason] = useLocalStorage('statfut-selected-season', '2024/25');
  
  // Use custom favorites hook with useReducer
  const {
    favorites,
    addToFavorites: addFavorite,
    removeFromFavorites: removeFavorite,
    reorderFavorites,
    loadFavorites
  } = useFavorites();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('statfut-favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        loadFavorites(parsedFavorites);
      } catch (error) {
        console.warn('Error loading favorites from localStorage:', error);
      }
    }
  }, [loadFavorites]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('statfut-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (team: Team) => {
    addFavorite(team);
  };

  const removeFromFavorites = (teamId: string) => {
    removeFavorite(teamId);
  };

  // Use the advanced translation hook
  const { t, formatRelativeTime, formatDate, formatTime } = useTranslation(language);

  // Aplicar tema a la clase del document
  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const value: AppContextType = {
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
    reorderFavorites,
    t,
    formatRelativeTime,
    formatDate,
    formatTime
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};