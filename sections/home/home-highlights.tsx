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



// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function HomeHighlight({ posts }: Props) {
  const mdUp = useResponsive('up', 'md');

  const latestPost = posts[0];

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
        {mdUp ? (
          <>
            <Box sx={{ gridColumn: 'span 5' }}>
              <HomeHighlightItem post={latestPost} largePost />
            </Box>
            <Masonry columns={{ xs: 1, md: 3 }} spacing={3} sx={{ justifyContent: "space-between", gridColumn: 'span 7', alignItems: "center" }}>
              {posts.slice(1, 7).map((post) => (
                <HomeHighlightItem key={post.id} post={post} />
              ))}
            </Masonry>
          </>
        ) : (
          <>
            {posts.slice(0, 5).map((post) => (
              <HomeHighlightMobile key={post.id} post={post} />
            ))}
          </>
        )}
      </Box>

      {!mdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}
