'use client';

import { Box, Container, Typography } from '@mui/material';
import MatchList from '../match/match-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';
import resposneData from '#/public/responseData.json'
import { useGetMatches } from '#/api/match';

// ----------------------------------------------------------------------

export default function ResultView() {
  const { matches, matchesLoading, matchesEmpty } = useGetMatches();


  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Kết quả</Typography>
      <MatchList matches={matches} matchesEmpty={matchesEmpty} matchesLoading={matchesLoading} />

    </Container>
  );
}
