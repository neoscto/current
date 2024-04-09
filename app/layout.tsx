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
        <script
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.META_PIXEL_ID}');
          fbq('track', 'PageView');
        `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        <script type="text/javascript">
          {`
        _linkedin_partner_id = "${process.env.LINKEDIN_PIXEL_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      `}
        </script>
        <script type="text/javascript">
          {`
        (function(l) {
          if (!l) {
            window.lintrk = function(a,b) {
              window.lintrk.q.push([a,b])
            };
            window.lintrk.q=[]
          }
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";
          b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      `}
        </script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://px.ads.linkedin.com/collect/?pid=${process.env.LINKEDIN_PIXEL_ID}&fmt=gif`}
          />
        </noscript>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
        ></script>
        <script>
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', '${process.env.GTM_ID}');
      `}
        </script>

        <title>Neos | Energía Solar Más Barata, Sin Tejado</title>
        <meta
          property="og:title"
          content="Neos | Energía Solar Más Barata, Sin Tejado"
        />
        <meta
          property="og:description"
          content={t(
            'Access the most affordable solar energy, easily, without any rooftop or in-home installations. Our large-scale solar farms deliver electricity directly to your home or business through the existing electrical grid, immediately providing you with solar power in a cheaper manner than rooftop installations.'
          )}
        />
        <meta property="og:image" content="/landingpage-bg.png" />
        <meta property="og:url" content="https://www.neosenergia.com" />
        <meta property="og:type" content="website" />
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>

        <script>tolstoyAppKey=“098ddbd5-1968-4dda-8fdd-d473c7cdc84d”</script>
        <script
          src="https://widget.gotolstoy.com/widget/widget.js"
          defer
        ></script>
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
