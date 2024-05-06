import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { IBlogPostProps } from '#/types/blog';
import { fDate } from '#/utils/format-time';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card } from '@mui/material';
import { IVideoItem } from '#/types/video';

import { useEffect, useState } from 'react';
import captureThumbnail from '#/utils/capturethumbnail';
import Label from '#/components/label';
import Iconify from '#/components/iconify';


// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  // order?: number;
  largePost?: boolean;
  loading?: boolean;
};

export default function HomeHighlightItem({ video,
  //  order,
  largePost }: Props) {
  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>('');
  useEffect(() => {
    if (video?.content) {
      captureThumbnail(video.content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [video]);
  return (
    <Box sx={{
      width: '100%',
      minHeight: '210px',
      background: "transparent",
    }}>
      <Stack
        spacing={2}
        sx={{
          ...(largePost && {
            overflow: 'hidden',
          }),
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Image
            src={videoThumbnail ? videoThumbnail : "/assets/images/match/background-item.jpg"}
            alt={video?.title}
            ratio='1/1'
            sx={{
              filter: "brightness(0.7)",
              height: "120px",
              ...(largePost && {
                height: "280px"
              }),
            }}
          />
          {largePost && (
            <>
              <Stack
                spacing={2}
                sx={{
                  ml: 1,
                  mb: 1,
                  left: 0,
                  bottom: 0,
                  zIndex: 9,
                  position: 'absolute',
                }}
              >
                <Label sx={{
                  width: "30px",
                  height: "30px",

                  borderRadius: "100%"
                }} variant='filled' color='default'>
                  <Iconify icon="solar:play-bold" width="10px" height="10px" color="#01B243" />
                </Label>
                <Typography sx={{ px: 1 }} variant='caption'>{fDate(video?.createdAt)}</Typography>
                <Link sx={{ px: 1 }} component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
                  <TextMaxLine line={2} variant="subtitle2">{video?.title}</TextMaxLine>
                </Link>

              </Stack>

            </>
          )}

          {!largePost && (
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
              <Iconify icon="solar:play-bold" width="10px" height="10px" color="#01B243" />
            </Label>
          )}

        </Box>
        {!largePost && (
          <Stack
            spacing={largePost ? 2 : 1}
          >
            <Typography variant='caption'>{fDate(video?.createdAt)}</Typography>
            <Link component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
              <TextMaxLine line={2} variant="subtitle1">{video?.title}</TextMaxLine>
            </Link>
          </Stack>
        )}

      </Stack>
    </Box>
  );
}
