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
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useApp } from "./AppContext";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const navItems = [
    { id: "home", icon: Home, label: t("home") },
    { id: "news", icon: Newspaper, label: t("news") },
    { id: "table", icon: Table, label: t("table") },
    { id: "calendar", icon: Calendar, label: t("calendar") },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <span className="font-bold">⚽</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                StatFut
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Buscar equipos, jugadores, noticias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
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
              <SelectTrigger className="w-20">
                <Globe className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
              <Moon className="h-4 w-4" />
            </div>

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