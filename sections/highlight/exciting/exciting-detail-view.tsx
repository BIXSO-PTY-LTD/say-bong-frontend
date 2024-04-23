"use client"

import { ITourProps } from "#/types/tour"
import { Box, Container, Grid, Typography } from "@mui/material"
import { _tours } from "#/_mock"
import HighlightVideo from "../highlight-video"
import { _careerPosts } from "#/_mock/_blog"
import ExcitingLatest from "./exciting-latest"
import ExcitingVideo from "./exciting-video"
import { useGetExcitingVideo, useGetExcitingVideos } from "#/api/exciting-video"

type Props = {
  id?: string
}
export default function ExcitingDetailView({ id }: Props) {
  const { video: currentVideo, videoLoading } = useGetExcitingVideo(id)
  const { excitingVideos, excitingVideosLoading } = useGetExcitingVideos()
  const filteredExcitings = currentVideo ? excitingVideos.filter(video => video.id !== currentVideo.id) : excitingVideos;
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">Những pha bóng thú vị</Typography>
      {videoLoading && <>Loading</>}
      <ExcitingVideo currentVideo={currentVideo} />
      <ExcitingLatest filteredExcitings={filteredExcitings} />
    </Container>
  )
}