// utils/storage.ts

import { Idea } from '@/types/idea'

const STORAGE_KEY = 'ideapulse_ideas'
const THEME_KEY = 'ideapulse_theme'

export const saveIdeasToStorage = (ideas: Idea[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  } catch (error) {
    console.error('Fikirler kaydedilirken hata oluştu:', error);
  }
}

export const getIdeasFromStorage = (): Idea[] => {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Fikirler yüklenirken hata oluştu:', error);
    return [];
  }
}

export const saveThemeToStorage = (isDark: boolean) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  } catch (error) {
    console.error('Tema kaydedilirken hata oluştu:', error);
  }
}

export const getThemeFromStorage = (): 'dark' | 'light' | null => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
  } catch (error) {
    console.error('Tema yüklenirken hata oluştu:', error);
    return null;
  }
}

// PWA yükleme durumunu kontrol et
export const checkIsAppInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || 
         ('standalone' in window.navigator && (window.navigator as any).standalone === true);
}

// IndexedDB'yi kontrol et (daha büyük veri depolama için)
export const isIndexedDBSupported = (): boolean => {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}