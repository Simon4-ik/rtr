import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type UIFontSize = 'sm' | 'md' | 'lg';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  uiFontSize: UIFontSize;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('kiberxavfsizlik_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  // UI Font scale state (A- / A+)
  const [uiFontSize, setUiFontSize] = useState<UIFontSize>(() => {
    try {
      const saved = localStorage.getItem('kiberxavfsizlik_font_size');
      if (saved === 'sm' || saved === 'md' || saved === 'lg') return saved;
    } catch {
      // fallback
    }
    return 'md';
  });

  // Animations enabled / disabled
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kiberxavfsizlik_animations');
      if (saved !== null) return saved === 'true';
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
    } catch {
      // fallback
    }
    return true;
  });

  // Apply theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kiberxavfsizlik_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Apply UI font scale
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('ui-scale-sm', 'ui-scale-md', 'ui-scale-lg');
    root.classList.add(`ui-scale-${uiFontSize}`);
    try {
      localStorage.setItem('kiberxavfsizlik_font_size', uiFontSize);
    } catch {
      // ignore
    }
  }, [uiFontSize]);

  // Apply animation preference
  useEffect(() => {
    try {
      localStorage.setItem('kiberxavfsizlik_animations', String(animationsEnabled));
    } catch {
      // ignore
    }
  }, [animationsEnabled]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const increaseFontSize = () => {
    setUiFontSize((prev) => {
      if (prev === 'sm') return 'md';
      return 'lg';
    });
  };

  const decreaseFontSize = () => {
    setUiFontSize((prev) => {
      if (prev === 'lg') return 'md';
      return 'sm';
    });
  };

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        uiFontSize,
        increaseFontSize,
        decreaseFontSize,
        animationsEnabled,
        toggleAnimations,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
