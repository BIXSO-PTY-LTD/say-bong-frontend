import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { paths } from '#/routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from '#/routes/components';
import { ILivestreamItem } from '#/types/livestream';
import { useEffect, useState } from 'react';
import { _mock } from '#/_mock';

// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  onSiderbar?: boolean;
};

export default function LivestreamLatestPostMobile({ livestream, onSiderbar }: Props) {
  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = livestream.content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [livestream.content]);
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={livestream.title}
        src={firstImageUrl ? firstImageUrl : _mock.image.cover(4)}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link component={RouterLink} color="inherit" href={paths.livestream.details(livestream.id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{livestream.title}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
