'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import { Typography } from '@mui/material';
import NewsNewEditForm from '../news-new-edit-form';

// ----------------------------------------------------------------------

export default function NewsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm tin tức</Typography>

      <NewsNewEditForm />
    </Container>
  );
}
