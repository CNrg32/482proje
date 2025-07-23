import React, { useState, useEffect } from 'react';
import { Fikir } from '@/types/idea';
import { saveIdeasToStorage, getIdeasFromStorage, getDefaultIdeas } from '@/utils/storage';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import IdeaInput from '@/components/IdeaInput';
import IdeaList from '@/components/IdeaList';
import Stats from '@/components/Stats';

export default function Home() {
  const [fikirler, setFikirler] = useState<Fikir[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<Fikir['mood'] | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // İlk açılışta localStorage'dan yükle
  useEffect(() => {
    const storedIdeas = getIdeasFromStorage();
    if (storedIdeas.length > 0) {
      setFikirler(storedIdeas);
    } else {
      setFikirler(getDefaultIdeas());
    }
  }, []);

  // Tema kontrolü
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userPrefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
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

  // ESC tuşu ile mobil sidebar'ı kapat ve body scroll'u kontrol et
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    // Mobil sidebar açıkken body scroll'u engelle
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Cleanup
    };
  }, [isMobileSidebarOpen]);

  // Fikirler değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (fikirler.length > 0) {
      saveIdeasToStorage(fikirler);
    }
  }, [fikirler]);

  const handleSubmit = (fikir: Fikir) => {
    // Yeni fikir ekle (artık düzenleme in-place yapılıyor)
    setFikirler([fikir, ...fikirler]);
    setActiveTab('all'); // Ekleme sonrası listeye dön
  };

  const handleDelete = (id: string) => {
    setFikirler(fikirler.filter(f => f.id !== id));
  };

  const handleEdit = (updatedFikir: Fikir) => {
    // In-place editing ile direkt güncelle
    const updated = fikirler.map(f => 
      f.id === updatedFikir.id ? updatedFikir : f
    );
    setFikirler(updated);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false); // Mobil menüyü kapat
  };

  // Etiket filtreleme
  const handleTagFilter = (tag: string | null) => {
    setFilterTag(tag);
    setFilterMood(null); // Tek seferde bir filtre
  };

  // Ruh hali filtreleme
  const handleMoodFilter = (mood: Fikir['mood'] | null) => {
    setFilterMood(mood);
    setFilterTag(null); // Tek seferde bir filtre
  };

  // Filtrelenmiş fikirleri al
  const getFilteredIdeas = () => {
    let filtered = fikirler;
    
    if (filterTag) {
      filtered = filtered.filter(fikir => 
        fikir.etiket && fikir.etiket.toLowerCase() === filterTag.toLowerCase()
      );
    }
    
    if (filterMood) {
      filtered = filtered.filter(fikir => fikir.mood === filterMood);
    }
    
    return filtered;
  };

  // Filtreleme başlığı göster
  const renderFilterHeader = () => {
    if (!filterTag && !filterMood) return null;
    
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
      <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex justify-between items-center">
        <span className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
          <span className="mr-2">🔍</span>
          {filterTag && `"${filterTag}" etiketini içeren fikirler`}
          {filterMood && `${getMoodName(filterMood)} ruh halindeki fikirler`}
          <span className="ml-2 text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
            {getFilteredIdeas().length} sonuç
          </span>
        </span>
        <button
          onClick={() => {
            setFilterTag(null);
            setFilterMood(null);
          }}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center"
          aria-label="Filtreyi kaldır"
        >
          <span className="mr-1">✕</span>
          Temizle
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      <Navbar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      {/* Mobil menü butonu */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileSidebarOpen(prev => !prev)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
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
      
      {/* Ana içerik alanı */}
      <div className="flex-1 flex">
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
            lg:w-64 lg:mr-0 
            fixed lg:static inset-y-0 right-0 z-30 
            transform ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            lg:flex
          `}
        >
          <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none">
            <Sidebar 
              fikirler={fikirler}
              activeTab={activeTab} 
              onTabChange={handleTabChange}
              onTagFilter={handleTagFilter}
              onMoodFilter={handleMoodFilter}
              selectedTag={filterTag}
              selectedMood={filterMood}
              isMobile={true}
              onMobileClose={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
        {/* İçerik */}
        <main className="flex-1 flex justify-center items-start py-10 px-4 lg:ml-0">
          {activeTab === 'stats' ? (
            <Stats fikirler={fikirler} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md transition-colors duration-200">
              {activeTab === 'all' && (
                <>
                  <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
                    Fikirleriniz
                  </h1>
                  <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
                    Kaydettiğiniz fikirleri görüntüleyin ve yönetin.
                  </p>
                  
                  {renderFilterHeader()}
                  
                  <IdeaList 
                    fikirler={getFilteredIdeas()}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onTagClick={handleTagFilter}
                  />
                </>
              )}
              
              {activeTab === 'add' && (
                <>
                  <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
                    Yeni Fikir
                  </h1>
                  <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
                    Yeni bir fikir ekleyin veya mevcut fikri düzenleyin.
                  </p>
                  
                  <IdeaInput 
                    onSubmit={handleSubmit}
                    editingFikir={null} // Artık in-place editing kullanıyoruz
                    editingIndex={null} // Legacy prop
                    onCancelEdit={() => {}} // No-op function
                  />
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 