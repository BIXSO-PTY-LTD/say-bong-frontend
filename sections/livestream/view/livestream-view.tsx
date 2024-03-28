'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import LivestreamList from '../livestream-list';
import { _tours } from '#/_mock';


// ----------------------------------------------------------------------

export default function LivestreamView() {

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">LIVESTREAM</Typography>
      <LivestreamList
        tours={_tours}
      // loading={loading.value}
      />
    </Container>
  );
}
