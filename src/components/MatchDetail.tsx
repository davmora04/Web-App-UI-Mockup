import React from 'react';
import { ArrowLeft, Clock, MapPin, Users, Target, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useApp, matches } from './AppContext';

interface MatchDetailProps {
  matchId: string;
  onBack?: () => void;
  onViewTeamDetail?: (teamId: string) => void;
}

// Datos mock para alineaciones y eventos
const mockLineup = {
  home: {
    formation: '4-3-3',
    players: [
      { id: '1', name: 'Courtois', position: 'GK', number: 1 },
      { id: '2', name: 'Carvajal', position: 'RB', number: 2 },
      { id: '3', name: 'Militão', position: 'CB', number: 3 },
      { id: '4', name: 'Alaba', position: 'CB', number: 4 },
      { id: '5', name: 'Mendy', position: 'LB', number: 23 },
      { id: '6', name: 'Modrić', position: 'CM', number: 10 },
      { id: '7', name: 'Casemiro', position: 'CDM', number: 14 },
      { id: '8', name: 'Kroos', position: 'CM', number: 8 },
      { id: '9', name: 'Vinicius Jr.', position: 'LW', number: 20 },
      { id: '10', name: 'Benzema', position: 'ST', number: 9 },
      { id: '11', name: 'Rodrygo', position: 'RW', number: 21 }
    ]
  },
  away: {
    formation: '4-2-3-1',
    players: [
      { id: '12', name: 'Ter Stegen', position: 'GK', number: 1 },
      { id: '13', name: 'Dest', position: 'RB', number: 2 },
      { id: '14', name: 'Araujo', position: 'CB', number: 4 },
      { id: '15', name: 'Piqué', position: 'CB', number: 3 },
      { id: '16', name: 'Alba', position: 'LB', number: 18 },
      { id: '17', name: 'Busquets', position: 'CDM', number: 5 },
      { id: '18', name: 'De Jong', position: 'CM', number: 21 },
      { id: '19', name: 'Pedri', position: 'CAM', number: 16 },
      { id: '20', name: 'Dembélé', position: 'RW', number: 7 },
      { id: '21', name: 'Ansu Fati', position: 'LW', number: 10 },
      { id: '22', name: 'Lewandowski', position: 'ST', number: 9 }
    ]
  }
};

const mockEvents = [
  { minute: 15, type: 'goal', team: 'away', player: 'Lewandowski', description: 'Gol de Lewandowski' },
  { minute: 23, type: 'goal', team: 'home', player: 'Vinicius Jr.', description: 'Gol de Vinicius Jr.' },
  { minute: 34, type: 'yellow', team: 'away', player: 'Busquets', description: 'Tarjeta amarilla a Busquets' },
  { minute: 67, type: 'goal', team: 'home', player: 'Bellingham', description: 'Gol de Bellingham' },
  { minute: 78, type: 'substitution', team: 'home', player: 'Modrić → Bellingham', description: 'Cambio: Sale Modrić, entra Bellingham' }
];

export const MatchDetail: React.FC<MatchDetailProps> = ({ matchId, onBack, onViewTeamDetail }) => {
  const { t } = useApp();
  
  const match = matches.find(m => m.id === matchId);

  if (!match) {
    return (
      <div className="p-6 text-center">
        <p>Partido no encontrado</p>
        <Button onClick={onBack} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Target className="h-4 w-4 text-green-600" />;
      case 'yellow':
        return <div className="w-4 h-4 bg-yellow-400 rounded-sm" />;
      case 'red':
        return <div className="w-4 h-4 bg-red-500 rounded-sm" />;
      case 'substitution':
        return <Users className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
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

      {/* Match Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <Badge variant={
              match.status === 'live' ? 'destructive' :
              match.status === 'finished' ? 'default' : 'secondary'
            }>
              {match.status === 'live' ? 'EN VIVO' : 
               match.status === 'finished' ? 'FINALIZADO' : 'PROGRAMADO'}
            </Badge>
          </div>

          <div className="flex items-center justify-between mb-4">
            {/* Equipo Local */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <span className="text-4xl">{match.homeTeam.logo}</span>
              <h2 className="text-xl font-bold text-center">{match.homeTeam.name}</h2>
              <Badge variant="outline">{t('home')}</Badge>
            </div>

            {/* Marcador */}
            <div className="text-center mx-8">
              {match.score ? (
                <div className="text-6xl font-bold">
                  {match.score.home} - {match.score.away}
                </div>
              ) : (
                <div className="text-2xl text-muted-foreground font-medium">
                  {t('vs')}
                </div>
              )}
              {match.status === 'live' && (
                <div className="text-red-500 font-medium mt-2">
                  {match.minute}'
                </div>
              )}
            </div>

            {/* Equipo Visitante */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <span className="text-4xl">{match.awayTeam.logo}</span>
              <h2 className="text-xl font-bold text-center">{match.awayTeam.name}</h2>
              <Badge variant="outline">{t('awayTeam')}</Badge>
            </div>
          </div>

          {/* Información del partido */}
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Santiago Bernabéu</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Timeline de eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos del Partido</CardTitle>
          </CardHeader>
          <CardContent>
            {match.status === 'scheduled' ? (
              <p className="text-muted-foreground text-center py-4">
                El partido aún no ha comenzado
              </p>
            ) : (
              <div className="space-y-4">
                {mockEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 text-sm font-mono text-muted-foreground">
                      {event.minute}'
                    </div>
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="text-sm">{event.description}</p>
                    </div>
                    <div className="w-8 text-2xl">
                      {event.team === 'home' ? match.homeTeam.logo : match.awayTeam.logo}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alineaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Alineaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Equipo Local */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <span>{match.homeTeam.logo}</span>
                <span>{match.homeTeam.name}</span>
                <Badge variant="outline">{mockLineup.home.formation}</Badge>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {mockLineup.home.players.map(player => (
                  <div key={player.id} className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {player.number}
                    </span>
                    <span>{player.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Equipo Visitante */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <span>{match.awayTeam.logo}</span>
                <span>{match.awayTeam.name}</span>
                <Badge variant="outline">{mockLineup.away.formation}</Badge>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {mockLineup.away.players.map(player => (
                  <div key={player.id} className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center justify-center">
                      {player.number}
                    </span>
                    <span>{player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas del partido */}
      {match.status !== 'scheduled' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">65%</div>
                <div className="text-sm text-muted-foreground">Posesión</div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Remates</div>
              </div>
              <div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-muted-foreground">A portería</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">35%</div>
                <div className="text-sm text-muted-foreground">Posesión</div>
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Remates</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">A portería</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};