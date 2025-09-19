import React from 'react';
import { Star, User, Heart, Settings, Trash2, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useApp, Team } from './AppContext';
import { toast } from 'sonner@2.0.3';

export const ProfilePage: React.FC = () => {
  const { favorites, removeFromFavorites, t } = useApp();
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [orderedFavorites, setOrderedFavorites] = React.useState<Team[]>(favorites);

  // Actualizar cuando cambian los favoritos
  React.useEffect(() => {
    setOrderedFavorites(favorites);
  }, [favorites]);

  const handleDragStart = (e: React.DragEvent, teamId: string) => {
    setDraggedItem(teamId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetTeamId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetTeamId) {
      setDraggedItem(null);
      return;
    }

    const newOrder = [...orderedFavorites];
    const draggedIndex = newOrder.findIndex(team => team.id === draggedItem);
    const targetIndex = newOrder.findIndex(team => team.id === targetTeamId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedTeam] = newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedTeam);
      setOrderedFavorites(newOrder);
      toast.success('Orden de favoritos actualizado');
    }

    setDraggedItem(null);
  };

  const handleRemoveFavorite = (teamId: string) => {
    removeFromFavorites(teamId);
    toast.success('Equipo eliminado de favoritos');
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t('profile')}</h1>
          <p className="text-muted-foreground">
            Gestiona tus equipos favoritos y preferencias
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Información del perfil */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Mi Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Usuario de StatFut</h3>
                <p className="text-sm text-muted-foreground">
                  Miembro desde enero 2025
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Equipos favoritos</span>
                <Badge variant="secondary">{favorites.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Noticias leídas</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Partidos seguidos</span>
                <Badge variant="secondary">8</Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Equipos favoritos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>{t('favorites')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderedFavorites.length > 0 ? (
              <div className="space-y-3">
                <Alert>
                  <Star className="h-4 w-4" />
                  <AlertDescription>
                    Arrastra los equipos para reordenar tus favoritos. El orden determina la prioridad de las notificaciones.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  {orderedFavorites.map((team, index) => (
                    <div
                      key={team.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, team.id)}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDrop={(e) => handleDrop(e, team.id)}
                      onDragEnd={handleDragEnd}
                      className={`
                        flex items-center justify-between p-4 bg-muted rounded-lg cursor-move transition-all
                        ${draggedItem === team.id ? 'opacity-50 scale-95' : 'hover:bg-muted/80'}
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <span className="text-sm font-medium">#{index + 1}</span>
                        </div>
                        <span className="text-2xl">{team.logo}</span>
                        <div>
                          <h3 className="font-medium">{team.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>Posición: #{team.position}</span>
                            <Badge variant="outline" className="text-xs">
                              {team.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Forma reciente */}
                        <div className="flex space-x-1">
                          {team.form?.slice(-3).map((result, idx) => {
                            const colors = {
                              W: 'bg-green-500 text-white',
                              D: 'bg-yellow-500 text-white',
                              L: 'bg-red-500 text-white'
                            };
                            
                            return (
                              <div
                                key={idx}
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${colors[result]}`}
                              >
                                {result}
                              </div>
                            );
                          })}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFavorite(team.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-card border rounded-lg">
                  <h4 className="font-medium mb-2">Acceso Rápido</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Estos equipos aparecerán en tu página de inicio para acceso rápido:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {orderedFavorites.slice(0, 3).map(team => (
                      <Badge key={team.id} variant="secondary" className="flex items-center space-x-1">
                        <span>{team.logo}</span>
                        <span>{team.name}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No tienes equipos favoritos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Añade equipos a tus favoritos desde las páginas de equipos o partidos
                </p>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Explorar Equipos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Configuración rápida */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-1">Notificaciones</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Recibe alertas de tus equipos favoritos
                </p>
                <Button size="sm" variant="outline">
                  Configurar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-1">Privacidad</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Gestiona tu privacidad y datos
                </p>
                <Button size="sm" variant="outline">
                  Revisar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-1">Cuenta</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Actualiza tu información personal
                </p>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};