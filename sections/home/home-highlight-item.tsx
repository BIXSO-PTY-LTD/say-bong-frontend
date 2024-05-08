import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { fDate } from '#/utils/format-time';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { IVideoItem } from '#/types/video';

import { useEffect, useState } from 'react';
import captureThumbnail from '#/utils/capturethumbnail';
import Label from '#/components/label';
import Iconify from '#/components/iconify';
import { useRouter } from 'next/navigation';


// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  // order?: number;
  largePost?: boolean;
  loading?: boolean;
  small?: boolean
};


export default function HomeHighlightItem({ video, largePost, small }: Props) {
  const router = useRouter();
  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>('');

  useEffect(() => {
    if (video?.content) {
      captureThumbnail(video.content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [video]);

  return (
    <Box sx={{ width: "100%", minHeight: '210px', background: "transparent" }}>
      <Stack spacing={1} sx={{ overflow: largePost ? 'hidden' : 'visible' }}>
        <Box sx={{ position: "relative" }}>
          <Image
            src={videoThumbnail || "/assets/images/match/background-item.jpg"}
            alt={video?.title}
            ratio='1/1'
            sx={{
              filter: "brightness(0.7)",
              objectFit: "cover",
              height: largePost ? "280px" : small ? "157px" : "192px",
            }}
          />
          {largePost && (
            <Stack spacing={1} sx={{ position: 'absolute', bottom: 0, left: 0, zIndex: 9, background: 'rgba(0,0,0,0.8)', width: "100%", padding: { xs: 0, md: "20px" } }}>
              <Link component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
                <TextMaxLine line={1} variant="h3" sx={{fontWeight:"inherit"}}>{video?.title}</TextMaxLine>
              </Link>
              <Typography variant='body2' color={(theme) => theme.palette.grey[500]}>Ngày đăng: {fDate(video?.createdAt)}</Typography>
            </Stack>
          )}

          {!largePost && (
            <Label sx={{ position: 'absolute', bottom: 0, left: 0, zIndex: 9, borderRadius: "100%", ml: 1, mb: 1 }} variant='filled' color='default'>
              <Iconify icon="solar:play-bold" width="10px" height="10px" color="#01B243" />
            </Label>
          )}
        </Box>

        {!largePost && (
          <Stack spacing={0.5}>
            <Link component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
              <TextMaxLine line={2} variant="subtitle1">{video?.title}</TextMaxLine>
            </Link>
            <Typography variant='caption' color={(theme) => theme.palette.grey[500]}>Ngày đăng: {fDate(video?.createdAt)}</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}