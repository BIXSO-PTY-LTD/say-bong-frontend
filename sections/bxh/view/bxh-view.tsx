'use client';

import { Box, Container, Typography } from '@mui/material';

import BXHList from '../bxh-list';
import matchesData from '#/public/data/matchesData.json';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';

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
    <Box maxWidth="1330px" margin="0 auto">


      <BXHList matches={matches} />

    </Box>
  );
}
