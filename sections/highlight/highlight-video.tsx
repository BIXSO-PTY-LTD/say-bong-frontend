"use client"

import Player from "#/components/player";
import { ITourProps } from "#/types/tour";
import { IVideoItem } from "#/types/video";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  currentVideo?: IVideoItem
}

export default function HighlightVideo({ currentVideo }: Props) {



  return (
    <>
      <Player controls url={currentVideo?.content} />

      <Typography sx={{ my: 3 }} variant="h4">{currentVideo?.title}</Typography>
    </>
  )
}