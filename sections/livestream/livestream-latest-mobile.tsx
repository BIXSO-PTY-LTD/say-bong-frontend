import Stack from '@mui/material/Stack';




import Image from '#/components/image';
import TextMaxLine from '#/components/text-max-line';
import { paths } from '#/routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from '#/routes/components';
import { ILivestreamItem } from '#/types/livestream';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import resposneData from '#/public/responseData.json'


// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  onSiderbar?: boolean;
};

export default function LivestreamLatestPostMobile({ livestream, onSiderbar }: Props) {
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
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={livestream.title}
        src={meta?.[newMetaIndex]?.content ? meta[newMetaIndex]?.content : "/assets/images/match/background-item.jpg"}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link component={RouterLink} color="inherit" href={paths.livestream.details(livestream.id)}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{
            matchingLivestream ? (`${matchingLivestream?.localteam_title} vs ${matchingLivestream?.visitorteam_title}`) : (
              title
            )}</TextMaxLine>
        </Link>

      </Stack>
    </Stack>
  );
}
