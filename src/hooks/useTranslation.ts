import { useCallback } from 'react';
import { translations, Language, TranslationKey } from '../locales';

/**
 * Custom hook for internationalization
 * Provides translation function and language utilities
 */
export function useTranslation(language: Language) {
  /**
   * Translation function
   * @param key - Translation key
   * @param params - Optional parameters for string interpolation
   * @returns Translated string
   */
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

  /**
   * Format relative time in the current language
   * @param date - Date to format
   * @returns Formatted relative time string
   */
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
      // Format as date
      return targetDate.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US');
    }
  }, [language, t]);

  /**
   * Format date in the current language
   * @param date - Date to format
   * @param options - Intl.DateTimeFormat options
   * @returns Formatted date string
   */
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

  /**
   * Format time in the current language
   * @param date - Date to format
   * @param options - Intl.DateTimeFormat options
   * @returns Formatted time string
   */
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

  /**
   * Format numbers in the current language
   * @param number - Number to format
   * @param options - Intl.NumberFormat options
   * @returns Formatted number string
   */
  const formatNumber = useCallback((
    number: number,
    options?: Intl.NumberFormatOptions
  ): string => {
    const locale = language === 'es' ? 'es-ES' : 'en-US';
    return number.toLocaleString(locale, options);
  }, [language]);

  /**
   * Get available languages
   * @returns Array of available language codes
   */
  const getAvailableLanguages = useCallback((): Language[] => {
    return Object.keys(translations) as Language[];
  }, []);

  /**
   * Check if a translation key exists
   * @param key - Translation key to check
   * @returns Boolean indicating if key exists
   */
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