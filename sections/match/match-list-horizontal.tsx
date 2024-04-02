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
  const pathname = usePathname();
  // const renderSkeleton = (
  //   <>
  //     {[...Array(16)].map((_, index) => (
  //       <MatchItemSkeleton key={index} variant="horizontal" />
  //     ))}
  //   </>
  // );

  const homeList = (
    <>
      {matchs.slice(0, 8).map((match) => (
        <MatchItemHorizontal key={match.id} match={match} />
      ))}
    </>
  );
  const resultList = (
    <>
      {matchs
        .filter(match => match.status === "live")
        .map((match) => (
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
        {pathname === '/result' ? resultList : homeList}
      </Box>


    </>
  );
}
