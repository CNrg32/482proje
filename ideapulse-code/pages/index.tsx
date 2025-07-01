import React, { useState } from 'react';

export default function Home() {
  // Başlangıç fikirleri
  const [fikirler, setFikirler] = useState([
    '482 dersini AA geçmek',
    'Proje Ödevini yapmak',
    'Ekip içi dağılımı planlamak'
  ]);
  const [yeniFikir, setYeniFikir] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniFikir.trim()) return;
    setFikirler([yeniFikir, ...fikirler]);
    setYeniFikir('');
  };

  const handleDelete = (index: number) => {
    setFikirler(fikirler.filter((_, i) => i !== index));
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
          Ekle
        </button>
      </form>
      <div style={{ marginTop: 32, width: 350 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Fikirleriniz</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          {fikirler.map((fikir, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{fikir}</span>
              <button onClick={() => handleDelete(i)} style={{ marginLeft: 12, color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14 }}>
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 