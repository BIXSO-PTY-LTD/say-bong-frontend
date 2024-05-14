'use client';

import Container from '@mui/material/Container';

import { paths } from '#/routes/paths';


import { useSettingsContext } from '#/components/settings';


import { Typography } from '@mui/material';
import HighlightNewEditForm from '../highlight-new-edit-form';
import { useGetHighlightVideo, useGetHighlightVideos } from '#/api/highlight-video';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function HighlightEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { video: currentVideo } = useGetHighlightVideo(id);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thông tin highlight</Typography>
      <HighlightNewEditForm currentVideo={currentVideo} />
    </Container>
  );
}
