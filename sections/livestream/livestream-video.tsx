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
    setcurrentLivestreamVideo(currentLivestream?.content)
  }, [currentLivestream?.content])
  return (
    <>

      <Player controls autoPlay url={currentLivestreamVideo} />

    </>
  );
}
