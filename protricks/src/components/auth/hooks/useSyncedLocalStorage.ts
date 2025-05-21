import { useState, useEffect } from "react";

function useSyncedLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.error("Error reading localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed !== storedValue) {
          setStoredValue(parsed);
        }
      }
    } catch (err) {
      console.error("Error syncing localStorage", err);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      setStoredValue(value);
    } catch (err) {
      console.error("Error writing to localStorage", err);
    }
  };

  return [storedValue, setValue] as const;
}

export default useSyncedLocalStorage;