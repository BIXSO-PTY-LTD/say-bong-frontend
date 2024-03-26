'use client';

import ScrollProgress from '#/components/scroll-progress';
import MainLayout from '#/layouts/main';
import { useScroll } from 'framer-motion';


// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();
  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <>Hi</>
    </MainLayout>
  );
}
