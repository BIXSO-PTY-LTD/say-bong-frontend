import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from '#/components/label';

import { ITeamItem } from '#/types/team';
import { Typography } from '@mui/material';


// ----------------------------------------------------------------------

type Props = {
  row: ITeamItem;
};

export default function BXHTableRow({
  row,
}: Props) {
  const { name, status, avatarUrl, phoneNumber } = row;

  return (
    <>
      <TableRow sx={{ borderBottom: "1px solid", borderColor: theme => theme.palette.grey[800] }}>

        <TableCell sx={{ display: 'flex', alignItems: 'center', border: "none" }}>
          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

          <Typography>{name}</Typography>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}  >{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{phoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>{phoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', border: "none" }}>
          {status.map((item, index) => (
            <Label sx={{ mx: 0.2 }} variant='filled'
              color={
                (item === 'W' && 'success') ||
                (item === 'L' && 'error') ||
                'warning'
              }
              key={index}>{item}</Label>
          ))}
        </TableCell>
      </TableRow>






    </>
  );
}
