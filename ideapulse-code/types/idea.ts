// types/idea.ts

export interface Idea {
  id: string;
  content: string;
  mood: 'inspired' | 'neutral' | 'tired' | 'excited';
  tags: string[];
  timestamp: string; // ISO format
}
