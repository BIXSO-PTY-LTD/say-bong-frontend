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
import { useGetMatches } from '#/api/match';
import MatchListHorizontal from '#/sections/match/match-list-horizontal';
import { ILivestreamItem } from '#/types/livestream';


// ----------------------------------------------------------------------

export default function LivestreamView() {
  // const [currentPage, setCurrentPage] = useState(1);
  const { livestreams } = useGetLivestreams(1, 200);

  const { matches, matchesLoading, matchesEmpty } = useGetMatches();

  const [matchedMatches, setMatchedMatches] = useState<IMatchItem[]>([]);

  useEffect(() => {
    if (livestreams && matches) {
      const matchedLivestreamIds = livestreams
        .filter(livestream =>
          livestream.meta?.some(metaItem => metaItem.key === "hot" && metaItem.content === "Có")
        )
        .map(livestream => livestream.title);



      const matched = matches.filter(match =>
        matchedLivestreamIds.includes(match.matchId)
      );
      setMatchedMatches(matched);
    }
  }, [livestreams, matches]);

  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Trực tiếp bóng đá</Typography>

      <MatchListHorizontal matchs={matchedMatches} />


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
