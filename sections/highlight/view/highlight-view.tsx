'use client';

import { Container, Typography } from '@mui/material';

import HighlightList from '../highlight-list';
import ExcitingHighlightList from '../exciting/exciting-highlight-list';
import { useGetHighlightVideos } from '#/api/highlight-video';
import { useState } from 'react';
import { useGetExcitingVideos } from '#/api/exciting-video';


// ----------------------------------------------------------------------

export default function HighlightView() {
  const [currentPageHighlight, setCurrentPageHighlight] = useState(1);

  const [currentPageExciting, setCurrentPageExciting] = useState(1);

  const { highlightVideos, highlightVideosLoading, highlightVideosEmpty, paginate: highlightPaginate } = useGetHighlightVideos(currentPageHighlight, 16);

  const { excitingVideos, excitingVideosLoading, excitingVideosEmpty, paginate: excitingPaginate } = useGetExcitingVideos(currentPageExciting, 8);

  const sortedHighlightVideos = [...highlightVideos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const sortedExcitingVideos = [...excitingVideos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handlePageChangeHighlight = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPageHighlight(page);
  };

  const handlePageChangeExciting = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPageExciting(page);
  };
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", my: 5 }} variant="h3">Highlight</Typography>
      <HighlightList
        videos={sortedHighlightVideos}
        loading={highlightVideosLoading}
        empty={highlightVideosEmpty}
        paginate={highlightPaginate}
        handlePageChange={handlePageChangeHighlight}
        currentPage={currentPageHighlight}
      />

      <ExcitingHighlightList
        videos={sortedExcitingVideos}
        loading={excitingVideosLoading}
        empty={excitingVideosEmpty}
        paginate={excitingPaginate}
        handlePageChange={handlePageChangeExciting}
        currentPage={currentPageExciting} />
    </Container>
  );
}
