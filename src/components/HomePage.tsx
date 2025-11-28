import React from 'react';
import { Sidebar } from './Sidebar';
import { MatchCard } from './MatchCard';
import { useApp } from './AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bell, MessageCircle, Zap, AlertTriangle, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { DragDropFavorites } from './DragDropFavorites';

interface HomePageProps {
  onViewMatchDetail?: (matchId: string) => void;
  onViewTeamDetail?: (teamId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onViewMatchDetail, onViewTeamDetail }) => {
  const { selectedLeague, selectedSeason, favorites, t, matches, leagues } = useApp();
  const [showDragDrop, setShowDragDrop] = React.useState(false);

  const leagueMatches = matches.filter(match => match.league === selectedLeague);
  const filteredMatches = (leagueMatches.length > 0 ? leagueMatches : matches).slice(0, 5);

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
                  {t('leagueSeason', { country: currentLeague?.country ?? '', season: selectedSeason })}
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
                <p>{t('noMatchesAvailable')}</p>
              </div>
            )}
          </section>

          {/* Prueba de Notificaciones */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('testNotifications')}</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>{t('notificationSystem')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => toast.success(t('notif_goal'))}
                    className="flex flex-col items-center space-y-2 h-20"
                  >
                    <Zap className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{t('goalShort')}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => toast.info(t('notif_news'))}
                    className="flex flex-col items-center space-y-2 h-20"
                  >
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">{t('newsShort')}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => toast.warning(t('notif_match_soon'))}
                    className="flex flex-col items-center space-y-2 h-20"
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="text-sm">{t('reminder')}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => toast(t('notif_custom_title'), {
                      description: t('notif_custom_desc'),
                      duration: 4000
                    })}
                    className="flex flex-col items-center space-y-2 h-20"
                  >
                    <Bell className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">{t('custom')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acceso Rápido a Favoritos */}
          <section className="mt-8" data-tour="favorites">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{t('favorites')}</h3>
              {favorites.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDragDrop(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t('reorder')}
                </Button>
              )}
            </div>
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
                  {t('addTeamsToFavorites')}
                </p>
              </div>
            )}
          </section>

          {/* Modal de Drag & Drop */}
          <DragDropFavorites
            isOpen={showDragDrop}
            onClose={() => setShowDragDrop(false)}
          />
        </div>
      </main>
    </div>
  );
};