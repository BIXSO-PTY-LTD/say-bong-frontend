'use client';

import { Button, Container, Pagination, Stack, Typography, paginationClasses } from '@mui/material';
import { useSettingsContext } from '#/components/settings';

import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { useState } from 'react';
import LiveStreamListHorizontal from '../livestream-list-horizontal';
import { useGetLivestreams } from '#/api/livestream';

// ----------------------------------------------------------------------

export default function LivestreamListView() {
  const settings = useSettingsContext();

  const [currentPage, setCurrentPage] = useState(1);


  const { livestreams, livestreamsLoading, paginate, endpoints } = useGetLivestreams(currentPage, 8);


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách livestream</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.livestream.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm livestream
        </Button>
      </Stack>
      <LiveStreamListHorizontal endpoints={endpoints} loading={livestreamsLoading} livestreams={livestreams}
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
