import { useState, useEffect } from 'react';

interface InstallPromptProps {
  onClose: () => void;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onClose }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Tarayıcı ve işletim sistemi tespiti
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const android = /Android/.test(ua);
    
    setIsIOS(iOS);
    setIsAndroid(android);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-600 text-white shadow-lg z-50 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3 bg-white p-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-base">Ana Ekrana Ekle</h3>
            {isIOS ? (
              <p className="text-sm mt-1 text-blue-100">
                Safari tarayıcısında, alt menüden "Ana Ekrana Ekle" seçeneğine dokunun.
              </p>
            ) : isAndroid ? (
              <p className="text-sm mt-1 text-blue-100">
                Tarayıcı menüsüne dokunun ve "Ana ekrana ekle" seçeneğini seçin.
              </p>
            ) : (
              <p className="text-sm mt-1 text-blue-100">
                Bu uygulamayı cihazınıza kurmak için tarayıcınızın yükleme seçeneğini kullanın.
              </p>
            )}
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="ml-4 text-white p-1 rounded hover:bg-blue-700 focus:outline-none"
          aria-label="Kapat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt; 