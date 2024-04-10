import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from '#/types/blog';

import MarketingPostItem from './news-post-item';
import NewsPostItem from './news-post-item';
import { _careerPosts } from '#/_mock/_blog';
import HomeLatestPostItem from '../home/home-latest-post-item';
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[];
};

export default function NewsPosts({ news }: Props) {
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
        {news.map((post) => (
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
