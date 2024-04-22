"use client"

import { Container, Grid, Typography } from "@mui/material"
import LivestreamVideo from "../livestream-video"
import LivestreamLastest from "../livestream-latest"
import LivestreamChatView from "../livestream-chat-view"
import { ILivestreamItem } from "#/types/livestream"
import { useGetLivestream, useGetLivestreams } from "#/api/livestream"
import { StackPostSkeleton } from "#/sections/skeletons/stack-post-skeleton"
import EmptyContent from "#/components/empty-content/empty-content"

type Props = {
  id: string;
}
export default function LivestreamDetailView({ id }: Props) {


  const { livestream: currentLivestream, livestreamLoading } = useGetLivestream(id);
  const { livestreams, livestreamsLoading, livestreamsEmpty } = useGetLivestreams(1, 4);

  const filteredLivestreams = currentLivestream ? livestreams.filter(livestream => livestream.id !== currentLivestream.id) : livestreams;

  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">LIVESTREAM</Typography>
      {livestreamLoading ? (
        <StackPostSkeleton count={1} />
      ) :
        (
          <Grid container spacing={{ xs: 1 }}>
            <Grid item xs={12} md={8}>
              <LivestreamVideo currentLivestream={currentLivestream} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LivestreamChatView currentLivestream={currentLivestream} />
            </Grid>
          </Grid>
        )}

      <LivestreamLastest loading={livestreamsLoading} empty={livestreamsEmpty} livestreams={filteredLivestreams} />



    </Container>
  )
}