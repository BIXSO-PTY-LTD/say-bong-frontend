"use client"

import Player from "#/components/player";
import { ITourProps } from "#/types/tour";
import { IVideoItem } from "#/types/video";
import { Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  currentVideo?: IVideoItem
  loading: boolean
}

export default function HighlightVideo({ currentVideo, loading }: Props) {



  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" height="500px" />
      ) : (
        <Player height="1080px" width="1920px" controls url={currentVideo?.content} />

      )}

      <Typography sx={{ my: 3 }} variant="h4">{currentVideo?.title}</Typography>
    </>
  )
}