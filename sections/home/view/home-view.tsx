'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';
import HomeLive from '../home-live';
import { _careerPosts } from '#/_mock/_blog';
import HomeHighlight from '../home-highlights';
import HomeLastestPosts from '../home-latest-posts';


// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <MainLayout>
      <Container>
        <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <HomeLive />
        <HomeHighlight posts={_careerPosts.slice(0, 7)} />
        <HomeLastestPosts posts={_careerPosts.slice(0, 7)} />
      </Container>
    </MainLayout>
  );
}
