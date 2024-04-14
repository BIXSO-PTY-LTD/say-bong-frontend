'use client';

import Container from '@mui/material/Container';

import { paths } from '#/routes/paths';


import { useSettingsContext } from '#/components/settings';

import { _userList } from '#/_mock/_user';
import { Typography } from '@mui/material';
import { _careerPosts, _marketingPosts } from '#/_mock/_blog';
import ExcitingNewEditForm from '../exciting-new-edit-form';
import { _tours } from '#/_mock';
import { useGetExcitingVideo } from '#/api/exciting-video';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExcitingEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { video: currentVideo } = useGetExcitingVideo(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thông tin Video</Typography>
      <ExcitingNewEditForm currentVideo={currentVideo} />
    </Container>
  );
}
