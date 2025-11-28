import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting mobile devices
 * @param breakpoint - Breakpoint in pixels (default: 768px)
 * @returns boolean indicating if device is mobile
 */
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Custom hook for managing theme with system preference detection
 * @returns theme state and setter with system preference support
 */
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    }
    return 'system';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = effectiveTheme;
  }, [theme, effectiveTheme]);

  return {
    theme,
    setTheme,
    effectiveTheme,
    systemTheme
  };
}