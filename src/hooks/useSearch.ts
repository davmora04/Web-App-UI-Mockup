import { useState, useCallback } from 'react';

/**
 * Custom hook for debouncing values
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}

/**
 * Custom hook for managing search functionality with debouncing
 * @param onSearch - Callback function to execute the search
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns search query, setSearchQuery, debouncedQuery, and handleSearch
 */
export function useSearch(
  onSearch: (query: string) => void,
  delay: number = 300
) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, delay);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  useState(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  });

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    handleSearch
  };
}