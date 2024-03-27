import { Typography, Stack, Avatar, Card } from '@mui/material';
import Label from '#/components/label';
import { fDateTime } from '#/utils/format-time';
import { IMatchItem } from '#/types/match';

// ----------------------------------------------------------------------

const BACKGROUND_GRADIENT = 'linear-gradient(90deg, #007AFF 0%, #004999 100%)';

type Props = {
  match: IMatchItem;
};

export default function MatchItemHorizontal({ match }: Props) {
  const {
    competitions,
    date_time,
    home_team,
    away_team,
    home_image,
    away_image,
    home_score,
    away_score,
    round,
    minute,
    image
  } = match;

  return (
    <Stack component={Card} sx={{ backgroundImage: `url(${image})`, p: 1, backgroundSize: 'cover' }} direction="column">
      <Stack sx={{ py: 0.5, px: '20px', mb: 1 }} direction="row" justifyContent="space-between">
        <Typography variant="body1">{competitions}</Typography>
        <Typography variant="body1">{fDateTime(date_time)}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-around" spacing={2} alignItems="center">
        <TeamInfo image={home_image} team={home_team} />
        <Stack direction="column" spacing={2}>
          <Label color="success" variant="filled">{`Hiệp ${round} : ${minute}'`}</Label>
          <Label sx={{ background: BACKGROUND_GRADIENT }} variant="filled">
            {`${home_score} - ${away_score}`}
          </Label>
        </Stack>
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
    <Stack spacing={1} textAlign="center">
      <Avatar
        src={image}
        alt={team}
        sx={{
          mx: 'auto',
          width: { xs: 60, md: 80 },
          height: { xs: 60, md: 80 },
          border: '2px solid white',
        }}
      />
      <Typography variant="body1">{team}</Typography>
    </Stack>
  );
}
