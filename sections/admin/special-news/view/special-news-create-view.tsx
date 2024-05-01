'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import { Typography } from '@mui/material';
import SpecialNewsNewEditForm from '../special-news-new-edit-form';

// ----------------------------------------------------------------------

export default function SpecialNewsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm tin tức</Typography>

      <SpecialNewsNewEditForm />
    </Container>
  );
}
