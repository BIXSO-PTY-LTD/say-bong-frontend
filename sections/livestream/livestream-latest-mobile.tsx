import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { fDate } from '#/utils/format-time';
import { IBlogPostProps } from '#/types/blog';
import { ITourProps } from '#/types/tour';
import { paths } from '#/routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from '#/routes/components';

// ----------------------------------------------------------------------

type Props = {
  tour: ITourProps;
  onSiderbar?: boolean;
};

export default function LivestreamLatestPostMobile({ tour, onSiderbar }: Props) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        disabledEffect
        alt={tour.slug}
        src={tour.coverUrl}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link component={RouterLink} color="inherit" href={paths.livestream.details(tour.id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{tour.slug}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
