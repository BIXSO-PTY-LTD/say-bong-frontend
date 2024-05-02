import { useState, useCallback, useEffect } from 'react';

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
import { ILivestreamItem } from '#/types/livestream';
import { _mock } from '#/_mock';

// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
};

export default function LivestreamItem({ livestream }: Props) {
  const { id, title, meta } = livestream;
  const newMetaIndex = meta && meta.length > 0
        ? meta.length - 1
        : 0;
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

      <Box sx={{ position: "relative" }}>
        <Image alt={title} src={meta?.[newMetaIndex]?.content ? meta[newMetaIndex]?.content : _mock.image.cover(Math.floor(Math.random() * 23) + 1)} ratio="1/1" />
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
      </Box>


      <Link component={RouterLink} href={paths.livestream.details(id)} color="inherit" >
        <TextMaxLine sx={{ m: 2 }} variant="h6" persistent>
          {title}
        </TextMaxLine>
      </Link>
    </Card>
  );
}
