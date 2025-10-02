import React from 'react';
import { Settings, Accessibility, Palette, Bell, Moon, Sun, Type, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, language, setLanguage, t } = useApp();
  
  const [textSize, setTextSize] = React.useState(14);
  const [highContrast, setHighContrast] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    matchAlerts: true,
    newsUpdates: false,
    favoriteTeams: true,
    weeklyDigest: false
  });
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [quietHours, setQuietHours] = React.useState({
    enabled: false,
    start: '22:00',
    end: '08:00'
  });

  const handleSaveSettings = () => {
    // Aplicar tamaño de texto
    document.documentElement.style.setProperty('--font-size', `${textSize}px`);
    
    // Aplicar alto contraste
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Aplicar movimiento reducido
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    toast.success('Configuración guardada correctamente');
  };

  const resetToDefaults = () => {
    setTextSize(14);
    setHighContrast(false);
    setReducedMotion(false);
    setTheme('dark');
    setLanguage('es');
    setNotifications({
      matchAlerts: true,
      newsUpdates: false,
      favoriteTeams: true,
      weeklyDigest: false
    });
    setSoundEnabled(true);
    setQuietHours({
      enabled: false,
      start: '22:00',
      end: '08:00'
    });
    
    toast.success('Configuración restaurada a valores por defecto');
  };

  const getPreviewText = () => {
    return theme === 'dark' 
      ? 'Vista previa en modo oscuro' 
      : 'Vista previa en modo claro';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">
            Personaliza tu experiencia en la aplicación
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Configuración de Accesibilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Accessibility className="h-5 w-5" />
              <span>{t('accessibility')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tamaño de texto */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span>{t('textSize')}: {textSize}px</span>
              </Label>
              <Slider
                value={[textSize]}
                onValueChange={(value: number[]) => setTextSize(value[0])}
                min={12}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground" style={{ fontSize: `${textSize}px` }}>
                {getPreviewText()}
              </div>
            </div>

            <Separator />

            {/* Alto contraste */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alto contraste</Label>
                <p className="text-sm text-muted-foreground">
                  Mejora la legibilidad con mayor contraste
                </p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={(checked: boolean) =>
                  setHighContrast(checked)
                }
              />
            </div>

            {/* Movimiento reducido */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reducir animaciones</Label>
                <p className="text-sm text-muted-foreground">
                  Minimiza las animaciones en la interfaz
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Apariencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Apariencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tema */}
            <div className="space-y-2">
              <Label>Tema</Label>
              <div className="flex space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex-1"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Claro
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex-1"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Oscuro
                </Button>
              </div>
            </div>

            <Separator />

            {/* Idioma */}
            <div className="space-y-2">
              <Label>Idioma</Label>
              <Select value={language} onValueChange={(value: 'es' | 'en') => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vista previa */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">Vista previa:</p>
              <div className="mt-2 p-2 bg-card rounded border">
                <p style={{ fontSize: `${textSize}px` }}>
                  Real Madrid vs Barcelona - {theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>{t('notifications')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sonido */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Label>Sonidos de notificación</Label>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            <Separator />

            {/* Tipos de notificaciones */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de partidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Goles, tarjetas y eventos importantes
                  </p>
                </div>
                <Switch
                  checked={notifications.matchAlerts}
                  onCheckedChange={(checked: boolean) => 
                    setNotifications(prev => ({ ...prev, matchAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Equipos favoritos</Label>
                  <p className="text-sm text-muted-foreground">
                    Noticias y partidos de tus equipos
                  </p>
                </div>
                <Switch
                  checked={notifications.favoriteTeams}
                  onCheckedChange={(checked: boolean) => 
                    setNotifications(prev => ({ ...prev, favoriteTeams: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Últimas noticias</Label>
                  <p className="text-sm text-muted-foreground">
                    Noticias destacadas del fútbol
                  </p>
                </div>
                <Switch
                  checked={notifications.newsUpdates}
                  onCheckedChange={(checked: boolean) => 
                    setNotifications(prev => ({ ...prev, newsUpdates: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Resumen semanal</Label>
                  <p className="text-sm text-muted-foreground">
                    Resumen de la semana en tu email
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prueba de Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Probar Notificaciones</CardTitle>
            <p className="text-sm text-muted-foreground">
              Prueba los diferentes tipos de notificaciones para ver cómo se ven
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => toast.success('¡Partido ganado! Real Madrid 2-1 Barcelona')}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-green-600">Éxito</span>
                <span className="text-sm text-muted-foreground">Resultado de partido</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.info('Nuevo artículo: "Fichajes de invierno 2024"')}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-blue-600">Información</span>
                <span className="text-sm text-muted-foreground">Noticia nueva</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.warning('Tu equipo favorito juega en 30 minutos')}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-orange-600">Aviso</span>
                <span className="text-sm text-muted-foreground">Recordatorio</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.error('Error al cargar los datos del partido')}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-red-600">Error</span>
                <span className="text-sm text-muted-foreground">Fallo en la conexión</span>
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button
                variant="default"
                onClick={() => toast('Notificación personalizada con acciones', {
                  description: 'Esta notificación incluye botones de acción',
                  action: {
                    label: 'Ver más',
                    onClick: () => toast.success('¡Acción ejecutada!')
                  },
                  cancel: {
                    label: 'Cerrar',
                    onClick: () => {}
                  }
                })}
                className="w-full"
              >
                Notificación con Acciones
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: 'Cargando datos del partido...',
                    success: 'Datos cargados correctamente',
                    error: 'Error al cargar los datos'
                  }
                )}
                className="w-full"
              >
                Notificación de Carga
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Horario Silencioso */}
        <Card>
          <CardHeader>
            <CardTitle>Horario silencioso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Activar horario silencioso</Label>
              <Switch
                checked={quietHours.enabled}
                onCheckedChange={(checked) => 
                  setQuietHours(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            {quietHours.enabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Inicio</Label>
                    <Select 
                      value={quietHours.start} 
                      onValueChange={(value) => 
                        setQuietHours(prev => ({ ...prev, start: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Fin</Label>
                    <Select 
                      value={quietHours.end} 
                      onValueChange={(value) => 
                        setQuietHours(prev => ({ ...prev, end: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  No recibirás notificaciones entre {quietHours.start} y {quietHours.end}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetToDefaults}>
          Restaurar valores por defecto
        </Button>
        <Button onClick={handleSaveSettings}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};