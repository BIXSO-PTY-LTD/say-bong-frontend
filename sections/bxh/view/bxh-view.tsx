'use client';

import { Container, Typography } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import BXHList from '../bxh-list';


// ----------------------------------------------------------------------

export default function BXHView() {

  return (
    <Container>

      <BXHList />

    </Container>
  );
}
