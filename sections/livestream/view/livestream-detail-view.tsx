"use client"

import { ITourProps } from "#/types/tour"
import { Container, Grid, Typography } from "@mui/material"
import LivestreamVideo from "../livestream-video"
import LivestreamLastest from "../livestream-latest"
import LivestreamChatView from "../livestream-chat-view"
import { ILivestreamItem } from "#/types/livestream"

type Props = {
  currentLivestream?: ILivestreamItem
  livestreams: ILivestreamItem[]
}
export default function LivestreamDetailView({ currentLivestream, livestreams }: Props) {
  const filteredLivestreams = currentLivestream ? livestreams.filter(livestream => livestream.id !== currentLivestream.id) : livestreams;

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">LIVESTREAM</Typography>
      <Grid container spacing={{ xs: 1 }}>
        <Grid item xs={12} md={8}>
          <LivestreamVideo currentLivestream={currentLivestream} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LivestreamChatView currentLivestream={currentLivestream} />
        </Grid>
      </Grid>
      <LivestreamLastest livestreams={filteredLivestreams} />

    </Container>
  )
}