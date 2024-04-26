"use client"

import { Typography, Stack, Avatar, Card } from '@mui/material';
import Label from '#/components/label';
import { fDateTime } from '#/utils/format-time';
import { IMatchItem } from '#/types/match';
import { useEffect, useState } from 'react';
import { useResponsive } from '#/hooks/use-responsive';

// ----------------------------------------------------------------------

const BACKGROUND_GRADIENT = 'linear-gradient(90deg, #007AFF 0%, #004999 100%)';

type Props = {
  match: IMatchItem;
};

export default function MatchItemHorizontal({ match }: Props) {
  const mdUp = useResponsive("up", "md");
  const {
    competition,
    date_time,
    home_team,
    away_team,
    home_image,
    away_image,
    home_score,
    away_score,
    round,
    minute,
    image,
    status
  } = match;

  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    setFormattedDateTime(fDateTime(date_time));


  }, [date_time]); // 
  return (
    <Stack component={Card} sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/assets/images/match/background-match.svg)`, p: 1, backgroundSize: 'cover' }} direction="column">
      <Stack sx={{ py: 0.5, px: '20px' }} direction="row" justifyContent="space-between">
        <Typography variant="body2">{competition}</Typography>
        <Typography variant="body2">{formattedDateTime}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-around" spacing={0.5} alignItems="center">
        <TeamInfo image={home_image} team={home_team} />
        {status === "live" ? (
          <Stack direction="column" spacing={2}>
            <Label sx={{ width: { md: "94px" }, height: { md: "32px" } }} color="success" variant="filled" >
              <Typography variant={mdUp ? "body2" : "caption"}>{`Hiệp ${round} : ${minute}'`}</Typography>
            </Label>
            <Label sx={{ background: BACKGROUND_GRADIENT, width: { md: "94px" }, height: { md: "47px" } }} variant="filled" >
              <Typography variant={mdUp ? "h3" : "body2"}>{`${home_score} - ${away_score}`}</Typography>

            </Label>
          </Stack>
        ) :
          (
            <Typography sx={{ mb: 3 }} variant='h2'>VS</Typography>
          )}

        <TeamInfo image={away_image} team={away_team} />
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
