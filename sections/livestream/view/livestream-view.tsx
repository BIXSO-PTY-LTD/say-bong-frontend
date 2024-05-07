'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';
import LivestreamList from '../livestream-list';
import { useGetLivestreams } from '#/api/livestream';
import { useState } from 'react';


// ----------------------------------------------------------------------

export default function LivestreamView() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const { livestreams, livestreamsLoading, paginate, livestreamsEmpty } = useGetLivestreams(currentPage, 12)
  const sortedLivestreams = [...livestreams].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <Container maxWidth="xl">
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM</Typography>
      <LivestreamList
        livestreams={sortedLivestreams}
        loading={livestreamsLoading}
        paginate={paginate}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        empty={livestreamsEmpty}
      />
    </Container>
  );
}
