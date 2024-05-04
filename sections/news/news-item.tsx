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

import { useEffect, useState } from 'react';


// ----------------------------------------------------------------------

type Props = {
  post: INewsItem;
  // order?: number;
  transparent?: boolean;
};

export default function NewsItem({ post, transparent
  //  order,
}: Props) {

  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = post.content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [post.content]);

  const cleanTitle = post.title.startsWith("#") ? post.title.replace('#', '') : post.title.startsWith("*") ? post.title.replace('*', '') : post.title

  return (
    <Box sx={{ background: theme => transparent ? "transparent" : theme.palette.grey[800], boxShadow: "none" }}>
      <Stack
        spacing={2}
      >
        <Image
          src={firstImageUrl ? firstImageUrl : "/assets/images/match/background-item.jpg"}
          alt={post.title}
          sx={{
            height: "200px",
            objectFit: "cover"
          }}

        />

        <Stack
          spacing={1}
        >
          <Typography sx={{ px: 1 }} variant='caption'>{fDate(post.createdAt)}</Typography>
          <Link sx={{ p: 1 }} component={RouterLink} href={paths.news.details(post.id)} color="inherit">
            <TextMaxLine line={2} variant='h5'>{cleanTitle}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Box>
  );
}
