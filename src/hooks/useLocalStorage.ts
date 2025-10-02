import { useState } from 'react';

// Hook para sincronizar estado de React con localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Leer valor inicial desde localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Guardar valor en localStorage cuando cambia
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Error silenciado
    }
  };

  return [storedValue, setValue] as const;
}