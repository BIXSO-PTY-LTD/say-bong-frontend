import { m } from 'framer-motion';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';

import { fDate } from '#/utils/format-time';

import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';

import { IBlogPostProps } from '#/types/blog';
import { varHover, varTranHover } from '#/components/animate/variants';
import NewsTimeBlock from './news-time-block';
import { INewsItem } from '#/types/news';



// ----------------------------------------------------------------------

type Props = {
  post: INewsItem;
};

export default function NewsPostItem({ post }: Props) {
  const theme = useTheme();

  return (
    <Stack
      component={m.div}
      whileHover="hover"
      variants={varHover(1)}
      transition={varTranHover()}
      sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}
    >
      <m.div variants={varHover(1.25)} transition={varTranHover()}>
        <Image
          src={"/assets/images/match/background-item.jpg"}
          alt={post.title}
          ratio="3/4"
          overlay={`linear-gradient(to top, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black
            } 75%)`}
        />
      </m.div>

      <Stack
        justifyContent="space-between"
        sx={{
          p: 5,
          height: 1,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Stack spacing={2}>
          <NewsTimeBlock
            duration={fDate(post.createdAt)}
            createdAt={fDate(post.createdAt)}
            sx={{ color: 'inherit', opacity: 0.72 }}
          />

          <Link component={RouterLink} href={paths.news.root} sx={{ color: 'common.white' }}>
            <TextMaxLine variant="h4">{post.title}</TextMaxLine>
          </Link>
        </Stack>


      </Stack>
    </Stack>
  );
}
