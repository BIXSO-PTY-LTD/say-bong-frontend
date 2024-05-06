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

import { IVideoItem } from '#/types/video';
import Label from '#/components/label';

import captureThumbnail from '#/utils/capturethumbnail';
import { Stack, Typography } from '@mui/material';
import { fDate } from '#/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
};

export default function ExcitingHighlightItem({ video }: Props) {
  const { id, title, content } = video;

  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>('');
  useEffect(() => {
    if (content) {
      captureThumbnail(content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [content]);

  return (
    <Box sx={{ background: "transparent" }}>
      <Box
        sx={{
          position: 'relative',
          maxHeight: '260px',

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

        <Image alt={title} src={videoThumbnail} ratio="1/1" width="270px" height="172px" />

      </Box>



      <Stack sx={{ mt: 2 }}>
        <Typography variant='caption'>{fDate(video?.createdAt)}</Typography>
        <Link sx={{ mt: 0.5 }} component={RouterLink} href={paths.exciting.details(id)} color="inherit" >
          <TextMaxLine line={2} variant="subtitle1" persistent>
            {title}
          </TextMaxLine>
        </Link>
      </Stack>
    </Box>
  );
}
