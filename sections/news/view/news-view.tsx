'use client';

import NewsPosts from '../news-posts';
import { _marketingPosts } from '#/_mock/_blog';
import NewsSidebar from '../news-sidebar';
import { useGetNews } from '#/api/news';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { INewsItem } from '#/types/news';



// ----------------------------------------------------------------------

export default function NewsView() {
  const [currentNormalPage, setCurrentNormalPage] = useState(1);
  const [currentSpecialPage, setCurrentSpecialPage] = useState(1);


  const { news, newsLoading, newsEmpty } = useGetNews();
  const [normalNews, setNormalNews] = useState<INewsItem[]>([])
  const [specialNews, setSpecialNews] = useState<INewsItem[]>([])

  useEffect(() => {
    setSpecialNews(news.filter(item => item.title.startsWith("*")))
    setNormalNews(news.filter(item => item.title.startsWith("#")))
  }, [news])

  // Paginate normalNews
  const normalStartIndex = (currentNormalPage - 1) * 6;
  const normalEndIndex = normalStartIndex + 6;
  const paginatedNormalNews = normalNews.slice(normalStartIndex, normalEndIndex);

  // Paginate specialNews
  const specialStartIndex = (currentSpecialPage - 1) * 6;
  const specialEndIndex = specialStartIndex + 6;
  const paginatedSpecialNews = specialNews.slice(specialStartIndex, specialEndIndex);
  return (
    <Container
      sx={{
        mt: 10,
      }}
    >
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tin tức Đặc Biệt</Typography>
      <Grid container columnSpacing={{ xs: 0, md: 8 }} >
        <Grid xs={12} md={8}>
          <NewsPosts paginateNews={specialNews} news={paginatedSpecialNews} currentPage={currentSpecialPage} setCurrentPage={setCurrentSpecialPage} loading={newsLoading} empty={newsEmpty} />
          <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Tin tức</Typography>

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
