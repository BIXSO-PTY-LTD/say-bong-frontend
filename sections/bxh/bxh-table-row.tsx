import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from '#/components/label';

import { Skeleton, Typography } from '@mui/material';
import { IMatchItem, IResult } from '#/types/match';
import { useGetMatch } from '#/api/match';
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
  const { match, matchLoading } = useGetMatch(matchId)
  const [matchHistory, setMatchHistory] = useState<IResult[] | undefined>();
  useEffect(() => {
    if (match) {
      const sortedHistory = match.history_vs.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      setMatchHistory(sortedHistory)
    }
  }, [match])

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
          {matchLoading ? (
            <Skeleton variant='rectangular' height={10} />
          ) : (
            matchHistory ? (
              matchHistory.slice(0, 5).map((item, index) => (
                <Label
                  sx={{ mx: 0.2 }}
                  variant='filled'
                  color={
                    (item.result === 'W' && 'success') ||
                    (item.result === 'L' && 'error') ||
                    'warning'
                  }
                  key={index}
                >
                  {item.result}
                </Label>
              ))
            ) : (
              ""
            )
          )}

        </TableCell>
      </TableRow>






    </>
  );
}
