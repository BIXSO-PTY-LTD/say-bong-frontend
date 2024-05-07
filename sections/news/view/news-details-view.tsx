'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';




import NewsSidebar from '../news-sidebar';
import { useGetNew, useGetNews } from '#/api/news';
import NewsDetails from '../news-details';
import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  id?: string
}

export default function NewsDetailsView({ id }: Props) {
  const { new: currentPost, newLoading } = useGetNew(id);
  const { news, newsLoading, newsEmpty } = useGetNews(1, 100);
  const filteredNews = news.filter((item) => item.id !== id)
  return (
    <>
      <Container style={{ maxWidth: "1330px" }}>
        <Grid container columnSpacing={{ xs: 0, md: 8 }} >
          <Grid xs={12} md={8}>
            <NewsDetails currentPost={currentPost} loading={newLoading} />

          </Grid>

          <Grid xs={12} md={4}>
            <NewsSidebar
              recentPosts={filteredNews.slice(1.6)}
              loading={newsLoading} empty={newsEmpty}
            />
          </Grid>
        </Grid>
      </Container>


    </>
  );
}
