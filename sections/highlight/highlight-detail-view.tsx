"use client"

import { ITourProps } from "#/types/tour"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import HighlightVideo from "./highlight-video"
import ExcitingLatest from "./exciting/exciting-latest"
import HighlightLatest from "./highlight-latest"
import { useGetHighlightVideo, useGetHighlightVideos } from "#/api/highlight-video"

type Props = {
  id: string
}
export default function HighlightDetailView({ id }: Props) {
  const { video: currentVideo, videoLoading } = useGetHighlightVideo(id)
  const { highlightVideos, highlightVideosLoading } = useGetHighlightVideos(1, 4)
  const filteredHighlights = currentVideo ? highlightVideos.filter(video => video.id !== currentVideo.id) : highlightVideos;

  return (
    <Box maxWidth="1330px" margin="0 auto">


      <Stack direction="column">

        <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">Highlight</Typography>

        <HighlightVideo loading={videoLoading} currentVideo={currentVideo} />
        <HighlightLatest highlightVideos={filteredHighlights === null ? filteredHighlights : highlightVideos} loading={highlightVideosLoading} />
      </Stack>
    </Box>
  )
}