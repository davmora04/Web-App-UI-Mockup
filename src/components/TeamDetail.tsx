import React from 'react';
import { ArrowLeft, Trophy, BarChart3, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useApp, teams, matches } from './AppContext';
import { MatchCard } from './MatchCard';

interface TeamDetailProps {
  teamId: string;
  onBack?: () => void;
  onViewMatch?: (matchId: string) => void;
  onViewHeadToHead?: (opponentId: string) => void;
}

export const TeamDetail: React.FC<TeamDetailProps> = ({ teamId, onBack, onViewMatch }) => {
  const { favorites, addToFavorites, removeFromFavorites, t } = useApp();

  const team = teams.find(t => t.id === teamId);
  const teamMatches = matches.filter(m =>
    m.homeTeam.id === teamId || m.awayTeam.id === teamId
  );

  const isFavorite = favorites.some(fav => fav.id === teamId);

  if (!team) {
    return (
      <div className="p-6 text-center">
        <p>{t('teamNotFound')}</p>
        <Button onClick={onBack} className="mt-4">
          {t('back')}
        </Button>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(teamId);
    } else {
      addToFavorites(team);
    }
  };

  const getFormBadges = (form?: ('W' | 'D' | 'L')[]) => {
    if (!form) return null;

    return (
      <div className="flex space-x-1">
        {form.map((result, index) => {
          const colors = {
            W: 'bg-green-500 text-white',
            D: 'bg-yellow-500 text-white',
            L: 'bg-red-500 text-white',
          };

          return (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${colors[result]}`}
            >
              {result}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Button
          variant={isFavorite ? 'default' : 'outline'}
          onClick={toggleFavorite}
        >
          <Star className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
          {isFavorite ? t('inFavorites') : t('addToFavorites')}
        </Button>
      </div>

      {/* Team Header */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="text-6xl">{team.logo}</div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>
                {t('position')}: #{team.position}
              </span>
            </div>
            <Badge variant="secondary">
              {team.points} {t('pointsShort')}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">{t('team_summary')}</TabsTrigger>
          <TabsTrigger value="matches">{t('team_matches')}</TabsTrigger>
          <TabsTrigger value="stats">{t('team_stats')}</TabsTrigger>
        </TabsList>

        {/* Summary */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t('recentForm')} ({t('last5')})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  {getFormBadges(team.form)}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {t('last5')}
                </p>
              </CardContent>
            </Card>

            {/* Basic stats */}
            <Card>
              <CardHeader>
                <CardTitle>{t('thisSeason')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{team.won}</div>
                    <div className="text-sm text-muted-foreground">{t('wins')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{team.drawn}</div>
                    <div className="text-sm text-muted-foreground">{t('draws')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{team.lost}</div>
                    <div className="text-sm text-muted-foreground">{t('losses')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{team.points}</div>
                    <div className="text-sm text-muted-foreground">{t('pointsFull')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next match */}
          <Card>
            <CardHeader>
              <CardTitle>{t('nextMatch')}</CardTitle>
            </CardHeader>
            <CardContent>
              {teamMatches.filter(m => m.status === 'scheduled')[0] ? (
                <MatchCard
                  match={teamMatches.filter(m => m.status === 'scheduled')[0]}
                  onViewDetail={onViewMatch}
                />
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  {t('noUpcomingMatches')}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matches */}
        <TabsContent value="matches" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('allMatches')}</h3>
            {teamMatches.length > 0 ? (
              <div className="grid gap-4">
                {teamMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onViewDetail={onViewMatch}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {t('noMatchesAvailable')}
              </p>
            )}
          </div>
        </TabsContent>

        {/* Statistics */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Attack */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>{t('attack')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('goalsForLong')}</span>
                  <span className="font-bold">{team.goalsFor}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('avgPerGame')}</span>
                  <span className="font-bold">
                    {((team.goalsFor || 0) / (team.played || 1)).toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Defense */}
            <Card>
              <CardHeader>
                <CardTitle>{t('defense')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('goalsAgainstLong')}</span>
                  <span className="font-bold">{team.goalsAgainst}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('avgPerGame')}</span>
                  <span className="font-bold">
                    {((team.goalsAgainst || 0) / (team.played || 1)).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('goalDifferenceLong')}</span>
                  <span
                    className={`font-bold ${
                      (team.goalDifference || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {(team.goalDifference || 0) >= 0 ? '+' : ''}
                    {team.goalDifference}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
