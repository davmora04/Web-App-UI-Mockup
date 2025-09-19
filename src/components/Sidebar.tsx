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
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full">
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
              >
                {t('league')}
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {leagues.map((league) => (
                <Button
                  key={league.id}
                  variant={selectedLeague === league.id ? 'default' : 'ghost'}
                  className="w-full justify-start text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={() => setSelectedLeague(league.id)}
                >
                  <span className="mr-2">{league.logo}</span>
                  {league.name}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Season Filter */}
          <div>
            <h4 className="font-medium mb-2 text-sidebar-foreground">{t('season')}</h4>
            <div className="space-y-1">
              {seasons.map((season) => (
                <Button
                  key={season}
                  variant={selectedSeason === season ? 'default' : 'ghost'}
                  className="w-full justify-start text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={() => setSelectedSeason(season)}
                >
                  {season}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="pt-4 border-t border-sidebar-border">
            <div className="text-sm text-sidebar-foreground">
              <p className="font-medium mb-1">Selección actual:</p>
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