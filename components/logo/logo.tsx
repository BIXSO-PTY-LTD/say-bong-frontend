import { memo } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { RouterLink } from '#/routes/components';
import Image from '../image';


// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ sx, single }: LogoProps) {
  const fullLogo = (
    <Image disabledEffect alt='logo' src='/assets/images/logo/logo.svg' />
  );
  const singleLogo = (
    <Image disabledEffect alt='logo' src='/assets/images/logo/single-logo.svg' />
  );

  return (
    <Link
      component={RouterLink}
      href="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: 150,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

export default memo(Logo);
