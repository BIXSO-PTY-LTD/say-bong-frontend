'use client';

import MainLayout from '#/layouts/main';
import { Container, Typography } from '@mui/material';

import HomeHighlight from '../home-highlights';
import HomeLastestPosts from '../home-latest-posts';
import MatchList from '../../match/match-list';
import { useGetNews } from '#/api/news';
import { useGetHighlightVideos } from '#/api/highlight-video';
import { useEffect, useMemo, useState } from 'react';
import { IMatchItem } from '#/types/match';
import resposneData from '#/public/responseData.json'
import { axiosSoccer } from '#/utils/axios';
import QueryString from 'qs';
import { useGetMatches } from '#/api/match';
import MatchListHorizontal from '#/sections/match/match-list-horizontal';
import { useGetLivestreams } from '#/api/livestream';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { news, newsLoading, newsEmpty } = useGetNews(1, 100)
  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty } = useGetHighlightVideos(1, 100);
  const { matches, matchesLoading, matchesEmpty } = useGetMatches();
  const { livestreams } = useGetLivestreams(1, 200);

  const [matchedMatches, setMatchedMatches] = useState<IMatchItem[]>([]);

  useEffect(() => {
    if (livestreams && matches) {
      const matchedLivestreamIds = livestreams
        .filter(livestream =>
          livestream.meta?.some(metaItem => metaItem.key === "hot" && metaItem.content === "Có")
        )
        .map(livestream => livestream.title);



      const matched = matches.filter(match =>
        matchedLivestreamIds.includes(match.matchId)
      );
      setMatchedMatches(matched);
    }
  }, [livestreams, matches]);

  const sortedHighlightVideos = useMemo(() => {
    return [...highlightVideos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [highlightVideos]);

  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [news]);


  return (
    <MainLayout>
      <Container style={{ maxWidth: "1330px", padding: "0" }}>
        <Typography sx={{ textTransform: "uppercase", my: "40px" }} variant="h3">Trực tiếp bóng đá</Typography>
        <MatchListHorizontal matchs={matchedMatches} />

        <MatchList matches={matches} matchesEmpty={matchesEmpty} matchesLoading={matchesLoading} />

        <HomeHighlight loading={highlightVideosLoading} empty={highlightVideosEmpty} highlightVideos={sortedHighlightVideos} />
        <HomeLastestPosts loading={newsLoading} empty={newsEmpty} posts={sortedNews} />
      </Container>
    </MainLayout>
  );
}
