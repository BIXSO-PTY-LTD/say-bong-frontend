import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from '#/types/blog';

import MarketingPostItem from './news-post-item';
import NewsPostItem from './news-post-item';
import { _careerPosts } from '#/_mock/_blog';
import HomeLatestPostItem from '../home/home-latest-post-item';
import { INewsItem } from '#/types/news';
import { Dispatch, SetStateAction } from 'react';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';
import EmptyContent from '#/components/empty-content';
import NewsItem from './news-item';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[];
  paginate: any;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  loading: boolean;
  empty: boolean;
};

export default function NewsPosts({ news, paginate, setCurrentPage, currentPage, loading, empty }: Props) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = (
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
        <NewsItem transparent key={post.id} post={post} />
      ))}
    </Box>
  )
  return (
    <>
      {loading ? (
        <StackPostSkeleton count={12} columns={2} />
      ) : empty ? (
        renderNotFound
      ) : (
        renderList
      )}

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
