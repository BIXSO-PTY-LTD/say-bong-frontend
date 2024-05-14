import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from '#/hooks/use-responsive';

import { _socials } from '#/_mock';

import Iconify from '#/components/iconify';

import { IAuthorProps } from '#/types/author';
import { IBlogPostProps, IBlogCategoryProps } from '#/types/blog';
import HomeLatestPostMobile from '../home/home-latest-post-mobile';
import { INewsItem } from '#/types/news';
import EmptyContent from '#/components/empty-content';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';


// ----------------------------------------------------------------------

interface Props {
  recentPosts: INewsItem[];
  loading?: boolean;
  empty?: boolean;
}

export default function NewsSidebar({
  recentPosts,
  loading,
  empty

}: Props) {

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;
  const renderRecentPosts = (
    <Stack spacing={3}>
      <Typography variant="h5">Tin nóng</Typography>

      {recentPosts.map((post) => (
        <HomeLatestPostMobile key={post.id} post={post} onSiderbar />
      ))}
    </Stack>
  );


  return (
    <>
      {loading ? (
        <StackPostSkeleton count={2} columns={1} />
      ) : empty ? (
        renderNotFound
      ) : (
        renderRecentPosts
      )}
    </>
  );
}
