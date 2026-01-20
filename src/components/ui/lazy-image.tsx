import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** WebP version of the image for modern browsers */
  webpSrc?: string;
  /** AVIF version of the image (best compression) */
  avifSrc?: string;
  placeholderSrc?: string;
  blurPlaceholder?: boolean;
  threshold?: number;
  rootMargin?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Priority loading (disables lazy loading) */
  priority?: boolean;
  /** Aspect ratio for container (e.g., "16/9") */
  aspectRatio?: string;
}

const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      alt,
      webpSrc,
      avifSrc,
      className,
      placeholderSrc,
      blurPlaceholder = true,
      threshold = 0.1,
      rootMargin = "50px",
      sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
      priority = false,
      aspectRatio,
      width,
      height,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const combinedRef = (node: HTMLImageElement) => {
      imgRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (priority) return;
      
      const currentRef = containerRef.current;
      if (!currentRef) return;

      // Check if IntersectionObserver is supported
      if (!("IntersectionObserver" in window)) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [threshold, rootMargin, priority]);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
    };

    // Determine if we have modern format sources
    const hasModernFormats = avifSrc || webpSrc;

    // Placeholder styling with blur effect
    const placeholderStyles = blurPlaceholder && !isLoaded
      ? "bg-muted animate-pulse"
      : "";

    // Container styles
    const containerStyle: React.CSSProperties = {
      width,
      height,
      aspectRatio,
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden",
          !isLoaded && placeholderStyles,
          className
        )}
        style={containerStyle}
      >
        {isInView && !hasError && (
          <picture>
            {/* AVIF - best compression, newest format */}
            {avifSrc && (
              <source
                srcSet={avifSrc}
                type="image/avif"
              />
            )}
            
            {/* WebP - good compression, wide support */}
            {webpSrc && (
              <source
                srcSet={webpSrc}
                type="image/webp"
              />
            )}
            
            {/* Fallback image */}
            <img
              ref={combinedRef}
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              onLoad={handleLoad}
              onError={handleError}
              className={cn(
                "transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0",
                "w-full h-full object-cover"
              )}
              {...props}
            />
          </picture>
        )}
        
        {/* Error fallback */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">Image unavailable</span>
          </div>
        )}
        
        {!isLoaded && !hasError && placeholderSrc && (
          <img
            src={placeholderSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
            width={width}
            height={height}
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

// Lazy Avatar Image with Intersection Observer
interface LazyAvatarImageProps {
  src: string;
  alt: string;
  /** WebP version of the avatar */
  webpSrc?: string;
  className?: string;
  fallback?: React.ReactNode;
}

const LazyAvatarImage: React.FC<LazyAvatarImageProps> = ({
  src,
  alt,
  webpSrc,
  className,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-full" />
      )}
      {isInView && (
        <picture>
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
            className={cn(
              "aspect-square h-full w-full rounded-full object-cover transition-opacity duration-200",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </picture>
      )}
    </div>
  );
};

export { LazyImage, LazyAvatarImage };
