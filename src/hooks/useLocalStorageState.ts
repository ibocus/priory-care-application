import { useEffect, useRef, useState } from 'react';

export function useLocalStorageState<T>(key: string, initialValue: () => T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue();
    } catch {
      return initialValue();
    }
  });

  const isFirstRun = useRef(true);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
        setSavedAt(Date.now());
      } catch {
        // localStorage unavailable (private browsing, quota) — draft simply won't persist
      }
    }, 400);
    return () => window.clearTimeout(handle);
  }, [key, state]);

  const clear = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  };

  return { state, setState, savedAt, clear };
}
