import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';



import { INewsItem } from '#/types/news';
import { Dispatch, SetStateAction } from 'react';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';
import EmptyContent from '#/components/empty-content';
import NewsItem from './news-item';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[]
  paginateNews: INewsItem[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  loading: boolean;
  empty: boolean;
};

export default function NewsPosts({ news, paginateNews, setCurrentPage, currentPage, loading, empty }: Props) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = (
    <Box
      sx={{
        columnGap: 2.5,
        display: 'grid',
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
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
        count={Math.ceil(paginateNews.length / 6)}
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
