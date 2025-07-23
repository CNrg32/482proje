import React, { useState, useEffect } from 'react';
import { Fikir } from '@/types/idea';
import { saveIdeasToStorage, getIdeasFromStorage, getDefaultIdeas } from '@/utils/storage';

export default function Home() {
  const [fikirler, setFikirler] = useState<Fikir[]>([]);
  const [yeniFikir, setYeniFikir] = useState('');
  const [yeniEtiket, setYeniEtiket] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniFikir.trim()) return;
    if (duzenleIndex !== null) {
      // Düzenleme modunda
      const yeniFikirler = [...fikirler];
      yeniFikirler[duzenleIndex] = { metin: yeniFikir, etiket: yeniEtiket };
      setFikirler(yeniFikirler);
      setDuzenleIndex(null);
    } else {
      // Yeni fikir ekle
      setFikirler([{ metin: yeniFikir, etiket: yeniEtiket }, ...fikirler]);
    }
    setYeniFikir('');
    setYeniEtiket('');
  };

  const handleDelete = (index: number) => {
    setFikirler(fikirler.filter((_, i) => i !== index));
    if (duzenleIndex === index) {
      setDuzenleIndex(null);
      setYeniFikir('');
      setYeniEtiket('');
    }
  };

  const handleEdit = (index: number) => {
    setDuzenleIndex(index);
    setYeniFikir(fikirler[index].metin);
    setYeniEtiket(fikirler[index].etiket || '');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ height: 56, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 32px', fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
        IdeaPulse
      </nav>
      {/* Ana içerik alanı */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '32px 0', minHeight: 'calc(100vh - 56px)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 17, fontWeight: 500, color: '#2563eb' }}>
            <li style={{ padding: '12px 32px' }}>Fikirler</li>
            <li style={{ padding: '12px 32px' }}>Yeni Fikir</li>
            <li style={{ padding: '12px 32px' }}>İstatistikler</li>
          </ul>
        </aside>
        {/* İçerik */}
        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 0' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32, width: 380, maxWidth: '90%' }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Hoş geldiniz!</h1>
            <p style={{ marginTop: 0, marginBottom: 24, fontSize: 18, textAlign: 'center', color: '#444' }}>
              Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
            </p>
            <form onSubmit={handleSubmit} style={{ marginTop: 0, marginBottom: 28, display: 'flex', gap: 8, flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Yeni fikrinizi yazın..."
                value={yeniFikir}
                onChange={e => setYeniFikir(e.target.value)}
                style={{ padding: 10, fontSize: 16, borderRadius: 8, border: '1px solid #ddd' }}
              />
              <input
                type="text"
                placeholder="Etiket (isteğe bağlı)"
                value={yeniEtiket}
                onChange={e => setYeniEtiket(e.target.value)}
                style={{ padding: 10, fontSize: 16, borderRadius: 8, border: '1px solid #ddd' }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" style={{ padding: '10px 0', fontSize: 16, borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', flex: 1, fontWeight: 600, cursor: 'pointer' }}>
                  {duzenleIndex !== null ? 'Kaydet' : 'Ekle'}
                </button>
                {duzenleIndex !== null && (
                  <button type="button" onClick={() => { setDuzenleIndex(null); setYeniFikir(''); setYeniEtiket(''); }} style={{ padding: '10px 0', fontSize: 16, borderRadius: 8, background: '#e5e7eb', color: '#222', border: 'none', flex: 1, fontWeight: 600, cursor: 'pointer' }}>
                    İptal
                  </button>
                )}
              </div>
            </form>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Fikirleriniz</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: 24, margin: 0 }}>
                {fikirler.map((fikir, i) => (
                  <li key={i} style={{ marginBottom: 10, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                      {fikir.metin}
                      {fikir.etiket && (
                        <span style={{ marginLeft: 8, fontSize: 13, color: '#2563eb', background: '#e0e7ff', borderRadius: 8, padding: '2px 8px' }}>
                          #{fikir.etiket}
                        </span>
                      )}
                    </span>
                    <div>
                      <button onClick={() => handleEdit(i)} style={{ marginRight: 8, color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                        Düzenle
                      </button>
                      <button onClick={() => handleDelete(i)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 