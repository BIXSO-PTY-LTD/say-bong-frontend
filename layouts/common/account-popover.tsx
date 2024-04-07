import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';

import { useMockedUser } from '#/hooks/use-mocked-user';

// import { useAuthContext } from '#/auth/hooks';

import { useSnackbar } from '#/components/snackbar';
import CustomPopover, { usePopover } from '#/components/custom-popover';
import { varHover } from '#/components/animate/variants';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

type Props = {
  onOpen: VoidFunction
}


export default function AccountPopover({ onOpen }: Props) {
  const router = useRouter();

  const { user } = useMockedUser();

  // const { logout } = useAuthContext();

  const handleChangePasswordDialog = useCallback(() => {
    onOpen()
  }, [onOpen])

  const OPTIONS = [
    {
      label: 'Tài khoản',
      linkTo: paths.account.root,
    },
    {
      label: 'Đổi mật khẩu',
      linkTo: handleChangePasswordDialog,
    },
    {
      label: 'Đăng xuất',
      linkTo: '/',
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      // await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string | (() => void)) => {
    popover.onClose();
    if (typeof path === 'string') {
      router.push(path);
    } else {
      path();
    }
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatarUrl}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0, background: "#fff", color: "#000" }}>

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

      </CustomPopover>
    </>
  );
}
