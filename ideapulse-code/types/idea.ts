// types/idea.ts

export interface Idea {
  id: string;
  content: string;
  mood: 'inspired' | 'neutral' | 'tired' | 'excited';
  tags: string[];
  timestamp: string; // ISO format
}

// Şimdilik eski Fikir tipini de destekleyeceğiz (backward compatibility için)
export type Fikir = {
  id?: string; // UUID support eklendi
  metin: string;
  etiket?: string; // Tek etiket (backward compatibility)
  etiketler?: string[]; // Çoklu etiketler (yeni sistem)
  mood?: 'inspired' | 'neutral' | 'tired' | 'excited';
  timestamp?: string; // ISO format timestamp eklendi
};

// Helper function to convert Fikir to Idea
export const fikirToIdea = (fikir: Fikir): Idea => {
  return {
    id: '', // Will be set by caller
    content: fikir.metin,
    mood: fikir.mood || 'neutral',
    tags: fikir.etiket ? [fikir.etiket] : [],
    timestamp: new Date().toISOString()
  };
};

// Helper function to convert Idea to Fikir
export const ideaToFikir = (idea: Idea): Fikir => {
  return {
    metin: idea.content,
    etiket: idea.tags.length > 0 ? idea.tags[0] : undefined,
    mood: idea.mood as Fikir['mood']
  };
}; 