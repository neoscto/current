"use client";

import { Providers } from '@/app/provider'
import { ThemeProvider } from '@mui/material/styles';
import theme, { outfit } from '@/styles/theme';
import './globals.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_live_51OSMbhE3ValX33mMoXmN49VYsnq6h0mNVlCpJAAvTRqsBoeDxHBekBz6RrnRTKZ9pJ4NdXPeYf2imRrCl8JtXsIU005SWQyg19');
import "./i18n"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider theme={theme}>
          <Providers>
            <Elements stripe={stripePromise}>

              {children}
            </Elements>

          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
