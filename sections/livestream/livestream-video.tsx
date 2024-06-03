"use client"

import Player from '#/components/player';
import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ILivestreamItem } from '#/types/livestream';
import ReactHlsPlayer from 'react-hls-player';
import { IMatchItem } from '#/types/match';

// ----------------------------------------------------------------------

type Props = {
  currentLivestream?: ILivestreamItem;
  activeLink: string | undefined;
};

export default function LivestreamVideo({ currentLivestream, activeLink }: Props) {

  const playerRef = useRef(null);
  const isHLS = activeLink?.endsWith('.m3u8');
  return (
    <>
      {isHLS ? (
        <ReactHlsPlayer
          playerRef={playerRef}
          src={activeLink || currentLivestream?.content as string}
          autoPlay={true}
          controls={true}
          width="100%"
          height="100%"
          style={{
            aspectRatio: "16/9"
          }}
        />
      ) : (
        <Player controls autoPlay url={activeLink || currentLivestream?.content} />
      )}


    </>
  );
}
