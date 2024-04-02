import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';

import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';

import { fCurrency } from '#/utils/format-number';

import Image from '#/components/image';
import Iconify from '#/components/iconify';
import TextMaxLine from '#/components/text-max-line';

import { ITourProps } from '#/types/tour';
import Label from '#/components/label';

// ----------------------------------------------------------------------

type Props = {
  tour: ITourProps;
};

export default function LivestreamItem({ tour }: Props) {
  const { id, slug, location, price, priceSale, favorited, duration, ratingNumber, coverUrl } = tour;

  const [favorite, setFavorite] = useState(favorited);

  const handleChangeFavorite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(event.target.checked);
  }, []);

  return (
    <Card sx={{ background: theme => theme.palette.grey[800] }}>
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

      <Image alt={slug} src={coverUrl} ratio="1/1" />



      <Link component={RouterLink} href={paths.livestream.details(id)} color="inherit" >
        <TextMaxLine sx={{ m: 2 }} variant="h6" persistent>
          {slug}
        </TextMaxLine>
      </Link>
    </Card>
  );
}
