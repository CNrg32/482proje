import React from 'react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hoş geldiniz!</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>
        Bu uygulama ile fikirlerinizi kolayca ekleyebilir ve yönetebilirsiniz.
      </p>
    </div>
  );
} 