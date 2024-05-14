import { useResponsive } from '#/hooks/use-responsive';
import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack, { StackProps } from '@mui/material/Stack';


// ----------------------------------------------------------------------


export function LargerPostSkeleton() {

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(12, 1fr)',
          },
        }}
      >

        <Box sx={{ gridColumn: { xs: "span 7", md: "span 5" } }}>
          {/* Skeleton for large post */}
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Box>
        <Masonry
          columns={{ xs: 1, md: 3 }}
          spacing={3}
          sx={{
            justifyContent: 'space-between',
            gridColumn: 'span 7',
            alignItems: 'center',
          }}
        >
          {/* Skeletons for other highlight items */}
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={200} />
          ))}
        </Masonry>
      </Box>
    </>
  )
}
