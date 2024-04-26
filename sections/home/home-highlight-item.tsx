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
import { _mock } from '#/_mock';
import { useEffect, useState } from 'react';
import captureThumbnailFromCloudinary from '#/utils/capturethumbnail';
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
      captureThumbnailFromCloudinary(video.content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [video]);
  return (
    <Card sx={{
      minHeight: '280px',
      background: theme => theme.palette.grey[800],
    }}>
      <Stack
        spacing={2}
        sx={{
          ...(largePost && {
            borderRadius: 2,
            overflow: 'hidden',
          }),
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Image
            src={videoThumbnail}
            alt={video?.title}
            ratio={(largePost && '3/4') ||
              // (order && '4/3') ||
              '1/1'}
            sx={{ filter: "brightness(0.7)" }}
          />
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
              <Iconify icon="solar:play-bold" width={0.7} color="#01B243" />
            </Label>
          )}

        </Box>
        <Stack
          spacing={largePost ? 2 : 1}
          sx={{
            ...(largePost && {
              p: 5,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              color: 'common.white',
            }),
          }}
        >
          {largePost ? (
            <Stack direction="column">
              <Label sx={{
                width: "30px",
                height: "30px",
                mb: 4.5,
                left: 0,
                bottom: 0,
                zIndex: 9,
                borderRadius: "100%"
              }} variant='filled' color='default'>
                <Iconify icon="solar:play-bold" width={0.7} color="#01B243" />
              </Label>
              <Link component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
                <TextMaxLine line={3} variant="subtitle2">{video?.title}</TextMaxLine>
              </Link>
            </Stack>
          ) : (
            <Link sx={{ p: 1 }} component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
              <TextMaxLine line={3} variant="subtitle2">{video?.title}</TextMaxLine>
            </Link>
          )}




        </Stack>
      </Stack>
    </Card>
  );
}
