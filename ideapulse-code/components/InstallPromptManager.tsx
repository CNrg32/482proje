import { useState, useEffect } from 'react';
import InstallPrompt from './InstallPrompt';

/**
 * PWA yükleme yönlendirmesini yöneten bileşen
 * Bu bileşen, kullanıcının mobil cihazda olup olmadığını ve uygulamanın zaten kurulu olup olmadığını kontrol eder
 */
const InstallPromptManager: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Yükleme önerisi gösterme/gizleme durumunu yerel depolama veya çerezlerde saklamak için
  const LOCAL_STORAGE_KEY = 'pwa-install-prompt-dismissed';

  useEffect(() => {
    // Kullanıcının daha önce kapat düğmesine basıp basmadığını kontrol et
    const hasPromptBeenDismissed = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
    
    // PWA zaten kurulu mu kontrol et
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');

    // Prompt eventi için dinleyici ekle (Chrome ve bazı tarayıcılar)
    window.addEventListener('beforeinstallprompt', (e) => {
      // Varsayılan gösterimi engelle
      e.preventDefault();
      // Yükleme olayını daha sonra kullanmak üzere sakla
      setDeferredPrompt(e);
      
      // Eğer kullanıcı daha önce kapatmamışsa ve uygulama zaten kurulu değilse prompt'u göster
      if (!hasPromptBeenDismissed && !isInStandaloneMode) {
        // Kullanıcıya hemen göstermek yerine bir saniye bekle
        setTimeout(() => {
          setShowPrompt(true);
        }, 1000);
      }
    });

    // Mobil cihazda ve standalone modda değilse, yönlendirmeyi göster (iOS için)
    if (!isInStandaloneMode && !hasPromptBeenDismissed && isMobileDevice()) {
      // Kullanıcıya hemen göstermek yerine bir saniye bekle
      setTimeout(() => {
        setShowPrompt(true);
      }, 1000);
    }

    // Temizleme fonksiyonu
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  // Mobil cihaz kontrolü
  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Yükleme yönlendirmesini kapat
  const handleDismiss = () => {
    setShowPrompt(false);
    // Kullanıcının tercihi saklansın
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  return (
    <>
      {showPrompt && <InstallPrompt onClose={handleDismiss} />}
    </>
  );
};

export default InstallPromptManager; 