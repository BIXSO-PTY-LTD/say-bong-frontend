"use client"

import Player from '#/components/player';
import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ILivestreamItem } from '#/types/livestream';
import ReactHlsPlayer from 'react-hls-player';

// ----------------------------------------------------------------------

type Props = {
  currentLivestream?: ILivestreamItem;
};

export default function LivestreamVideo({ currentLivestream }: Props) {
  const playerRef = useRef(null);
  return (
    <>
      <ReactHlsPlayer
        playerRef={playerRef}
        src={currentLivestream?.content as string}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
      {/* <Player controls autoPlay url={currentLivestream?.content} /> */}
      <Typography variant="body1" sx={{ py: 3 }}>{currentLivestream?.title}</Typography>
    </>
  );
}
