import { useCallback } from 'react';
import { translations, Language, TranslationKey } from '../locales';

// Hook personalizado para internacionalización (i18n)
export function useTranslation(language: Language) {
  // Función de traducción con interpolación de parámetros
  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation: string = translations[language][key] || key;
    
    // Simple parameter interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{{${paramKey}}}`, String(value));
      });
    }
    
    return translation;
  }, [language]);

  // Formatear tiempo relativo (hace X minutos/horas/días)
  const formatRelativeTime = useCallback((date: Date | string): string => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - targetDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return t('now');
    } else if (diffInMinutes < 60) {
      return `${t('ago')} ${diffInMinutes} ${t('minutesAgo')}`;
    } else if (diffInHours < 24) {
      return `${t('ago')} ${diffInHours} ${t('hoursAgo')}`;
    } else if (diffInDays < 7) {
      return `${t('ago')} ${diffInDays} ${t('daysAgo')}`;
    } else {
      return targetDate.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US');
    }
  }, [language, t]);

  // Formatear fecha según el idioma
  const formatDate = useCallback((
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const locale = language === 'es' ? 'es-ES' : 'en-US';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    return targetDate.toLocaleDateString(locale, defaultOptions);
  }, [language]);

  // Formatear hora según el idioma
  const formatTime = useCallback((
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const locale = language === 'es' ? 'es-ES' : 'en-US';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return targetDate.toLocaleTimeString(locale, defaultOptions);
  }, [language]);

  // Formatear números según el idioma
  const formatNumber = useCallback((
    number: number,
    options?: Intl.NumberFormatOptions
  ): string => {
    const locale = language === 'es' ? 'es-ES' : 'en-US';
    return number.toLocaleString(locale, options);
  }, [language]);

  // Obtener idiomas disponibles
  const getAvailableLanguages = useCallback((): Language[] => {
    return Object.keys(translations) as Language[];
  }, []);

  // Verificar si existe una traducción para una clave
  const hasTranslation = useCallback((key: string): boolean => {
    return key in translations[language];
  }, [language]);

  return {
    t,
    formatRelativeTime,
    formatDate,
    formatTime,
    formatNumber,
    getAvailableLanguages,
    hasTranslation,
    currentLanguage: language
  };
}