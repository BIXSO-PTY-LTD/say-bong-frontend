import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';


import { IMatchItem } from '#/types/match';
import MatchItemHorizontal from './match-item-horizontal';
import { Button } from '@mui/material';
import { paths } from '#/routes/paths';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
  matchs: IMatchItem[];
  // loading?: boolean;
};

export default function MatchListHorizontal({ matchs,
  //  loading
}: Props) {


  const renderList = (
    <>
      {matchs.map((match, index) => (
        <MatchItemHorizontal key={index} match={match} />
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
        {renderList}
      </Box>


    </>
  );
}
