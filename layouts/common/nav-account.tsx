import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


import { useSnackbar } from '#/components/snackbar';
import { useRouter } from '#/routes/hooks';

import { useAuthContext } from '#/auth/hooks';
import { paths } from '#/routes/paths';

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar('Bạn đã đăng xuất');
      router.push(paths.home)
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            alt={user?.userName}
            sx={{
              width: 45,
              height: 45,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {user?.fullName?.charAt(0).toUpperCase()}
          </Avatar>

        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.userName}
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  );
}
