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
  currentMatch?: IMatchItem;
};

export default function LivestreamVideo({ currentLivestream, currentMatch }: Props) {

  const playerRef = useRef(null);
  const isHLS = currentLivestream?.content?.endsWith('.m3u8');
  return (
    <>
      {isHLS ? (
        <ReactHlsPlayer
          playerRef={playerRef}
          src={currentLivestream?.content as string}
          autoPlay={true}
          controls={true}
          width="100%"
          height="100%"
          style={{
            aspectRatio: "16/9"
          }}
        />
      ) : (
        <Player controls autoPlay url={currentLivestream?.content} />
      )}
      {currentMatch ? (
        <Typography variant="h3" sx={{ mt: 4 }}>{currentMatch?.localteam_title} vs {currentMatch?.visitorteam_title}</Typography >
      ) :
        (
          <Typography variant="h3" sx={{ mt: 4 }}>Loading...</Typography >
        )
      }

    </>
  );
}
