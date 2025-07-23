// components/Stats.tsx

import React from 'react';
import { Fikir } from '@/types/idea';

interface Props {
  fikirler: Fikir[];
}

const Stats: React.FC<Props> = ({ fikirler }) => {
  // Son 7 günde eklenen fikirler
  const getLastWeekIdeas = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return fikirler.filter(fikir => {
      if (!fikir.timestamp) return false;
      return new Date(fikir.timestamp) >= oneWeekAgo;
    });
  };

  // En çok kullanılan etiketler
  const getTopTags = () => {
    const tagCount: Record<string, number> = {};
    
    fikirler.forEach(fikir => {
      if (fikir.etiket && fikir.etiket.trim()) {
        tagCount[fikir.etiket] = (tagCount[fikir.etiket] || 0) + 1;
      }
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
    
    fikirler.forEach(fikir => {
      const mood = fikir.mood || 'neutral';
      moodCount[mood] = (moodCount[mood] || 0) + 1;
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
    fikirler.forEach(fikir => {
      if (fikir.timestamp) {
        const hour = new Date(fikir.timestamp).getHours();
        hourCount[hour] = (hourCount[hour] || 0) + 1;
      }
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

  const lastWeekIdeas = getLastWeekIdeas();
  const topTags = getTopTags();
  const moodDistribution = getMoodDistribution();
  const ideasByHour = getIdeasByHour();
  
  // En aktif saat
  const mostActiveHour = Object.entries(ideasByHour)
    .sort((a, b) => b[1] - a[1])[0];

  // Günün saati formatını oluştur (örn: 14:00)
  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Ortalama etiket sayısı
  const averageTags = fikirler.length > 0 
    ? (fikirler.filter(f => f.etiket).length / fikirler.length * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        📊 Fikir İstatistikleri
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Özet Kart */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-300 flex items-center">
            📈 Genel Özet
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Toplam Fikir</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{fikirler.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Son 7 Gün</span>
              <span className="text-xl font-semibold text-green-600 dark:text-green-400">{lastWeekIdeas.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Etiketli Fikirler</span>
              <span className="text-lg font-medium text-purple-600 dark:text-purple-400">{averageTags}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">En Aktif Saat</span>
              <span className="text-lg font-medium text-orange-600 dark:text-orange-400">
                {fikirler.length > 0 && mostActiveHour 
                  ? formatHour(Number(mostActiveHour[0]))
                  : 'Veri yok'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Ruh Hali Dağılımı */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300 flex items-center">
            🎭 Ruh Hali Dağılımı
          </h3>
          {fikirler.length > 0 ? (
            <div className="space-y-3">
              {Object.entries(moodDistribution).map(([mood, count]) => (
                count > 0 && (
                  <div key={mood} className="flex items-center">
                    <div className="w-20 flex items-center">
                      <span className="mr-2 text-lg">{moodEmojis[mood]}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{getMoodName(mood)}</span>
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            mood === 'inspired' ? 'bg-yellow-400' :
                            mood === 'excited' ? 'bg-red-400' :
                            mood === 'neutral' ? 'bg-blue-400' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${(count / fikirler.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {count}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📊</div>
              <p>Henüz fikir eklenmemiş</p>
            </div>
          )}
        </div>
        
        {/* Popüler Etiketler */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300 flex items-center">
            🏷️ Popüler Etiketler
          </h3>
          {topTags.length > 0 ? (
            <div className="space-y-3">
              {topTags.map(([tag, count], index) => (
                <div key={tag} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400 w-6">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 ml-2">#{tag}</span>
                  </div>
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-sm py-1 px-3 rounded-full font-medium">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🏷️</div>
              <p>Henüz etiket eklenmemiş</p>
            </div>
          )}
        </div>
        
        {/* Aktivite Zamanları */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-orange-800 dark:text-orange-300 flex items-center">
            ⏰ Aktivite Zamanları
          </h3>
          {fikirler.length > 0 ? (
            <div>
              <div className="grid grid-cols-6 gap-1 mb-2">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const count = ideasByHour[hour];
                  const maxCount = Math.max(...Object.values(ideasByHour));
                  const intensity = maxCount > 0 ? count / maxCount : 0;
                  
                  return (
                    <div key={hour} className="flex flex-col items-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {hour.toString().padStart(2, '0')}
                      </div>
                      <div 
                        className={`w-full h-8 rounded-md transition-all duration-200 ${
                          intensity > 0 ? 'bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        style={{ 
                          opacity: intensity > 0 ? Math.max(0.3, intensity) : 0.2,
                          transform: intensity > 0.7 ? 'scale(1.1)' : 'scale(1)'
                        }}
                        title={`${hour}:00 - ${count} fikir`}
                      >
                      </div>
                      <div className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
                        {count > 0 ? count : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                📊 Saatlere göre fikir aktivitesi
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">⏰</div>
              <p>Henüz aktivite verisi yok</p>
            </div>
          )}
        </div>
      </div>

      {/* Alt bilgi */}
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
        📊 Bu istatistikler gerçek zamanlı olarak güncellenir
      </div>
    </div>
  );
};

export default Stats; 