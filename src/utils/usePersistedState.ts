import { useState, Dispatch, SetStateAction, useEffect } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

const usePersistedState = <T>(key: string, initialTheme: T): Response<T> => {
  const [state, setState] = useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme) return JSON.parse(theme);
    return initialTheme;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
