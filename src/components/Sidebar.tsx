import React from 'react';
import { Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useApp, leagues } from './AppContext';

export const Sidebar: React.FC = () => {
  const { selectedLeague, selectedSeason, setSelectedLeague, setSelectedSeason, t } = useApp();
  const [isOpen, setIsOpen] = React.useState(true);

  const seasons = ['2024/25', '2023/24', '2022/23', '2021/22'];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full" role="complementary" aria-label="Filters sidebar" data-tour="sidebar">
      <Card className="m-4 border-sidebar-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sidebar-foreground">
            <Filter className="h-5 w-5 mr-2" />
            {t('filters')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Liga Filter */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent"
                aria-expanded={isOpen}
                aria-controls="league-options"
                aria-label={`${t('league')} filter options`}
              >
                {t('league')}
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2" id="league-options">
              {leagues.map((league) => (
                <Button
                  key={league.id}
                  variant={selectedLeague === league.id ? 'default' : 'ghost'}
                  className={`w-full justify-start text-sm group transition-all duration-200 hover:shadow-sm ${
                    selectedLeague === league.id 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={() => setSelectedLeague(league.id)}
                  aria-pressed={selectedLeague === league.id}
                  aria-label={`Select ${league.name} league`}
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">
                    {league.logo}
                  </span>
                  <span className={`group-hover:font-bold group-hover:tracking-wide transition-all duration-200 text-left ${
                    selectedLeague === league.id 
                      ? 'font-semibold group-hover:text-white group-hover:drop-shadow-sm' 
                      : 'group-hover:text-foreground'
                  }`}>
                    {league.name}
                  </span>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Season Filter */}
          <div role="group" aria-labelledby="season-heading">
            <h4 id="season-heading" className="font-medium mb-2 text-sidebar-foreground">{t('season')}</h4>
            <div className="space-y-1">
              {seasons.map((season) => (
                <Button
                  key={season}
                  variant={selectedSeason === season ? 'default' : 'ghost'}
                  className={`w-full justify-start text-sm group transition-all duration-200 hover:shadow-sm ${
                    selectedSeason === season 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white font-semibold' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={() => setSelectedSeason(season)}
                  aria-pressed={selectedSeason === season}
                  aria-label={`Select ${season} season`}
                >
                  <span className={`group-hover:font-bold group-hover:tracking-wide transition-all duration-200 ${
                    selectedSeason === season 
                      ? 'group-hover:text-white group-hover:drop-shadow-sm' 
                      : 'group-hover:text-foreground'
                  }`}>
                    {season}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="pt-4 border-t border-sidebar-border">
            <div className="text-sm text-sidebar-foreground">
              <p className="font-medium mb-1">{t('currentSelection')}</p>
              <p className="text-muted-foreground">
                {leagues.find(l => l.id === selectedLeague)?.name} - {selectedSeason}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};