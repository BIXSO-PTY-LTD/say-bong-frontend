'use client';

import NewsPosts from '../news-posts';
import NewsSidebar from '../news-sidebar';
import { useGetNews } from '#/api/news';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { INewsItem } from '#/types/news';



// ----------------------------------------------------------------------

export default function NewsView() {
  const [currentNormalPage, setCurrentNormalPage] = useState(1);
  const [currentSpecialPage, setCurrentSpecialPage] = useState(1);


  const { news, newsLoading, newsEmpty } = useGetNews(1, 100);
  const [normalNews, setNormalNews] = useState<INewsItem[]>([])
  const [specialNews, setSpecialNews] = useState<INewsItem[]>([])

  useEffect(() => {
    // Sort news by createdAt
    const sortedNews = [...news].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setSpecialNews(sortedNews.filter(item => item.title.startsWith("*")));
    setNormalNews(sortedNews.filter(item => item.title.startsWith("#")));
  }, [news]);
  // Paginate normalNews
  const normalStartIndex = (currentNormalPage - 1) * 6;
  const normalEndIndex = normalStartIndex + 6;
  const paginatedNormalNews = normalNews.slice(normalStartIndex, normalEndIndex);

  // Paginate specialNews
  const specialStartIndex = (currentSpecialPage - 1) * 6;
  const specialEndIndex = specialStartIndex + 6;
  const paginatedSpecialNews = specialNews.slice(specialStartIndex, specialEndIndex);
  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}
      sx={{
        mt: 10,
      }}
    >
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tin tức bóng đá</Typography>
      <Grid container columnSpacing={{ xs: 0, md: 8 }} >
        <Grid xs={12} md={8}>
          <NewsPosts paginateNews={specialNews} news={paginatedSpecialNews} currentPage={currentSpecialPage} setCurrentPage={setCurrentSpecialPage} loading={newsLoading} empty={newsEmpty} />
          <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tin tức nhận định</Typography>

          <NewsPosts paginateNews={normalNews} news={paginatedNormalNews} currentPage={currentNormalPage} setCurrentPage={setCurrentNormalPage} loading={newsLoading} empty={newsEmpty} />
        </Grid>

        <Grid xs={12} md={4}>
          <NewsSidebar
            recentPosts={news.slice(-6)}
            loading={newsLoading} empty={newsEmpty}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
