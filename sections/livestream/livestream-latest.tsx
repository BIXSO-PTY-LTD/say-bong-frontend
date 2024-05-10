import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResponsive } from '#/hooks/use-responsive';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import Iconify from '#/components/iconify';
import { ITourProps } from '#/types/tour';
import LivestreamLatestItem from './livestream-latest-item';
import LivestreamLatestPostMobile from './livestream-latest-mobile';
import { ILivestreamItem } from '#/types/livestream';
import EmptyContent from '#/components/empty-content';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';
import { useEffect, useState } from 'react';



// ----------------------------------------------------------------------

type Props = {
  livestreams: ILivestreamItem[];
  loading?: boolean;
  empty?: boolean;
};

export default function LivestreamLastest({ livestreams, loading, empty }: Props) {

  const mdUp = useResponsive('up', 'md');

  const [filterLivestreams, setFilterLivestreams] = useState<ILivestreamItem[]>()

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  const renderList = (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 4 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
      }}
    >
      {mdUp ? (
        <>
          {filterLivestreams?.slice(0, 4).map((livestream) => (
            <LivestreamLatestItem key={livestream.id} livestream={livestream}
            // order={index % 2}
            />
          ))}

        </>
      ) : (
        <>
          {filterLivestreams?.slice(0, 4).map((livestream) => (
            <LivestreamLatestPostMobile key={livestream.id} livestream={livestream} />
          ))}
        </>
      )}
    </Box>
  )

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.livestream.root}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      Xem tất cả
    </Button>
  );

  useEffect(() => {
    if (livestreams && livestreams.length > 0) {
      // Sort the livestreams array from newest to oldest based on the createdAt property
      const sortedArray = [...livestreams].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Set the state to the sorted array
      setFilterLivestreams(sortedArray);
    }
  }, [livestreams]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          mb: { xs: 8, md: 10 },
          mt: { xs: 14, md: 18 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h3" sx={{ my: 3, textTransform: "uppercase" }}>
          Các trận đấu đang diễn ra
        </Typography>

        {mdUp && viewAllBtn}
      </Stack>

      {
        loading ? (
          <StackPostSkeleton count={4} />
        ) : empty ? (
          renderNotFound
        ) : (
          renderList
        )
      }

      {
        !mdUp && (
          <Stack alignItems="center" sx={{ mt: 8 }}>
            {viewAllBtn}
          </Stack>
        )
      }
    </>
  );
}
