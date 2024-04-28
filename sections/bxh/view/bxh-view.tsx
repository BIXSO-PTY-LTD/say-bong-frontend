'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import BXHList from '../bxh-list';
import matchesData from '#/public/data/matchesData.json';
import { useEffect, useState } from 'react';
import { IMatchItem } from '#/types/match';


// ----------------------------------------------------------------------

export default function BXHView() {
  const [matches, setMatches] = useState<IMatchItem[]>([]);
  useEffect(() => {
    if (matchesData) {
      setMatches(matchesData.data.list)
    }
  }, [])
  return (
    <Container>

      <BXHList matches={matches} />

    </Container>
  );
}
