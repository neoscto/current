import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      dropShadow: {
        'button-text': '0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        'Primary-Color-Main': '#FD7C7C',
        'Primary-Color-Light': '#febfbf'
      },
      fontSize: {
        '2xs': '10px',
        '3xs': '8px'
      }
    }
  },
  plugins: []
};
export default config;
