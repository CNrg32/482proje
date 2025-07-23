// components/IdeaList.tsx

import React from 'react';
import { Fikir } from '@/types/idea';

interface Props {
  fikirler: Fikir[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

const IdeaList: React.FC<Props> = ({ fikirler, onEdit, onDelete, onTagClick }) => {
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
                onClick={() => onEdit(fikir.id!)} 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300
                         text-sm font-medium transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-700 rounded px-1"
              >
                Düzenle
              </button>
              <button 
                onClick={() => onDelete(fikir.id!)} 
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300
                         text-sm font-medium transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-700 rounded px-1"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList; 