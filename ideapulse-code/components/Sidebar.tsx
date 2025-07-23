import React from 'react';
import { Idea } from '@/types/idea';

interface Props {
  ideas: Idea[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onTagFilter: (tag: string | null) => void;
  onMoodFilter: (mood: Idea['mood'] | null) => void;
  selectedTag: string | null;
  selectedMood: Idea['mood'] | null;
}

const Sidebar: React.FC<Props> = ({
  ideas,
  activeTab,
  onTabChange,
  onTagFilter,
  onMoodFilter,
  selectedTag,
  selectedMood
}) => {
  // Tüm etiketleri topla ve sayılarını bul
  const getTagsWithCount = () => {
    const tagCount: Record<string, number> = {};
    
    ideas.forEach(idea => {
      idea.tags.forEach(tag => {
        if (tag) {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      });
    });
    
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1]); // Sık kullanılana göre sırala
  };

  // Ruh hallerini sayılarıyla topla
  const getMoodsWithCount = () => {
    const moodCount: Record<string, number> = {
      inspired: 0,
      excited: 0,
      neutral: 0,
      tired: 0
    };
    
    ideas.forEach(idea => {
      moodCount[idea.mood] = (moodCount[idea.mood] || 0) + 1;
    });
    
    return Object.entries(moodCount)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  };

  // Emoji haritası
  const moodEmojis: Record<string, string> = {
    inspired: '✨',
    excited: '🔥',
    neutral: '😐',
    tired: '😴'
  };
  
  // Görüntülenecek etiketler
  const tagsToShow = getTagsWithCount().slice(0, 10); // En fazla 10 etiket
  const moodsToShow = getMoodsWithCount();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 h-full overflow-y-auto flex-shrink-0 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">IdeaPulse</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Fikirlerinizi düzenleyin</p>
      </div>
      
      <nav className="mb-6">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onTabChange('all')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeTab === 'all' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              📝 Tüm Fikirler
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('add')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeTab === 'add' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ➕ Yeni Fikir Ekle
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('stats')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              📊 İstatistikler
            </button>
          </li>
        </ul>
      </nav>
      
      {ideas.length > 0 && (
        <>
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm uppercase tracking-wider">
              Etiketler
            </h3>
            <div className="flex flex-wrap gap-1">
              {tagsToShow.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => onTagFilter(selectedTag === tag ? null : tag)}
                  className={`text-xs rounded-full py-1 px-2 whitespace-nowrap ${
                    selectedTag === tag
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  #{tag} <span className="opacity-70">({count})</span>
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => onTagFilter(null)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Filtreyi Temizle
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm uppercase tracking-wider">
              Ruh Hali
            </h3>
            <div className="space-y-1">
              {moodsToShow.map(([mood, count]) => (
                <button
                  key={mood}
                  onClick={() => onMoodFilter(selectedMood === mood as Idea['mood'] ? null : mood as Idea['mood'])}
                  className={`block w-full text-left rounded-md py-1 px-2 text-sm ${
                    selectedMood === mood
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}
                >
                  {moodEmojis[mood]} {mood === 'inspired' ? 'İlham dolu' : 
                    mood === 'excited' ? 'Heyecanlı' :
                    mood === 'neutral' ? 'Nötr' : 'Yorgun'} 
                  <span className="opacity-70 ml-1">({count})</span>
                </button>
              ))}
              {selectedMood && (
                <button
                  onClick={() => onMoodFilter(null)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Filtreyi Temizle
                </button>
              )}
            </div>
          </div>
        </>
      )}
      
      <div className="border-t pt-4 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Toplam: {ideas.length} fikir
        </p>
      </div>
    </aside>
  );
};

export default Sidebar; 