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

export default function ExcitingHighlightItem({ tour }: Props) {
  const { id, slug, coverUrl } = tour;



  return (
    <Card sx={{ background: theme => theme.palette.grey[800] }}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Label sx={{
          width: "30px",
          height: "30px",
          ml: 1,
          mb: 1,
          left: 0,
          bottom: 0,
          zIndex: 9,
          position: 'absolute',
          borderRadius: "100%"
        }} variant='filled' color='default'>
          <Iconify icon="solar:play-bold" width={0.7} color="#01B243" />
        </Label>

        <Image alt={slug} src={coverUrl} ratio="1/1" />

      </Box>




      <Link component={RouterLink} href={paths.exciting.details(id)} color="inherit" >
        <TextMaxLine sx={{ m: 2 }} variant="h6" persistent>
          {slug}
        </TextMaxLine>
      </Link>
    </Card>
  );
}
