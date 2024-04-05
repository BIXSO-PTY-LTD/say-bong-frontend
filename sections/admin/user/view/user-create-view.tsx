'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import UserNewEditForm from '../user-new-edit-form';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm người dùng</Typography>

      <UserNewEditForm />
    </Container>
  );
}
