import { ITourProps } from '#/types/tour';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import LivestreamItem from './livestream-item';



// ----------------------------------------------------------------------

type Props = {
  tours: ITourProps[];
  // loading?: boolean;
};

export default function LivestreamList({ tours,
  //  loading 
}: Props) {
  return (
    <>
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
        {tours.slice(0, 16).map((tour) =>
        (
          <LivestreamItem key={tour.id} tour={tour} />
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
