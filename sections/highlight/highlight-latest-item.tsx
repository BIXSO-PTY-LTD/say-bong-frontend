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


// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  // order?: number;
  largePost?: boolean;
};

export default function HighlightLatestItem({ video,
  //  order,
  largePost }: Props) {
  const { id, title, createdAt, content } = video;

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
      <Stack
        spacing={2}
        sx={{
          ...(largePost && {
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }),
        }}
      >
        <Image
          src={videoThumbnail ? videoThumbnail : "/assets/images/match/background-item.jpg"}
          maxHeight="170px"
          alt={title}
          ratio={(largePost && '3/4') ||
            // (order && '4/3') ||
            '1/1'}

        />

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
          <Typography variant='caption'>{fDate(createdAt)}</Typography>
          <Link component={RouterLink} href={paths.highlight.details(id)} color="inherit">
            <TextMaxLine line={2} variant="subtitle1">{title}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Box>
  );
}
