import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { fDate } from '#/utils/format-time';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import { ILivestreamItem } from '#/types/livestream';
import Label from '#/components/label';
import { useEffect, useState } from 'react';
import { _mock } from '#/_mock';


// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  // order?: number;
  largelivestream?: boolean;
};

export default function LivestreamLatestItem({ livestream,
  //  order,
  largelivestream }: Props) {

  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = livestream.content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [livestream.content]);
  return (
    <Card sx={{ background: theme => theme.palette.grey[800] }}>
      <Stack
        spacing={2}
        sx={{
          ...(largelivestream && {
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }),
        }}
      >
        <Box
          sx={{
            pt: 1.5,
            pl: 2,
            pr: 1.5,
            right: 0,
            top: 0,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Label variant='filled' color='error'>Trực tiếp</Label>

        </Box>
        <Image
          src={firstImageUrl ? firstImageUrl : _mock.image.cover(2)}
          alt={livestream.title}
          ratio={(largelivestream && '3/4') ||
            // (order && '4/3') ||
            '1/1'}

        />

        <Stack
          spacing={largelivestream ? 2 : 1}
          sx={{
            ...(largelivestream && {
              p: 5,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              color: 'common.white',
            }),
          }}
        >
          <Typography sx={{ px: 1 }} variant='caption'>{fDate(livestream.createdAt)}</Typography>
          <Link sx={{ p: 1 }} component={RouterLink} href={paths.livestream.details(livestream.id)} color="inherit">
            <TextMaxLine line={2} variant={largelivestream ? 'h5' : 'body1'}>{livestream.title}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Card>
  );
}
