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
import { INewsItem } from '#/types/news';
import { _mock } from '#/_mock';
import { useEffect, useState } from 'react';


// ----------------------------------------------------------------------

type Props = {
  post: INewsItem;
  // order?: number;
  largePost?: boolean;
  transparent?: boolean;
};

export default function HomeLatestPostItem({ post, transparent,
  //  order,
  largePost }: Props) {

  const [firstImageUrl, setFirstImageUrl] = useState('');



  const {
    id,
    title,
    content,
    createdAt,
  } = post;

  const cleanTitle = title.startsWith("*") ? title.replace("*", "") : title.startsWith("#") ? title.replace("#", "") : title

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [content]);

  return (
    <Box sx={{ background: theme => transparent ? "transparent" : theme.palette.grey[800] }}>
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
          src={firstImageUrl ? firstImageUrl : _mock.image.cover(Math.floor(Math.random() * 23) + 1)}
          alt={cleanTitle}
          height="170px"
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
          <Typography sx={{ px: 1 }} variant='caption'>{fDate(createdAt)}</Typography>
          <Link sx={{ p: 1 }} component={RouterLink} href={paths.news.details(id)} color="inherit">
            <TextMaxLine line={2} variant={largePost ? 'h5' : 'body1'}>{cleanTitle}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Box>
  );
}
