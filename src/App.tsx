import React from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NewsPage } from './components/NewsPage';
import { TablePage } from './components/TablePage';
import { CalendarPage } from './components/CalendarPage';
import { AuthPage } from './components/AuthPage';
import { SettingsPage } from './components/SettingsPage';
import { TeamDetail } from './components/TeamDetail';
import { MatchDetail } from './components/MatchDetail';
import { HeadToHead } from './components/HeadToHead';
import { ProfilePage } from './components/ProfilePage';
import { SearchResults } from './components/SearchResults';
import { OnboardingTour } from './components/OnboardingTour';
import { Toaster } from './components/ui/sonner';

interface SearchResults {
  teams: any[];
  leagues: any[];
  news: any[];
  matches: any[];
}

interface AppState {
  selectedNewsId?: string;
  selectedMatchId?: string;
  selectedTeamId?: string;
  headToHeadTeams?: [string, string];
  searchResults?: SearchResults;
  searchQuery?: string;
}

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [appState, setAppState] = React.useState<AppState>({});
  const [showTour, setShowTour] = React.useState(false);

  // Verificar si es la primera vez del usuario
  React.useEffect(() => {
    const tourCompleted = localStorage.getItem('statfut-tour-completed');
    console.log('Tour completed:', tourCompleted); // Debug
    
    // Siempre mostrar el tour para testing - puedes comentar esta línea en producción
    localStorage.removeItem('statfut-tour-completed');
    
    if (!tourCompleted) {
      setTimeout(() => setShowTour(true), 500); // Delay más corto para mejor UX
    }
  }, []);

  const handleViewMatchDetail = (matchId: string) => {
    setAppState(prev => ({ ...prev, selectedMatchId: matchId }));
    setCurrentPage('match-detail');
  };

  const handleViewNewsDetail = (newsId: string | undefined) => {
    setAppState(prev => ({ ...prev, selectedNewsId: newsId }));
  };

  const handleViewTeamDetail = (teamId: string) => {
    setAppState(prev => ({ ...prev, selectedTeamId: teamId }));
    setCurrentPage('team-detail');
  };

  const handleViewHeadToHead = (teamAId: string, teamBId: string) => {
    setAppState(prev => ({ ...prev, headToHeadTeams: [teamAId, teamBId] }));
    setCurrentPage('head-to-head');
  };

  const handleBackNavigation = () => {
    // Resetear estado y volver a la página anterior
    setAppState({});
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onViewMatchDetail={handleViewMatchDetail}
            onViewTeamDetail={handleViewTeamDetail}
          />
        );
      
      case 'news':
        return (
          <NewsPage 
            selectedNewsId={appState.selectedNewsId}
            onSelectNews={handleViewNewsDetail}
          />
        );
      
      case 'table':
        return (
          <TablePage 
            onViewTeamDetail={handleViewTeamDetail}
          />
        );
      
      case 'calendar':
        return (
          <CalendarPage 
            onViewMatchDetail={handleViewMatchDetail}
          />
        );
      
      case 'auth':
        return <AuthPage />;
      
      case 'settings':
        return <SettingsPage />;

      case 'profile':
        return <ProfilePage />;

      case 'team-detail':
        return appState.selectedTeamId ? (
          <TeamDetail 
            teamId={appState.selectedTeamId}
            onBack={handleBackNavigation}
            onViewMatch={handleViewMatchDetail}
            onViewHeadToHead={(opponentId) => 
              handleViewHeadToHead(appState.selectedTeamId!, opponentId)
            }
          />
        ) : (
          <HomePage onViewMatchDetail={handleViewMatchDetail} />
        );

      case 'match-detail':
        return appState.selectedMatchId ? (
          <MatchDetail 
            matchId={appState.selectedMatchId}
            onBack={handleBackNavigation}
            onViewTeamDetail={handleViewTeamDetail}
          />
        ) : (
          <HomePage onViewMatchDetail={handleViewMatchDetail} />
        );

      case 'head-to-head':
        return appState.headToHeadTeams ? (
          <HeadToHead 
            teamAId={appState.headToHeadTeams[0]}
            teamBId={appState.headToHeadTeams[1]}
            onBack={handleBackNavigation}
          />
        ) : (
          <HomePage onViewMatchDetail={handleViewMatchDetail} />
        );

      case 'search-results':
        return appState.searchResults ? (
          <SearchResults
            results={appState.searchResults}
            query={appState.searchQuery || ''}
            onBack={() => setCurrentPage('home')}
            onViewTeamDetail={handleViewTeamDetail}
            onViewMatchDetail={handleViewMatchDetail}
            onViewNewsDetail={handleViewNewsDetail}
            onSelectLeague={(leagueId: string) => {
              setAppState(prev => ({ ...prev, selectedLeagueId: leagueId }));
              setCurrentPage('table');
            }}
          />
        ) : (
          <HomePage onViewMatchDetail={handleViewMatchDetail} />
        );
      
      default:
        return (
          <HomePage 
            onViewMatchDetail={handleViewMatchDetail}
            onViewTeamDetail={handleViewTeamDetail}
          />
        );
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // Buscar en equipos, ligas, noticias y partidos
    import('./components/AppContext').then(({ teams, leagues, news, matches }) => {
      const results = {
        teams: teams.filter(team => 
          team.name.toLowerCase().includes(query.toLowerCase())
        ),
        leagues: leagues.filter(league => 
          league.name.toLowerCase().includes(query.toLowerCase()) ||
          league.country.toLowerCase().includes(query.toLowerCase())
        ),
        news: news.filter(article => 
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.summary.toLowerCase().includes(query.toLowerCase())
        ),
        matches: matches.filter(match =>
          match.homeTeam.name.toLowerCase().includes(query.toLowerCase()) ||
          match.awayTeam.name.toLowerCase().includes(query.toLowerCase())
        )
      };
      
      // Si encontramos resultados, mostrar la página de búsqueda
      if (results.teams.length > 0 || results.leagues.length > 0 || 
          results.news.length > 0 || results.matches.length > 0) {
        setAppState(prev => ({ ...prev, searchResults: results, searchQuery: query }));
        setCurrentPage('search-results');
      } else {
        // Mostrar mensaje de no resultados
        import('sonner').then(({ toast }) => {
          toast.error(`No se encontraron resultados para "${query}"`);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSearch={handleSearch}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <OnboardingTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
      />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}