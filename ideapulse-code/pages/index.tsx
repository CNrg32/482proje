import React, { useState, useEffect } from 'react';
import { Fikir } from '@/types/idea';
import { saveIdeasToStorage, getIdeasFromStorage, getDefaultIdeas } from '@/utils/storage';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import IdeaInput from '@/components/IdeaInput';
import IdeaList from '@/components/IdeaList';

export default function Home() {
  const [fikirler, setFikirler] = useState<Fikir[]>([]);
  const [duzenleIndex, setDuzenleIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');

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

  // Fikirler değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (fikirler.length > 0) {
      saveIdeasToStorage(fikirler);
    }
  }, [fikirler]);

  const handleSubmit = (fikir: Fikir) => {
    if (duzenleIndex !== null) {
      // Düzenleme modunda
      const yeniFikirler = [...fikirler];
      yeniFikirler[duzenleIndex] = fikir;
      setFikirler(yeniFikirler);
      setDuzenleIndex(null);
    } else {
      // Yeni fikir ekle
      setFikirler([fikir, ...fikirler]);
    }
  };

  const handleDelete = (index: number) => {
    setFikirler(fikirler.filter((_, i) => i !== index));
    if (duzenleIndex === index) {
      setDuzenleIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setDuzenleIndex(index);
  };

  const handleCancelEdit = () => {
    setDuzenleIndex(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      <Navbar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      {/* Ana içerik alanı */}
      <div className="flex-1 flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        {/* İçerik */}
        <main className="flex-1 flex justify-center items-start py-10 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md transition-colors duration-200">
            {activeTab === 'all' && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
                  Fikirleriniz
                </h1>
                <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
                  Kaydettiğiniz fikirleri görüntüleyin ve yönetin.
                </p>
                
                <IdeaList 
                  fikirler={fikirler}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
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
                  editingFikir={duzenleIndex !== null ? fikirler[duzenleIndex] : null}
                  editingIndex={duzenleIndex}
                  onCancelEdit={handleCancelEdit}
                />
              </>
            )}
            
            {activeTab === 'stats' && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
                  İstatistikler
                </h1>
                <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
                  Fikir toplama alışkanlıklarınızı görün.
                </p>
                
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {fikirler.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Toplam Fikir
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 