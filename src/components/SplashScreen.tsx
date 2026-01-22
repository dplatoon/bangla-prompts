import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export const SplashScreen = ({ onComplete, minDisplayTime = 800 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to complete
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 300);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      role="progressbar"
      aria-label="লোড হচ্ছে..."
      aria-busy="true"
    >
      {/* Logo Container with Animation */}
      <div className={`relative transition-all duration-500 ${isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Pulsing glow effect behind logo */}
        <div className="absolute inset-0 -m-4 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '1.5s' }} />
        <div className="absolute inset-0 -m-2 rounded-full bg-primary/10 animate-pulse" />
        
        {/* Logo */}
        <img
          src="/favicon.png"
          alt="BD Prompt Logo"
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-elegant animate-bounce"
          style={{ animationDuration: '1s' }}
        />
      </div>

      {/* Brand Name */}
      <div className={`mt-6 text-center transition-all duration-500 delay-100 ${isExiting ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-primary font-bengali">
          BD Prompt
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-bengali">
          বাংলা AI প্রম্পট হাব
        </p>
      </div>

      {/* Loading Spinner */}
      <div className={`mt-8 transition-all duration-300 delay-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

// Inline PageLoader for lazy-loaded routes (smaller, faster)
export const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
    <img
      src="/favicon.png"
      alt="Loading"
      className="w-12 h-12 rounded-xl animate-pulse"
    />
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);
