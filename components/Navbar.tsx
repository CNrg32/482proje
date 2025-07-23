// components/Navbar.tsx

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={{ 
      height: 56, 
      background: '#2563eb', 
      color: '#fff', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 32px', 
      fontSize: 22, 
      fontWeight: 700, 
      letterSpacing: 1 
    }}>
      IdeaPulse
    </nav>
  );
};

export default Navbar; 