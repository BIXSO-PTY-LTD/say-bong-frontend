import './global.css';


// ----------------------------------------------------------------------

import ThemeProvider from '#/theme';
import { primaryFont } from '#/theme/typography';

import ProgressBar from '#/components/progress-bar';
import { MotionLazy } from '#/components/animate/motion-lazy';
import SnackbarProvider from '#/components/snackbar/snackbar-provider';
import { SettingsProvider } from '#/components/settings';


import { AuthProvider } from '#/auth/context';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Say Bóng',
  description:
    'Say Bóng',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <SettingsProvider
            defaultSettings={{
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <ProgressBar />
                  {children}
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
