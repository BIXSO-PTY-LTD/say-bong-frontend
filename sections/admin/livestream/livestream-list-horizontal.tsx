import Box from '@mui/material/Box';


import { MatchItemSkeleton } from '#/sections/skeletons/match-item-skeleton';
import { ILivestreamItem } from '#/types/livestream';
import LivestreamItemHorizontal from './livestream-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  livestreams: ILivestreamItem[];
  loading?: boolean;
  endpoints?: string;
};

export default function LiveStreamListHorizontal({ livestreams,
  loading, endpoints
}: Props) {


  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <MatchItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {livestreams.map((livestream) => (
        <LivestreamItemHorizontal endpoints={endpoints} key={livestream.id} livestream={livestream} />
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
        {loading ? renderSkeleton : renderList}
      </Box>
    </>
  );
}
