'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import LivestreamList from '../livestream-list';
import { _tours } from '#/_mock';
import { useGetLivestreams } from '#/api/livestream';
import { useState } from 'react';


// ----------------------------------------------------------------------

export default function LivestreamView() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const { livestreams, livestreamsLoading, paginate, livestreamsEmpty } = useGetLivestreams(currentPage, 12)
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM</Typography>
      <LivestreamList
        livestreams={livestreams}
        loading={livestreamsLoading}
        paginate={paginate}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        empty={livestreamsEmpty}
      />
    </Container>
  );
}
