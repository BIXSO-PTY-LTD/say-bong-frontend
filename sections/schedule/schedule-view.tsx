'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import MatchList from '../match/match-list';
import { useEffect, useState } from 'react';
import matchesData from '#/public/data/matchesData.json';
import { IMatchItem } from '#/types/match';

// ----------------------------------------------------------------------

export default function ScheduleView() {
  const [matches, setMatches] = useState<IMatchItem[]>([]);
  useEffect(() => {
    if (matchesData) {
      setMatches(matchesData.data.list)
    }
  }, [])
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">lịch thi đấu</Typography>
      <MatchList matches={matches} />

    </Container>
  );
}
