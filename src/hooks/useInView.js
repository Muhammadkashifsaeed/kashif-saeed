import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer.
 * Simple and performant - just returns [ref, isInView].
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.1]
 * @param {number} [options.rootMargin='0px']
 * @param {boolean} [options.once=true]
 * @returns {[React.RefObject, boolean]} - ref to attach, and whether element is in view
 */
export const useInView = ({ threshold = 0.1, rootMargin = '0px', once = true } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
};

export default useInView;
