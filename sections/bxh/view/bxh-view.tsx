'use client';

import { Container } from '@mui/material';

import BXHList from '../bxh-list';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';

import resposneData from '#/public/responseData.json'
import { axiosSoccer } from '#/utils/axios';
import QueryString from 'qs';
import { useGetMatches } from '#/api/match';

// ----------------------------------------------------------------------

export default function BXHView() {

  const { matches, matchesLoading, matchesEmpty } = useGetMatches();

  return (
    <Container style={{ maxWidth: "1330px", padding: "0" }}>


      <BXHList matches={matches} matchesLoading={matchesLoading} matchesEmpty={matchesEmpty} />

    </Container>
  );
}
