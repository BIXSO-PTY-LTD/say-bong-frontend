import Box from '@mui/material/Box';


import NewsItemHorizontal from './highlight-item-horizontal';
import { ITourProps } from '#/types/tour';
import ExcitingItemHorizontal from './highlight-item-horizontal';
import HighlightItemHorizontal from './highlight-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  news: ITourProps[];
  // loading?: boolean;
};

export default function HighlightListHorizontal({ news,
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
      {news.slice(0, 8).map((news) => (
        <HighlightItemHorizontal key={news.id} news={news} />
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
