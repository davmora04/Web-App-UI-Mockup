import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for keyboard navigation and accessibility
 */
export function useAccessibility() {
  /**
   * Focus trap for modals and dialogs
   * @param containerRef - Ref to the container element
   * @param isActive - Whether the focus trap is active
   */
  const useFocusTrap = (containerRef: React.RefObject<HTMLElement>, isActive: boolean) => {
    useEffect(() => {
      if (!isActive || !containerRef.current) return;

      const container = containerRef.current;
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          // Close modal/dialog - this would need to be connected to close function
          console.log('Escape pressed - should close modal');
        }
      };

      container.addEventListener('keydown', handleTabKey);
      container.addEventListener('keydown', handleEscapeKey);
      
      // Focus first element on mount
      firstElement?.focus();

      return () => {
        container.removeEventListener('keydown', handleTabKey);
        container.removeEventListener('keydown', handleEscapeKey);
      };
    }, [isActive, containerRef]);
  };

  /**
   * Announce content to screen readers
   * @param message - Message to announce
   * @param priority - Announcement priority (polite or assertive)
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  /**
   * Skip to main content functionality
   */
  const skipToMain = useCallback(() => {
    const mainContent = document.querySelector('main, [role="main"], #main');
    if (mainContent instanceof HTMLElement) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  }, []);

  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /**
   * Handle arrow key navigation for lists
   * @param event - Keyboard event
   * @param currentIndex - Current focused index
   * @param itemCount - Total number of items
   * @param onIndexChange - Callback when index changes
   */
  const handleArrowNavigation = useCallback((
    event: React.KeyboardEvent,
    currentIndex: number,
    itemCount: number,
    onIndexChange: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        onIndexChange((currentIndex + 1) % itemCount);
        break;
      case 'ArrowUp':
        event.preventDefault();
        onIndexChange((currentIndex - 1 + itemCount) % itemCount);
        break;
      case 'Home':
        event.preventDefault();
        onIndexChange(0);
        break;
      case 'End':
        event.preventDefault();
        onIndexChange(itemCount - 1);
        break;
    }
  }, []);

  /**
   * Generate unique IDs for accessibility
   * @param prefix - ID prefix
   * @returns Unique ID
   */
  const generateId = useCallback((prefix: string = 'a11y') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  return {
    useFocusTrap,
    announce,
    skipToMain,
    prefersReducedMotion,
    handleArrowNavigation,
    generateId
  };
}

/**
 * Hook for managing ARIA live regions
 */
export function useLiveRegion() {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const createLiveRegion = useCallback(() => {
    if (!liveRegionRef.current) {
      const region = document.createElement('div');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
      liveRegionRef.current = region;
    }
    return liveRegionRef.current;
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const region = createLiveRegion();
    region.setAttribute('aria-live', priority);
    region.textContent = message;
  }, [createLiveRegion]);

  const clear = useCallback(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
    }
  }, []);

  useEffect(() => {
    return () => {
      if (liveRegionRef.current && liveRegionRef.current.parentNode) {
        liveRegionRef.current.parentNode.removeChild(liveRegionRef.current);
      }
    };
  }, []);

  return { announce, clear };
}