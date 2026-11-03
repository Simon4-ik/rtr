/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
        calibri: ['Calibri', 'Carlito', 'sans-serif'],
      },
      colors: {
        // Semantic Tokens linked to CSS variables
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          soft: 'var(--color-accent-soft)',
        },
        'accent-2': {
          DEFAULT: 'var(--color-accent-2)',
          soft: 'var(--color-accent-2-soft)',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        chip: '999px',
      },
      maxWidth: {
        content: '1200px',
        reading: '760px',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 28px -4px rgba(0, 0, 0, 0.12)',
        'accent-glow': '0 0 20px -3px var(--color-accent-glow)',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
