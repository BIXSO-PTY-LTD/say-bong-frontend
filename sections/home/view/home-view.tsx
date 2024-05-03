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
import { useGetMatches } from '#/api/match';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';
import QueryString from 'qs';
import resposneData from '#/public/responseData.json'
// ----------------------------------------------------------------------

export default function HomeView() {
  const { news, newsLoading, newsEmpty } = useGetNews(1, 7)
  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty } = useGetHighlightVideos(1, 7);
  const [matches, setMatches] = useState<IMatchItem[]>([]);

  // useEffect(() => {
  //   if (resposneData) {
  //     setMatches(resposneData.data.list)
  //   }
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = QueryString.stringify({
          'type': '1'
        });
        const response = await axiosSoccer.post(SOCCER_API as string, data);
        // Handle success
        setMatches(response.data.data.list);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
