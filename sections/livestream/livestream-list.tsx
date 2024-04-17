import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import LivestreamItem from './livestream-item';
import { ILivestreamItem } from '#/types/livestream';
import { Typography } from '@mui/material';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';
import EmptyContent from '#/components/empty-content';



// ----------------------------------------------------------------------

type Props = {
  livestreams: ILivestreamItem[];
  loading?: boolean;
  empty?: boolean;
  paginate?: any;
  currentPage?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, page: number) => void
};

export default function LivestreamList({ livestreams,
  loading, paginate, currentPage, handlePageChange, empty
}: Props) {
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  const renderList = (
    <Box
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
      {livestreams.map((livestream) =>
      (
        <LivestreamItem key={livestream.id} livestream={livestream} />
      )
      )}
    </Box>

  )
  return (
    <>
      {loading ? (
        <StackPostSkeleton count={16} />
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
