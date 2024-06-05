"use client"

import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material"
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

  const { matches } = useGetMatches();
  const [currentMatch, setCurrentMatch] = useState<IMatchItem>();

  const [activeLink, setActiveLink] = useState<string>();

  const broadcasterMetas = currentLivestream?.meta?.filter(meta => meta.key?.startsWith('broadcaster'));


  useEffect(() => {
    if (matches.length > 0) {
      setCurrentMatch(matches.find(match => match.matchId === currentLivestream?.title));
    }

    setActiveLink(currentLivestream?.content)
  }, [matches, currentLivestream?.title, currentLivestream?.content])


  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Stack direction="column">
        {currentMatch ? (
          <Typography variant="h5" sx={{ my: 3, textTransform: 'uppercase' }}>Phát trực tiếp {currentMatch?.localteam_title} vs {currentMatch?.visitorteam_title}</Typography >
        ) :
          (
            <Typography variant="h5" sx={{ my: 3 }}>Loading...</Typography >
          )
        }
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
                <LivestreamVideo currentLivestream={currentLivestream} activeLink={activeLink} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LivestreamChatView currentLivestream={currentLivestream} />
              </Grid>

            </>

          )}
        </Grid>

      </Stack>
      {broadcasterMetas && broadcasterMetas.length > 0 ? (
        <Box sx={{ m: 2 }}>
          <Stack spacing={2} direction="row">
            <Button
              variant={activeLink === currentLivestream?.content ? "contained" : "outlined"}
              color="primary"
              onClick={() => setActiveLink(currentLivestream?.content)}
            >
              HD
            </Button>
            {broadcasterMetas?.map((meta, index) => {
              // Split the content into name and link
              const [name, link] = meta?.content?.split(' ') ?? [];
              return (

                <Button
                  key={index}
                  variant={activeLink === link ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setActiveLink(link)}
                >
                  {name}
                </Button>
              )
            })}
          </Stack>
        </Box>
      ) : null
      }

    </Container >
  )
}