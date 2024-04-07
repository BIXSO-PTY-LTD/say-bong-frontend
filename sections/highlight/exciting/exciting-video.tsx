"use client"

import Player from "#/components/player";
import { ITourProps } from "#/types/tour";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  currentTour?: ITourProps
}

export default function ExcitingVideo({ currentTour }: Props) {
  const [currentTourVideo, setCurrentTourVideo] = useState<string | undefined>()

  useEffect(() => {
    setCurrentTourVideo(currentTour?.video)
  }, [currentTour?.video])

  return (
    <>
      {currentTourVideo ? (
        <Player controls url={currentTour?.video} />

      ) :
        (
          <Typography>Loading...</Typography>
        )
      }
      <Typography sx={{ my: 3 }} variant="h4">{currentTour?.slug}</Typography>
    </>
  )
}