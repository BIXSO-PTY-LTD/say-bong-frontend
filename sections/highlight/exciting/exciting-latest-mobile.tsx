import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { fDate } from '#/utils/format-time';
import { IBlogPostProps } from '#/types/blog';
import { paths } from '#/routes/paths';
import { IVideoItem } from '#/types/video';
import { _mock } from '#/_mock';
import { useEffect, useState } from 'react';
import captureThumbnailFromCloudinary from '#/utils/capturethumbnail';

// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  onSiderbar?: boolean;
};

export default function ExcitingLatestMobile({ video, onSiderbar }: Props) {

  const { id, title, content, createdAt } = video;


  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>('');

  useEffect(() => {
    if (content) {
      captureThumbnailFromCloudinary(content, (thumbnailUrl: string) => {
        setVideoThumbnail(thumbnailUrl);
      });
    }
  }, [content]);

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={title}
        src={videoThumbnail ? videoThumbnail : _mock.image.cover(Math.floor(Math.random() * 23) + 1)}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit" href={paths.exciting.details(id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{title}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
