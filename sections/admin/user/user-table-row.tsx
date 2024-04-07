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
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { id, name, avatarUrl, username, phoneNumber, createdAt } = row;

  const confirm = useBoolean();


  const popover = usePopover();

  return (
    <>
      <TableRow sx={{ borderBottom: theme => `1px solid ${theme.palette.grey[800]}` }} hover selected={selected}>
        <TableCell sx={{ border: "none" }} padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ border: "none", display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

          <ListItemText
            primary={name}
            secondary={`#KH${id.slice(0, 4)}`}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ border: "none", whiteSpace: 'nowrap' }}>{username}</TableCell>

        <TableCell sx={{ border: "none", whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>


        <TableCell sx={{ border: "none" }}>
          {fDate(createdAt)}
        </TableCell>

        <TableCell align="right" sx={{ border: "none", px: 1, whiteSpace: 'nowrap' }}>


          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>



      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
