// components/Sidebar.tsx

import React from 'react';

interface Props {
  fikirler: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onTagFilter: (tag: string | null) => void;
  onMoodFilter: (mood: any | null) => void;
  selectedTag: string | null;
  selectedMood: any | null;
}

const Sidebar: React.FC<Props> = ({ 
  fikirler, 
  activeTab, 
  onTabChange,
  onTagFilter,
  onMoodFilter,
  selectedTag,
  selectedMood
}) => {
  const menuItems = [
    { id: 'all', label: 'Fikirler', icon: '📝' },
    { id: 'add', label: 'Yeni Fikir', icon: '➕' },
    { id: 'stats', label: 'İstatistikler', icon: '📊' }
  ];

  // Tüm etiketleri topla ve sayılarını bul
  const getTagsWithCount = () => {
    const tagCount: Record<string, number> = {};
    
    fikirler.forEach(fikir => {
      if (fikir.etiket && fikir.etiket.trim()) {
        tagCount[fikir.etiket] = (tagCount[fikir.etiket] || 0) + 1;
      }
    });
    
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1]) // Sık kullanılana göre sırala
      .slice(0, 8); // En fazla 8 etiket
  };

  // Ruh hallerini sayılarıyla topla
  const getMoodsWithCount = () => {
    const moodCount: Record<string, number> = {
      inspired: 0,
      excited: 0,
      neutral: 0,
      tired: 0
    };
    
    fikirler.forEach(fikir => {
      const mood = fikir.mood || 'neutral';
      moodCount[mood] = (moodCount[mood] || 0) + 1;
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

  // Ruh hali adlarını Türkçe'ye çevir
  const getMoodName = (mood: string) => {
    switch (mood) {
      case 'inspired': return 'İlham dolu';
      case 'excited': return 'Heyecanlı';
      case 'neutral': return 'Nötr';
      case 'tired': return 'Yorgun';
      default: return mood;
    }
  };
  
  const tagsToShow = getTagsWithCount();
  const moodsToShow = getMoodsWithCount();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-0 min-h-screen shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Menü
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fikirlerinizi yönetin
        </p>
      </div>
      
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {fikirler.length > 0 && (
        <>
          {/* Etiketler Bölümü */}
          {tagsToShow.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">
                🏷️ Etiketler
              </h3>
              <div className="flex flex-wrap gap-2">
                {tagsToShow.map(([tag, count]) => (
                  <button
                    key={tag}
                    onClick={() => onTagFilter(selectedTag === tag ? null : tag)}
                    className={`text-xs rounded-full py-1 px-3 transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200'
                    }`}
                  >
                    #{tag}
                    <span className="ml-1 opacity-75">({count})</span>
                  </button>
                ))}
              </div>
              {selectedTag && (
                <button
                  onClick={() => onTagFilter(null)}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mt-2 block"
                >
                  ✕ Filtreyi temizle
                </button>
              )}
            </div>
          )}
          
          {/* Ruh Hali Bölümü */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">
              🎭 Ruh Hali
            </h3>
            <div className="space-y-2">
              {moodsToShow.map(([mood, count]) => (
                <button
                  key={mood}
                  onClick={() => onMoodFilter(selectedMood === mood ? null : mood)}
                  className={`block w-full text-left rounded-lg py-2 px-3 text-sm transition-all duration-200 ${
                    selectedMood === mood
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">{moodEmojis[mood]}</span>
                      <span>{getMoodName(mood)}</span>
                    </div>
                    <span className="text-xs opacity-75">({count})</span>
                  </div>
                </button>
              ))}
              {selectedMood && (
                <button
                  onClick={() => onMoodFilter(null)}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mt-2 block"
                >
                  ✕ Filtreyi temizle
                </button>
              )}
            </div>
          </div>
        </>
      )}
      
      <div className="border-t pt-4 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Toplam: {fikirler.length} fikir
        </p>
        {(selectedTag || selectedMood) && (
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {selectedTag && `Etiket: #${selectedTag}`}
            {selectedMood && `Ruh hali: ${getMoodName(selectedMood)}`}
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 