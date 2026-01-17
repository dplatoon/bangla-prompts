import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  blurPlaceholder?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      alt,
      className,
      placeholderSrc,
      blurPlaceholder = true,
      threshold = 0.1,
      rootMargin = "50px",
      width,
      height,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const combinedRef = (node: HTMLImageElement) => {
      imgRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      const currentRef = imgRef.current;
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
    }, [threshold, rootMargin]);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Placeholder styling with blur effect
    const placeholderStyles = blurPlaceholder
      ? "bg-muted animate-pulse"
      : "";

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          !isLoaded && placeholderStyles,
          className
        )}
        style={{ width, height }}
      >
        {isInView && (
          <img
            ref={combinedRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              "w-full h-full object-cover"
            )}
            {...props}
          />
        )}
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
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

// Lazy Avatar Image with Intersection Observer
interface LazyAvatarImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

const LazyAvatarImage: React.FC<LazyAvatarImageProps> = ({
  src,
  alt,
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
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "aspect-square h-full w-full rounded-full object-cover transition-opacity duration-200",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};

export { LazyImage, LazyAvatarImage };
