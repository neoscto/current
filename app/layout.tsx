'use client';

import { Providers } from '@/app/provider';
import { ThemeProvider } from '@mui/material/styles';
import theme, { outfit } from '@/styles/theme';
import './globals.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(
  'pk_test_51OSMbhE3ValX33mMTwrHIIMHySCc84WNPn2edAMAFVHLIRH4co0OxRIiZCgW7RgNTvRmkm6pbdnNNf85iHXbMheT003C5bJozN'
);
import './i18n';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useTranslation } from 'react-i18next';
import Script from 'next/script';

const mantineTheme = createTheme({});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <html lang="en">
      <head>
        <title>Neos | Energía Solar Más Barata, Sin Tejado</title>
        <meta
          property="og:title"
          content="Neos | Energía Solar Más Barata, Sin Tejado"
        />
        <meta
          property="og:description"
          content={t(
            'Access the most affordable solar energy, easily, without any rooftop or in-home installations. Our large-scale solar farms deliver electricity directly to your home or business through the existing electricity grid, immediately providing you with solar power in a cheaper manner than rooftop installations.'
          )}
        />
        <meta property="og:image" content="/landingpage-bg.png" />
        <meta property="og:url" content="https://www.neosenergia.com" />
        <meta property="og:type" content="website" />
        <ColorSchemeScript />
        {/* <Script tolstoyAppKey="098ddbd5-1968-4dda-8fdd-d473c7cdc84d" /> */}
        {/* <Script src="https://widget.gotolstoy.com/widget/widget.js" defer />
        <script>tolstoyAppKey=“098ddbd5-1968-4dda-8fdd-d473c7cdc84d”</script> */}
        {/* <script src=“https://widget.gotolstoy.com/widget/widget.js” defer></script> */}
      </head>
      <body className={outfit.className}>
        <ThemeProvider theme={theme}>
          <MantineProvider>
            <Providers>
              <Elements stripe={stripePromise}>{children}</Elements>
            </Providers>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
