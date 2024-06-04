import { useEffect } from 'react';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { usePathname } from '#/routes/hooks';

import { useBoolean } from '#/hooks/use-boolean';

import Iconify from '#/components/iconify';
import Scrollbar from '#/components/scrollbar';

import NavList from './nav-list';
import { NavProps } from '../types';
import { NAV } from '../../../config-layout';
import Logo from '#/components/logo';
import { Button, Stack } from '@mui/material';
import LoginDialog from '#/sections/auth/login-dialog';
import RegisterDialog from '#/sections/auth/register-dialog';
import ChangePasswordDialog from '#/sections/auth/change-password-dialog';
import { useDialogControls } from '#/hooks/use-dialog-controls';

// ----------------------------------------------------------------------

export default function NavMobile({ data }: NavProps) {
  const pathname = usePathname();

  const { dialogLoginOpen, dialogChangePasswordOpen, dialogRegisterOpen } = useDialogControls();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ ml: 1, color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar

        >
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((list) => (
              <NavList key={list.title} data={list} />
            ))}
            <Stack spacing={3} direction="column" sx={{ mt: 2, mx: 3 }} >
              <Button
                variant='outlined'
                onClick={dialogRegisterOpen.onTrue}
              >
                ĐĂNG KÍ
              </Button>
              <Button
                variant='outlined'
                onClick={dialogLoginOpen.onTrue}
              >
                ĐĂNG NHẬP
              </Button>
            </Stack>
          </List>
        </Scrollbar>
      </Drawer>
      {dialogLoginOpen.value && <LoginDialog openRegister={dialogRegisterOpen.onTrue} open={dialogLoginOpen.value} onClose={dialogLoginOpen.onFalse} />}
      {dialogRegisterOpen.value && <RegisterDialog openLogin={dialogLoginOpen.onTrue} open={dialogRegisterOpen.value} onClose={dialogRegisterOpen.onFalse} />}
      {dialogChangePasswordOpen.value && <ChangePasswordDialog open={dialogChangePasswordOpen.value} onClose={dialogChangePasswordOpen.onFalse} />}
    </>
  );
}
