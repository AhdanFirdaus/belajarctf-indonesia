import { useState, useEffect } from 'react';

/**
 * Custom Hook untuk Debouncing nilai input.
 * Menunda eksekusi filter hingga pengguna berhenti mengetik selama rentang waktu tertentu.
 * 
 * @param value Nilai yang ingin di-debounce
 * @param delay Waktu tunda dalam milidetik (default: 200ms)
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
