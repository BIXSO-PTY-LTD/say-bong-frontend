"use client"

import { ITourProps } from "#/types/tour"
import { Container, Grid, Typography } from "@mui/material"
import LivestreamVideo from "../livestream-video"
import LivestreamLastest from "../livestream-latest"
import { _tours } from "#/_mock"
import LivestreamChatView from "../livestream-chat-view"

type Props = {
  currentTour?: ITourProps
}
export default function LivestreamDetailView({ currentTour }: Props) {
  const filteredTours = currentTour ? _tours.filter(tour => tour.id !== currentTour.id) : _tours;
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">LIVESTREAM</Typography>
      <Grid container spacing={{ xs: 1 }}>
        <Grid item xs={12} md={8}>
          <LivestreamVideo currentTour={currentTour} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LivestreamChatView />
        </Grid>
      </Grid>
      <LivestreamLastest tours={filteredTours} />

    </Container>
  )
}