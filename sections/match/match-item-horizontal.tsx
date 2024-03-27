import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { usePopover } from '#/components/custom-popover';
import { useRouter } from 'next/navigation';
import { useResponsive } from '#/hooks/use-responsive';
import Label from '#/components/label';
import { fDate, fDateTime } from '#/utils/format-time';
import { IMatchItem } from '#/types/match';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  match: IMatchItem;
};

export default function MatchItemHorizontal({ match }: Props) {
  const popover = usePopover();
  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const {
    id,
    competitions,
    status,
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
    <>
      <Stack component={Card} sx={{ background: `url(${image})`, p: 1 }} direction="column">
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            {competitions}
          </Typography>
          <Typography>
            {fDateTime(date_time)}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
