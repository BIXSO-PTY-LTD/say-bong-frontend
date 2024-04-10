'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import NewsPosts from './news-posts';
import { _marketingPosts } from '#/_mock/_blog';
import NewsSidebar from './news-sidebar';
import { useGetNews } from '#/api/news';



// ----------------------------------------------------------------------

export default function NewsView() {
  const { news } = useGetNews();
  return (
    <>

      <Container
        sx={{
          mt: 10,
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 8 }}>
          <Grid xs={12} md={8}>
            <NewsPosts news={news} />
          </Grid>

          <Grid xs={12} md={4}>
            <NewsSidebar
              recentPosts={{ list: news.slice(-4) }}

            />
          </Grid>
        </Grid>
      </Container>

    </>
  );
}
