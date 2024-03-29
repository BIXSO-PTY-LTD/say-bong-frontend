"use client"

import { ITourProps } from "#/types/tour"
import { Box, Container, Grid, Typography } from "@mui/material"
import { _tours } from "#/_mock"
import HighlightVideo from "./highlight-video"
import { _careerPosts } from "#/_mock/_blog"
import ExcitingLatest from "./exciting-latest"

type Props = {
  currentTour?: ITourProps
}
export default function ExcitingDetailView({ currentTour }: Props) {
  const filteredTours = currentTour ? _tours.filter(tour => tour.id !== currentTour.id) : _tours
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">Highlight</Typography>
      <HighlightVideo currentTour={currentTour} />
      <ExcitingLatest posts={_careerPosts.slice(0, 7)} />
    </Container>
  )
}