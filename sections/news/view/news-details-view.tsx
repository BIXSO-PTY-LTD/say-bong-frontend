'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';




import NewsSidebar from '../news-sidebar';
import { _travelPosts } from '#/_mock/_blog';
import { useGetNew, useGetNews } from '#/api/news';
import NewsDetails from '../news-details';

// ----------------------------------------------------------------------

type Props = {
  id?: string
}

export default function NewsDetailsView({ id }: Props) {
  const { new: currentPost } = useGetNew(id);
  const { news } = useGetNews();
  return (
    <>

      <Container sx={{ mt: 5 }}>
        <Grid container columnSpacing={{ xs: 0, md: 8 }} >
          <Grid xs={12} md={8}>
            <NewsDetails currentPost={currentPost} />



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
