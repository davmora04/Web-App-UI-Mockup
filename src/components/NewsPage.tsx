import React from 'react';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useApp, news, News } from './AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsPageProps {
  selectedNewsId?: string;
  onSelectNews?: (newsId: string | undefined) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ selectedNewsId, onSelectNews }) => {
  const { t } = useApp();

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
      return `Hace ${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} horas`;
    } else {
      return `Hace ${diffDays} días`;
    }
  };

  // Si hay una noticia seleccionada, mostrar el detalle
  if (selectedNewsId) {
    const selectedNews = news.find(n => n.id === selectedNewsId);
    if (!selectedNews) return null;

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header de navegación */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => onSelectNews?.(undefined)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a noticias
          </Button>
        </div>

        {/* Artículo completo */}
        <article>
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {selectedNews.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{selectedNews.title}</h1>
            
            <div className="flex items-center space-x-4 text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatRelativeTime(selectedNews.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ExternalLink className="h-4 w-4" />
                <span>{selectedNews.source}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <ImageWithFallback
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          <div className="prose max-w-none">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {selectedNews.summary}
            </p>
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Vista de lista de noticias
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('news')}</h1>
        <p className="text-muted-foreground">
          Las últimas noticias del mundo del fútbol
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div onClick={() => onSelectNews?.(article.id)}>
              <div className="relative">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <span>{article.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatRelativeTime(article.date)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectNews?.(article.id);
                    }}
                  >
                    {t('readMore')}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};