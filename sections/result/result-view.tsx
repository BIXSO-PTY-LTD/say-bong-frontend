'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import MatchList from '../match/match-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';
import resposneData from '#/public/responseData.json'

// ----------------------------------------------------------------------

export default function ResultView() {
  const [matches, setMatches] = useState<IMatchItem[]>([]);
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
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Kết quả</Typography>
      <MatchList matches={matches} />

    </Container>
  );
}
