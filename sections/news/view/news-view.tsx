'use client';

import NewsPosts from '../news-posts';
import { _marketingPosts } from '#/_mock/_blog';
import NewsSidebar from '../news-sidebar';
import { useGetNews } from '#/api/news';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';



// ----------------------------------------------------------------------

export default function NewsView() {
  const [currentPage, setCurrentPage] = useState(1);

  const { news, paginate } = useGetNews(currentPage, 6);
  return (
    <Container
      sx={{
        mt: 10,
      }}
    >
      <Grid container columnSpacing={{ xs: 0, md: 8 }} >
        <Grid xs={12} md={8}>
          <NewsPosts news={news} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Grid>

        <Grid xs={12} md={4}>
          <NewsSidebar
            recentPosts={{ list: news.slice(-4) }}

          />
        </Grid>
      </Grid>
    </Container>
  );
}
