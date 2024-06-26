import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

import { usePathname } from '#/routes/hooks';

import { useResponsive } from '#/hooks/use-responsive';

import Logo from '#/components/logo';
import Scrollbar from '#/components/scrollbar';
import { NavSectionVertical } from '#/components/nav-section';

import { NAV } from '../config-layout';
import NavAccount from '../common/nav-account';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo isAdmin sx={{ mt: 3, ml: 4, mb: 1 }} />

      <NavSectionVertical
        data={navData}
      />

      <Box sx={{ flexGrow: 1 }} />

      <NavAccount />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { md: "190px" },
      }}
    >

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: "190px",
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: "190px",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
