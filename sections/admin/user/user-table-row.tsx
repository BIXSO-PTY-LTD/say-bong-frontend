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
import CustomPopover, { usePopover } from '#/components/custom-popover';

import { IUserItem } from '#/types/user';
import { ConfirmDialog } from '#/components/custom-dialog';
import { fDate } from '#/utils/format-time';


// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: IUserItem;
};

export default function UserTableRow({
  row,
  selected,
}: Props) {
  const { id, fullName, profileImage, userName, phone, createdAt } = row;

  const confirm = useBoolean();


  const popover = usePopover();

  return (
    <>
      <TableRow sx={{ borderBottom: theme => `1px solid ${theme.palette.grey[800]}` }} hover selected={selected}>


        <TableCell sx={{ border: "none", display: 'flex', alignItems: 'center' }}>
          <Avatar alt={fullName} src={profileImage} sx={{ mr: 2 }} />

          <ListItemText
            primary={fullName}
            secondary={`#KH${id.slice(0, 4)}`}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ border: "none", whiteSpace: 'nowrap' }}>{userName}</TableCell>

        <TableCell sx={{ border: "none", whiteSpace: 'nowrap' }}>{phone}</TableCell>


        <TableCell sx={{ border: "none" }}>
          {fDate(createdAt)}
        </TableCell>

      </TableRow>






    </>
  );
}
