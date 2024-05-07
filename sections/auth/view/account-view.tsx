'use client';

import { Container, Typography } from '@mui/material';

import AccountEditForm from '../account-edit-form';
import { useAuthContext } from '#/auth/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from '#/routes/hooks';
import { paths } from '#/routes/paths';
import { useSnackbar } from 'notistack';


// ----------------------------------------------------------------------

export default function AccountView() {
  const { user } = useAuthContext();


  return (
    <Box maxWidth="1330px" margin="0 auto">
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tài khoản</Typography>
      <AccountEditForm currentUser={user} />
    </Box>
  );
}
