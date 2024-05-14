import Box from '@mui/material/Box';


import { usePathname } from 'next/navigation';
import { IBlogPostProps } from '#/types/blog';
import NewsItemHorizontal from './news-item-horizontal';
import { INewsItem } from '#/types/news';
import { MatchItemSkeleton } from '#/sections/skeletons/match-item-skeleton';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[];
  loading?: boolean;
  endpoints?: string;
};

export default function NewsListHorizontal({ news,
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
      {news.map((item) => (
        <NewsItemHorizontal endpoints={endpoints} key={item.id} item={item} />
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
