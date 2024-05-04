import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { fDate } from '#/utils/format-time';
import { IBlogPostProps } from '#/types/blog';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { INewsItem } from '#/types/news';

import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  post: INewsItem;
  onSiderbar?: boolean;
};

export default function HomeLatestPostMobile({ post, onSiderbar }: Props) {
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
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={cleanTitle}
        src={firstImageUrl ? firstImageUrl : "/assets/images/match/background-item.jpg"}
        sx={{
          width: 80,
          height: onSiderbar ? 48 : 80,
          flexShrink: 0,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit" component={RouterLink} href={paths.news.details(id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{cleanTitle}</TextMaxLine>
        </Link>
        <Typography variant='caption'>{fDate(createdAt)}</Typography>
      </Stack>
    </Stack>
  );
}
