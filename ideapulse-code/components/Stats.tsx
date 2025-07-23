import React from 'react';
import { Idea } from '@/types/idea';
import MoodInsight from './MoodInsight';

interface Props {
  ideas: Idea[];
}

const Stats: React.FC<Props> = ({ ideas }) => {
  // Son 7 günde eklenen fikirler
  const getLastWeekIdeas = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return ideas.filter(idea => new Date(idea.timestamp) >= oneWeekAgo);
  };

  // En çok kullanılan etiketler
  const getTopTags = () => {
    const tagCount: Record<string, number> = {};
    
    ideas.forEach(idea => {
      idea.tags.forEach(tag => {
        if (tag) {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      });
    });
    
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // İlk 5 etiket
  };

  // Ruh haline göre fikir dağılımı
  const getMoodDistribution = () => {
    const moodCount: Record<string, number> = {
      inspired: 0,
      excited: 0,
      neutral: 0,
      tired: 0
    };
    
    ideas.forEach(idea => {
      moodCount[idea.mood] = (moodCount[idea.mood] || 0) + 1;
    });
    
    return moodCount;
  };

  // Günün saatlerine göre fikir sayısı
  const getIdeasByHour = () => {
    const hourCount: Record<number, number> = {};
    
    // Başlangıç değerlerini ata
    for (let i = 0; i < 24; i++) {
      hourCount[i] = 0;
    }
    
    // Fikirleri saatlere göre say
    ideas.forEach(idea => {
      const hour = new Date(idea.timestamp).getHours();
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });
    
    return hourCount;
  };

  // Emoji karşılıkları
  const moodEmojis: Record<string, string> = {
    inspired: '✨',
    excited: '🔥',
    neutral: '😐',
    tired: '😴'
  };

  const lastWeekIdeas = getLastWeekIdeas();
  const topTags = getTopTags();
  const moodDistribution = getMoodDistribution();
  const ideasByHour = getIdeasByHour();
  
  // En aktif saat
  const mostActiveHour = Object.entries(ideasByHour)
    .sort((a, b) => b[1] - a[1])[0];

  // Günün saati formatını oluştur (örn: 14:00)
  const formatHour = (hour: number) => {
    return `${hour}:00`;
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Fikir İstatistikleri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Özet Kart */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 text-blue-800 dark:text-blue-300">Özet</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Toplam Fikir</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{ideas.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Son 7 Gün</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{lastWeekIdeas.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Ortalama Etiket</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {ideas.length > 0 
                  ? (ideas.reduce((sum, idea) => sum + idea.tags.length, 0) / ideas.length).toFixed(1) 
                  : 0}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">En Aktif Saat</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {ideas.length > 0 
                  ? formatHour(Number(mostActiveHour[0]))
                  : 'Veri yok'}
              </span>
            </li>
          </ul>
        </div>
        
        {/* Ruh Hali Dağılımı */}
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 text-purple-800 dark:text-purple-300">Ruh Hali Dağılımı</h3>
          {ideas.length > 0 ? (
            <div className="space-y-3">
              {Object.entries(moodDistribution).map(([mood, count]) => (
                count > 0 && (
                  <div key={mood} className="flex items-center">
                    <div className="w-24 flex items-center">
                      <span className="mr-2">{moodEmojis[mood]}</span>
                      <span className="text-gray-700 dark:text-gray-300">{getMoodName(mood)}</span>
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            mood === 'inspired' ? 'bg-yellow-400' :
                            mood === 'excited' ? 'bg-red-400' :
                            mood === 'neutral' ? 'bg-blue-400' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${(count / ideas.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-10 text-right">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {((count / ideas.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Henüz fikir eklenmemiş</p>
          )}
        </div>
        
        {/* Popüler Etiketler */}
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 text-green-800 dark:text-green-300">Popüler Etiketler</h3>
          {topTags.length > 0 ? (
            <div className="space-y-2">
              {topTags.map(([tag, count]) => (
                <div key={tag} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">#{tag}</span>
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs py-1 px-2 rounded-full">
                    {count} kullanım
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Henüz etiket eklenmemiş</p>
          )}
        </div>
        
        {/* Zaman Dağılımı */}
        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 text-orange-800 dark:text-orange-300">Aktivite Zamanları</h3>
          {ideas.length > 0 ? (
            <div>
              <div className="grid grid-cols-6 gap-1 mt-2">
                {[0, 6, 12, 18].map(startHour => (
                  <div key={startHour} className="col-span-6 flex">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const hour = startHour + i;
                      if (hour >= 24) return null;
                      const count = ideasByHour[hour];
                      const maxCount = Math.max(...Object.values(ideasByHour));
                      const intensity = maxCount > 0 ? count / maxCount : 0;
                      
                      return (
                        <div key={hour} className="flex-1">
                          <div className="text-center text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {hour}:00
                          </div>
                          <div 
                            className="mx-auto w-full h-6 rounded-md" 
                            style={{ 
                              backgroundColor: `rgba(234, 88, 12, ${intensity})`,
                              opacity: intensity > 0 ? 1 : 0.2
                            }}
                          >
                          </div>
                          <div className="text-center text-xs mt-1">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-center text-gray-500">
                Saatlere göre fikir sayısı
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Henüz fikir eklenmemiş</p>
          )}
        </div>
      </div>
      <div className="my-8">
        <MoodInsight data={moodDistribution} />
      </div>
    </div>
  );
};

export default Stats; 