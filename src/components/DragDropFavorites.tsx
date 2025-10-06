import React from 'react';
import { X, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useApp, Team } from './AppContext';

interface DragDropFavoritesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DragDropFavorites: React.FC<DragDropFavoritesProps> = ({ isOpen, onClose }) => {
  const { favorites, reorderFavorites, t } = useApp();
  const [draggedItem, setDraggedItem] = React.useState<Team | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, team: Team) => {
    setDraggedItem(team);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const dragIndex = favorites.findIndex(team => team.id === draggedItem.id);
    if (dragIndex === -1) return;

    const newFavorites = [...favorites];
    newFavorites.splice(dragIndex, 1);
    newFavorites.splice(dropIndex, 0, draggedItem);

    reorderFavorites(newFavorites);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  if (!isOpen || favorites.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('reorder')} {t('favorites')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 max-h-96 overflow-y-auto">
          <p className="text-sm text-muted-foreground mb-4">
            {t('dragToReorder')}
          </p>
          
          {favorites.map((team, index) => (
            <div
              key={team.id}
              draggable
              onDragStart={(e) => handleDragStart(e, team)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center space-x-3 p-3 border rounded-lg cursor-move transition-all
                ${draggedItem?.id === team.id ? 'opacity-50 scale-95' : ''}
                ${dragOverIndex === index ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}
              `}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl">{team.logo}</span>
              <div className="flex-1">
                <p className="font-medium">{team.name}</p>
                <p className="text-sm text-muted-foreground">
                  #{team.position} • {team.points} pts
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {index + 1}
              </div>
            </div>
          ))}
          
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              {t('save')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};