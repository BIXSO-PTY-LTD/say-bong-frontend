'use client';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';




import { IBlogPostProps } from '#/types/blog';
import Markdown from '#/components/markdown';
import NewsSidebar from './news-sidebar';
import { _travelPosts } from '#/_mock/_blog';
import { Stack } from '@mui/material';
import { fDate } from '#/utils/format-time';
import { useGetNews } from '#/api/news';
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

type Props = {
  currentPost?: INewsItem
}

export default function NewsDetailsView({ currentPost }: Props) {
  console.log(currentPost);

  return (
    <>

      <Container>
        <Grid container spacing={{ md: 8 }} sx={{ mt: 5 }}>
          <Grid xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ mb: 5 }}>
                {currentPost?.title}
              </Typography>
              <Typography variant="caption" sx={{ mb: 5 }}>
                {fDate(currentPost?.createdAt)}
              </Typography>
            </Stack>


            <Markdown content={currentPost?.description ? currentPost?.description : "Error"} />




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
