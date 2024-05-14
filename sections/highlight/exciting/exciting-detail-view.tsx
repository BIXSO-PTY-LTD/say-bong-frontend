"use client"

import { ITourProps } from "#/types/tour"
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material"
import HighlightVideo from "../highlight-video"
import ExcitingLatest from "./exciting-latest"
import ExcitingVideo from "./exciting-video"
import { useGetExcitingVideo, useGetExcitingVideos } from "#/api/exciting-video"
import { StackPostSkeleton } from "#/sections/skeletons/stack-post-skeleton"

type Props = {
  id?: string
}
export default function ExcitingDetailView({ id }: Props) {
  const { video: currentVideo, videoLoading } = useGetExcitingVideo(id)
  const { excitingVideos, excitingVideosLoading } = useGetExcitingVideos(1, 4)
  const filteredExcitings = currentVideo ? excitingVideos.filter(video => video.id !== currentVideo.id) : excitingVideos;
  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">Những pha bóng thú vị</Typography>
      {videoLoading ? <Skeleton variant="rectangular" height="500px" sx={{ mb: 10 }} /> : (
        <ExcitingVideo currentVideo={currentVideo} />
      )}
      {excitingVideosLoading ? <StackPostSkeleton count={4} /> : (
        <ExcitingLatest filteredExcitings={filteredExcitings === null ? filteredExcitings : excitingVideos} />

      )}
    </Container>
  )
}