import React from 'react';
import { Sidebar } from './Sidebar';
import { MatchCard } from './MatchCard';
import { useApp, matches, leagues } from './AppContext';

interface HomePageProps {
  onViewMatchDetail?: (matchId: string) => void;
  onViewTeamDetail?: (teamId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onViewMatchDetail, onViewTeamDetail }) => {
  const { selectedLeague, favorites, t } = useApp();

  // Filtrar partidos por liga seleccionada
  const filteredMatches = matches
    .filter(match => match.league === selectedLeague)
    .slice(0, 5); // Mostrar solo los últimos 5

  const currentLeague = leagues.find(l => l.id === selectedLeague);

  return (
    <div className="flex h-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl">{currentLeague?.logo}</span>
              <div>
                <h1 className="text-3xl font-bold">{currentLeague?.name}</h1>
                <p className="text-muted-foreground">
                  {currentLeague?.country} • Temporada 2024/25
                </p>
              </div>
            </div>
          </div>

          {/* Últimos Partidos */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('latestMatches')}</h2>
            
            {filteredMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onViewDetail={onViewMatchDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay partidos disponibles para esta liga.</p>
              </div>
            )}
          </section>

          {/* Acceso Rápido a Favoritos */}
          <section className="mt-8">
            <h3 className="text-xl font-bold mb-4">{t('favorites')}</h3>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {favorites.slice(0, 6).map((team) => (
                  <div
                    key={team.id}
                    onClick={() => onViewTeamDetail?.(team.id)}
                    className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{team.logo}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{team.name}</p>
                        <p className="text-sm text-muted-foreground">
                          #{team.position} • {team.points} pts
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-4">
                <p className="text-muted-foreground text-center">
                  Añade equipos a tus favoritos para acceso rápido
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};