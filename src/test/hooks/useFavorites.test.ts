import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../../hooks/useFavorites';
import { Team } from '../../components/AppContext';

describe('useFavorites Hook', () => {
  const mockTeam1: Team = {
    id: 'team1',
    name: 'Team 1',
    logo: '🔴',
    position: 1,
    points: 30,
    played: 10,
    won: 9,
    drawn: 1,
    lost: 0,
    goalsFor: 25,
    goalsAgainst: 5,
    goalDifference: 20,
    form: ['W', 'W', 'D', 'W', 'W']
  };

  const mockTeam2: Team = {
    id: 'team2',
    name: 'Team 2',
    logo: '🔵',
    position: 2,
    points: 25,
    played: 10,
    won: 8,
    drawn: 1,
    lost: 1,
    goalsFor: 20,
    goalsAgainst: 8,
    goalDifference: 12,
    form: ['W', 'L', 'W', 'W', 'W']
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should add team to favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockTeam1);
    expect(result.current.error).toBe(null);
  });

  it('should prevent duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
    });
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.error).toBe('Team is already in favorites');
  });

  it('should remove team from favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
      result.current.addToFavorites(mockTeam2);
    });
    
    expect(result.current.favorites).toHaveLength(2);
    
    act(() => {
      result.current.removeFromFavorites('team1');
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe('team2');
  });

  it('should reorder favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
      result.current.addToFavorites(mockTeam2);
    });
    
    const reorderedTeams = [mockTeam2, mockTeam1];
    
    act(() => {
      result.current.reorderFavorites(reorderedTeams);
    });
    
    expect(result.current.favorites).toEqual(reorderedTeams);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
      result.current.addToFavorites(mockTeam2);
    });
    
    expect(result.current.favorites).toHaveLength(2);
    
    act(() => {
      result.current.clearFavorites();
    });
    
    expect(result.current.favorites).toHaveLength(0);
  });

  it('should check if team is favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addToFavorites(mockTeam1);
    });
    
    expect(result.current.isFavorite('team1')).toBe(true);
    expect(result.current.isFavorite('team2')).toBe(false);
  });

  it('should load favorites from external source', () => {
    const { result } = renderHook(() => useFavorites());
    const externalFavorites = [mockTeam1, mockTeam2];
    
    act(() => {
      result.current.loadFavorites(externalFavorites);
    });
    
    expect(result.current.favorites).toEqual(externalFavorites);
    expect(result.current.isLoading).toBe(false);
  });
});