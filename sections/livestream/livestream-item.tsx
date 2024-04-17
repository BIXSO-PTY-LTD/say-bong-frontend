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
  const { id, title, content } = livestream;

  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [content]);


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

      <Image alt={title} src={firstImageUrl ? firstImageUrl : _mock.image.cover(2)} ratio="1/1" />

      <Link component={RouterLink} href={paths.livestream.details(id)} color="inherit" >
        <TextMaxLine sx={{ m: 2 }} variant="h6" persistent>
          {title}
        </TextMaxLine>
      </Link>
    </Card>
  );
}
