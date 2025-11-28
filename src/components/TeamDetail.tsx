import React from 'react';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useApp } from './AppContext';
import { MatchCard } from './MatchCard';
import * as api from '../services/api';

interface TeamDetailProps {
  teamId: string;
  onBack?: () => void;
  onViewMatch?: (matchId: string) => void;
  onViewHeadToHead?: (opponentId: string) => void;
}

// Mock players data by team
const mockTeamPlayers: Record<string, any[]> = {
  'team-1': [ // Real Madrid
    { id: 'p1', name: 'Thibaut Courtois', position: 'GK', number: 1, nationality: 'Belgium' },
    { id: 'p2', name: 'Dani Carvajal', position: 'DEF', number: 2, nationality: 'Spain' },
    { id: 'p3', name: 'Éder Militão', position: 'DEF', number: 3, nationality: 'Brazil' },
    { id: 'p4', name: 'David Alaba', position: 'DEF', number: 4, nationality: 'Austria' },
    { id: 'p5', name: 'Jude Bellingham', position: 'MID', number: 5, nationality: 'England' },
    { id: 'p6', name: 'Nacho Fernández', position: 'DEF', number: 6, nationality: 'Spain' },
    { id: 'p7', name: 'Vinícius Júnior', position: 'FWD', number: 7, nationality: 'Brazil' },
    { id: 'p8', name: 'Toni Kroos', position: 'MID', number: 8, nationality: 'Germany' },
    { id: 'p9', name: 'Joselu', position: 'FWD', number: 9, nationality: 'Spain' },
    { id: 'p10', name: 'Luka Modrić', position: 'MID', number: 10, nationality: 'Croatia' },
    { id: 'p11', name: 'Rodrygo', position: 'FWD', number: 11, nationality: 'Brazil' },
    { id: 'p12', name: 'Eduardo Camavinga', position: 'MID', number: 12, nationality: 'France' },
    { id: 'p13', name: 'Andriy Lunin', position: 'GK', number: 13, nationality: 'Ukraine' },
    { id: 'p14', name: 'Aurélien Tchouaméni', position: 'MID', number: 14, nationality: 'France' },
    { id: 'p15', name: 'Federico Valverde', position: 'MID', number: 15, nationality: 'Uruguay' },
    { id: 'p16', name: 'Ferland Mendy', position: 'DEF', number: 23, nationality: 'France' },
  ],
  'team-2': [ // FC Barcelona
    { id: 'p20', name: 'Marc-André ter Stegen', position: 'GK', number: 1, nationality: 'Germany' },
    { id: 'p21', name: 'João Cancelo', position: 'DEF', number: 2, nationality: 'Portugal' },
    { id: 'p22', name: 'Alejandro Balde', position: 'DEF', number: 3, nationality: 'Spain' },
    { id: 'p23', name: 'Ronald Araujo', position: 'DEF', number: 4, nationality: 'Uruguay' },
    { id: 'p24', name: 'Iñigo Martínez', position: 'DEF', number: 5, nationality: 'Spain' },
    { id: 'p25', name: 'Gavi', position: 'MID', number: 6, nationality: 'Spain' },
    { id: 'p26', name: 'Ferran Torres', position: 'FWD', number: 7, nationality: 'Spain' },
    { id: 'p27', name: 'Pedri', position: 'MID', number: 8, nationality: 'Spain' },
    { id: 'p28', name: 'Robert Lewandowski', position: 'FWD', number: 9, nationality: 'Poland' },
    { id: 'p29', name: 'Ansu Fati', position: 'FWD', number: 10, nationality: 'Spain' },
    { id: 'p30', name: 'Raphinha', position: 'FWD', number: 11, nationality: 'Brazil' },
    { id: 'p31', name: 'Iñaki Peña', position: 'GK', number: 13, nationality: 'Spain' },
    { id: 'p32', name: 'Frenkie de Jong', position: 'MID', number: 21, nationality: 'Netherlands' },
    { id: 'p33', name: 'İlkay Gündoğan', position: 'MID', number: 22, nationality: 'Germany' },
    { id: 'p34', name: 'Jules Koundé', position: 'DEF', number: 23, nationality: 'France' },
  ],
  'team-3': [ // Manchester City
    { id: 'p40', name: 'Ederson', position: 'GK', number: 31, nationality: 'Brazil' },
    { id: 'p41', name: 'Kyle Walker', position: 'DEF', number: 2, nationality: 'England' },
    { id: 'p42', name: 'Rúben Dias', position: 'DEF', number: 3, nationality: 'Portugal' },
    { id: 'p43', name: 'John Stones', position: 'DEF', number: 5, nationality: 'England' },
    { id: 'p44', name: 'Nathan Aké', position: 'DEF', number: 6, nationality: 'Netherlands' },
    { id: 'p45', name: 'Mateo Kovačić', position: 'MID', number: 8, nationality: 'Croatia' },
    { id: 'p46', name: 'Erling Haaland', position: 'FWD', number: 9, nationality: 'Norway' },
    { id: 'p47', name: 'Jack Grealish', position: 'FWD', number: 10, nationality: 'England' },
    { id: 'p48', name: 'Rodri', position: 'MID', number: 16, nationality: 'Spain' },
    { id: 'p49', name: 'Kevin De Bruyne', position: 'MID', number: 17, nationality: 'Belgium' },
    { id: 'p50', name: 'Julián Álvarez', position: 'FWD', number: 19, nationality: 'Argentina' },
    { id: 'p51', name: 'Bernardo Silva', position: 'MID', number: 20, nationality: 'Portugal' },
    { id: 'p52', name: 'Joško Gvardiol', position: 'DEF', number: 24, nationality: 'Croatia' },
    { id: 'p53', name: 'Manuel Akanji', position: 'DEF', number: 25, nationality: 'Switzerland' },
    { id: 'p54', name: 'Phil Foden', position: 'MID', number: 47, nationality: 'England' },
  ],
  'liverpool': [ // Liverpool
    { id: 'p60', name: 'Alisson', position: 'GK', number: 1, nationality: 'Brazil' },
    { id: 'p61', name: 'Trent Alexander-Arnold', position: 'DEF', number: 66, nationality: 'England' },
    { id: 'p62', name: 'Virgil van Dijk', position: 'DEF', number: 4, nationality: 'Netherlands' },
    { id: 'p63', name: 'Ibrahima Konaté', position: 'DEF', number: 5, nationality: 'France' },
    { id: 'p64', name: 'Andy Robertson', position: 'DEF', number: 26, nationality: 'Scotland' },
    { id: 'p65', name: 'Wataru Endo', position: 'MID', number: 3, nationality: 'Japan' },
    { id: 'p66', name: 'Alexis Mac Allister', position: 'MID', number: 10, nationality: 'Argentina' },
    { id: 'p67', name: 'Dominik Szoboszlai', position: 'MID', number: 8, nationality: 'Hungary' },
    { id: 'p68', name: 'Mohamed Salah', position: 'FWD', number: 11, nationality: 'Egypt' },
    { id: 'p69', name: 'Darwin Núñez', position: 'FWD', number: 9, nationality: 'Uruguay' },
    { id: 'p70', name: 'Luis Díaz', position: 'FWD', number: 7, nationality: 'Colombia' },
    { id: 'p71', name: 'Cody Gakpo', position: 'FWD', number: 18, nationality: 'Netherlands' },
    { id: 'p72', name: 'Curtis Jones', position: 'MID', number: 17, nationality: 'England' },
    { id: 'p73', name: 'Joe Gomez', position: 'DEF', number: 2, nationality: 'England' },
    { id: 'p74', name: 'Caoimhin Kelleher', position: 'GK', number: 62, nationality: 'Ireland' },
  ],
  'arsenal': [ // Arsenal
    { id: 'p80', name: 'David Raya', position: 'GK', number: 22, nationality: 'Spain' },
    { id: 'p81', name: 'Ben White', position: 'DEF', number: 4, nationality: 'England' },
    { id: 'p82', name: 'William Saliba', position: 'DEF', number: 2, nationality: 'France' },
    { id: 'p83', name: 'Gabriel Magalhães', position: 'DEF', number: 6, nationality: 'Brazil' },
    { id: 'p84', name: 'Oleksandr Zinchenko', position: 'DEF', number: 35, nationality: 'Ukraine' },
    { id: 'p85', name: 'Declan Rice', position: 'MID', number: 41, nationality: 'England' },
    { id: 'p86', name: 'Martin Ødegaard', position: 'MID', number: 8, nationality: 'Norway' },
    { id: 'p87', name: 'Kai Havertz', position: 'MID', number: 29, nationality: 'Germany' },
    { id: 'p88', name: 'Bukayo Saka', position: 'FWD', number: 7, nationality: 'England' },
    { id: 'p89', name: 'Gabriel Jesus', position: 'FWD', number: 9, nationality: 'Brazil' },
    { id: 'p90', name: 'Gabriel Martinelli', position: 'FWD', number: 11, nationality: 'Brazil' },
    { id: 'p91', name: 'Thomas Partey', position: 'MID', number: 5, nationality: 'Ghana' },
    { id: 'p92', name: 'Jorginho', position: 'MID', number: 20, nationality: 'Italy' },
    { id: 'p93', name: 'Takehiro Tomiyasu', position: 'DEF', number: 18, nationality: 'Japan' },
    { id: 'p94', name: 'Aaron Ramsdale', position: 'GK', number: 1, nationality: 'England' },
  ],
  'chelsea': [ // Chelsea
    { id: 'p100', name: 'Robert Sánchez', position: 'GK', number: 1, nationality: 'Spain' },
    { id: 'p101', name: 'Reece James', position: 'DEF', number: 24, nationality: 'England' },
    { id: 'p102', name: 'Thiago Silva', position: 'DEF', number: 6, nationality: 'Brazil' },
    { id: 'p103', name: 'Levi Colwill', position: 'DEF', number: 26, nationality: 'England' },
    { id: 'p104', name: 'Marc Cucurella', position: 'DEF', number: 3, nationality: 'Spain' },
    { id: 'p105', name: 'Enzo Fernández', position: 'MID', number: 8, nationality: 'Argentina' },
    { id: 'p106', name: 'Moisés Caicedo', position: 'MID', number: 25, nationality: 'Ecuador' },
    { id: 'p107', name: 'Conor Gallagher', position: 'MID', number: 23, nationality: 'England' },
    { id: 'p108', name: 'Raheem Sterling', position: 'FWD', number: 7, nationality: 'England' },
    { id: 'p109', name: 'Nicolas Jackson', position: 'FWD', number: 15, nationality: 'Senegal' },
    { id: 'p110', name: 'Mykhaylo Mudryk', position: 'FWD', number: 10, nationality: 'Ukraine' },
    { id: 'p111', name: 'Cole Palmer', position: 'MID', number: 20, nationality: 'England' },
    { id: 'p112', name: 'Malo Gusto', position: 'DEF', number: 27, nationality: 'France' },
    { id: 'p113', name: 'Benoît Badiashile', position: 'DEF', number: 4, nationality: 'France' },
    { id: 'p114', name: 'Đorđe Petrović', position: 'GK', number: 28, nationality: 'Serbia' },
  ],
  'juventus': [ // Juventus
    { id: 'p120', name: 'Wojciech Szczęsny', position: 'GK', number: 1, nationality: 'Poland' },
    { id: 'p121', name: 'Danilo', position: 'DEF', number: 6, nationality: 'Brazil' },
    { id: 'p122', name: 'Gleison Bremer', position: 'DEF', number: 3, nationality: 'Brazil' },
    { id: 'p123', name: 'Federico Gatti', position: 'DEF', number: 4, nationality: 'Italy' },
    { id: 'p124', name: 'Alex Sandro', position: 'DEF', number: 12, nationality: 'Brazil' },
    { id: 'p125', name: 'Manuel Locatelli', position: 'MID', number: 5, nationality: 'Italy' },
    { id: 'p126', name: 'Adrien Rabiot', position: 'MID', number: 25, nationality: 'France' },
    { id: 'p127', name: 'Weston McKennie', position: 'MID', number: 16, nationality: 'USA' },
    { id: 'p128', name: 'Federico Chiesa', position: 'FWD', number: 7, nationality: 'Italy' },
    { id: 'p129', name: 'Dušan Vlahović', position: 'FWD', number: 9, nationality: 'Serbia' },
    { id: 'p130', name: 'Filip Kostić', position: 'FWD', number: 11, nationality: 'Serbia' },
    { id: 'p131', name: 'Nicolò Fagioli', position: 'MID', number: 21, nationality: 'Italy' },
    { id: 'p132', name: 'Andrea Cambiaso', position: 'DEF', number: 27, nationality: 'Italy' },
    { id: 'p133', name: 'Kenan Yıldız', position: 'FWD', number: 15, nationality: 'Turkey' },
    { id: 'p134', name: 'Mattia Perin', position: 'GK', number: 36, nationality: 'Italy' },
  ],
  'milan': [ // AC Milan
    { id: 'p140', name: 'Mike Maignan', position: 'GK', number: 16, nationality: 'France' },
    { id: 'p141', name: 'Davide Calabria', position: 'DEF', number: 2, nationality: 'Italy' },
    { id: 'p142', name: 'Fikayo Tomori', position: 'DEF', number: 23, nationality: 'England' },
    { id: 'p143', name: 'Malick Thiaw', position: 'DEF', number: 28, nationality: 'Germany' },
    { id: 'p144', name: 'Theo Hernández', position: 'DEF', number: 19, nationality: 'France' },
    { id: 'p145', name: 'Tijjani Reijnders', position: 'MID', number: 14, nationality: 'Netherlands' },
    { id: 'p146', name: 'Youssouf Fofana', position: 'MID', number: 29, nationality: 'France' },
    { id: 'p147', name: 'Ruben Loftus-Cheek', position: 'MID', number: 8, nationality: 'England' },
    { id: 'p148', name: 'Christian Pulisic', position: 'FWD', number: 11, nationality: 'USA' },
    { id: 'p149', name: 'Olivier Giroud', position: 'FWD', number: 9, nationality: 'France' },
    { id: 'p150', name: 'Rafael Leão', position: 'FWD', number: 10, nationality: 'Portugal' },
    { id: 'p151', name: 'Yunus Musah', position: 'MID', number: 80, nationality: 'USA' },
    { id: 'p152', name: 'Alessandro Florenzi', position: 'DEF', number: 42, nationality: 'Italy' },
    { id: 'p153', name: 'Samuel Chukwueze', position: 'FWD', number: 21, nationality: 'Nigeria' },
    { id: 'p154', name: 'Marco Sportiello', position: 'GK', number: 57, nationality: 'Italy' },
  ],
  'inter': [ // Inter Milan
    { id: 'p160', name: 'Yann Sommer', position: 'GK', number: 1, nationality: 'Switzerland' },
    { id: 'p161', name: 'Benjamin Pavard', position: 'DEF', number: 28, nationality: 'France' },
    { id: 'p162', name: 'Francesco Acerbi', position: 'DEF', number: 15, nationality: 'Italy' },
    { id: 'p163', name: 'Alessandro Bastoni', position: 'DEF', number: 95, nationality: 'Italy' },
    { id: 'p164', name: 'Denzel Dumfries', position: 'DEF', number: 2, nationality: 'Netherlands' },
    { id: 'p165', name: 'Nicolò Barella', position: 'MID', number: 23, nationality: 'Italy' },
    { id: 'p166', name: 'Hakan Çalhanoğlu', position: 'MID', number: 20, nationality: 'Turkey' },
    { id: 'p167', name: 'Henrikh Mkhitaryan', position: 'MID', number: 22, nationality: 'Armenia' },
    { id: 'p168', name: 'Federico Dimarco', position: 'DEF', number: 32, nationality: 'Italy' },
    { id: 'p169', name: 'Lautaro Martínez', position: 'FWD', number: 10, nationality: 'Argentina' },
    { id: 'p170', name: 'Marcus Thuram', position: 'FWD', number: 9, nationality: 'France' },
    { id: 'p171', name: 'Davide Frattesi', position: 'MID', number: 16, nationality: 'Italy' },
    { id: 'p172', name: 'Matteo Darmian', position: 'DEF', number: 36, nationality: 'Italy' },
    { id: 'p173', name: 'Marko Arnautović', position: 'FWD', number: 8, nationality: 'Austria' },
    { id: 'p174', name: 'Emil Audero', position: 'GK', number: 77, nationality: 'Italy' },
  ]
};

// Add aliases for backend team IDs
mockTeamPlayers['real-madrid'] = mockTeamPlayers['team-1'];
mockTeamPlayers['realmadrid'] = mockTeamPlayers['team-1'];
mockTeamPlayers['barcelona'] = mockTeamPlayers['team-2'];
mockTeamPlayers['manchestercity'] = mockTeamPlayers['team-3'];
mockTeamPlayers['mancity'] = mockTeamPlayers['team-3'];

export const TeamDetail: React.FC<TeamDetailProps> = ({ teamId, onBack, onViewMatch }) => {
  const { favorites, addToFavorites, removeFromFavorites, t, teams, matches } = useApp();
  const [selectedPlayer, setSelectedPlayer] = React.useState<any>(null);
  const [playerStats, setPlayerStats] = React.useState<any>(null);
  const [loadingStats, setLoadingStats] = React.useState(false);

  const team = teams.find(t => t.id === teamId);
  const teamMatches = matches.filter(m =>
    m.homeTeam.id === teamId || m.awayTeam.id === teamId
  );

  const isFavorite = favorites.some(fav => fav.id === teamId);
  
  // Get mock players for this team
  // Try exact match first, then lowercase, then check if mock data exists for team name in lowercase
  const normalizedId = teamId.toLowerCase();
  const teamNameLower = team?.name?.toLowerCase().replace(/\s+/g, '') || '';
  const players = mockTeamPlayers[teamId] || 
                  mockTeamPlayers[normalizedId] || 
                  (teamNameLower ? mockTeamPlayers[teamNameLower] : null) || 
                  [];

  // Fetch player stats when a player is selected
  React.useEffect(() => {
    if (selectedPlayer) {
      setLoadingStats(true);
      api.getPlayerStats(selectedPlayer.name)
        .then(stats => {
          if (stats && stats.length > 0) {
            setPlayerStats(stats[0]);
          } else {
            setPlayerStats(null);
          }
        })
        .catch(() => setPlayerStats(null))
        .finally(() => setLoadingStats(false));
    }
  }, [selectedPlayer]);

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
    setPlayerStats(null);
  };

  const closePlayerDialog = () => {
    setSelectedPlayer(null);
    setPlayerStats(null);
  };

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="squad">Squad</TabsTrigger>
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

        {/* Squad */}
        <TabsContent value="squad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Squad</CardTitle>
            </CardHeader>
            <CardContent>
              {players.length > 0 ? (
                <div className="space-y-6">
                  {/* Goalkeepers */}
                  {players.filter(p => p.position === 'GK').length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Porteros</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {players.filter(p => p.position === 'GK').map(player => (
                          <div 
                            key={player.id} 
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => handlePlayerClick(player)}
                          >
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {player.number}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.nationality}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Defenders */}
                  {players.filter(p => p.position === 'DEF').length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 mt-4">Defensas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {players.filter(p => p.position === 'DEF').map(player => (
                          <div 
                            key={player.id} 
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => handlePlayerClick(player)}
                          >
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {player.number}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.nationality}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Midfielders */}
                  {players.filter(p => p.position === 'MID').length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 mt-4">Centrocampistas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {players.filter(p => p.position === 'MID').map(player => (
                          <div 
                            key={player.id} 
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => handlePlayerClick(player)}
                          >
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {player.number}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.nationality}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Forwards */}
                  {players.filter(p => p.position === 'FWD').length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 mt-4">Delanteros</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {players.filter(p => p.position === 'FWD').map(player => (
                          <div 
                            key={player.id} 
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => handlePlayerClick(player)}
                          >
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {player.number}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.nationality}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No hay datos disponibles</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Player Statistics Dialog */}
      <Dialog open={!!selectedPlayer} onOpenChange={(open) => !open && closePlayerDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="player-stats-description">
          <DialogHeader>
            <DialogTitle>
              {selectedPlayer?.name} - Estadísticas
            </DialogTitle>
          </DialogHeader>
          <div id="player-stats-description" className="mt-4">
            {loadingStats ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando estadísticas...</p>
              </div>
            ) : playerStats ? (
              <div className="space-y-4">
                {/* Player Info */}
                <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl">
                    {selectedPlayer?.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedPlayer?.name}</h3>
                    <p className="text-muted-foreground">{selectedPlayer?.position} • {selectedPlayer?.nationality}</p>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Partidos Jugados</p>
                    <p className="text-2xl font-bold">{playerStats.matchesPlayed || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Goles</p>
                    <p className="text-2xl font-bold">{playerStats.goals || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Asistencias</p>
                    <p className="text-2xl font-bold">{playerStats.assists || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Tarjetas Amarillas</p>
                    <p className="text-2xl font-bold">{playerStats.yellowCards || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Tarjetas Rojas</p>
                    <p className="text-2xl font-bold">{playerStats.redCards || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Minutos Jugados</p>
                    <p className="text-2xl font-bold">{playerStats.minutesPlayed || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Tiros a Puerta</p>
                    <p className="text-2xl font-bold">{playerStats.shotsOnTarget || 0}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Precisión de Pases</p>
                    <p className="text-2xl font-bold">{playerStats.passAccuracy ? `${playerStats.passAccuracy}%` : '0%'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No hay estadísticas disponibles para este jugador</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
