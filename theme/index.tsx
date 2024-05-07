'use client';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import RTL from './options/right-to-left';
import { customShadows } from './custom-shadows';
import { createPresets } from './options/presets';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';
import { useSettingsContext } from '#/components/settings';
import { componentsOverrides } from './overrides';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const settings = useSettingsContext();

  const presets = createPresets(settings.themeColorPresets);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(),
        ...presets.palette,
      },
      customShadows: {
        ...customShadows(),
        ...presets.customShadows,
      },
      direction: settings.themeDirection,
      shadows: shadows(),
      shape: { borderRadius: 8 },
      typography,
      overrides: {
        MuiContainer: {
          root: {
            maxWidth: '1330px',
          },
        },
      }
    }),
    [settings.themeDirection, presets.palette, presets.customShadows]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);
  theme.components = componentsOverrides(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={settings.themeDirection}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
