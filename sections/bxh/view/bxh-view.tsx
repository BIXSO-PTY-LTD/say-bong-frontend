'use client';

import { Container } from '@mui/material';

import BXHList from '../bxh-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';

import resposneData from '#/public/responseData.json'

// ----------------------------------------------------------------------

export default function BXHView() {
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


      <BXHList matches={matches} />

    </Container>
  );
}
