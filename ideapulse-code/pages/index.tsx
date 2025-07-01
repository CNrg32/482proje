import React, { useState, useEffect } from 'react';

const LOCAL_KEY = 'fikirler';

export default function Home() {
  // Başlangıç fikirleri
  const defaultFikirler = [
    '482 dersini AA geçmek',
    'Proje Ödevini yapmak',
    'Ekip içi dağılımı planlamak'
  ];
  const [fikirler, setFikirler] = useState<string[]>([]);
  const [yeniFikir, setYeniFikir] = useState('');
  const [duzenleIndex, setDuzenleIndex] = useState<number | null>(null);

  // İlk açılışta localStorage'dan yükle
  useEffect(() => {
    const kayitli = localStorage.getItem(LOCAL_KEY);
    if (kayitli) {
      setFikirler(JSON.parse(kayitli));
    } else {
      setFikirler(defaultFikirler);
    }
  }, []);

  // Fikirler değiştikçe localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(fikirler));
  }, [fikirler]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniFikir.trim()) return;
    if (duzenleIndex !== null) {
      // Düzenleme modunda
      const yeniFikirler = [...fikirler];
      yeniFikirler[duzenleIndex] = yeniFikir;
      setFikirler(yeniFikirler);
      setDuzenleIndex(null);
    } else {
      // Yeni fikir ekle
      setFikirler([yeniFikir, ...fikirler]);
    }
    setYeniFikir('');
  };

  const handleDelete = (index: number) => {
    setFikirler(fikirler.filter((_, i) => i !== index));
    // Eğer silinen fikir düzenleniyorsa, düzenleme modunu kapat
    if (duzenleIndex === index) {
      setDuzenleIndex(null);
      setYeniFikir('');
    }
  };

  const handleEdit = (index: number) => {
    setDuzenleIndex(index);
    setYeniFikir(fikirler[index]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hoş geldiniz!</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>
        Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: 32, width: 350, display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Yeni fikrinizi yazın..."
          value={yeniFikir}
          onChange={e => setYeniFikir(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: 16 }}>
          {duzenleIndex !== null ? 'Kaydet' : 'Ekle'}
        </button>
        {duzenleIndex !== null && (
          <button type="button" onClick={() => { setDuzenleIndex(null); setYeniFikir(''); }} style={{ padding: '8px 12px', fontSize: 16 }}>
            İptal
          </button>
        )}
      </form>
      <div style={{ marginTop: 32, width: 350 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Fikirleriniz</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          {fikirler.map((fikir, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{fikir}</span>
              <div>
                <button onClick={() => handleEdit(i)} style={{ marginRight: 8, color: 'blue', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14 }}>
                  Düzenle
                </button>
                <button onClick={() => handleDelete(i)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14 }}>
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 