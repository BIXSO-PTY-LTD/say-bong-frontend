import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from '#/components/label';

import { Typography } from '@mui/material';
import { IMatchItem } from '#/types/match';


// ----------------------------------------------------------------------

type Props = {
  row: IMatchItem;
};

export default function BXHTableRow({
  row,
}: Props) {
  const { visitorteam_title, visitorteam_logo, timestamp, status } = row;

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
          {/* {status.map((item, index) => (
            <Label sx={{ mx: 0.2 }} variant='filled'
              color={
                (item === 'W' && 'success') ||
                (item === 'L' && 'error') ||
                'warning'
              }
              key={index}>{item}</Label>
          ))} */}
          {timestamp}
        </TableCell>
      </TableRow>






    </>
  );
}
