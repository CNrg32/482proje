// components/IdeaList.tsx

import React from 'react';
import { Fikir } from '@/types/idea';

interface Props {
  fikirler: Fikir[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const IdeaList: React.FC<Props> = ({ fikirler, onEdit, onDelete }) => {
  if (fikirler.length === 0) {
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          Fikirleriniz
        </h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Henüz fikir eklenmemiş.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
        Fikirleriniz
      </h2>
      <ul style={{ listStyle: 'disc', paddingLeft: 24, margin: 0 }}>
        {fikirler.map((fikir, i) => (
          <li 
            key={i} 
            style={{ 
              marginBottom: 10, 
              fontSize: 16, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          >
            <span>
              {fikir.metin}
              {fikir.etiket && (
                <span style={{ 
                  marginLeft: 8, 
                  fontSize: 13, 
                  color: '#2563eb', 
                  background: '#e0e7ff', 
                  borderRadius: 8, 
                  padding: '2px 8px' 
                }}>
                  #{fikir.etiket}
                </span>
              )}
            </span>
            <div>
              <button 
                onClick={() => onEdit(i)} 
                style={{ 
                  marginRight: 8, 
                  color: '#2563eb', 
                  border: 'none', 
                  background: 'none', 
                  cursor: 'pointer', 
                  fontSize: 14, 
                  fontWeight: 600 
                }}
              >
                Düzenle
              </button>
              <button 
                onClick={() => onDelete(i)} 
                style={{ 
                  color: '#dc2626', 
                  border: 'none', 
                  background: 'none', 
                  cursor: 'pointer', 
                  fontSize: 14, 
                  fontWeight: 600 
                }}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaList; 