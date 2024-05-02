import Box from '@mui/material/Box';


import { usePathname } from 'next/navigation';
import { IBlogPostProps } from '#/types/blog';
import { INewsItem } from '#/types/news';
import { MatchItemSkeleton } from '#/sections/skeletons/match-item-skeleton';
import SpecialNewsItemHorizontal from './special-news-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  news: INewsItem[];
  loading?: boolean;
  endpoints?: string;
};

export default function SpecialNewsListHorizontal({ news,
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
        <SpecialNewsItemHorizontal endpoints={endpoints} key={item.id} item={item} />
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
