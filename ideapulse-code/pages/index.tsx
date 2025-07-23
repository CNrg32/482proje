// pages/index.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Idea } from '@/types/idea';
import { saveIdeasToStorage, getIdeasFromStorage } from '@/utils/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaInput from '@/components/IdeaInput';
import IdeaList from '@/components/IdeaList';
import Stats from '@/components/Stats';
import Sidebar from '@/components/Sidebar';
import { v4 as uuidv4 } from 'uuid';
import { getDeleteIdeaSingleton, getDeleteAllIdeasSingleton } from '@/utils/ideaFactory';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<Idea['mood'] | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Tema ve verileri yükle
  useEffect(() => {
    // Dark mode tercihini kontrol et
    if (typeof window !== 'undefined') {
      const userPrefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }

      // Çevrimiçi/çevrimdışı durumunu izle (PWA için)
      const handleOnlineStatus = () => setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
      setIsOnline(navigator.onLine);

      // Temizleme işlevi
      return () => {
        window.removeEventListener('online', handleOnlineStatus);
        window.removeEventListener('offline', handleOnlineStatus);
      };
    }
  }, []);

  // Fikirleri yükle
  useEffect(() => {
    const storedIdeas = getIdeasFromStorage();
    setIdeas(storedIdeas);
  }, []);

  // Dark mode değişimini takip et
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Yeni fikir ekle
  const handleNewIdea = (idea: Idea) => {
    // ID yoksa ekle (IdeaInput'tan gelen veriye ID ekleme olasılığına karşı)
    const finalIdea = {
      ...idea,
      id: idea.id || uuidv4()
    };
    
    const updated = [finalIdea, ...ideas];
    setIdeas(updated);
    saveIdeasToStorage(updated);
    
    // Fikir ekledikten sonra tüm fikirleri gösteren sekmeye geç
    setActiveTab('all');
  };

  // Fikir düzenle
  const handleEditIdea = (updatedIdea: Idea) => {
    const updated = ideas.map(idea => 
      idea.id === updatedIdea.id ? updatedIdea : idea
    );
    setIdeas(updated);
    saveIdeasToStorage(updated);
  };

  // Fikir sil fonksiyonunu singleton olarak al
  const handleDeleteIdea = getDeleteIdeaSingleton({ setIdeas, saveIdeasToStorage });

  // Tüm fikirleri sil fonksiyonunu singleton olarak al
  const handleDeleteAllIdeas = getDeleteAllIdeasSingleton({ setIdeas, saveIdeasToStorage });

  // Etiket filtreleme
  const handleTagClick = (tag: string) => {
    setFilterTag(tag);
    setFilterMood(null);
  };

  // Ruh hali filtreleme
  const handleMoodFilter = (mood: Idea['mood'] | null) => {
    setFilterMood(mood);
    setFilterTag(null);
  };

  // Sekme değiştirme
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  // Filtrelenmiş fikirleri al
  const getFilteredIdeas = () => {
    let filtered = ideas;
    
    if (filterTag) {
      filtered = filtered.filter(idea => 
        idea.tags.some(tag => tag.toLowerCase() === filterTag.toLowerCase())
      );
    }
    
    if (filterMood) {
      filtered = filtered.filter(idea => idea.mood === filterMood);
    }
    
    return filtered;
  };

  // Filtreleme başlığı göster
  const renderFilterHeader = () => {
    if (!filterTag && !filterMood) return null;
    
    return (
      <div className="mb-4 p-2 rounded-md bg-blue-50 dark:bg-blue-900/30 flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {filterTag && `"${filterTag}" etiketini içeren fikirler`}
          {filterMood && `${
            filterMood === 'inspired' ? 'İlham dolu' : 
            filterMood === 'excited' ? 'Heyecanlı' : 
            filterMood === 'neutral' ? 'Nötr' : 'Yorgun'
          } ruh halindeki fikirler`}
        </span>
        <button
          onClick={() => {
            setFilterTag(null);
            setFilterMood(null);
          }}
          className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Filtreyi kaldır"
        >
          Filtreyi Kaldır
        </button>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>IdeaPulse - Fikirlerinizi Kaydedin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navbar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
        
        {!isOnline && (
          <div className="fixed top-16 inset-x-0 z-50 bg-yellow-500 text-yellow-900 text-center py-2 text-sm">
            Çevrimdışı moddasınız. Değişiklikleriniz cihazınıza kaydedilecek.
          </div>
        )}
        
        {/* Mobil menü butonu */}
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <button 
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            aria-label={isMobileSidebarOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMobileSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row">
              {/* Mobil Kenar Çubuğu Arka Planı (Karartma katmanı) */}
              {isMobileSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                </div>
              )}
              
              {/* Kenar Çubuğu - Masaüstünde normal görünüm, mobilde overlay */}
              <div 
                className={`
                  lg:w-64 lg:mr-8 
                  fixed lg:static inset-y-0 right-0 z-30 
                  transform ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
                  lg:translate-x-0 transition-transform duration-300 ease-in-out
                  lg:flex mt-8 lg:mt-0
                `}
              >
                <div className="h-full lg:sticky lg:top-20 w-64 py-8 px-4 lg:py-0 lg:px-0 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none">
                  <Sidebar 
                    ideas={ideas} 
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onTagFilter={setFilterTag}
                    onMoodFilter={handleMoodFilter}
                    selectedTag={filterTag}
                    selectedMood={filterMood}
                  />
                </div>
              </div>
              
              {/* Ana İçerik */}
              <main className="flex-1 mt-8">
                {/* İçerik Alanı */}
                <div className="space-y-6">
                  {activeTab === 'all' && (
                    <>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Fikirlerim</h1>
                          {ideas.length > 0 && (
                            <button
                              onClick={handleDeleteAllIdeas}
                              className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors font-semibold text-sm shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              Tümünü Sil
                            </button>
                          )}
                        </div>
                        
                        {renderFilterHeader()}
                        
                        <div className="mt-6">
                          <IdeaList 
                            ideas={getFilteredIdeas()} 
                            onDelete={handleDeleteIdea}
                            onEdit={handleEditIdea}
                            onTagClick={handleTagClick}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'add' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Yeni Fikir Ekle</h1>
                      <div className="mt-4">
                        <IdeaInput onSubmit={handleNewIdea} />
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'stats' && (
                    <Stats ideas={ideas} />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}