import React, { useState } from 'react';
import { Idea } from '@/types/idea';

interface Props {
  ideas: Idea[];
  onDelete: (id: string) => void;
  onEdit: (updatedIdea: Idea) => void;
  onTagClick?: (tag: string) => void;
}

const IdeaList: React.FC<Props> = ({ ideas, onDelete, onEdit, onTagClick }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editMood, setEditMood] = useState<Idea['mood']>('neutral');

  const startEditing = (idea: Idea) => {
    setEditingId(idea.id);
    setEditContent(idea.content);
    setEditTags(idea.tags.join(', '));
    setEditMood(idea.mood);
  };

  const saveEdit = (id: string) => {
    const originalIdea = ideas.find(idea => idea.id === id);
    if (!originalIdea) return;

    onEdit({
      ...originalIdea,
      content: editContent,
      tags: editTags.split(',').map(tag => tag.trim()).filter(Boolean),
      mood: editMood,
      // timestamp'i güncelleme - son değişiklik tarihi olarak
      timestamp: new Date().toISOString()
    });

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  // Fikir kartında ruh haline göre emoji gösterilmesi
  const getMoodEmoji = (mood: Idea['mood']) => {
    switch (mood) {
      case 'inspired': return '✨';
      case 'excited': return '🔥';
      case 'neutral': return '😐';
      case 'tired': return '😴';
      default: return '';
    }
  };

  if (ideas.length === 0) {
    return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Henüz fikir eklenmemiş.</div>;
  }

  return (
    <ul className="space-y-4">
      {ideas.map((idea) => (
        <li key={idea.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border dark:border-gray-700">
          {editingId === idea.id ? (
            // Düzenleme formu
            <div className="space-y-3">
              <textarea 
                className="w-full border p-2 rounded resize-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
              />
              <input
                className="w-full border p-2 rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Etiketler (virgülle ayırın)"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
              />
              <select
                className="w-full border p-2 rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={editMood}
                onChange={(e) => setEditMood(e.target.value as Idea['mood'])}
              >
                <option value="inspired">✨ İlham dolu</option>
                <option value="neutral">😐 Nötr</option>
                <option value="tired">😴 Yorgun</option>
                <option value="excited">🔥 Heyecanlı</option>
              </select>
              <div className="flex space-x-2">
                <button 
                  className="flex-1 bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 focus:ring focus:ring-green-300"
                  onClick={() => saveEdit(idea.id)}
                  type="button"
                >
                  Kaydet
                </button>
                <button 
                  className="flex-1 bg-gray-400 text-white py-1 px-4 rounded hover:bg-gray-500 focus:ring focus:ring-gray-300"
                  onClick={cancelEdit}
                  type="button"
                >
                  İptal
                </button>
              </div>
            </div>
          ) : (
            // Normal görünüm
            <div>
              <div className="flex justify-between items-start">
                <p className="whitespace-pre-line dark:text-gray-100">{idea.content}</p>
                <span className="text-xl ml-2">{getMoodEmoji(idea.mood)}</span>
              </div>
              
              <div className="flex justify-between items-center mt-3 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                <div className="flex flex-wrap gap-1 mb-2">
                  {idea.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <div className="text-xs">{new Date(idea.timestamp).toLocaleString('tr-TR')}</div>
              </div>
              
              <div className="flex justify-end mt-2 space-x-2">
                <button 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                  onClick={() => startEditing(idea)}
                  type="button"
                >
                  Düzenle
                </button>
                <button 
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                  onClick={() => onDelete(idea.id)}
                  type="button"
                >
                  Sil
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default IdeaList;