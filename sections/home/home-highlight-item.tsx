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
import { Card } from '@mui/material';
import { IVideoItem } from '#/types/video';
import { _mock } from '#/_mock';


// ----------------------------------------------------------------------

type Props = {
  video: IVideoItem;
  // order?: number;
  largePost?: boolean;
  loading?: boolean;
};

export default function HomeHighlightItem({ video,
  //  order,
  largePost }: Props) {

  return (
    <Card sx={{
      background: theme => theme.palette.grey[800],
    }}>
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
          src={_mock.image.cover(0)}
          alt={video?.title}
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

          <Link sx={{ p: 1 }} component={RouterLink} href={paths.highlight.details(video?.id)} color="inherit">
            <TextMaxLine line={2} variant={largePost ? 'h5' : 'body1'}>{video?.title}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Card>
  );
}
