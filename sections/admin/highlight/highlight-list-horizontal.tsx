import Box from '@mui/material/Box';


import NewsItemHorizontal from './highlight-item-horizontal';
import { ITourProps } from '#/types/tour';
import ExcitingItemHorizontal from './highlight-item-horizontal';
import HighlightItemHorizontal from './highlight-item-horizontal';
import { IVideoItem } from '#/types/video';

// ----------------------------------------------------------------------

type Props = {
  highlights: IVideoItem[];
  // loading?: boolean;
};

export default function HighlightListHorizontal({ highlights,
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
      {highlights.map((highlight) => (
        <HighlightItemHorizontal key={highlight.id} highlight={highlight} />
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
