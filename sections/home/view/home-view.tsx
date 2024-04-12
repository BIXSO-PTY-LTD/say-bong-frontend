'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';

import { _careerPosts } from '#/_mock/_blog';
import HomeHighlight from '../home-highlights';
import HomeLastestPosts from '../home-latest-posts';
import MatchList from '../../match/match-list';
import { useGetNews } from '#/api/news';


// ----------------------------------------------------------------------

export default function HomeView() {
  const { news } = useGetNews()
  return (
    <MainLayout>
      <Container>
        <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <MatchList />

        <HomeHighlight posts={_careerPosts.slice(0, 7)} />
        <HomeLastestPosts posts={news.slice(0, 7)} />
      </Container>
    </MainLayout>
  );
}
