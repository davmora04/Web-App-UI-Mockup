import { useReducer, useCallback } from 'react';
import { Team } from '../components/AppContext';

// Tipos de acciones para el manejo de favoritos
export type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Team }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'REORDER_FAVORITES'; payload: Team[] }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_FAVORITES'; payload: Team[] };

// Estado de favoritos
export interface FavoritesState {
  favorites: Team[];
  isLoading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null
};

// Reducer para manejar favoritos
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      // Prevent duplicates
      if (state.favorites.find(team => team.id === action.payload.id)) {
        return {
          ...state,
          error: 'Team is already in favorites'
        };
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        error: null
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(team => team.id !== action.payload),
        error: null
      };

    case 'REORDER_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
        error: null
      };

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
        error: null
      };

    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
        isLoading: false,
        error: null
      };

    default:
      return state;
  }
}

/**
 * Custom hook for managing favorites with useReducer
 * Provides advanced state management for favorites functionality
 */
export function useFavorites() {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = useCallback((team: Team) => {
    dispatch({ type: 'ADD_FAVORITE', payload: team });
  }, []);

  const removeFromFavorites = useCallback((teamId: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: teamId });
  }, []);

  const reorderFavorites = useCallback((reorderedTeams: Team[]) => {
    dispatch({ type: 'REORDER_FAVORITES', payload: reorderedTeams });
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  }, []);

  const loadFavorites = useCallback((teams: Team[]) => {
    dispatch({ type: 'LOAD_FAVORITES', payload: teams });
  }, []);

  const isFavorite = useCallback((teamId: string) => {
    return state.favorites.some(team => team.id === teamId);
  }, [state.favorites]);

  const getFavoritesByLeague = useCallback((leagueId: string) => {
    return state.favorites.filter(team => {
      if (leagueId === 'laliga') return ['real-madrid', 'barcelona', 'atletico'].includes(team.id);
      if (leagueId === 'premier') return ['liverpool', 'arsenal', 'chelsea'].includes(team.id);
      if (leagueId === 'seriea') return ['juventus', 'milan', 'inter'].includes(team.id);
      return false;
    });
  }, [state.favorites]);

  return {
    ...state,
    addToFavorites,
    removeFromFavorites,
    reorderFavorites,
    clearFavorites,
    loadFavorites,
    isFavorite,
    getFavoritesByLeague
  };
}