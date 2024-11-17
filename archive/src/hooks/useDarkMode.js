import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  return [darkMode, toggleDarkMode];
}

export default useDarkMode;