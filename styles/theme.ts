'use client';
import { Outfit } from 'next/font/google';
import { createTheme, PaletteOptions } from '@mui/material/styles';

interface CustomPaletteOptions extends PaletteOptions {
  basic?: {
    white: string;
    black: string;
  };
}

export const outfit = Outfit({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-outfit',
  fallback: ['sans-serif']
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#FD7C7C',
      light: '#FFF8F8',
      dark: '#ffa4a4'
    },
    secondary: {
      main: '#000',
      light: '#F7F8F9',
      contrastText: '#ffffff'
    },
    basic: {
      white: '#ffffff',
      black: '#000000'
    }
  } as CustomPaletteOptions,
  typography: {
    fontFamily: outfit.style.fontFamily
  }
});

export default theme;
