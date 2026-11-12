/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--bg-canvas) / <alpha-value>)',
        surface: 'rgb(var(--bg-surface) / <alpha-value>)',
        elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
        ink: 'rgb(var(--text-primary) / <alpha-value>)',
        muted: 'rgb(var(--text-secondary) / <alpha-value>)',
        subtle: 'rgb(var(--text-muted) / <alpha-value>)',
        line: 'rgb(var(--border-color) / <alpha-value>)',
        highlight: 'rgb(var(--text-highlight) / <alpha-value>)',
        'cyan-ink': 'rgb(var(--text-cyan) / <alpha-value>)',
        'signal-ink': 'rgb(var(--text-signal) / <alpha-value>)',
        contrast: {
          canvas: 'rgb(var(--inv-canvas) / <alpha-value>)',
          surface: 'rgb(var(--inv-surface) / <alpha-value>)',
          ink: 'rgb(var(--inv-ink) / <alpha-value>)',
          muted: 'rgb(var(--inv-muted) / <alpha-value>)',
          line: 'rgb(var(--inv-line) / <alpha-value>)',
          highlight: 'rgb(var(--inv-highlight) / <alpha-value>)',
        },
        volt: {
          DEFAULT: '#d2ff28',
          400: '#dcff52',
          500: '#d2ff28',
          600: '#b5e300',
        },
        signal: {
          DEFAULT: '#ff5733',
          400: '#ff785a',
          500: '#ff5733',
        },
        ice: {
          DEFAULT: '#67e8f9',
          400: '#67e8f9',
          500: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'editorial-dark': '0 25px 60px -15px rgba(0, 0, 0, 0.75)',
        'editorial-light': '0 25px 60px -15px rgba(11, 12, 14, 0.12)',
        'volt-glow': '0 0 36px -6px rgba(210, 255, 40, 0.45)',
      },
    },
  },
  plugins: [],
};
