'use client';

import { Button, Container, Pagination, Stack, Typography, paginationClasses } from '@mui/material';
import { useSettingsContext } from '#/components/settings';

import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { IBlogPostProps, IBlogTableFilters } from '#/types/blog';
import { useGetNews } from '#/api/news';
import { useBoolean } from '#/hooks/use-boolean';
import { useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
import { ConfirmDialog } from '#/components/custom-dialog';
import SpecialNewsListHorizontal from '../special-news-list-horizontal';
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

export default function SpecialNewsListView() {
  const settings = useSettingsContext();

  const [currentPage, setCurrentPage] = useState(1);


  const { news, newsLoading, endpoints } = useGetNews(1, 100);
  const [specialNews, setSpecialNews] = useState<INewsItem[]>([])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const sortedNews = [...news].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setSpecialNews(sortedNews.filter(item => item.title.startsWith("*")))
  }, [news])

  // Paginate specialNews
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const paginatedSpecialNews = specialNews.slice(startIndex, endIndex);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách tin tức đặc biệt</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.news.special.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm tin tức
        </Button>
      </Stack>
      <SpecialNewsListHorizontal endpoints={endpoints} loading={newsLoading} news={paginatedSpecialNews}
      />

      <Pagination
        count={Math.ceil(specialNews.length / 8)}
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
