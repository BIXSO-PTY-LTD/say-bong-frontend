'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';

import { _careerPosts } from '#/_mock/_blog';
import HomeHighlight from '../home-highlights';
import HomeLastestPosts from '../home-latest-posts';
import MatchList from '../../match/match-list';
import { useGetNews } from '#/api/news';
import { useGetHighlightVideos } from '#/api/highlight-video';


// ----------------------------------------------------------------------

export default function HomeView() {
  const { news, newsLoading, newsEmpty } = useGetNews()
  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty } = useGetHighlightVideos();

  return (
    <MainLayout>
      <Container>
        <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <MatchList />

        <HomeHighlight loading={highlightVideosLoading} empty={highlightVideosEmpty} highlightVideos={highlightVideos.slice(0, 7)} />
        <HomeLastestPosts loading={newsLoading} empty={newsEmpty} posts={news.slice(0, 7)} />
      </Container>
    </MainLayout>
  );
}
