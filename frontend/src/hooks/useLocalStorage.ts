import { useState, useEffect, useCallback } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null
): useLocalStorageReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    const value = window.localStorage.getItem(key);
    if (value != null) return value as T;

    return initialValue;
  });

  useEffect(() => {
    if (!value) return window.localStorage.removeItem(key);

    if (typeof value === "string") {
      window.localStorage.setItem(key, value);
    }
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(null);
  }, []);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
  };

  return [value, setStoredValue, remove];
}

type useLocalStorageReturn<T> = [T | null, (newValue: T) => void, () => void];

export default useLocalStorage;
