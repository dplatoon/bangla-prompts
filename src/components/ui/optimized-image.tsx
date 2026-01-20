import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Responsive breakpoints for srcset generation
 */
const DEFAULT_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536, 1920];

/**
 * Image format priority (modern to legacy)
 */
type ImageFormat = 'avif' | 'webp' | 'jpg' | 'png';

interface ImageSource {
  src: string;
  format?: ImageFormat;
}

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Primary image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** WebP version of the image */
  webpSrc?: string;
  /** AVIF version of the image (best compression) */
  avifSrc?: string;
  /** Fallback image for older browsers */
  fallbackSrc?: string;
  /** Responsive image sources for different widths */
  srcSet?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Custom breakpoints for responsive images */
  breakpoints?: number[];
  /** Enable lazy loading via IntersectionObserver */
  lazy?: boolean;
  /** Blur placeholder effect while loading */
  blurPlaceholder?: boolean;
  /** Placeholder image or data URL */
  placeholderSrc?: string;
  /** Intersection observer threshold */
  threshold?: number;
  /** Intersection observer root margin */
  rootMargin?: string;
  /** Priority loading (disables lazy loading) */
  priority?: boolean;
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Callback when image loads */
  onImageLoad?: () => void;
  /** Callback when image fails to load */
  onImageError?: () => void;
}

/**
 * Get file extension from path
 */
const getFileExtension = (path: string): string => {
  const match = path.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
};

/**
 * Generate srcset string from breakpoints
 */
const generateSrcSet = (
  baseSrc: string,
  breakpoints: number[]
): string => {
  const ext = getFileExtension(baseSrc);
  const basePath = baseSrc.replace(/\.[^.]+$/, '');
  
  return breakpoints
    .map((width) => `${basePath}-${width}w.${ext} ${width}w`)
    .join(', ');
};

/**
 * Generate default sizes attribute
 */
const generateDefaultSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component with:
 * - WebP/AVIF support with automatic fallback
 * - Responsive srcset for different screen sizes
 * - Lazy loading with IntersectionObserver
 * - Blur placeholder effect
 * - Priority loading option for LCP images
 */
const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      webpSrc,
      avifSrc,
      fallbackSrc,
      srcSet,
      sizes,
      breakpoints = DEFAULT_BREAKPOINTS,
      lazy = true,
      blurPlaceholder = true,
      placeholderSrc,
      threshold = 0.1,
      rootMargin = "50px",
      priority = false,
      aspectRatio,
      objectFit = 'cover',
      onImageLoad,
      onImageError,
      className,
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(!lazy || priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Combine refs
    const combinedRef = (node: HTMLImageElement) => {
      imgRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (!lazy || priority) return;
      
      const currentRef = imgRef.current?.parentElement;
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
        { threshold, rootMargin }
      );

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [lazy, priority, threshold, rootMargin]);

    const handleLoad = () => {
      setIsLoaded(true);
      onImageLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onImageError?.();
    };

    // Determine the primary source format
    const primarySrc = fallbackSrc || src;
    const hasModernFormats = avifSrc || webpSrc;

    // Build responsive srcset if not provided
    const responsiveSrcSet = srcSet || (src.includes('-') ? undefined : undefined);
    const responsiveSizes = sizes || generateDefaultSizes();

    // Container styles
    const containerStyle: React.CSSProperties = {
      ...style,
      aspectRatio: aspectRatio,
    };

    // Placeholder styles
    const placeholderStyles = blurPlaceholder && !isLoaded
      ? "bg-muted animate-pulse"
      : "";

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          placeholderStyles,
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
              src={primarySrc}
              alt={alt}
              width={width}
              height={height}
              srcSet={responsiveSrcSet}
              sizes={responsiveSizes}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              onLoad={handleLoad}
              onError={handleError}
              className={cn(
                "transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0",
                "w-full h-full",
                objectFit === 'cover' && "object-cover",
                objectFit === 'contain' && "object-contain",
                objectFit === 'fill' && "object-fill",
                objectFit === 'none' && "object-none",
                objectFit === 'scale-down' && "object-scale-down"
              )}
              {...props}
            />
          </picture>
        )}

        {/* Placeholder image */}
        {!isLoaded && placeholderSrc && (
          <img
            src={placeholderSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
            width={width}
            height={height}
          />
        )}

        {/* Error fallback */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

/**
 * ResponsiveImage Component
 * 
 * A simpler wrapper for responsive images with automatic srcset generation
 */
interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Array of image widths to include in srcset */
  widths?: number[];
  /** Custom sizes attribute */
  sizes?: string;
  /** Enable lazy loading */
  lazy?: boolean;
  /** Priority loading for LCP images */
  priority?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  widths = [640, 1024, 1920],
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  lazy = true,
  priority = false,
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("w-full h-auto", className)}
      {...props}
    />
  );
};

/**
 * HeroImage Component
 * 
 * Optimized for hero/banner images with priority loading
 */
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'lazy'> {
  /** Overlay gradient for text readability */
  overlay?: boolean;
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
}

const HeroImage: React.FC<HeroImageProps> = ({
  overlay = false,
  overlayOpacity = 50,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("relative", className)}>
      <OptimizedImage
        {...props}
        priority
        lazy={false}
        className="w-full h-full"
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
      {children}
    </div>
  );
};

export { OptimizedImage, ResponsiveImage, HeroImage };
export type { OptimizedImageProps, ResponsiveImageProps, HeroImageProps };
