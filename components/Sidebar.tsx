// components/Sidebar.tsx

import React from 'react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'all', label: 'Fikirler', icon: '📝' },
    { id: 'add', label: 'Yeni Fikir', icon: '➕' },
    { id: 'stats', label: 'İstatistikler', icon: '📊' }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-0 min-h-screen shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Menü
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fikirlerinizi yönetin
        </p>
      </div>
      
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 