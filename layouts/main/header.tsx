import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';


import { useOffSetTop } from '#/hooks/use-off-set-top';
import { useResponsive } from '#/hooks/use-responsive';


import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import Logo from '#/components/logo';
import HeaderShadow from '../common/header-shadow';
import LoginDialog from '#/sections/auth/login-dialog';
import RegisterDialog from '#/sections/auth/register-dialog';
import AccountPopover from '../common/account-popover';
import ChangePasswordDialog from '#/sections/auth/change-password-dialog';
import { useAuthContext } from '#/auth/hooks';
import { useDialogControls } from '#/hooks/use-dialog-controls';

// ----------------------------------------------------------------------


export default function Header() {
  const theme = useTheme();

  const { user } = useAuthContext();

  const { dialogLoginOpen, dialogChangePasswordOpen, dialogRegisterOpen } = useDialogControls();



  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <>
      <Box sx={{ lineHeight: 0, position: 'relative' }}>
        <Logo />

        <Link href="https://zone-docs.vercel.app/changelog" target="_blank" rel="noopener">

        </Link>
      </Box>

      {mdUp ? (
        <Stack flexGrow={1} alignItems="center" sx={{ height: 1 }}>
          <NavDesktop data={navConfig} />
        </Stack>
      ) : (
        <Box sx={{ flexGrow: 1 }} />
      )}

      {!user ? (
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end">


          {mdUp && (
            <Button
              variant='contained'
              onClick={dialogRegisterOpen.onTrue}
            >
              ĐĂNG KÍ
            </Button>
          )}
          {mdUp && (
            <Button
              variant='contained'
              onClick={dialogLoginOpen.onTrue}
            >
              ĐĂNG NHẬP
            </Button>
          )}
        </Stack>

      ) :
        (
          <AccountPopover onOpen={dialogChangePasswordOpen.onTrue} />
        )}


      {!mdUp && <NavMobile data={navConfig} />}
    </>
  );

  return (
    <>
      <AppBar>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            // ...(headerOnDark && {
            //   color: 'common.white',
            // }),
            backgroundImage: "url(/assets/images/header/header.png)",

          }}
        >
          <Container maxWidth="xl"
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderContent}
          </Container>
        </Toolbar>

        {offset && <HeaderShadow />}
      </AppBar>

      {dialogLoginOpen.value && <LoginDialog openRegister={dialogRegisterOpen.onTrue} open={dialogLoginOpen.value} onClose={dialogLoginOpen.onFalse} />}
      {dialogRegisterOpen.value && <RegisterDialog openLogin={dialogLoginOpen.onTrue} open={dialogRegisterOpen.value} onClose={dialogRegisterOpen.onFalse} />}
      {dialogChangePasswordOpen.value && <ChangePasswordDialog open={dialogChangePasswordOpen.value} onClose={dialogChangePasswordOpen.onFalse} />}
    </>
  );
}
