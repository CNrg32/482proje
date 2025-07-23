// components/Sidebar.tsx

import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside style={{ 
      width: 200, 
      background: '#fff', 
      borderRight: '1px solid #e5e7eb', 
      padding: '32px 0', 
      minHeight: 'calc(100vh - 56px)' 
    }}>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0, 
        fontSize: 17, 
        fontWeight: 500, 
        color: '#2563eb' 
      }}>
        <li style={{ padding: '12px 32px' }}>Fikirler</li>
        <li style={{ padding: '12px 32px' }}>Yeni Fikir</li>
        <li style={{ padding: '12px 32px' }}>İstatistikler</li>
      </ul>
    </aside>
  );
};

export default Sidebar; 