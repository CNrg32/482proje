// types/idea.ts

export interface Idea {
  id: string;
  content: string;
  tags: string[];
  timestamp: string; // ISO format
}

// Şimdilik eski Fikir tipini de destekleyeceğiz (backward compatibility için)
export type Fikir = {
  metin: string;
  etiket?: string;
}; 