import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 flex items-center">
            <span className="mr-2 text-xl"></span>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                IdeaPulse
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                &copy; {currentYear} Tüm hakları saklıdır
              </p>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <button 
              onClick={() => window.open('https://github.com/CNrg32/482proje', '_blank')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            </button>
            <button 
              onClick={() => {
                if ('share' in navigator) {
                  navigator.share({
                    title: 'IdeaPulse',
                    text: 'Fikirlerinizi organize edin ve takip edin!',
                    url: window.location.href
                  });
                }
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              aria-label="Paylaş"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button 
              onClick={() => window.open('/privacy', '_blank')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm"
            >
              Gizlilik
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            <span className="text-blue-500">Mustafa,Alp,Aylin,Melih</span> tarafından yapıldı
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;