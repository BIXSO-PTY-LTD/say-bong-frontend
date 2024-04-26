import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { fDate } from '#/utils/format-time';
import { IBlogPostProps } from '#/types/blog';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { INewsItem } from '#/types/news';
import { _mock } from '#/_mock';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  post: INewsItem;
  onSiderbar?: boolean;
};

export default function HomeLatestPostMobile({ post, onSiderbar }: Props) {
  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = post.content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [post.content]);
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={post.title}
        src={firstImageUrl ? firstImageUrl : _mock.image.cover(Math.floor(Math.random() * 23) + 1)}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit" component={RouterLink} href={paths.news.details(post.id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{post.title}</TextMaxLine>
        </Link>
        <Typography variant='caption'>{fDate(post.createdAt)}</Typography>
      </Stack>
    </Stack>
  );
}
