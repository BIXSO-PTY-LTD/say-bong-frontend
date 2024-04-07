'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import UserNewEditForm from '../exciting-new-edit-form';
import { Typography } from '@mui/material';
import ExcitingNewEditForm from '../exciting-new-edit-form';

// ----------------------------------------------------------------------

export default function ExcitingCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm Pha bóng thú vị</Typography>

      <ExcitingNewEditForm />
    </Container>
  );
}
