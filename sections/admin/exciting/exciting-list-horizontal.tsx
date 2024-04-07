import Box from '@mui/material/Box';


import NewsItemHorizontal from './exciting-item-horizontal';
import { ITourProps } from '#/types/tour';
import ExcitingItemHorizontal from './exciting-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  news: ITourProps[];
  // loading?: boolean;
};

export default function ExcitingListHorizontal({ news,
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
        <ExcitingItemHorizontal key={news.id} news={news} />
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
