import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { fDate } from '#/utils/format-time';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card } from '@mui/material';
import { ITourProps } from '#/types/tour';
import Label from '#/components/label';


// ----------------------------------------------------------------------

type Props = {
  tour: ITourProps;
  // order?: number;
  largeTour?: boolean;
};

export default function LivestreamLatestItem({ tour,
  //  order,
  largeTour }: Props) {

  return (
    <Card sx={{ background: theme => theme.palette.grey[800] }}>
      <Stack
        spacing={2}
        sx={{
          ...(largeTour && {
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }),
        }}
      >
        <Box
          sx={{
            pt: 1.5,
            pl: 2,
            pr: 1.5,
            right: 0,
            top: 0,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Label variant='filled' color='error'>Trực tiếp</Label>

        </Box>
        <Image
          src={tour.coverUrl}
          alt={tour.slug}
          ratio={(largeTour && '3/4') ||
            // (order && '4/3') ||
            '1/1'}

        />

        <Stack
          spacing={largeTour ? 2 : 1}
          sx={{
            ...(largeTour && {
              p: 5,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              color: 'common.white',
            }),
          }}
        >
          <Typography sx={{ px: 1 }} variant='caption'>{fDate(tour.createdAt)}</Typography>
          <Link sx={{ p: 1 }} component={RouterLink} href={paths.livestream.details(tour.id)} color="inherit">
            <TextMaxLine line={2} variant={largeTour ? 'h5' : 'body1'}>{tour.slug}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Card>
  );
}
