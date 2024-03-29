'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import HighlightList from '../highlight-list';
import ExcitingHighlightList from '../exciting-highlight-list';


// ----------------------------------------------------------------------

export default function HighlightView() {

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Highlight</Typography>
      <HighlightList
        tours={_tours}
      // loading={loading.value}
      />

      <ExcitingHighlightList tours={_tours} />
    </Container>
  );
}
