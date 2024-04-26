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
import HomeLatestPostItem from './home-latest-post-item';
import HomeLatestPostMobile from './home-latest-post-mobile';
import { INewsItem } from '#/types/news';
import EmptyContent from '#/components/empty-content/empty-content';
import { LargerPostSkeleton } from '../skeletons/larger-post-skeleton';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';



// ----------------------------------------------------------------------

type Props = {
  posts: INewsItem[];
  loading?: boolean;
  empty?: boolean;
};

export default function HomeLastestPosts({ posts, loading, empty }: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = <><Box
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
        {posts.slice(0, 4).map((post, index) => (
          <HomeLatestPostItem key={post.id} post={post}
          // order={index % 2}
          />
        ))}

      </>
    ) : (
      <>
        {posts.slice(0, 4).map((post) => (
          <HomeLatestPostMobile key={post.id} post={post} />
        ))}
      </>
    )}
  </Box>
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
          Tin tức
          <Typography component="span" variant='h3' color="#0EB349"> mới nhất</Typography>

        </Typography>

      </Stack>
      {loading ? (
        <StackPostSkeleton count={4} />
      ) : empty ? (
        renderNotFound
      ) : (
        renderList
      )}

    </Container>
  );
}
