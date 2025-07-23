// utils/storage.ts

import { Fikir } from '@/types/idea';

const LOCAL_KEY = 'fikirler';

export const saveIdeasToStorage = (fikirler: Fikir[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(fikirler));
  } catch (error) {
    console.error('Fikirler kaydedilirken hata oluştu:', error);
  }
};

export const getIdeasFromStorage = (): Fikir[] => {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Fikirler yüklenirken hata oluştu:', error);
    return [];
  }
};

// Varsayılan fikirler
export const getDefaultIdeas = (): Fikir[] => [
  { metin: '482 dersini AA geçmek', etiket: 'okul' },
  { metin: 'Proje Ödevini yapmak', etiket: 'ödev' },
  { metin: 'Ekip içi dağılımı planlamak', etiket: 'takım' }
]; 