'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useMockedUser } from '#/hooks/use-mocked-user';
import AccountEditForm from '../account-edit-form';


// ----------------------------------------------------------------------

export default function AccountView() {
  const { user } = useMockedUser();
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tài khoản</Typography>
      <AccountEditForm currentUser={user} />
    </Container>
  );
}
