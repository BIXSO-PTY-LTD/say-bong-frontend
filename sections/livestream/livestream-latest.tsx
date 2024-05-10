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

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  const [filterLivestreams, setFilterLivestreams] = useState<ILivestreamItem[]>();

  useEffect(() => {
    const filtered = livestreams.filter(livestream => (
      livestream.title &&                      // Make sure there's a title
      livestream.title.length !== 15 &&        // Title has exactly 15 characters
      livestream.title.includes(" ")          // Title has no spaces
    ));
    setFilterLivestreams(filtered);
  }, [livestreams]);

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

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          my: { xs: 8, md: 10 },
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
