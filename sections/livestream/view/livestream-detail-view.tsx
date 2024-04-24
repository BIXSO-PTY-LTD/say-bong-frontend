"use client"

import { Container, Grid, Skeleton, Stack, Typography } from "@mui/material"
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
    <Stack direction="column" sx={{ px: 0.5 }}>
      <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">LIVESTREAM</Typography>
      <Grid container spacing={{ xs: 1 }}>
        {livestreamLoading ? (
          <>
            <Grid item xs={12} md={9}>
              <Skeleton variant="rectangular" height="500px" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Skeleton variant="rectangular" height="500px" />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={9}>
              <LivestreamVideo currentLivestream={currentLivestream} />
            </Grid>
            <Grid item xs={12} md={3}>
              <LivestreamChatView currentLivestream={currentLivestream} />
            </Grid>
          </>
        )}

      </Grid>


      <LivestreamLastest loading={livestreamsLoading} empty={livestreamsEmpty} livestreams={filteredLivestreams} />



    </Stack>
  )
}