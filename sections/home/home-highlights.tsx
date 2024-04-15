import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { IBlogPostProps } from '#/types/blog';
import { useResponsive } from '#/hooks/use-responsive';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import Iconify from '#/components/iconify';
import HomeHighlightItem from './home-highlight-item';
import HomeHighlightMobile from './home-highlight-mobile';
import { IVideoItem } from '#/types/video';
import { useEffect } from 'react';
import EmptyContent from '#/components/empty-content/empty-content';



// ----------------------------------------------------------------------

type Props = {
  highlightVideos: IVideoItem[];
  loading?: boolean;
  empty?: boolean;
};

export default function HomeHighlight({ highlightVideos, loading, empty }: Props) {
  const mdUp = useResponsive('up', 'md');

  const latestVideo = highlightVideos[0];

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.highlight.root}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      Xem tất cả
    </Button>
  );
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = <> <Box
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
    {mdUp ? (
      <>
        <Box sx={{ gridColumn: 'span 5' }}>
          <HomeHighlightItem video={latestVideo} largePost />
        </Box>
        <Masonry columns={{ xs: 1, md: 3 }} spacing={3} sx={{ justifyContent: "space-between", gridColumn: 'span 7', alignItems: "center" }}>
          {highlightVideos.slice(1, 7).map((video) => (
            <HomeHighlightItem key={video.id} video={video} />
          ))}
        </Masonry>
      </>
    ) : (
      <>
        {highlightVideos.slice(0, 5).map((video) => (
          <HomeHighlightMobile key={video.id} video={video} />
        ))}
      </>
    )}
  </Box>
    {!mdUp && (
      <Stack alignItems="center" sx={{ mt: 8 }}>
        {viewAllBtn}
      </Stack>
    )
    }
  </>

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

        {mdUp && viewAllBtn}
      </Stack>
      {empty && renderNotFound}
      {loading ? <Typography>Loading...</Typography> : renderList}



    </Container>
  );
}
