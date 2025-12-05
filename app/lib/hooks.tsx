'use client';
import { useState, useEffect, useCallback } from 'react';

// --- FAVORITES HOOK ---
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isaiah-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      
      localStorage.setItem('isaiah-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
};

// --- SPIRITUAL GEMS (NOTES) HOOK ---
export const useGems = () => {
  const [gems, setGems] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isaiah-gems');
      if (stored) {
        setGems(JSON.parse(stored));
      }
      setIsLoaded(true);
    }
  }, []);

  const saveGem = useCallback((reference: string, content: string) => {
    setGems(prev => {
      const newGems = { ...prev, [reference]: content };
      localStorage.setItem('isaiah-gems', JSON.stringify(newGems));
      return newGems;
    });
  }, []);

  const deleteGem = useCallback((reference: string) => {
    setGems(prev => {
      const newGems = { ...prev };
      delete newGems[reference];
      localStorage.setItem('isaiah-gems', JSON.stringify(newGems));
      return newGems;
    });
  }, []);

  const getGem = useCallback((reference: string) => {
    return gems[reference] || '';
  }, [gems]);

  return { saveGem, getGem, deleteGem, allGems: gems, isLoaded };
};