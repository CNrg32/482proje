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

  // İlk açılışta localStorage'dan yükle
  useEffect(() => {
    const storedIdeas = getIdeasFromStorage();
    if (storedIdeas.length > 0) {
      setFikirler(storedIdeas);
    } else {
      setFikirler(getDefaultIdeas());
    }
  }, []);

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

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {/* Ana içerik alanı */}
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidebar />
        {/* İçerik */}
        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 0' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32, width: 380, maxWidth: '90%' }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Hoş geldiniz!</h1>
            <p style={{ marginTop: 0, marginBottom: 24, fontSize: 18, textAlign: 'center', color: '#444' }}>
              Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
            </p>
            
            <IdeaInput 
              onSubmit={handleSubmit}
              editingFikir={duzenleIndex !== null ? fikirler[duzenleIndex] : null}
              editingIndex={duzenleIndex}
              onCancelEdit={handleCancelEdit}
            />
            
            <IdeaList 
              fikirler={fikirler}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
} 