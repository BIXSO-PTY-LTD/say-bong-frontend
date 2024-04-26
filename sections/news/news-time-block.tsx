import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';

import { fDate } from '#/utils/format-time';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  createdAt: string;
  duration?: string;
}

export default function NewsTimeBlock({ createdAt, duration, sx, ...other }: Props) {
  return (
    <Stack
      flexWrap="wrap"
      direction="row"
      alignItems="center"
      sx={{ typography: 'caption', color: 'text.disabled', ...sx }}
      {...other}
    >
      {createdAt}

      {duration && (
        <>
          <Box
            component="span"
            sx={{
              mx: 1,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
            }}
          />

          {duration}
        </>
      )}
    </Stack>
  );
}
