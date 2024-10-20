import { useCallback, useEffect, useState } from 'react';

const VISIBILITY_STATE_SUPPORTED = typeof document !== 'undefined' && 'visibilityState' in document;

function isWindowVisible() {
  return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden';
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible(): boolean {
  const [focused, setFocused] = useState<boolean>(typeof window !== 'undefined' ? isWindowVisible() : true);
  const listener = useCallback(() => {
    setFocused(isWindowVisible());
  }, []);

  useEffect(() => {
    if (!VISIBILITY_STATE_SUPPORTED) return;

    document.addEventListener('visibilitychange', listener);

    return () => {
      document.removeEventListener('visibilitychange', listener);
    };
  }, [listener]);

  return focused;
}
