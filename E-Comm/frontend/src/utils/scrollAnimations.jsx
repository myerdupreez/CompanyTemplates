import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Uses Intersection Observer API to detect when elements come into view
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '50px', // Start animation 50px before element enters viewport
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

/**
 * AnimatedSection component that wraps content with scroll-triggered animations
 */
export const AnimatedSection = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0, 
  className = '',
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const animationClasses = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in': 'animate-fade-in',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
    'bounce-in': 'animate-bounce-in'
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[animation] : 'opacity-0 translate-y-8'}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        transition: 'opacity 0.6s ease, transform 0.6s ease'
      }}
      {...props}
    >
      {children}
    </div>
  );
};
