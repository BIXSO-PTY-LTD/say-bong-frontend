'use client';

import { Container, Typography } from '@mui/material';
import MatchList from '../match/match-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import resposneData from '#/public/responseData.json'
// ----------------------------------------------------------------------

export default function ScheduleView() {
  const [matches, setMatches] = useState<IMatchItem[]>([]);
  useEffect(() => {
    if (resposneData) {
      setMatches(resposneData.data.list)
    }
  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = QueryString.stringify({
  //         'type': '1'
  //       });
  //       const response = await axiosSoccer.post(SOCCER_API as string, data);
  //       // Handle success
  //       setMatches(response.data.data.list);
  //     } catch (error) {
  //       // Handle error
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">lịch thi đấu</Typography>
      <MatchList matches={matches} />
    </Container>
  );
}
