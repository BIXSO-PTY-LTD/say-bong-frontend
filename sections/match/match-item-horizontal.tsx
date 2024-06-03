"use client"

import { Typography, Stack, Avatar, Card, Button, Box } from '@mui/material';
import Label from '#/components/label';
import { convertTimestampToDate, fDateTime, formatStringToDateTime } from '#/utils/format-time';
import { IMatchInfo, IMatchItem } from '#/types/match';
import { useEffect, useState } from 'react';
import { useResponsive } from '#/hooks/use-responsive';
import { useCreateLivestream, useGetLivestreams } from '#/api/livestream';
import { paths } from '#/routes/paths';
import { useRouter } from 'next/navigation';
import { ILivestreamItem } from '#/types/livestream';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import { useGetInfoMatches } from '#/api/match';
import { getMatchStatus } from '#/utils/matchFilter';

// ----------------------------------------------------------------------

const BACKGROUND_GRADIENT = 'linear-gradient(90deg, #007AFF 0%, #004999 100%)';

type Props = {
  match: IMatchItem;
};




export default function MatchItemHorizontal({ match }: Props) {
  const mdUp = useResponsive("up", "md");
  const router = useRouter()
  const { livestreams, endpoints } = useGetLivestreams(1, 100)
  const { matchesInfo } = useGetInfoMatches();
  const [currentMatch, setCurrentMatch] = useState<IMatchInfo>();
  const { enqueueSnackbar } = useSnackbar();


  const {
    matchId,
    startTime,
    league_title,
    localteam_logo,
    localteam_title,
    visitorteam_logo,
    visitorteam_title,
    m3u8
  } = match;
  const createLivestream = useCreateLivestream()
  const handleWatchClick = async () => {
    try {
      if (m3u8 === '' || !m3u8.endsWith('.m3u8')) {
        enqueueSnackbar('Trận này không có livestream', { variant: 'error' });
        return;
      }

      const matchingLivestream = livestreams.find(item => item.title === matchId);

      if (matchingLivestream) {
        router.push(paths.livestream.details(matchingLivestream.id));
      } else {

        const newLivestream = await createLivestream({ title: matchId, content: m3u8 });

        await mutate(endpoints)
        router.push(paths.livestream.details(newLivestream.id));
      }
    } catch (error) {
      console.error("Failed to handle watch click:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };
  useEffect(() => {
    if (matchesInfo && match) {
      setCurrentMatch(matchesInfo.find(item => item.matchId === match.matchId));

    }
  }, [match, match.matchId, matchesInfo])

  const matchStatus = getMatchStatus(currentMatch?.match_time as number, currentMatch?.halfStartTime as number);

  return (
    <Stack component={Card} sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/assets/images/match/background-match.svg)`, p: 1, backgroundSize: 'cover' }} direction="column">
      <Stack sx={{ py: 0.5, px: '20px' }} direction="row" justifyContent="space-between">
        <Typography variant="body2">{league_title}</Typography>
        <Typography variant="body2">{startTime}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-around" spacing={0.5} alignItems="center">
        <TeamInfo image={localteam_logo} team={localteam_title} />
        <Stack direction="column" spacing={2} alignItems="center"
          justifyContent="center">
          {convertTimestampToDate(currentMatch?.match_time as number) < new Date() ? (
            <>
              <Label sx={{ width: { md: "110px" }, height: { md: "32px" } }} color="success" variant="filled" >
                <Typography variant={mdUp ? "body2" : "caption"}>{`${matchStatus.round} ${matchStatus.time}`}</Typography>
              </Label>
              <Label sx={{ background: BACKGROUND_GRADIENT, width: { md: "94px" }, height: { md: "47px" } }} variant="filled" >


                <Typography variant={mdUp ? "h3" : "body2"}>{currentMatch?.score.replace(',', ' - ')}</Typography>

              </Label>

            </>
          ) : (
            <>

              <Typography sx={{ mb: 3 }} variant='h2'>VS</Typography>
            </>
          )}


        </Stack>


        <TeamInfo image={visitorteam_logo} team={visitorteam_title} />
      </Stack>
      <Box textAlign="end" >
        <LoadingButton onClick={handleWatchClick} variant='text' color='primary'>Xem Ngay {`> >`}</LoadingButton>

      </Box>
    </Stack>
  );
}

interface TeamInfoProps {
  image: string;
  team: string;
}

function TeamInfo({ image, team }: TeamInfoProps) {
  return (
    <Stack spacing={1} textAlign="center" sx={{ py: 1 }}>
      <Avatar
        src={image}
        alt={team}
        sx={{
          mx: 'auto',
          width: { xs: 60, md: 80 },
          height: { xs: 60, md: 80 },
        }}
      />
      <Typography variant="body1">
        {team.length > 9 ? `${team.substring(0, 9)}...` : team}
      </Typography>
    </Stack>
  );
}
