"use client"

import Player from '#/components/player';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ILivestreamItem } from '#/types/livestream';

// ----------------------------------------------------------------------

type Props = {
  currentLivestream?: ILivestreamItem;
};

export default function LivestreamVideo({ currentLivestream }: Props) {
  const [currentLivestreamVideo, setcurrentLivestreamVideo] = useState<string | undefined>()

  useEffect(() => {
    setcurrentLivestreamVideo(currentLivestream?.video)
  }, [currentLivestream?.video])
  return (
    <>
      {currentLivestreamVideo ? (
        <Player controls url={currentLivestreamVideo} />

      ) :
        (
          <Typography>Loading...</Typography>
        )
      }
    </>
  );
}
