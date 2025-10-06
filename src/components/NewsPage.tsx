import React from 'react';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useApp, news, News } from './AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { newsI18n } from '@/locales/news';

interface NewsPageProps {
  selectedNewsId?: string;
  onSelectNews?: (newsId: string | undefined) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ selectedNewsId, onSelectNews }) => {
  const { t, language, formatRelativeTime } = useApp();

  const localize = (n: News): News => {
    const tx = (newsI18n as any)?.[language]?.[n.id];
    return tx ? { ...n, ...tx } : n;
  };

  // Si hay una noticia seleccionada, mostrar el detalle
  if (selectedNewsId) {
    const base = news.find(n => n.id === selectedNewsId);
    if (!base) return null;
    const selectedNews = localize(base);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => onSelectNews?.(undefined)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToNews')}
          </Button>
        </div>

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

  // LISTA
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('news')}</h1>
        <p className="text-muted-foreground">
          {t('newsIntro')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => {
          const article = localize(n);
          return (
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
          );
        })}
      </div>
    </div>
  );
};