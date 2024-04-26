import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { fDate } from '#/utils/format-time';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import { ILivestreamItem } from '#/types/livestream';
import Label from '#/components/label';
import { useEffect, useState } from 'react';
import { _mock } from '#/_mock';
import Iconify from '#/components/iconify';


// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  // order?: number;
  largelivestream?: boolean;
};

export default function LivestreamLatestItem({ livestream,
  //  order,
  largelivestream }: Props) {
  const { title, createdAt, id, content, meta } = livestream;
  return (
    <Card sx={{ background: theme => theme.palette.grey[800] }}>
      <Stack
        spacing={2}
        sx={{
          ...(largelivestream && {
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

        <Box sx={{ position: "relative" }}>
          <Image
            src={meta[0].content ? meta[0].content : _mock.image.cover(Math.floor(Math.random() * 23) + 1)}
            alt={title}
            ratio={(largelivestream && '3/4') ||
              // (order && '4/3') ||
              '1/1'}

          />
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


        <Stack
          spacing={largelivestream ? 2 : 1}
          sx={{
            ...(largelivestream && {
              p: 5,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              color: 'common.white',
            }),
          }}
        >
          <Typography sx={{ px: 1 }} variant='caption'>{fDate(createdAt)}</Typography>
          <Link sx={{ p: 1 }} component={RouterLink} href={paths.livestream.details(id)} color="inherit">
            <TextMaxLine line={2} variant={largelivestream ? 'h5' : 'body1'}>{title}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Card>
  );
}
