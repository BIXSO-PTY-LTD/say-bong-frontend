import { ITourProps } from '#/types/tour';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import HighlightItem from './highlight-item';
import ExcitingHighlightItem from './exciting-highlight-item';
import { Typography } from '@mui/material';



// ----------------------------------------------------------------------

type Props = {
  tours: ITourProps[];
  // loading?: boolean;
};

export default function ExcitingHighlightList({ tours,
  //  loading 
}: Props) {
  return (
    <>
      <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h3">Những pha bóng thú vị</Typography>
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
        {/* {(loading ? [...Array(12)] : tours).map((tour, index) =>
          tour ? (
            <TravelTourItem key={tour.id} tour={tour} />
          ) : (
            <TravelTourItemSkeleton key={index} />
          )
        )} */}
        {tours.slice(0, 8).map((tour) =>
        (
          <ExcitingHighlightItem key={tour.id} tour={tour} />
        )
        )}

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
