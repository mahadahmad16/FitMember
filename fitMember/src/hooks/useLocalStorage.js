import { useState, useEffect } from "react";

function readStoredValue(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage might be full or unavailable (e.g. private browsing) — fail silently.
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;