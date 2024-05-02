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
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

export default function NewsListView() {
  const settings = useSettingsContext();

  const [currentPage, setCurrentPage] = useState(1);


  const { news, newsLoading, endpoints } = useGetNews(1, 100);
  const [normalNews, setNormalNews] = useState<INewsItem[]>([])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setNormalNews(news.filter(item => item.title.startsWith("#")))
  }, [news])
  // Paginate specialNews
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const paginatedNormalNews = normalNews.slice(startIndex, endIndex);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách tin tức thường</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.news.normal.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm tin tức
        </Button>
      </Stack>
      <NewsListHorizontal endpoints={endpoints} loading={newsLoading} news={paginatedNormalNews}
      />

      <Pagination
        count={Math.ceil(normalNews.length / 8)}
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
