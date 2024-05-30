import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from '#/components/label';

import { Skeleton, Typography } from '@mui/material';
import { IMatchItem, IResult } from '#/types/match';
import { useEffect, useState } from 'react';
import { StackPostSkeleton } from '../skeletons/stack-post-skeleton';


// ----------------------------------------------------------------------

type Props = {
  row: IMatchItem;
};

export default function BXHTableRow({
  row,
}: Props) {
  const { matchId, visitorteam_title, visitorteam_logo, timestamp, status } = row;
  const [matchHistory, setMatchHistory] = useState<IResult[] | undefined>();


  return (
    <>
      <TableRow sx={{ borderBottom: "1px solid", borderColor: theme => theme.palette.grey[800] }}>

        <TableCell sx={{ display: 'flex', alignItems: 'center', border: "none" }}>
          <Avatar alt={visitorteam_title} src={visitorteam_logo} sx={{ mr: 2 }} />

          <Typography>{visitorteam_title}</Typography>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}  >{status}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{status}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{status}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{status}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{status}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{status}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>
          Updating...

        </TableCell>
      </TableRow>






    </>
  );
}
