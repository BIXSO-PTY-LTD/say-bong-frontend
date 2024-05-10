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

import Iconify from '#/components/iconify';
import { IMatchItem } from '#/types/match';
import resposneData from '#/public/responseData.json'


// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  // order?: number;
  largelivestream?: boolean;
};

export default function LivestreamLatestItem({ livestream,
  //  order,
  largelivestream }: Props) {
  const { title, createdAt, id, content, meta } = livestream;

  const [matches, setMatches] = useState<IMatchItem[]>([]);

  const [matchingLivestream, setMatchingLivestream] = useState<IMatchItem>();

  useEffect(() => {
    if (resposneData) {
      setMatches(resposneData.data.list)
      setMatchingLivestream(matches.find(item => item.matchId === title))
    }
  }, [matches, title])

  const newMetaIndex = meta && meta.length > 0
    ? meta.length - 1
    : 0;
  return (
    <Box sx={{ background: "transparent" }}>
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

        <Box sx={{ position: "relative" }}>
          <Image
            src={meta?.[newMetaIndex]?.content ? meta[newMetaIndex]?.content : "/assets/images/match/background-item.jpg"}
            maxHeight="170px"
            alt={title}
            ratio={(largelivestream && '3/4') ||
              // (order && '4/3') ||
              '1/1'}

          />
          <Label sx={{
            width: "30px",
            height: "30px",
            ml: 1,
            mb: 1,
            left: 0,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            borderRadius: "100%"
          }} variant='filled' color='default'>
            <Iconify icon="solar:play-bold" width={0.7} color="#01B243" />
          </Label>
        </Box>


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
          <Typography variant='caption'>{fDate(createdAt)}</Typography>
          <Link component={RouterLink} href={paths.livestream.details(id)} color="inherit">
            <TextMaxLine line={2} variant={largelivestream ? 'h5' : 'body1'}>{
              matchingLivestream ? (`${matchingLivestream?.localteam_title} vs ${matchingLivestream?.visitorteam_title}`) : (
                title
              )}</TextMaxLine>
          </Link>


        </Stack>
      </Stack>
    </Box>
  );
}
