const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#14B8A6',
        accent: '#FFD166',
        background: '#FFFDF8',
        surface: '#FFFFFF',
        foreground: '#1F2937',
        'muted-foreground': '#6B7280',
        border: '#E5E7EB',
      },
      borderRadius: {
        lg: '10px',
        xl: '16px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', ...fontFamily.sans],
        hanzi: ['Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
