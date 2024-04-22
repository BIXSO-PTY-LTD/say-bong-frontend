"use client"

import { ITourProps } from "#/types/tour"
import { Box, Container, Grid, Typography } from "@mui/material"
import { _tours } from "#/_mock"
import HighlightVideo from "./highlight-video"
import { _careerPosts } from "#/_mock/_blog"
import ExcitingLatest from "./exciting/exciting-latest"
import HighlightLatest from "./highlight-latest"
import { useGetHighlightVideo, useGetHighlightVideos } from "#/api/highlight-video"

type Props = {
  id: string
}
export default function HighlightDetailView({ id }: Props) {
  const { video: currentVideo, videoLoading } = useGetHighlightVideo(id)
  const { highlightVideos, highlightVideosLoading } = useGetHighlightVideos()
  const filteredHighlights = currentVideo ? highlightVideos.filter(video => video.id !== currentVideo.id) : highlightVideos;

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">Highlight</Typography>
      {videoLoading ? <>Loading...</> :
        <HighlightVideo currentVideo={currentVideo} />
      }
      <HighlightLatest highlightVideos={filteredHighlights} loading={highlightVideosLoading} />
    </Container>
  )
}