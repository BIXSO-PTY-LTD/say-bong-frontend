'use client';

import MainLayout from '#/layouts/main';
import { Box, Container, Typography } from '@mui/material';
import LivestreamList from '../livestream-list';
import { useGetLivestreams } from '#/api/livestream';
import { useEffect, useState } from 'react';
import MatchList from '#/sections/match/match-list';
import resposneData from '#/public/responseData.json'
import { IMatchItem } from '#/types/match';


// ----------------------------------------------------------------------

export default function LivestreamView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [matches, setMatches] = useState<IMatchItem[]>([]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const { livestreams, livestreamsLoading, paginate, livestreamsEmpty } = useGetLivestreams(currentPage, 12)
  const sortedLivestreams = [...livestreams].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  useEffect(() => {
    if (resposneData) {
      setMatches(resposneData.data.list)
    }
  }, [])
  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM</Typography>

      <MatchList matches={matches} />
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM KHÁC</Typography>
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
