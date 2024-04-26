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
import HighlightLatestItem from './exciting-latest-item';
import HighlightLatestMobile from './exciting-latest-mobile';
import ExcitingLatestItem from './exciting-latest-item';
import ExcitingLatestMobile from './exciting-latest-mobile';
import { IVideoItem } from '#/types/video';



// ----------------------------------------------------------------------

type Props = {
  filteredExcitings: IVideoItem[];
};

export default function ExcitingLatest({ filteredExcitings }: Props) {
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
          Những pha bóng khác


        </Typography>

        {mdUp && viewAllBtn}
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {mdUp ? (
          <>
            {filteredExcitings.slice(0, 4).map((video, index) => (
              <ExcitingLatestItem key={video.id} video={video}
              // order={index % 2}
              />
            ))}

          </>
        ) : (
          <>
            {filteredExcitings.slice(0, 4).map((video) => (
              <ExcitingLatestMobile key={video.id} video={video} />
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
