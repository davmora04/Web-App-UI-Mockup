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
    // Apply text size
    document.documentElement.style.setProperty('--font-size', `${textSize}px`);
    
    // High contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    toast.success(t('settingsSaved'));
  };

  const resetToDefaults = () => {
    setTextSize(14);
    setHighContrast(false);
    setReducedMotion(false);
    setTheme('dark');
    setLanguage('en');
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
    
    toast.success(t('resetDefaults'));
  };

  const getPreviewText = () => {
    return `${t('preview')} - ${theme === 'dark' ? t('dark') : t('light')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">{t('settings_intro')}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Accessibility className="h-5 w-5" />
              <span>{t('accessibility')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text size */}
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

            {/* High contrast */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('highContrastTitle')}</Label>
                <p className="text-sm text-muted-foreground">{t('highContrastDesc')}</p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={(checked: boolean) => setHighContrast(checked)}
              />
            </div>

            {/* Reduced motion */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('reduceMotionTitle')}</Label>
                <p className="text-sm text-muted-foreground">{t('reduceMotionDesc')}</p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>{t('appearance')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme */}
            <div className="space-y-2">
              <Label>{t('themeLabel')}</Label>
              <div className="flex space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex-1"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  {t('light')}
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex-1"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  {t('dark')}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Language */}
            <div className="space-y-2">
              <Label>{t('languageLabel')}</Label>
              <Select value={language} onValueChange={(value: 'es' | 'en') => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{t('preview')}:</p>
              <div className="mt-2 p-2 bg-card rounded border">
                <p style={{ fontSize: `${textSize}px` }}>
                  Real Madrid vs Barcelona - {theme === 'dark' ? `${t('dark')} mode` : `${t('light')} mode`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications (in-app) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>{t('notifications')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Label>{t('notificationSounds')}</Label>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>

            <Separator />

            {/* Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('matchAlertsTitle')}</Label>
                  <p className="text-sm text-muted-foreground">{t('matchAlertsDesc')}</p>
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
                  <Label>{t('favoriteTeamsTitle')}</Label>
                  <p className="text-sm text-muted-foreground">{t('favoriteTeamsDesc')}</p>
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
                  <Label>{t('topNewsTitle')}</Label>
                  <p className="text-sm text-muted-foreground">{t('topNewsDesc')}</p>
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
                  <Label>{t('weeklySummaryTitle')}</Label>
                  <p className="text-sm text-muted-foreground">{t('weeklySummaryDesc')}</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                  }
                />
              </div>

              <Separator />

              {/* Quiet hours inside notifications block */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('quietHoursTitle')}</Label>
                    <p className="text-sm text-muted-foreground">{t('quietHoursDesc')}</p>
                  </div>
                  <Switch
                    checked={quietHours.enabled}
                    onCheckedChange={(checked) =>
                      setQuietHours(prev => ({ ...prev, enabled: checked }))
                    }
                    aria-label={t('enableQuietHours')}
                  />
                </div>

                {quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-muted">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start">Start</Label>
                      <input
                        id="quiet-start"
                        type="time"
                        value={quietHours.start}
                        onChange={(e) =>
                          setQuietHours(prev => ({ ...prev, start: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end">End</Label>
                      <input
                        id="quiet-end"
                        type="time"
                        value={quietHours.end}
                        onChange={(e) =>
                          setQuietHours(prev => ({ ...prev, end: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>{t('emailNotificationsTitle')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('emailAddressLabel')}</Label>
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              />
              <p className="text-xs text-muted-foreground">{t('emailUsageNote')}</p>
            </div>

            <div className="space-y-2">
              <Label>{t('emailFrequencyLabel')}</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              {t('sendTestEmail')}
            </Button>
          </CardContent>
        </Card>

        {/* Try notifications */}
        <Card>
          <CardHeader>
            <CardTitle>{t('testNotifications')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('notificationSystem')}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => toast.success(t('resultTitle'))}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-green-600">{t('successLabel')}</span>
                <span className="text-sm text-muted-foreground">{t('resultTitle')}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.info(t('newNewsTitle'))}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-blue-600">{t('infoLabel')}</span>
                <span className="text-sm text-muted-foreground">{t('newNewsTitle')}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.warning(t('reminderTitle'))}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-orange-600">{t('warningLabel')}</span>
                <span className="text-sm text-muted-foreground">{t('reminderTitle')}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toast.error(t('connectionFailTitle'))}
                className="h-auto p-4 text-left flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-red-600">{t('errorLabel')}</span>
                <span className="text-sm text-muted-foreground">{t('connectionFailTitle')}</span>
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button
                variant="default"
                onClick={() =>
                  toast(t('notif_custom_title'), {
                    description: t('notif_custom_desc'),
                    action: {
                      label: t('readMore'),
                      onClick: () => toast.success(t('success'))
                    },
                    cancel: {
                      label: t('close'),
                      onClick: () => {}
                    }
                  })
                }
                className="w-full"
              >
                {t('withActions')}
              </Button>
              
              <Button
                variant="secondary"
                onClick={() =>
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: t('loading'),
                      success: t('success'),
                      error: t('error')
                    }
                  )
                }
                className="w-full"
              >
                {t('loadingNotification')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quiet hours (standalone card) */}
        <Card>
          <CardHeader>
            <CardTitle>{t('quietHoursTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t('enableQuietHours')}</Label>
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
                    <Label>Start</Label>
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
                    <Label>End</Label>
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
                  You won’t receive notifications between {quietHours.start} and {quietHours.end}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetToDefaults}>
          {t('resetDefaults')}
        </Button>
        <Button onClick={handleSaveSettings}>
          {t('saveChangesBtn')}
        </Button>
      </div>
    </div>
  );
};
