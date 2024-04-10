'use client';

import { Button, Container, Pagination, Stack, Typography, paginationClasses } from '@mui/material';
import { _careerPosts, _marketingPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useSettingsContext } from '#/components/settings';
import { _userList } from '#/_mock/_user';
import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { IBlogPostProps, IBlogTableFilters } from '#/types/blog';
import NewsListHorizontal from '../news-list-horizontal';
import { useGetNews } from '#/api/news';

// ----------------------------------------------------------------------

export default function NewsListView() {
  const settings = useSettingsContext();

  const { news } = useGetNews()



  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách tin tức</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.news.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm tin tức
        </Button>
      </Stack>
      <NewsListHorizontal news={news}
      //  loading={newsLoading} 
      />

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </Container >
  );
}

// ----------------------------------------------------------------------
