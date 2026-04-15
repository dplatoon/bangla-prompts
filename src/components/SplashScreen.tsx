import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export const SplashScreen = ({ onComplete, minDisplayTime = 700 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
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
      <div className={`relative transition-all duration-500 ${isExiting ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Subtle glow */}
        <div className="absolute inset-0 -m-6 rounded-full bg-primary/10 animate-pulse" style={{ animationDuration: '2s' }} />
        
        {/* Logo */}
        <img
          src="/favicon.png"
          alt="BD Prompt Logo"
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-elegant"
        />
      </div>

      {/* Brand Name */}
      <div className={`mt-5 text-center transition-all duration-500 delay-100 ${isExiting ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          BdPrompt
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-bengali">
          বাংলা AI প্রম্পট হাব
        </p>
      </div>

      {/* Minimal loading indicator */}
      <div className={`mt-6 transition-all duration-300 delay-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-8 h-1 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%', animationDuration: '1s' }} />
        </div>
      </div>
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
    <img
      src="/favicon.png"
      alt="Loading"
      className="w-10 h-10 rounded-xl animate-pulse"
    />
    <div className="w-6 h-0.5 bg-primary/30 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '50%' }} />
    </div>
  </div>
);
