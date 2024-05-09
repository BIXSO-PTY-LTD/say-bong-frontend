import ReactPlayer from 'react-player';

import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledReactPlayer = styled(ReactPlayer)({
  width: '100% !important',
  height: '100% !important',
  '& video': {
    objectFit: 'cover',
    aspectRatio: '16/9',
    borderRadius: '12px'
  },
});
