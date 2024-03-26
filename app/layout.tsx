import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "#/components/settings";
import ThemeProvider from "#/theme";
import { MotionLazy } from "#/components/animate/motion-lazy";
import ProgressBar from "#/components/progress-bar/progress-bar";


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
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeColorPresets: 'default', // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <ProgressBar />
              {children}
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
