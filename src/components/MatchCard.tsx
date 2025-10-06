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
  const { t, formatTime } = useApp();

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

  // Usa las claves: today, yesterday, tomorrow, inDays, daysAgo
  const formatDateBadge = (iso: string) => {
  const MS_PER_DAY = 86_400_000;

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const d = new Date(iso);
  const today = new Date();

  const deltaDays = Math.floor(
    (startOfDay(d).getTime() - startOfDay(today).getTime()) / MS_PER_DAY
  ); // futuro => positivo, pasado => negativo

  if (deltaDays === 0) return t('today_time');
  if (deltaDays === 1) return t('tomorrow_time');
  if (deltaDays === -1) return t('yesterday_time');
  if (deltaDays > 0) return t('inDays', { n: deltaDays });
  return t('daysAgoFull', { n: Math.abs(deltaDays) });
};


  // Resultado W/D/L
  const getTeamResult = (isHome: boolean) => {
    if (match.status !== 'finished' || !match.score) return null;
    const { home, away } = match.score;
    if (home === away) return 'D';
    return isHome ? (home > away ? 'W' : 'L') : (away > home ? 'W' : 'L');
  };

  const getResultChip = (result: 'W' | 'D' | 'L' | null) => {
    if (!result) return null;
    const colors = {
      W: 'bg-green-500 text-white',
      D: 'bg-yellow-500 text-white',
      L: 'bg-red-500 text-white',
    } as const;
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
            <span>{formatDateBadge(match.date)}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{formatTime(match.date)}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center justify-between mb-4">
          {/* Local */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{match.homeTeam.logo}</span>
              <div>
                <p className="font-medium">{match.homeTeam.name}</p>
                <Badge variant="outline" className="text-xs">
                  {t('homeTeam')} {/* asegúrate de tener esta clave */}
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

          {/* Visitante */}
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
          <Button onClick={() => onViewDetail?.(match.id)} variant="outline" size="sm">
            {t('viewDetail')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
