'use client';

import MainLayout from '#/layouts/main';
import { Box, Container, Typography } from '@mui/material';

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
  const { news, newsLoading, newsEmpty } = useGetNews(1, 100)
  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty } = useGetHighlightVideos(1, 100);
  const [matches, setMatches] = useState<IMatchItem[]>([]);
  const sortedHighlightVideos = [...highlightVideos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  useEffect(() => {
    if (resposneData) {
      setMatches(resposneData.data.list)
    }
  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = QueryString.stringify({
  //         'type': '1'
  //       });
  //       const response = await axiosSoccer.post(SOCCER_API as string, data);
  //       // Handle success
  //       setMatches(response.data.data.list);
  //     } catch (error) {
  //       // Handle error
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <MainLayout>
      <Container style={{ maxWidth: "1330px", padding: "0" }}>
        <Typography sx={{ textTransform: "uppercase", mt: "40px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <MatchList matches={matches} />

        <HomeHighlight loading={highlightVideosLoading} empty={highlightVideosEmpty} highlightVideos={sortedHighlightVideos} />
        <HomeLastestPosts loading={newsLoading} empty={newsEmpty} posts={sortedNews} />
      </Container>
    </MainLayout>
  );
}
