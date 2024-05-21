"use client"

import { Box, Container, Grid, Skeleton, Stack, Typography } from "@mui/material"
import LivestreamVideo from "../livestream-video"
import LivestreamLastest from "../livestream-latest"
import LivestreamChatView from "../livestream-chat-view"
import { ILivestreamItem } from "#/types/livestream"
import { useGetLivestream, useGetLivestreams } from "#/api/livestream"
import { StackPostSkeleton } from "#/sections/skeletons/stack-post-skeleton"
import EmptyContent from "#/components/empty-content/empty-content"
import { useEffect, useState } from "react"
import resposneData from '#/public/responseData.json'
import { IMatchItem } from "#/types/match"
import QueryString from 'qs';
import { axiosSoccer } from "#/utils/axios"
import { useGetMatches } from "#/api/match"

type Props = {
  id: string;
}
export default function LivestreamDetailView({ id }: Props) {


  const { livestream: currentLivestream, livestreamLoading } = useGetLivestream(id);
  const { livestreams, livestreamsLoading, livestreamsEmpty } = useGetLivestreams(1, 100);

  const { matches } = useGetMatches();
  const [currentMatch, setCurrentMatch] = useState<IMatchItem>();

  const filteredLivestreams = currentLivestream ? livestreams.filter(livestream => livestream.id !== currentLivestream.id) : livestreams;


  useEffect(() => {
    if (matches.length > 0) {
      setCurrentMatch(matches.find(match => match.matchId === currentLivestream?.title));
    }
  }, [matches, currentLivestream?.title])


  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Stack direction="column">
        <Typography sx={{ textTransform: "uppercase", my: 3 }} variant="h3">LIVESTREAM</Typography>
        <Grid container spacing={4}>
          {livestreamLoading ? (
            <>
              <Grid item xs={12} md={9} >
                <Skeleton variant="rectangular" height="500px" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Skeleton variant="rectangular" height="500px" />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={9}>
                <LivestreamVideo currentMatch={currentMatch} currentLivestream={currentLivestream} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LivestreamChatView currentLivestream={currentLivestream} />
              </Grid>

            </>

          )}
        </Grid>
        {currentMatch ? (
          <Typography variant="h3" sx={{ m: 3 }}>{currentMatch?.localteam_title} vs {currentMatch?.visitorteam_title}</Typography >
        ) :
          (
            <Typography variant="h3" sx={{ m: 3 }}>Loading...</Typography >
          )
        }
      </Stack>
      {/* <LivestreamLastest loading={livestreamsLoading} empty={livestreamsEmpty} livestreams={livestreams.length === 1 ? livestreams : filteredLivestreams} /> */}
    </Container>
  )
}