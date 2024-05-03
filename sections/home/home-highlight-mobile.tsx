import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { IVideoItem } from '#/types/video';
import { _mock } from '#/_mock';
import { useEffect, useState } from 'react';
import captureThumbnailFromCloudinary from '#/utils/capturethumbnail';

// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  onSiderbar?: boolean;
};

export default function HomeHighlightMobile({ video, onSiderbar }: Props) {
  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>('');
  useEffect(() => {
    if (video?.content) {
      captureThumbnailFromCloudinary(video.content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [video]);
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={video.title}
        src={videoThumbnail ? videoThumbnail : _mock.image.cover(Math.floor(Math.random() * 23) + 1)}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit" component={RouterLink} href={paths.highlight.details(video.id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{video.title}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
