import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { fDate } from '#/utils/format-time';
import { IBlogPostProps } from '#/types/blog';

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPostProps;
  onSiderbar?: boolean;
};

export default function HomeHighlightMobile({ post, onSiderbar }: Props) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        disabledEffect
        alt={post.title}
        src={post.coverUrl}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit">
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{post.title}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
