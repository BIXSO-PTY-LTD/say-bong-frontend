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
import { useBoolean } from '#/hooks/use-boolean';
import { useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
import { ConfirmDialog } from '#/components/custom-dialog';

// ----------------------------------------------------------------------

export default function NewsListView() {
  const settings = useSettingsContext();

  const [currentPage, setCurrentPage] = useState(1);


  const { news, newsLoading, paginate, endpoints } = useGetNews(currentPage, 8);


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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
      <NewsListHorizontal endpoints={endpoints} loading={newsLoading} news={news}
      />

      <Pagination
        count={paginate && paginate.total && paginate.per_page ? Math.ceil(paginate.total / paginate.per_page) : 1}
        page={currentPage}
        onChange={handlePageChange}
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
