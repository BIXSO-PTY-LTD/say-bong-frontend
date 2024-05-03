import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResponsive } from '#/hooks/use-responsive';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import Iconify from '#/components/iconify';
import HomeHighlightItem from './home-highlight-item';
import HomeHighlightMobile from './home-highlight-mobile';
import { IVideoItem } from '#/types/video';
import { useEffect, useState } from 'react';
import EmptyContent from '#/components/empty-content/empty-content';
import { LargerPostSkeleton } from '../skeletons/larger-post-skeleton';
import captureThumbnailFromCloudinary from '#/utils/capturethumbnail';
import { Grid } from '@mui/material';



// ----------------------------------------------------------------------

type Props = {
  highlightVideos: IVideoItem[];
  loading?: boolean;
  empty?: boolean;
};

export default function HomeHighlight({ highlightVideos, loading, empty }: Props) {
  const mdUp = useResponsive('up', 'md');
  const latestVideo = highlightVideos[0];



  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = (
    <>
      {mdUp ? (
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(12, 1fr)',
            },
          }}
        >
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
            <HomeHighlightItem video={latestVideo} largePost />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
            <Grid container spacing={3}>
              {highlightVideos.slice(1, 4).map((video) => (
                <Grid key={video.id} item xs={12} md={4}>
                  <HomeHighlightItem video={video} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
            <Grid container spacing={3}>
              {highlightVideos.slice(5, 7).map((video) => (
                <Grid key={video.id} item xs={12} md={6}>
                  <HomeHighlightItem video={video} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
            <Grid container spacing={3}>
              {highlightVideos.slice(8, 11).map((video) => (
                <Grid key={video.id} item xs={12} md={4}>
                  <HomeHighlightItem video={video} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 3, md: 4 },
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(12, 1fr)',
              },
            }}
          >
            {highlightVideos.slice(0, 5).map((video) => (
              <HomeHighlightMobile key={video.id} video={video} />
            ))}
          </Box>
        </>
      )}
    </>
  );

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: 10,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          mb: { xs: 8, md: 10 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h3" sx={{ my: 3, textTransform: "uppercase" }}>
          Video
          <Typography component="span" variant='h3' color="#0EB349"> Highlight</Typography>

        </Typography>

      </Stack>
      {loading ? (
        <LargerPostSkeleton />
      ) : empty ? (
        renderNotFound
      ) : (
        renderList
      )}



    </Container>
  );
}
