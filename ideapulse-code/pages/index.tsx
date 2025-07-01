import React from 'react';

export default function Home() {
  // Statik örnek fikirler
  const fikirler = [
    '482 dersini AA geçmek',
    'Proje Ödevini yapmak',
    'Ekip içi dağılımı planlamak'
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hoş geldiniz!</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>
        Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
      </p>
      <div style={{ marginTop: 32, width: 350 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Fikirleriniz</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          {fikirler.map((fikir, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 16 }}>{fikir}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 