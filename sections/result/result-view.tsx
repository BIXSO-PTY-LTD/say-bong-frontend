'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import MatchList from '../match/match-list';


// ----------------------------------------------------------------------

export default function ResultView() {

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Kết quả</Typography>
      <MatchList />

    </Container>
  );
}
