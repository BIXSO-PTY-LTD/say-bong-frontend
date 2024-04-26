'use client';

import { Button, Container, Pagination, Stack, Typography, paginationClasses } from '@mui/material';
import { _careerPosts, _marketingPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useSettingsContext } from '#/components/settings';
import { _userList } from '#/_mock/_user';
import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { ITourTableFilters } from '#/types/tour';
import HighlightListHorizontal from '../highlight-list-horizontal';
import { useGetHighlightVideos } from '#/api/highlight-video';
import { IVideoItem } from '#/types/video';
import { useState } from 'react';

// ----------------------------------------------------------------------


const defaultFilters: ITourTableFilters = {
  title: '',
};

export default function HighlightListView() {
  const settings = useSettingsContext();

  const [currentPage, setCurrentPage] = useState(1);

  const { highlightVideos, highlightVideosLoading, paginate, endpoints } = useGetHighlightVideos(currentPage, 8)

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const dataFiltered = applyFilter({
    inputData: highlightVideos,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách highlight</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.video.highlight.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm highlight
        </Button>
      </Stack>

      <HighlightListHorizontal loading={highlightVideosLoading} endpoints={endpoints} highlights={dataFiltered}
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

function applyFilter({
  inputData,
}: {
  inputData: IVideoItem[];
}) {

  return inputData;
}
