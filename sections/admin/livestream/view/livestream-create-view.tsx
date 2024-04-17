'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import { Typography } from '@mui/material';
import NewsNewEditForm from '../livestream-new-edit-form';
import LivestreamNewEditForm from '../livestream-new-edit-form';

// ----------------------------------------------------------------------

export default function LivestreamCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm livestream</Typography>

      <LivestreamNewEditForm />
    </Container>
  );
}
