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
import HighlightLatestItem from './highlight-latest-item';
import HighlightLatestMobile from './highlight-latest-mobile';
import { IVideoItem } from '#/types/video';



// ----------------------------------------------------------------------

type Props = {
  loading?: boolean;
  highlightVideos: IVideoItem[];
};

export default function HighlightLatest({ highlightVideos }: Props) {
  const mdUp = useResponsive('up', 'md');

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

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          my: { xs: 8, md: 10 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h3" sx={{ my: 3, textTransform: "uppercase" }}>
          Highlight mới nhất


        </Typography>

        {mdUp && viewAllBtn}
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          mb: 2,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {mdUp ? (
          <>
            {highlightVideos.map((video, index) => (
              <HighlightLatestItem key={video.id} video={video}
              // order={index % 2}
              />
            ))}

          </>
        ) : (
          <>
            {highlightVideos.map((video) => (
              <HighlightLatestMobile key={video.id} video={video} />
            ))}
          </>
        )}
      </Box>

      {
        !mdUp && (
          <Stack alignItems="center" sx={{ mt: 8 }}>
            {viewAllBtn}
          </Stack>
        )
      }
    </>
  );
}
