import Box from '@mui/material/Box';


import NewsItemHorizontal from './exciting-item-horizontal';
import { ITourProps } from '#/types/tour';
import ExcitingItemHorizontal from './exciting-item-horizontal';
import { IVideoItem } from '#/types/video';
import { MatchItemSkeleton } from '#/sections/match/match-item-skeleton';
import EmptyContent from '#/components/empty-content/empty-content';

// ----------------------------------------------------------------------

type Props = {
  excitingVideos: IVideoItem[];
  loading?: boolean;
  empty?: boolean;
  endpoints?: string;
};

export default function ExcitingListHorizontal({ excitingVideos,
  loading, empty, endpoints
}: Props) {
  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <MatchItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {excitingVideos.map((video) => (
        <ExcitingItemHorizontal endpoints={endpoints} key={video.id} video={video} />
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
        {empty && renderNotFound}
        {loading ? renderSkeleton : renderList}
      </Box>
    </>
  );
}
