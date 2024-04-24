import Box from '@mui/material/Box';


import Header from './header';
import Footer from './footer';
import { HEADER } from '../config-layout';
import { usePathname } from 'next/navigation';
import Image from '#/components/image';
import { Stack } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
// ----------------------------------------------------------------------


const spacingLayout = ['/', '/livestream', '/hightlight', '/bxh', '/results', '/schedule', '/news'];

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();
  const mdUp = useResponsive("up", "md")
  const actionPage = (arr: string[]) =>
    arr.map((path) => pathname === path || pathname === `${path}/`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundImage: `url("/assets/background.svg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {actionPage(spacingLayout) && <Spacing />}
        {mdUp && (
          <Stack direction="row">
            <Image alt="banner-left" src="/assets/banner-left.svg" sx={{
              objectFit: "cover",
              objectPosition: "center",
            }} />
            {children}
            <Image alt="banner-right" src="/assets/banner-right.svg" sx={{
              objectFit: "cover",
              objectPosition: "center",
            }} />
          </Stack>
        )}
        {children}


      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
