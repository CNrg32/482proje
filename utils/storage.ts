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
          // Backward compatibility: eski fikirlere ID, mood, timestamp ve çoklu etiketler ekle
      return ideas.map((idea: any) => {
        const updatedIdea = {
          ...idea,
          id: idea.id || generateUniqueId(), // ID yoksa oluştur
          mood: idea.mood || 'neutral',
          timestamp: idea.timestamp || new Date().toISOString()
        };

        // Çoklu etiket sistemi migration
        if (!updatedIdea.etiketler && updatedIdea.etiket) {
          // Tek etiket varsa, etiketler array'ine çevir
          updatedIdea.etiketler = [updatedIdea.etiket];
        }

        return updatedIdea;
      });
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

// PWA Utility Functions
export const isOnline = (): boolean => {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
};

export const isPWA = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if running as PWA
  const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isIOSPWA = (window.navigator as any).standalone === true;
  
  return isStandalone || isIOSPWA;
};

export const getInstallationStatus = (): 'installed' | 'installable' | 'not-supported' => {
  if (typeof window === 'undefined') return 'not-supported';
  
  if (isPWA()) {
    return 'installed';
  }
  
  if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
    return 'installable';
  }
  
  return 'not-supported';
}; 