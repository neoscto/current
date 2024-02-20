"use client";

import { Providers } from "@/app/provider";
import { ThemeProvider } from "@mui/material/styles";
import theme, { outfit } from "@/styles/theme";
import "./globals.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51OSMbhE3ValX33mMTwrHIIMHySCc84WNPn2edAMAFVHLIRH4co0OxRIiZCgW7RgNTvRmkm6pbdnNNf85iHXbMheT003C5bJozN"
);
import "./i18n";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const mantineTheme = createTheme({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Neos | Cheaper Solar Energy, Without a Rooftop</title>
        <ColorSchemeScript />
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
