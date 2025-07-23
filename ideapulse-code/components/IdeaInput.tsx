// components/IdeaInput.tsx

import React, { useState, FormEvent } from 'react';
import { Idea } from '@/types/idea';
import { v4 as uuidv4 } from 'uuid';
import MoodSelector from './MoodSelector';
import { createIdea } from '@/utils/ideaFactory';

interface Props {
  onSubmit: (idea: Idea) => void;
}

const IdeaInput: React.FC<Props> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Idea['mood']>('neutral');
  const [tags, setTags] = useState<string>('');

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (!content.trim()) return;

    const newIdea: Idea = createIdea(
      content,
      mood,
      tags.split(',').map((t) => t.trim()).filter(Boolean)
    );

    onSubmit(newIdea);
    setContent('');
    setTags('');
    setMood('neutral');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+Enter ile kaydetme
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 space-y-4">
      <textarea
        className="w-full border p-2 rounded resize-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        placeholder="Fikrinizi yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        required
      />
      <input
        className="w-full border p-2 rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        placeholder="Etiketler (virgülle ayırın)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      
      <MoodSelector value={mood} onChange={setMood} />
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors focus:ring focus:ring-blue-300"
      >
        Fikri Kaydet
      </button>
    </form>
  );
};

export default IdeaInput;