'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from '#/components/settings';

import { Typography } from '@mui/material';
import HighlightNewEditForm from '../highlight-new-edit-form';

// ----------------------------------------------------------------------

export default function HightlightCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thêm Pha bóng thú vị</Typography>

      <HighlightNewEditForm />
    </Container>
  );
}
