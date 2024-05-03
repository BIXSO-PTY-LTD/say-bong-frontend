import { ReactPlayerProps } from 'react-player';

import { StyledReactPlayer } from './styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// https://github.com/CookPete/react-player

export default function Player({ ...other }: ReactPlayerProps) {
  return (
    <Box height="524px">
      <StyledReactPlayer {...other} />
    </Box>
  )
}
