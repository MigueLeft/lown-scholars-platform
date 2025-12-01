import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import localFont from 'next/font/local';
import "./globals.css";

// Cargar fuente Trueno
const trueno = localFont({
  src: [
    {
      path: './fonts/trueno/Trueno-UltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/trueno/Trueno-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/trueno/Trueno-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/trueno/Trueno-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/trueno/Trueno-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-trueno',
});

// Cargar fuente Lora
const lora = localFont({
  src: [
    {
      path: './fonts/lora/Lora-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: './fonts/lora/Lora-Italic.ttf',
    //   weight: '400',
    //   style: 'italic',
    // },
    // {
    //   path: './fonts/lora/Lora-Bold.ttf',
    //   weight: '700',
    //   style: 'normal',
    // },
    // {
    //   path: './fonts/lora/Lora-BoldItalic.ttf',
    //   weight: '700',
    //   style: 'italic',
    // },
  ],
  variable: '--font-lora',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${trueno.variable} ${lora.variable}`}>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
              {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}