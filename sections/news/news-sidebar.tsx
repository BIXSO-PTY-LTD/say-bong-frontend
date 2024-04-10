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


// ----------------------------------------------------------------------

interface Props extends StackProps {
  recentPosts?: {
    list: INewsItem[];
  };
}

export default function NewsSidebar({
  recentPosts,
  sx,
  ...other
}: Props) {
  const mdUp = useResponsive('up', 'md');


  const renderRecentPosts = recentPosts && (
    <Stack spacing={3}>
      <Typography variant="h5">Tin nóng</Typography>

      {recentPosts.list.map((post) => (
        <HomeLatestPostMobile key={post.id} post={post} onSiderbar />
      ))}
    </Stack>
  );


  return (
    <>


      {renderRecentPosts}


    </>
  );
}
