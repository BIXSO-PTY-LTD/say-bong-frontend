'use client';

import MainLayout from '#/layouts/main';
import { Box, Container, Typography } from '@mui/material';
import LivestreamList from '../livestream-list';
import { useGetLivestreams } from '#/api/livestream';
import { useEffect, useState } from 'react';
import MatchList from '#/sections/match/match-list';
import resposneData from '#/public/responseData.json'
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';
import { useGetMatches } from '#/api/match';


// ----------------------------------------------------------------------

export default function LivestreamView() {
  // const [currentPage, setCurrentPage] = useState(1);
  const { matches, matchesLoading, matchesEmpty } = useGetMatches();

  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM</Typography>

      <MatchList matches={matches} matchesLoading={matchesLoading} matchesEmpty={matchesEmpty} />
      {/* <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM KHÁC</Typography>
      <LivestreamList
        livestreams={sortedLivestreams}
        loading={livestreamsLoading}
        paginate={paginate}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        empty={livestreamsEmpty}
      /> */}
    </Container>
  );
}
