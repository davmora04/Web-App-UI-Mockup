import React from 'react';
import { ArrowLeft, Search, Users, Globe, Newspaper, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useApp } from './AppContext';

interface SearchResult {
  teams: any[];
  leagues: any[];
  news: any[];
  matches: any[];
}

interface SearchResultsProps {
  results: SearchResult;
  query: string;
  onBack: () => void;
  onViewTeamDetail: (teamId: string) => void;
  onViewMatchDetail: (matchId: string) => void;
  onViewNewsDetail: (newsId: string) => void;
  onSelectLeague: (leagueId: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onBack,
  onViewTeamDetail,
  onViewMatchDetail,
  onViewNewsDetail,
  onSelectLeague
}) => {
  const { } = useApp();

  const totalResults = results.teams.length + results.leagues.length + 
                      results.news.length + results.matches.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {totalResults} resultado{totalResults !== 1 ? 's' : ''} para "{query}"
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Equipos */}
        {results.teams.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Equipos ({results.teams.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {results.teams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => onViewTeamDetail(team.id)}
                    className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{team.logo}</span>
                    <div className="flex-1">
                      <p className="font-medium">{team.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>#{team.position}</span>
                        <Badge variant="outline" className="text-xs">
                          {team.points} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ligas */}
        {results.leagues.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Ligas ({results.leagues.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {results.leagues.map((league) => (
                  <div
                    key={league.id}
                    onClick={() => {
                      onSelectLeague(league.id);
                      onBack();
                    }}
                    className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{league.logo}</span>
                    <div className="flex-1">
                      <p className="font-medium">{league.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {league.country} • {league.season}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Partidos */}
        {results.matches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Partidos ({results.matches.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {results.matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => onViewMatchDetail(match.id)}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Equipo local */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{match.homeTeam.logo}</span>
                        <span className="font-medium">{match.homeTeam.name}</span>
                      </div>
                      
                      {/* Marcador o VS */}
                      <div className="text-center min-w-[60px]">
                        {match.score && match.status === 'finished' ? (
                          <span className="text-lg font-bold">
                            {match.score.home} - {match.score.away}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">vs</span>
                        )}
                      </div>
                      
                      {/* Equipo visitante */}
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{match.awayTeam.name}</span>
                        <span className="text-lg">{match.awayTeam.logo}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        match.status === 'live' ? 'destructive' :
                        match.status === 'finished' ? 'default' : 'secondary'
                      }>
                        {match.status === 'live' ? 'En Vivo' :
                         match.status === 'finished' ? 'Finalizado' : 'Programado'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(match.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Noticias */}
        {results.news.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5" />
                <span>Noticias ({results.news.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {results.news.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onViewNewsDetail(article.id)}
                    className="p-4 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <h3 className="font-medium mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sin resultados */}
        {totalResults === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
              <p className="text-muted-foreground mb-4">
                Intenta con otros términos de búsqueda
              </p>
              <Button variant="outline" onClick={onBack}>
                Volver al inicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};