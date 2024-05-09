"use client"

import { Typography, Stack, Avatar, Card, Button } from '@mui/material';
import Label from '#/components/label';
import { fDateTime, formatStringToDateTime } from '#/utils/format-time';
import { IMatchItem } from '#/types/match';
import { useEffect, useState } from 'react';
import { useResponsive } from '#/hooks/use-responsive';
import { useCreateLivestream, useGetLivestreams } from '#/api/livestream';
import { paths } from '#/routes/paths';
import { useRouter } from 'next/navigation';
import { ILivestreamItem } from '#/types/livestream';

// ----------------------------------------------------------------------

const BACKGROUND_GRADIENT = 'linear-gradient(90deg, #007AFF 0%, #004999 100%)';

type Props = {
  match: IMatchItem;
};

export default function MatchItemHorizontal({ match }: Props) {
  const mdUp = useResponsive("up", "md");
  const router = useRouter()
  const { livestreams } = useGetLivestreams()
  const {
    matchId,
    startTime,
    league_title,
    localteam_logo,
    localteam_title,
    visitorteam_logo,
    visitorteam_title,
    score,
    startTimez,
    m3u8
  } = match;
  // const createLivestream = useCreateLivestream()
  // const handleWatchClick = () => {
  //   const matchingLivestream = livestreams.find(item => item.title === matchId);

  //   if (matchingLivestream) {
  //     router.push(paths.livestream.details(matchingLivestream.id));
  //   } else {
  //     try {
  //       const newLivestream:ILivestreamItem = createLivestream({
  //         title: matchId,
  //         content: m3u8
  //       })
  //       router.push(paths.livestream.details(newLivestream.id));
  //     } catch (error) {
  //       // Handle error if createLivestream fails
  //       console.error("Failed to create livestream:", error);
  //       // Handle error appropriately, e.g., display an error message to the user
  //     }
  //   }
  // };
  return (
    <Stack component={Card} sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/assets/images/match/background-match.svg)`, p: 1, backgroundSize: 'cover' }} direction="column">
      <Stack sx={{ py: 0.5, px: '20px' }} direction="row" justifyContent="space-between">
        <Typography variant="body2">{league_title}</Typography>
        <Typography variant="body2">{startTime}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-around" spacing={0.5} alignItems="center">
        <TeamInfo image={localteam_logo} team={localteam_title} />
        <Stack direction="column" spacing={2}>
          {formatStringToDateTime(startTimez) < new Date() ? (
            <>
              {/* <Label sx={{ width: { md: "94px" }, height: { md: "32px" } }} color="success" variant="filled" >
                <Typography variant={mdUp ? "body2" : "caption"}>{`Hiệp 1 : 12'`}</Typography>
              </Label> */}
              <Label sx={{ background: BACKGROUND_GRADIENT, width: { md: "94px" }, height: { md: "47px" } }} variant="filled" >


                <Typography variant={mdUp ? "h3" : "body2"}>{score}</Typography>

              </Label>
              {/* {m3u8.endsWith('.m3u8') ? (
                <Button onClick={handleWatchClick} variant='contained'>Xem Ngay</Button>
              ) : (
                <></>
              )} */}
            </>
          ) : (
            <>

              <Typography sx={{ mb: 3 }} variant='h2'>VS</Typography>
            </>
          )}


        </Stack>


        <TeamInfo image={visitorteam_logo} team={visitorteam_title} />
      </Stack>

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
