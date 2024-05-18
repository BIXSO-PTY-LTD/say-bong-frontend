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
import { SOCCER_API } from "#/config-global"

type Props = {
  id: string;
}
export default function LivestreamDetailView({ id }: Props) {


  const { livestream: currentLivestream, livestreamLoading } = useGetLivestream(id);
  const { livestreams, livestreamsLoading, livestreamsEmpty } = useGetLivestreams(1, 100);

  const [matches, setMatches] = useState<IMatchItem[]>([]);


  const filteredLivestreams = currentLivestream ? livestreams.filter(livestream => livestream.id !== currentLivestream.id) : livestreams;



  // useEffect(() => {
  //   if (resposneData) {
  //     setMatches(resposneData.data.list)
  //   }
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = QueryString.stringify({
          'type': '1'
        });
        const response = await axiosSoccer.post(SOCCER_API as string, data);
        // Handle success
        setMatches(response.data.data.list);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const currentMatch = matches.find(match => match.matchId === currentLivestream?.title);
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
      </Stack>
      <LivestreamLastest loading={livestreamsLoading} empty={livestreamsEmpty} livestreams={livestreams.length === 1 ? livestreams : filteredLivestreams} />
    </Container>
  )
}