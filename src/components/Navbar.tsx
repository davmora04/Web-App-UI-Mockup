import React from "react";
import {
  Search,
  Home,
  Newspaper,
  Table,
  Calendar,
  User,
  Globe,
  Moon,
  Sun,
  Settings,
  Bell
} from "lucide-react";
import { toast } from 'sonner';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useApp } from "./AppContext";
import { useLiveRegion } from "../hooks/useAccessibility";

interface NavbarProps {
  onSearch?: (query: string) => void;
  onNavigateToProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  onNavigateToProfile,
}) => {
  const {
    language,
    theme,
    currentPage,
    setLanguage,
    setTheme,
    setCurrentPage,
    t,
  } = useApp();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { announce } = useLiveRegion();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    if (searchQuery) {
      announce(`Searching for ${searchQuery}`);
    }
  };



  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    announce(`Theme changed to ${newTheme} mode`);
  };

  const navItems = [
    { id: "home", icon: Home, label: t("home") },
    { id: "news", icon: Newspaper, label: t("news") },
    { id: "table", icon: Table, label: t("table") },
    { id: "calendar", icon: Calendar, label: t("calendar") },
  ];

  return (
    <nav className="bg-card border-b border-border" role="navigation" aria-label={t('mainNavigation')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center" role="banner">
              <div 
                className="bg-primary text-primary-foreground rounded-lg p-2"
                aria-label="StatFut logo"
              >
                <span className="font-bold" aria-hidden="true">⚽</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                StatFut
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 md:mx-8">
            <form onSubmit={handleSearch} className="relative" role="search">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full min-w-0"
                aria-label={t('search')}
                aria-describedby="search-description"
              />
              <span id="search-description" className="sr-only">
                {t('searchPlaceholder')}
              </span>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={
                      currentPage === item.id
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => setCurrentPage(item.id)}
                    className="flex items-center space-x-1"
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={currentPage === item.id ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:block">
                      {item.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: "es" | "en") =>
                setLanguage(value)
              }
            >
              <SelectTrigger className="w-20" aria-label="Select language">
                <Globe className="h-4 w-4" aria-hidden="true" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" aria-hidden="true" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked: boolean) =>
                  handleThemeChange(checked)
                }
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              />
              <Moon className="h-4 w-4" aria-hidden="true" />
            </div>

            {/* Notification Test */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const notifications = [
                  () => toast.success('¡Tu equipo ha marcado un gol! ⚽'),
                  () => toast.info('Nueva noticia disponible'),
                  () => toast.warning('Partido comenzando pronto'),
                  () => toast('¡Notificación de prueba! 🎉', {
                    description: 'Sistema funcionando correctamente'
                  })
                ];
                const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
                randomNotification();
              }}
              title="Probar notificación"
            >
              <Bell className="h-4 w-4" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage("settings")}
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant={
                  currentPage === "profile"
                    ? "default"
                    : "ghost"
                }
                size="icon"
                onClick={onNavigateToProfile}
                title="Perfil"
              >
                <User className="h-4 w-4" />
              </Button>

              <Button
                variant={
                  currentPage === "auth" ? "default" : "outline"
                }
                onClick={() => setCurrentPage("auth")}
                className="flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:block">
                  {t("login")}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-muted">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex justify-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={
                    currentPage === item.id
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => setCurrentPage(item.id)}
                  className="flex flex-col items-center space-y-1 h-auto py-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};