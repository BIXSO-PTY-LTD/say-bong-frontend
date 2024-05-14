'use client';

import Container from '@mui/material/Container';



import { useSettingsContext } from '#/components/settings';


import { Typography } from '@mui/material';
import LivestreamNewEditForm from '../livestream-new-edit-form';
import { useGetLivestream } from '#/api/livestream';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function LivestreamEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { livestream: currentLivestream } = useGetLivestream(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thông tin livestream</Typography>
      <LivestreamNewEditForm currentLivestream={currentLivestream} />
    </Container>
  );
}
