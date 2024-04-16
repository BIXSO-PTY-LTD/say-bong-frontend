'use client';

import Typography from '@mui/material/Typography';




import { _travelPosts } from '#/_mock/_blog';
import { Stack } from '@mui/material';
import { fDate } from '#/utils/format-time';
import { INewsItem } from '#/types/news';
import Markdown from '#/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  currentPost?: INewsItem
}

export default function NewsDetails({ currentPost }: Props) {
  return (
    <>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" sx={{ mb: 5 }}>
          {currentPost?.title}
        </Typography>
        <Typography variant="caption" sx={{ mb: 5 }}>
          {fDate(currentPost?.createdAt)}
        </Typography>
      </Stack>


      <Markdown content={currentPost?.content ? currentPost?.content : "loading..."} />
    </>
  );
}
