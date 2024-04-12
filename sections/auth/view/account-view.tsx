'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
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
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tài khoản</Typography>
      <AccountEditForm currentUser={user} />
    </Container>
  );
}
