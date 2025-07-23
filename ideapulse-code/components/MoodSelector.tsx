import React from 'react';
import { Idea } from '@/types/idea';

interface MoodOption {
  value: Idea['mood'];
  label: string;
  emoji: string;
  description: string;
}

interface Props {
  value: Idea['mood'];
  onChange: (mood: Idea['mood']) => void;
}

const MoodSelector: React.FC<Props> = ({ value, onChange }) => {
  const moods: MoodOption[] = [
    { 
      value: 'inspired', 
      label: 'İlham dolu', 
      emoji: '✨',
      description: 'Yaratıcı ve ilham dolu' 
    },
    { 
      value: 'excited', 
      label: 'Heyecanlı', 
      emoji: '🔥',
      description: 'Enerji dolu ve heyecanlı' 
    },
    { 
      value: 'neutral', 
      label: 'Nötr', 
      emoji: '😐',
      description: 'Normal, sakin' 
    },
    { 
      value: 'tired', 
      label: 'Yorgun', 
      emoji: '😴',
      description: 'Düşük enerji, yorgun' 
    }
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Ruh haliniz
      </label>

      <div className="grid grid-cols-2 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`flex items-center p-3 rounded-lg transition ${
              mood.value === value
                ? 'bg-blue-100 border-2 border-blue-500 dark:bg-blue-900 dark:border-blue-400'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-2xl mr-2">{mood.emoji}</span>
            <div className="text-left">
              <div className="font-medium">{mood.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {mood.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;