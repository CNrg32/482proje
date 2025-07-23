import React from 'react';
import { Idea } from '@/types/idea';

interface Props {
  ideas: Idea[];
}

const Header: React.FC<Props> = ({ ideas }) => {
  // Bugün eklenen fikirlerin sayısını hesapla
  const getTodayIdeasCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return ideas.filter(idea => {
      const ideaDate = new Date(idea.timestamp);
      return ideaDate >= today;
    }).length;
  };

  // En popüler etiketleri hesapla (en çok kullanılan 3 etiket)
  const getPopularTags = () => {
    const tagCounts: Record<string, number> = {};
    
    // Tüm etiketleri say
    ideas.forEach(idea => {
      idea.tags.forEach(tag => {
        if (tag) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    });
    
    // En popüler 3 etiketi al
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);
  };

  const popularTags = getPopularTags();
  const todayIdeasCount = getTodayIdeasCount();

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">🧠 IdeaPulse</h1>
        <div className="text-sm text-gray-600">
          Toplam: <span className="font-semibold">{ideas.length}</span> fikir
          {todayIdeasCount > 0 && (
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Bugün: +{todayIdeasCount}
            </span>
          )}
        </div>
      </div>
      
      {popularTags.length > 0 && (
        <div className="mt-3 flex items-center">
          <span className="text-xs text-gray-500 mr-2">Popüler:</span>
          <div className="flex flex-wrap gap-1">
            {popularTags.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;