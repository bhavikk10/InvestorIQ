/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#FAFBFC',
        'bg-dark': '#0C0F1A',
        'bg-charcoal': '#141A2A',
        'bg-white': '#FFFFFF',
        'border-light': '#E5E7EB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'accent-blue': '#3B82F6',
        'accent-purple': '#6366F1',
        'gold': '#d4af37',
        'gradient-start': '#1E3C72',
        'gradient-end': '#2A5298',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-sm': '0 0 8px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}

