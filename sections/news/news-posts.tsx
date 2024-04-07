import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from '#/types/blog';

import MarketingPostItem from './news-post-item';
import NewsPostItem from './news-post-item';
import { _careerPosts } from '#/_mock/_blog';
import HomeLatestPostItem from '../home/home-latest-post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function NewsPosts({ posts }: Props) {
  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        {_careerPosts.slice(0, 8).map((post) => (
          <HomeLatestPostItem transparent key={post.id} post={post} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
