import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useApp, Match } from './AppContext';

interface MatchCardProps {
  match: Match;
  onViewDetail?: (matchId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onViewDetail }) => {
  const { t } = useApp();

  const getStatusBadge = () => {
    switch (match.status) {
      case 'finished':
        return <Badge variant="default">{t('finished')}</Badge>;
      case 'live':
        return <Badge variant="destructive">{t('live')}</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">{t('scheduled')}</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays === -1) {
      return 'Mañana';
    } else if (diffDays < 0) {
      return `En ${Math.abs(diffDays)} días`;
    } else {
      return `Hace ${diffDays} días`;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Determinar el resultado para cada equipo (W/D/L)
  const getTeamResult = (isHome: boolean) => {
    if (match.status !== 'finished' || !match.score) return null;
    
    const homeGoals = match.score.home;
    const awayGoals = match.score.away;
    
    if (homeGoals === awayGoals) return 'D';
    if (isHome) {
      return homeGoals > awayGoals ? 'W' : 'L';
    } else {
      return awayGoals > homeGoals ? 'W' : 'L';
    }
  };

  const getResultChip = (result: 'W' | 'D' | 'L' | null) => {
    if (!result) return null;
    
    const colors = {
      W: 'bg-green-500 text-white',
      D: 'bg-yellow-500 text-white',
      L: 'bg-red-500 text-white'
    };

    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colors[result]}`}>
        {result}
      </div>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(match.date)}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{formatTime(match.date)}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center justify-between mb-4">
          {/* Equipo Local */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{match.homeTeam.logo}</span>
              <div>
                <p className="font-medium">{match.homeTeam.name}</p>
                <Badge variant="outline" className="text-xs">
                  {t('home')}
                </Badge>
              </div>
            </div>
            {getResultChip(getTeamResult(true))}
          </div>

          {/* Marcador o VS */}
          <div className="flex items-center justify-center min-w-[60px]">
            {match.score && (match.status === 'finished' || match.status === 'live') ? (
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {match.score.home} - {match.score.away}
                </div>
                {match.status === 'live' && (
                  <div className="text-xs text-red-500 font-medium">
                    {match.minute}'
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground font-medium">
                {t('vs')}
              </div>
            )}
          </div>

          {/* Equipo Visitante */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            {getResultChip(getTeamResult(false))}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="font-medium">{match.awayTeam.name}</p>
                <Badge variant="outline" className="text-xs">
                  {t('awayTeam')}
                </Badge>
              </div>
              <span className="text-2xl">{match.awayTeam.logo}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => onViewDetail?.(match.id)}
            variant="outline"
            size="sm"
          >
            {t('viewDetail')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};