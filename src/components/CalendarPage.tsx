import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useApp, matches, leagues } from './AppContext';

interface CalendarPageProps {
  onViewMatchDetail?: (matchId: string) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onViewMatchDetail }) => {
  const { selectedLeague, t, formatDate, formatTime } = useApp();

  const currentLeague = leagues.find(l => l.id === selectedLeague);
  
  // Filtrar partidos por liga seleccionada
  const filteredMatches = matches.filter(match => match.league === selectedLeague);

  // Agrupar partidos por fecha
  const groupedMatches = filteredMatches.reduce((groups, match) => {
    const date = new Date(match.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {} as Record<string, typeof matches>);

  const formatDayLabel = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const tmw = new Date(today); tmw.setDate(today.getDate() + 1);
  const yest = new Date(today); yest.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return t('today_time');
  if (d.toDateString() === tmw.toDateString()) return t('tomorrow_time');
  if (d.toDateString() === yest.toDateString()) return t('yesterday_time');
  return formatDate(d, { weekday: 'long', day: 'numeric', month: 'long' });
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
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

  const getVenueBadge = (isHome: boolean) => {
    return (
      <Badge variant="outline" className="text-xs">
        <MapPin className="h-3 w-3 mr-1" />
        {isHome ? t('homeTeam') : t('awayTeam')}
      </Badge>
    );
  };

  // Obtener zona horaria del usuario
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('calendar')}</h1>
            <p className="text-muted-foreground">
              {currentLeague?.name} • {t('timezone')}: {userTimezone}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de partidos agrupados por fecha */}
      <div className="space-y-6">
        {Object.entries(groupedMatches)
          .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
          .map(([date, dayMatches]) => (
            <div key={date}>
              {/* Encabezado de fecha */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-primary">
                  {formatDayLabel(date)}
                </h2>
                <div className="w-full h-px bg-border mt-2"></div>
              </div>

              {/* Partidos del día */}
              <div className="space-y-3">
                {dayMatches
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((match) => (
                    <Card key={match.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          {/* Información del partido */}
                          <div className="flex items-center space-x-4 flex-1">
                            {/* Hora */}
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground min-w-[100px]">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(match.date)}</span>
                            </div>

                            {/* Equipos */}
                            <div className="flex items-center space-x-4 flex-1">
                              {/* Equipo local */}
                              <div className="flex items-center space-x-2 min-w-[150px]">
                                <span className="text-xl">{match.homeTeam.logo}</span>
                                <div>
                                  <p className="font-medium">{match.homeTeam.name}</p>
                                  {getVenueBadge(true)}
                                </div>
                              </div>

                              {/* Marcador o VS */}
                              <div className="text-center min-w-[80px]">
                                {match.score && match.status === 'finished' ? (
                                  <div className="text-xl font-bold">
                                    {match.score.home} - {match.score.away}
                                  </div>
                                ) : match.status === 'live' ? (
                                  <div>
                                    <div className="text-lg font-bold">
                                      {match.score?.home || 0} - {match.score?.away || 0}
                                    </div>
                                    <div className="text-xs text-red-500 font-medium">
                                      {match.minute}'
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground font-medium">
                                    {t('vs')}
                                  </div>
                                )}
                              </div>

                              {/* Equipo visitante */}
                              <div className="flex items-center space-x-2 min-w-[150px] justify-end">
                                <div className="text-right">
                                  <p className="font-medium">{match.awayTeam.name}</p>
                                  {getVenueBadge(false)}
                                </div>
                                <span className="text-xl">{match.awayTeam.logo}</span>
                              </div>
                            </div>
                          </div>

                          {/* Estado y acción */}
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(match.status)}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onViewMatchDetail?.(match.id)}
                            >
                              {t('viewDetail')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-muted rounded-lg p-4">
        <p className="text-sm text-muted-foreground text-center">
          {t('allTimesLocal', {tz: userTimezone})}
        </p>
      </div>
    </div>
  );
};