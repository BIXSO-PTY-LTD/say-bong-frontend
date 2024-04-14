import Box from '@mui/material/Box';


import NewsItemHorizontal from './exciting-item-horizontal';
import { ITourProps } from '#/types/tour';
import ExcitingItemHorizontal from './exciting-item-horizontal';
import { IVideoItem } from '#/types/video';

// ----------------------------------------------------------------------

type Props = {
  excitingVideos: IVideoItem[];
  // loading?: boolean;
};

export default function ExcitingListHorizontal({ excitingVideos,
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
      {excitingVideos.map((video) => (
        <ExcitingItemHorizontal key={video.id} video={video} />
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
    </>
  );
}
