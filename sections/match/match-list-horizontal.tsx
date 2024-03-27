import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';


import { IMatchItem } from '#/types/match';
import MatchItemHorizontal from './match-item-horizontal';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  matchs: IMatchItem[];
  // loading?: boolean;
};

export default function MatchListHorizontal({ matchs,
  //  loading
}: Props) {
  // const renderSkeleton = (
  //   <>
  //     {[...Array(16)].map((_, index) => (
  //       <MatchItemSkeleton key={index} variant="horizontal" />
  //     ))}
  //   </>
  // );

  const renderList = (
    <>
      {matchs.slice(0, 8).map((match) => (
        <MatchItemHorizontal key={match.id} match={match} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {/* {loading ? renderSkeleton : renderList} */}
        {renderList}
      </Box>

      <Button
        fullWidth
        sx={{
          my: 5,
          color: "#01B243",
          background: theme => theme.palette.grey[800]
        }}>
        Xem thêm lịch trực tiếp
      </Button>
    </>
  );
}
