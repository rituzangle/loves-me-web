import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    if (typeof window.frameworkReady === 'function') {
      window.frameworkReady();
    }
    // This will call the frameworkReady function if it exists,
    // is defined in the global window object, and is a function.
    // that rely on global initialization hooks.
    // This is useful for ensuring that any framework-specific initialization
    // logic is executed when the component mounts.
  }, []); // Empty dependency array ensures this runs once on mount
}
