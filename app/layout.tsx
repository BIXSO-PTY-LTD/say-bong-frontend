
import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "#/components/settings";
import ThemeProvider from "#/theme";
import { MotionLazy } from "#/components/animate/motion-lazy";
import ProgressBar from "#/components/progress-bar/progress-bar";
import { AuthProvider } from "#/auth/context";
import { SnackbarProvider } from "#/components/snackbar";


export const metadata: Metadata = {
  title: "Say Bóng",
  description: "Say Bóng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SettingsProvider
            defaultSettings={{
              themeStretch: false,
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeColorPresets: 'default', // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
