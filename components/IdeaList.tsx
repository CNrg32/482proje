// components/IdeaList.tsx

import React, { useState } from 'react';
import { Fikir } from '@/types/idea';
import MoodSelector from './MoodSelector';

interface Props {
  fikirler: Fikir[];
  onEdit: (updatedFikir: Fikir) => void;
  onDelete: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

const IdeaList: React.FC<Props> = ({ fikirler, onEdit, onDelete, onTagClick }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editMood, setEditMood] = useState<Fikir['mood']>('neutral');

  // Ruh haline göre emoji gösterilmesi
  const getMoodEmoji = (mood?: Fikir['mood']) => {
    switch (mood) {
      case 'inspired': return '✨';
      case 'excited': return '🔥';
      case 'neutral': return '😐';
      case 'tired': return '😴';
      default: return '😐';
    }
  };

  // Düzenlemeyi başlat
  const startEditing = (fikir: Fikir) => {
    setEditingId(fikir.id!);
    setEditContent(fikir.metin);
    setEditTags(fikir.etiket || '');
    setEditMood(fikir.mood || 'neutral');
  };

  // Düzenlemeyi kaydet
  const saveEdit = (fikir: Fikir) => {
    const updatedFikir: Fikir = {
      ...fikir,
      metin: editContent,
      etiket: editTags,
      mood: editMood,
      timestamp: new Date().toISOString() // Düzenleme zamanını güncelle
    };

    onEdit(updatedFikir);
    setEditingId(null);
  };

  // Düzenlemeyi iptal et
  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
    setEditTags('');
    setEditMood('neutral');
  };

  if (fikirler.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">💡</div>
        <p className="text-gray-500 dark:text-gray-400 italic">
          Henüz fikir eklenmemiş.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          İlk fikrinizi eklemek için "Yeni Fikir" sekmesini kullanın.
        </p>
      </div>
    );
  }

  return (
        <div className="space-y-4">
      {fikirler.map((fikir) => (
        <div 
          key={fikir.id || Math.random()} 
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600
                   hover:shadow-md transition-all duration-200"
        >
          {editingId === fikir.id ? (
            // Düzenleme formu
            <div className="space-y-4">
              <textarea 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         resize-none transition-colors duration-200"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                placeholder="Fikrinizi yazın..."
              />
              <input
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-colors duration-200"
                placeholder="Etiket (isteğe bağlı)"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
              />
              
              <MoodSelector value={editMood} onChange={setEditMood} />
              
              <div className="flex space-x-2">
                <button 
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 
                           focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                           dark:focus:ring-offset-gray-700 font-medium transition-colors duration-200"
                  onClick={() => saveEdit(fikir)}
                  type="button"
                >
                  ✓ Kaydet
                </button>
                <button 
                  className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500
                           focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                           dark:focus:ring-offset-gray-700 font-medium transition-colors duration-200"
                  onClick={cancelEdit}
                  type="button"
                >
                  ✕ İptal
                </button>
              </div>
            </div>
          ) : (
            // Normal görünüm
            <>
              <div className="flex justify-between items-start mb-3">
                <p className="text-gray-800 dark:text-gray-100 flex-1 pr-4 whitespace-pre-line">
                  {fikir.metin}
                </p>
                <span className="text-xl ml-2 flex-shrink-0">{getMoodEmoji(fikir.mood)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1 items-center">
                  {fikir.etiket && (
                    <button
                      onClick={() => onTagClick?.(fikir.etiket!)}
                      className="inline-block px-2 py-1 text-xs font-medium
                               bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               rounded-full hover:bg-blue-200 dark:hover:bg-blue-800
                               transition-colors duration-200 cursor-pointer"
                    >
                      #{fikir.etiket}
                    </button>
                  )}
                  {fikir.timestamp && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {new Date(fikir.timestamp).toLocaleString('tr-TR')}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => startEditing(fikir)} 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300
                             text-sm font-medium transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             dark:focus:ring-offset-gray-700 rounded px-1"
                  >
                    ✏️ Düzenle
                  </button>
                  <button 
                    onClick={() => onDelete(fikir.id!)} 
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300
                             text-sm font-medium transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                             dark:focus:ring-offset-gray-700 rounded px-1"
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default IdeaList; 