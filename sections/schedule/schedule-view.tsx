'use client';

import { Container, Typography } from '@mui/material';
import MatchList from '../match/match-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';

import resposneData from '#/public/responseData.json'
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';
import { useGetMatches } from '#/api/match';
// ----------------------------------------------------------------------

export default function ScheduleView() {
  const { matches, matchesLoading, matchesEmpty } = useGetMatches();


  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">lịch thi đấu</Typography>
      <MatchList matches={matches} matchesEmpty={matchesEmpty} matchesLoading={matchesLoading} />
    </Container>
  );
}
