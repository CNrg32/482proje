import { Idea } from '@/types/idea';
import { v4 as uuidv4 } from 'uuid';

export function createIdea(content: string, mood: Idea['mood'], tags: string[]): Idea {
  return {
    id: uuidv4(),
    content,
    mood,
    tags,
    timestamp: new Date().toISOString(),
  };
}

let deleteIdeaInstance: ((id: string) => void) | null = null;

export function getDeleteIdeaSingleton({ setIdeas, saveIdeasToStorage }: { setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>, saveIdeasToStorage: (ideas: Idea[]) => void }) {
  if (!deleteIdeaInstance) {
    deleteIdeaInstance = (id: string) => {
      setIdeas((prevIdeas: Idea[]) => {
        const updated = prevIdeas.filter((idea) => idea.id !== id);
        saveIdeasToStorage(updated);
        return updated;
      });
    };
  }
  return deleteIdeaInstance;
}

let deleteAllIdeasInstance: (() => void) | null = null;

export function getDeleteAllIdeasSingleton({ setIdeas, saveIdeasToStorage }: { setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>, saveIdeasToStorage: (ideas: Idea[]) => void }) {
  if (!deleteAllIdeasInstance) {
    deleteAllIdeasInstance = () => {
      setIdeas([]);
      saveIdeasToStorage([]);
    };
  }
  return deleteAllIdeasInstance;
} 