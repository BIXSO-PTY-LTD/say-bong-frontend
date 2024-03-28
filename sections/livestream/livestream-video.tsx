"use client"

import { ITourProps } from '#/types/tour';
import Player from '#/components/player';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  currentTour?: ITourProps;
};

export default function LivestreamVideo({ currentTour }: Props) {
  const [currentTourVideo, setCurrentTourVideo] = useState<string | undefined>()

  useEffect(() => {
    setCurrentTourVideo(currentTour?.video)
  }, [currentTour?.video])
  return (
    <>
      {currentTourVideo ? (
        <Player controls url={currentTourVideo} />

      ) :
        (
          <Typography>Loading...</Typography>
        )
      }
    </>
  );
}
