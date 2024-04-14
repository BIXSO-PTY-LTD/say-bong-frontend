import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from '#/types/blog';

import MarketingPostItem from './news-post-item';
import NewsPostItem from './news-post-item';
import { _careerPosts } from '#/_mock/_blog';
import HomeLatestPostItem from '../home/home-latest-post-item';
import { INewsItem } from '#/types/news';
import { Dispatch, SetStateAction } from 'react';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[];
  paginate: any;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export default function NewsPosts({ news, paginate, setCurrentPage, currentPage }: Props) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
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
        count={paginate && paginate.total && paginate.per_page ? Math.ceil(paginate.total / paginate.per_page) : 1}
        page={currentPage}
        onChange={handlePageChange}
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
