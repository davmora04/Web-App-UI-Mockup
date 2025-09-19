import React from 'react';
import { ArrowLeft, TrendingUp, Target, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useApp, teams, Team } from './AppContext';

interface HeadToHeadProps {
  teamAId: string;
  teamBId: string;
  onBack?: () => void;
}

// Datos mock para el historial H2H
const mockH2HMatches = [
  { date: '2024-10-26', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 2, awayScore: 1, venue: 'Santiago Bernabéu' },
  { date: '2024-04-21', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 1, awayScore: 3, venue: 'Camp Nou' },
  { date: '2023-10-28', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 1, awayScore: 2, venue: 'Santiago Bernabéu' },
  { date: '2023-03-19', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 0, awayScore: 4, venue: 'Camp Nou' },
  { date: '2022-10-16', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 3, awayScore: 1, venue: 'Santiago Bernabéu' }
];

export const HeadToHead: React.FC<HeadToHeadProps> = ({ teamAId, teamBId, onBack }) => {
  const { t } = useApp();
  
  const teamA = teams.find(t => t.id === teamAId);
  const teamB = teams.find(t => t.id === teamBId);

  if (!teamA || !teamB) {
    return (
      <div className="p-6 text-center">
        <p>Equipos no encontrados</p>
        <Button onClick={onBack} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  // Calcular estadísticas del H2H
  const calculateH2HStats = () => {
    let teamAWins = 0;
    let teamBWins = 0;
    let draws = 0;
    let teamAGoals = 0;
    let teamBGoals = 0;

    mockH2HMatches.forEach(match => {
      const isTeamAHome = match.homeTeam === teamA.name;
      const teamAScore = isTeamAHome ? match.homeScore : match.awayScore;
      const teamBScore = isTeamAHome ? match.awayScore : match.homeScore;

      teamAGoals += teamAScore;
      teamBGoals += teamBScore;

      if (teamAScore > teamBScore) teamAWins++;
      else if (teamBScore > teamAScore) teamBWins++;
      else draws++;
    });

    return {
      teamAWins,
      teamBWins,
      draws,
      teamAGoals,
      teamBGoals,
      totalMatches: mockH2HMatches.length
    };
  };

  const stats = calculateH2HStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getMatchResultForTeam = (match: any, teamName: string) => {
    const isHome = match.homeTeam === teamName;
    const teamScore = isHome ? match.homeScore : match.awayScore;
    const opponentScore = isHome ? match.awayScore : match.homeScore;

    if (teamScore > opponentScore) return 'W';
    if (teamScore < opponentScore) return 'L';
    return 'D';
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500 text-white';
      case 'L': return 'bg-red-500 text-white';
      case 'D': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      {/* Head to Head Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {/* Team A */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <span className="text-4xl">{teamA.logo}</span>
              <h2 className="text-xl font-bold text-center">{teamA.name}</h2>
              <Badge variant="outline">#{teamA.position}</Badge>
            </div>

            {/* VS and Overall Record */}
            <div className="text-center mx-8">
              <div className="text-4xl font-bold mb-2">VS</div>
              <div className="text-sm text-muted-foreground">
                Últimos {stats.totalMatches} enfrentamientos
              </div>
            </div>

            {/* Team B */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <span className="text-4xl">{teamB.logo}</span>
              <h2 className="text-xl font-bold text-center">{teamB.name}</h2>
              <Badge variant="outline">#{teamB.position}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Estadísticas generales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Estadísticas H2H</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Victorias */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Victorias</span>
                <span>{stats.teamAWins} - {stats.teamBWins}</span>
              </div>
              <Progress 
                value={(stats.teamAWins / stats.totalMatches) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{teamA.name}</span>
                <span>{teamB.name}</span>
              </div>
            </div>

            {/* Empates */}
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.draws}</div>
              <div className="text-sm text-muted-foreground">Empates</div>
            </div>

            {/* Goles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.teamAGoals}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>Goles</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.teamBGoals}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>Goles</span>
                </div>
              </div>
            </div>

            {/* Promedio de goles */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-bold">
                {((stats.teamAGoals + stats.teamBGoals) / stats.totalMatches).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Promedio de goles por partido
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparación actual */}
        <Card>
          <CardHeader>
            <CardTitle>Comparación Temporada Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Puntos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{teamA.points}</div>
                <div className="text-sm text-muted-foreground">Puntos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{teamB.points}</div>
                <div className="text-sm text-muted-foreground">Puntos</div>
              </div>
            </div>

            {/* Forma */}
            <div>
              <div className="text-sm font-medium mb-2">Forma (Últimos 5)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center space-x-1">
                  {teamA.form?.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getResultColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-1">
                  {teamB.form?.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getResultColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estadísticas adicionales */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Goles a favor</span>
                  <span className="font-medium">{teamA.goalsFor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goles en contra</span>
                  <span className="font-medium">{teamA.goalsAgainst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diferencia</span>
                  <span className={`font-medium ${(teamA.goalDifference || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(teamA.goalDifference || 0) >= 0 ? '+' : ''}{teamA.goalDifference}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Goles a favor</span>
                  <span className="font-medium">{teamB.goalsFor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goles en contra</span>
                  <span className="font-medium">{teamB.goalsAgainst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diferencia</span>
                  <span className={`font-medium ${(teamB.goalDifference || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(teamB.goalDifference || 0) >= 0 ? '+' : ''}{teamB.goalDifference}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de partidos */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Últimos 5 Enfrentamientos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockH2HMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground min-w-[80px]">
                    {formatDate(match.date)}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{match.homeTeam === teamA.name ? teamA.logo : teamB.logo}</span>
                    <span className="font-medium min-w-[120px] text-sm">
                      {match.homeTeam}
                    </span>
                  </div>

                  <div className="font-bold">
                    {match.homeScore} - {match.awayScore}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-medium min-w-[120px] text-sm text-right">
                      {match.awayTeam}
                    </span>
                    <span className="text-lg">{match.awayTeam === teamA.name ? teamA.logo : teamB.logo}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getResultColor(getMatchResultForTeam(match, teamA.name))}`}>
                    {getMatchResultForTeam(match, teamA.name)}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getResultColor(getMatchResultForTeam(match, teamB.name))}`}>
                    {getMatchResultForTeam(match, teamB.name)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};