import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useApp, teams, leagues } from './AppContext';
import { toast } from 'sonner@2.0.3';

type SortField = 'position' | 'team' | 'played' | 'won' | 'drawn' | 'lost' | 'goalsFor' | 'goalsAgainst' | 'goalDifference' | 'points';
type SortDirection = 'asc' | 'desc';

interface TablePageProps {
  onViewTeamDetail?: (teamId: string) => void;
}

export const TablePage: React.FC<TablePageProps> = ({ onViewTeamDetail }) => {
  const { selectedLeague, t } = useApp();
  const [sortField, setSortField] = React.useState<SortField>('position');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  const currentLeague = leagues.find(l => l.id === selectedLeague);
  
  // Filtrar equipos por liga (mock - en una app real esto vendría del backend)
  const leagueTeams = teams.filter(team => {
    // Mapeo simple para el mock
    if (selectedLeague === 'laliga') return ['real-madrid', 'barcelona', 'atletico'].includes(team.id);
    if (selectedLeague === 'premier') return ['liverpool', 'arsenal', 'chelsea'].includes(team.id);
    if (selectedLeague === 'seriea') return ['juventus', 'milan', 'inter'].includes(team.id);
    return false;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTeams = [...leagueTeams].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'team') {
      aValue = a.name;
      bValue = b.name;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    const numA = Number(aValue) || 0;
    const numB = Number(bValue) || 0;
    
    return sortDirection === 'asc' ? numA - numB : numB - numA;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const handleExportCSV = () => {
    // Simulación de exportación CSV
    toast.success('CSV exportado correctamente');
  };

  const getFormBadges = (form?: ('W' | 'D' | 'L')[]) => {
    if (!form) return null;
    
    return (
      <div className="flex space-x-1">
        {form.map((result, index) => {
          const colors = {
            W: 'bg-green-500 text-white',
            D: 'bg-yellow-500 text-white',
            L: 'bg-red-500 text-white'
          };
          
          return (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colors[result]}`}
            >
              {result}
            </div>
          );
        })}
      </div>
    );
  };

  const getPositionColor = (position?: number) => {
    if (!position) return '';
    if (position <= 4) return 'text-green-600 font-bold'; // Champions League
    if (position <= 6) return 'text-blue-600 font-bold'; // Europa League
    if (position >= 18) return 'text-red-600 font-bold'; // Descenso
    return '';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t('table')}</h1>
          <p className="text-muted-foreground">
            {currentLeague?.name} - Temporada 2024/25
          </p>
        </div>
        
        <Button onClick={handleExportCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {t('exportCSV')}
        </Button>
      </div>

      {/* Tabla */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="sticky top-0 bg-muted z-10">
            <TableRow>
              <TableHead className="w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('position')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('position')}</span>
                  {getSortIcon('position')}
                </Button>
              </TableHead>
              
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('team')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold justify-start"
                >
                  <span>{t('team')}</span>
                  {getSortIcon('team')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('played')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('played')}</span>
                  {getSortIcon('played')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('won')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('won')}</span>
                  {getSortIcon('won')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('drawn')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('drawn')}</span>
                  {getSortIcon('drawn')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('lost')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('lost')}</span>
                  {getSortIcon('lost')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('goalsFor')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('goalsFor')}</span>
                  {getSortIcon('goalsFor')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('goalsAgainst')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('goalsAgainst')}</span>
                  {getSortIcon('goalsAgainst')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('goalDifference')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('goalDifference')}</span>
                  {getSortIcon('goalDifference')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('points')}
                  className="flex items-center space-x-1 p-0 h-auto font-bold"
                >
                  <span>{t('points')}</span>
                  {getSortIcon('points')}
                </Button>
              </TableHead>
              
              <TableHead className="text-center w-32">
                {t('form')}
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {sortedTeams.map((team) => (
              <TableRow key={team.id} className="hover:bg-muted/50">
                <TableCell className={`text-center font-bold ${getPositionColor(team.position)}`}>
                  {team.position}
                </TableCell>
                
                <TableCell>
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onViewTeamDetail?.(team.id)}
                  >
                    <span className="text-2xl">{team.logo}</span>
                    <span className="font-medium">{team.name}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center">
                  <span className={team.goalDifference! >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {team.goalDifference! >= 0 ? '+' : ''}{team.goalDifference}
                  </span>
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                
                <TableCell className="text-center">
                  {getFormBadges(team.form)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Champions League</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Europa League</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Descenso</span>
        </div>
      </div>
    </div>
  );
};