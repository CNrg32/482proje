// components/IdeaInput.tsx

import React, { useState } from 'react';
import { Fikir } from '@/types/idea';
import MoodSelector from './MoodSelector';
import { v4 as uuidv4 } from 'uuid';

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
  const [mood, setMood] = useState<Fikir['mood']>(editingFikir?.mood || 'neutral');

  // Editing mode değiştiğinde input'ları güncelle
  React.useEffect(() => {
    setYeniFikir(editingFikir?.metin || '');
    setYeniEtiket(editingFikir?.etiket || '');
    setMood(editingFikir?.mood || 'neutral');
  }, [editingFikir]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniFikir.trim()) return;
    
    const fikir: Fikir = {
      id: editingFikir?.id || uuidv4(), // Düzenleme modunda ID'yi koru, yoksa yeni oluştur
      metin: yeniFikir,
      etiket: yeniEtiket,
      mood,
      timestamp: editingIndex !== null ? editingFikir?.timestamp : new Date().toISOString()
    };
    
    onSubmit(fikir);
    
    // Form'u temizle (sadece yeni ekleme modunda)
    if (editingIndex === null) {
      setYeniFikir('');
      setYeniEtiket('');
      setMood('neutral');
    }
  };

  const handleCancel = () => {
    setYeniFikir('');
    setYeniEtiket('');
    setMood('neutral');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = editingIndex !== null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Yeni fikrinizi yazın..."
        value={yeniFikir}
        onChange={e => setYeniFikir(e.target.value)}
        rows={3}
        className="w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 resize-none transition-colors duration-200"
        required
      />
      <input
        type="text"
        placeholder="Etiket (isteğe bağlı)"
        value={yeniEtiket}
        onChange={e => setYeniEtiket(e.target.value)}
        className="w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-colors duration-200"
      />
      
      <MoodSelector value={mood} onChange={setMood} />
      
      <div className="flex gap-2">
        <button 
          type="submit" 
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                   text-white font-semibold rounded-lg transition-colors duration-200
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   dark:focus:ring-offset-gray-800"
        >
          {isEditing ? 'Kaydet' : 'Ekle'}
        </button>
        {isEditing && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-gray-300 hover:bg-gray-400 active:bg-gray-500
                     dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400
                     text-gray-800 dark:text-gray-200 font-semibold rounded-lg 
                     transition-colors duration-200
                     focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
};

export default IdeaInput; 