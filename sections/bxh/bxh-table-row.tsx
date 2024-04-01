import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from '#/hooks/use-boolean';

import Label from '#/components/label';
import Iconify from '#/components/iconify';
import { usePopover } from '#/components/custom-popover';

import { IUserItem } from '#/types/user';
import { Typography } from '@mui/material';


// ----------------------------------------------------------------------

type Props = {
  row: IUserItem;
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
