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
    if (!stored) return [];
    
    const ideas = JSON.parse(stored);
    // Backward compatibility: eski fikirlere ID, mood ve timestamp ekle
    return ideas.map((idea: any) => ({
      ...idea,
      id: idea.id || generateUniqueId(), // ID yoksa oluştur
      mood: idea.mood || 'neutral',
      timestamp: idea.timestamp || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Fikirler yüklenirken hata oluştu:', error);
    return [];
  }
};

// Unique ID generator (basit UUID benzeri)
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Varsayılan fikirler
export const getDefaultIdeas = (): Fikir[] => [
  { 
    id: generateUniqueId(),
    metin: '482 dersini AA geçmek', 
    etiket: 'okul', 
    mood: 'excited',
    timestamp: new Date().toISOString()
  },
  { 
    id: generateUniqueId(),
    metin: 'Proje Ödevini yapmak', 
    etiket: 'ödev', 
    mood: 'neutral',
    timestamp: new Date().toISOString()
  },
  { 
    id: generateUniqueId(),
    metin: 'Ekip içi dağılımı planlamak', 
    etiket: 'takım', 
    mood: 'inspired',
    timestamp: new Date().toISOString()
  }
]; 