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

  const { news, newsLoading, newsEmpty, paginate } = useGetNews();



  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (paginate.current_page) {
      setCurrentPage(paginate.current_page);
    }
  }, [paginate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * paginate.per_page;

  const endIndex = Math.min(startIndex + paginate.per_page, paginate.total);

  const dataInPage = news.slice(startIndex, endIndex);

  const canReset = !isEqual(news, news);

  const notFound = (!news.length && canReset) || newsEmpty;

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
      <NewsListHorizontal loading={newsLoading} news={news}
      //  loading={newsLoading} 
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
