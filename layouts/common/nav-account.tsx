import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { paths } from '#/routes/paths';

import { useMockedUser } from '#/hooks/use-mocked-user';

import Label from '#/components/label';
import { useAuthContext } from '#/auth/hooks';

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();

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
            src={user?.profileImage}
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

        <Button variant="contained" href={paths.dashboard.root}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  );
}
