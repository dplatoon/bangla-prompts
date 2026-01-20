import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, WifiOff, X } from 'lucide-react';
import { useState } from 'react';

interface PWAStatusProps {
  language?: 'bn' | 'en';
}

const content = {
  bn: {
    install: 'অ্যাপ ইনস্টল করুন',
    update: 'আপডেট উপলব্ধ',
    refresh: 'রিফ্রেশ',
    offline: 'অফলাইন মোড',
    installPrompt: 'হোম স্ক্রিনে যোগ করতে ইনস্টল করুন',
  },
  en: {
    install: 'Install App',
    update: 'Update Available',
    refresh: 'Refresh',
    offline: 'Offline Mode',
    installPrompt: 'Install to add to home screen',
  }
};

export const PWAStatus = ({ language = 'bn' }: PWAStatusProps) => {
  const { isInstallable, isOffline, needsRefresh, promptInstall, refreshApp } = usePWA();
  const [dismissed, setDismissed] = useState(false);
  const t = content[language];

  // Offline indicator
  if (isOffline) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-left">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">{t.offline}</span>
      </div>
    );
  }

  // Update available notification
  if (needsRefresh) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-left">
        <RefreshCw className="h-4 w-4" />
        <span className="text-sm font-medium">{t.update}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={refreshApp}
          className="ml-2 h-7 px-3"
        >
          {t.refresh}
        </Button>
      </div>
    );
  }

  // Install prompt
  if (isInstallable && !dismissed) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-left">
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium">{t.installPrompt}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={promptInstall}
          className="ml-2 h-7 px-3"
        >
          {t.install}
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return null;
};
