import { useState, useEffect, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = "50px",
    freezeOnceVisible = true,
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        
        if (isElementVisible) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, freezeOnceVisible]);

  return [elementRef, isVisible];
}

// Utility hook for lazy loading multiple elements
export function useLazyLoad(itemCount: number, batchSize: number = 6) {
  const [loadedCount, setLoadedCount] = useState(batchSize);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    if (!("IntersectionObserver" in window)) {
      setLoadedCount(itemCount);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && loadedCount < itemCount) {
          setLoadedCount((prev) => Math.min(prev + batchSize, itemCount));
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loader);

    return () => {
      observer.unobserve(loader);
    };
  }, [loadedCount, itemCount, batchSize]);

  return { loadedCount, loaderRef, hasMore: loadedCount < itemCount };
}
