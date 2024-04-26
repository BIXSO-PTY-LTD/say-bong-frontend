import { ITourProps } from '#/types/tour';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import HighlightItem from './highlight-item';
import { IVideoItem } from '#/types/video';
import { Typography } from '@mui/material';
import EmptyContent from '#/components/empty-content/empty-content';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';



// ----------------------------------------------------------------------

type Props = {
  videos: IVideoItem[];
  loading?: boolean;
  empty?: boolean;
  paginate: any;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void
  currentPage: number
};

export default function HighlightList({ videos,
  loading, empty, paginate, handlePageChange, currentPage
}: Props) {
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderList = <Box
    sx={{
      columnGap: 3,
      display: 'grid',
      rowGap: { xs: 4, md: 5 },
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      },
    }}
  >
    {videos.map((video) =>
    (
      <HighlightItem key={video.id} video={video} />
    )
    )}

  </Box>
  return (
    <>
      {loading ? (
        <StackPostSkeleton count={12} />
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
          mt: 5,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
