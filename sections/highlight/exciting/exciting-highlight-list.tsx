import { ITourProps } from '#/types/tour';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import HighlightItem from '../highlight-item';
import ExcitingHighlightItem from './exciting-highlight-item';
import { Typography } from '@mui/material';
import { IVideoItem } from '#/types/video';
import EmptyContent from '#/components/empty-content/empty-content';



// ----------------------------------------------------------------------

type Props = {
  videos: IVideoItem[];
  loading?: boolean;
  empty?: boolean;
  paginate: any;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void
  currentPage: number
};

export default function ExcitingHighlightList({ videos,
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
      <ExcitingHighlightItem key={video.id} video={video} />
    )
    )}

  </Box>
  return (
    <>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Những pha bóng thú vị</Typography>

      {empty && renderNotFound}
      {loading ? <Typography>Loading...</Typography> : renderList}
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
