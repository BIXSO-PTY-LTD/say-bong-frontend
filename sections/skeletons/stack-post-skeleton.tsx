import { useResponsive } from '#/hooks/use-responsive';
import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack, { StackProps } from '@mui/material/Stack';


// ----------------------------------------------------------------------
type Props = {
  count: number
  columns?: number
}

export function StackPostSkeleton({ count, columns }: Props) {
  return (
    <Box
      sx={{
        columnGap: 3,
        display: 'grid',
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: `repeat(${columns ? columns / 2 : "2"}, 1fr)`,
          md: `repeat(${columns ? columns : "4"}, 1fr)`,
        },
      }}
    >
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={200}
        />
      ))}
    </Box>
  );
}
