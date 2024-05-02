'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';

import { _careerPosts } from '#/_mock/_blog';
import HomeHighlight from '../home-highlights';
import HomeLastestPosts from '../home-latest-posts';
import MatchList from '../../match/match-list';
import { useGetNews } from '#/api/news';
import { useGetHighlightVideos } from '#/api/highlight-video';
import { useEffect, useState } from 'react';
import matchesData from '#/public/data/matchesData.json';
import { IMatchItem } from '#/types/match';
import { useGetMatchs } from '#/api/match';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { news, newsLoading, newsEmpty } = useGetNews(1, 7)
  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty } = useGetHighlightVideos(1, 7);
  const [matches, setMatches] = useState<IMatchItem[]>([]);
  const matchesDataSoccer = useGetMatchs();
  console.log(matchesDataSoccer);

  useEffect(() => {
    if (matchesData) {
      setMatches(matchesData.data.list)
    }
  }, [])

  return (
    <MainLayout>
      <Container>
        <Typography sx={{ textTransform: "uppercase", mt: "40px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <MatchList matches={matches} />

        <HomeHighlight loading={highlightVideosLoading} empty={highlightVideosEmpty} highlightVideos={highlightVideos} />
        <HomeLastestPosts loading={newsLoading} empty={newsEmpty} posts={news} />
      </Container>
    </MainLayout>
  );
}
