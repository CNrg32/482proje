import React, { useState, useEffect } from 'react';

const LOCAL_KEY = 'fikirler';

type Fikir = {
  metin: string;
  etiket?: string;
};

export default function Home() {
  // Başlangıç fikirleri
  const defaultFikirler: Fikir[] = [
    { metin: '482 dersini AA geçmek', etiket: 'okul' },
    { metin: 'Proje Ödevini yapmak', etiket: 'ödev' },
    { metin: 'Ekip içi dağılımı planlamak', etiket: 'takım' }
  ];
  const [fikirler, setFikirler] = useState<Fikir[]>([]);
  const [yeniFikir, setYeniFikir] = useState('');
  const [yeniEtiket, setYeniEtiket] = useState('');
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hoş geldiniz!</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>
        Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: 32, width: 350, display: 'flex', gap: 8, flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Yeni fikrinizi yazın..."
          value={yeniFikir}
          onChange={e => setYeniFikir(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <input
          type="text"
          placeholder="Etiket (isteğe bağlı)"
          value={yeniEtiket}
          onChange={e => setYeniEtiket(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '8px 16px', fontSize: 16 }}>
            {duzenleIndex !== null ? 'Kaydet' : 'Ekle'}
          </button>
          {duzenleIndex !== null && (
            <button type="button" onClick={() => { setDuzenleIndex(null); setYeniFikir(''); setYeniEtiket(''); }} style={{ padding: '8px 12px', fontSize: 16 }}>
              İptal
            </button>
          )}
        </div>
      </form>
      <div style={{ marginTop: 32, width: 350 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Fikirleriniz</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          {fikirler.map((fikir, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                {fikir.metin}
                {fikir.etiket && (
                  <span style={{ marginLeft: 8, fontSize: 13, color: '#555', background: '#eee', borderRadius: 8, padding: '2px 8px' }}>
                    #{fikir.etiket}
                  </span>
                )}
              </span>
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