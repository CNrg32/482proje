// components/IdeaInput.tsx

import React, { useState } from 'react';
import { Fikir } from '@/types/idea';

interface Props {
  onSubmit: (fikir: Fikir) => void;
  editingFikir?: Fikir | null;
  editingIndex?: number | null;
  onCancelEdit?: () => void;
}

const IdeaInput: React.FC<Props> = ({ 
  onSubmit, 
  editingFikir, 
  editingIndex, 
  onCancelEdit 
}) => {
  const [yeniFikir, setYeniFikir] = useState(editingFikir?.metin || '');
  const [yeniEtiket, setYeniEtiket] = useState(editingFikir?.etiket || '');

  // Editing mode değiştiğinde input'ları güncelle
  React.useEffect(() => {
    setYeniFikir(editingFikir?.metin || '');
    setYeniEtiket(editingFikir?.etiket || '');
  }, [editingFikir]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniFikir.trim()) return;
    
    onSubmit({ metin: yeniFikir, etiket: yeniEtiket });
    
    // Form'u temizle (sadece yeni ekleme modunda)
    if (editingIndex === null) {
      setYeniFikir('');
      setYeniEtiket('');
    }
  };

  const handleCancel = () => {
    setYeniFikir('');
    setYeniEtiket('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = editingIndex !== null;

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginTop: 0, 
      marginBottom: 28, 
      display: 'flex', 
      gap: 8, 
      flexDirection: 'column' 
    }}>
      <input
        type="text"
        placeholder="Yeni fikrinizi yazın..."
        value={yeniFikir}
        onChange={e => setYeniFikir(e.target.value)}
        style={{ 
          padding: 10, 
          fontSize: 16, 
          borderRadius: 8, 
          border: '1px solid #ddd' 
        }}
      />
      <input
        type="text"
        placeholder="Etiket (isteğe bağlı)"
        value={yeniEtiket}
        onChange={e => setYeniEtiket(e.target.value)}
        style={{ 
          padding: 10, 
          fontSize: 16, 
          borderRadius: 8, 
          border: '1px solid #ddd' 
        }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button 
          type="submit" 
          style={{ 
            padding: '10px 0', 
            fontSize: 16, 
            borderRadius: 8, 
            background: '#2563eb', 
            color: '#fff', 
            border: 'none', 
            flex: 1, 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}
        >
          {isEditing ? 'Kaydet' : 'Ekle'}
        </button>
        {isEditing && (
          <button 
            type="button" 
            onClick={handleCancel}
            style={{ 
              padding: '10px 0', 
              fontSize: 16, 
              borderRadius: 8, 
              background: '#e5e7eb', 
              color: '#222', 
              border: 'none', 
              flex: 1, 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
};

export default IdeaInput; 