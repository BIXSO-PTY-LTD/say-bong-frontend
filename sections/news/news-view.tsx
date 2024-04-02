'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import NewsPosts from './news-posts';
import { _marketingPosts } from '#/_mock/_blog';
import NewsSidebar from './news-sidebar';



// ----------------------------------------------------------------------

export default function NewsView() {
  return (
    <>

      <Container
        sx={{
          mt: 10,
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 8 }}>
          <Grid xs={12} md={8}>
            <NewsPosts posts={_marketingPosts} />
          </Grid>

          <Grid xs={12} md={4}>
            <NewsSidebar
              recentPosts={{ list: _marketingPosts.slice(-4) }}

            />
          </Grid>
        </Grid>
      </Container>

    </>
  );
}
