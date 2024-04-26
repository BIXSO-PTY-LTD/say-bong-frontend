'use client';

import Container from '@mui/material/Container';

import { paths } from '#/routes/paths';


import { useSettingsContext } from '#/components/settings';

import { _userList } from '#/_mock/_user';
import { Typography } from '@mui/material';
import UserNewEditForm from '../news-new-edit-form';
import NewsNewEditForm from '../news-new-edit-form';
import { _careerPosts, _marketingPosts } from '#/_mock/_blog';
import { useGetNew } from '#/api/news';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function NewsEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { new: currentNew } = useGetNew(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thông tin tin tức</Typography>
      <NewsNewEditForm currentNew={currentNew} />
    </Container>
  );
}
