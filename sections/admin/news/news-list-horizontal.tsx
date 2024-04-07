import Box from '@mui/material/Box';


import { usePathname } from 'next/navigation';
import { IBlogPostProps } from '#/types/blog';
import NewsItemHorizontal from './news-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  news: IBlogPostProps[];
  // loading?: boolean;
};

export default function NewsListHorizontal({ news,
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
        <NewsItemHorizontal key={news.id} news={news} />
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
