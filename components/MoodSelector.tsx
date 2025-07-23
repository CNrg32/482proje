// components/MoodSelector.tsx

import React from 'react';
import { Fikir } from '@/types/idea';

interface MoodOption {
  value: Fikir['mood'];
  label: string;
  emoji: string;
  description: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  value: Fikir['mood'];
  onChange: (mood: Fikir['mood']) => void;
}

const MoodSelector: React.FC<Props> = ({ value, onChange }) => {
  const moods: MoodOption[] = [
    { 
      value: 'inspired', 
      label: 'İlham dolu', 
      emoji: '✨',
      description: 'Yaratıcı ve ilham dolu',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      textColor: 'text-yellow-800 dark:text-yellow-200'
    },
    { 
      value: 'excited', 
      label: 'Heyecanlı', 
      emoji: '🔥',
      description: 'Enerji dolu ve heyecanlı',
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      textColor: 'text-red-800 dark:text-red-200'
    },
    { 
      value: 'neutral', 
      label: 'Nötr', 
      emoji: '😐',
      description: 'Normal, sakin',
      bgColor: 'bg-gray-50 dark:bg-gray-700',
      textColor: 'text-gray-800 dark:text-gray-200'
    },
    { 
      value: 'tired', 
      label: 'Yorgun', 
      emoji: '😴',
      description: 'Düşük enerji, yorgun',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      textColor: 'text-blue-800 dark:text-blue-200'
    }
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Ruh haliniz nasıl?
      </label>

      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
              mood.value === value
                ? `${mood.bgColor} border-current ${mood.textColor} shadow-md`
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl mb-2">{mood.emoji}</span>
              <div className="text-sm font-semibold">{mood.label}</div>
              <div className="text-xs opacity-75 mt-1">
                {mood.description}
              </div>
            </div>
            
            {mood.value === value && (
              <div className="absolute top-2 right-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 