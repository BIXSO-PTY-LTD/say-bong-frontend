'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';




import NewsSidebar from '../news-sidebar';
import { useGetNew, useGetNews } from '#/api/news';
import NewsDetails from '../news-details';
import { Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  id?: string
}

export default function NewsDetailsView({ id }: Props) {
  const { new: currentPost, newLoading } = useGetNew(id);
  const { news, newsLoading, newsEmpty } = useGetNews(1, 4);
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Grid container columnSpacing={{ xs: 0, md: 8 }} >
          <Grid xs={12} md={8}>
            <NewsDetails currentPost={currentPost} loading={newLoading} />

          </Grid>

          <Grid xs={12} md={4}>
            <NewsSidebar
              recentPosts={news}
              loading={newsLoading} empty={newsEmpty}
            />
          </Grid>
        </Grid>
      </Container>


    </>
  );
}
