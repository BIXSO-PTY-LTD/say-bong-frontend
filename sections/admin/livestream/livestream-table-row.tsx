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
import { ConfirmDialog } from '#/components/custom-dialog';
import CustomPopover, { usePopover } from '#/components/custom-popover';


import { IMatchInfo, IMatchItem } from '#/types/match';
import { useGetInfoMatches } from '#/api/match';
import { convertTimestampToDate } from '#/utils/format-time';
import { useEffect, useState } from 'react';
import { getMatchStatus } from '#/utils/matchFilter';
import { Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IMatchItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: number
};

export default function LivestreamTableRow({
  row,
  selected,
  index,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { matchesInfo } = useGetInfoMatches();

  const { matchId, league_title, startTimez, localteam_title, visitorteam_title, m3u8, localteam_logo, visitorteam_logo } = row;
  const [currentMatch, setCurrentMatch] = useState<IMatchInfo>();

  const confirm = useBoolean();

  const popover = usePopover();

  useEffect(() => {
    if (matchesInfo && row) {
      console.log(matchesInfo.find(item => item.matchId));
      console.log(row.matchId);

      setCurrentMatch(matchesInfo.find(item => item.matchId === row.matchId));
    }
  }, [row.matchId, matchesInfo, row]);

  const matchStatus = getMatchStatus(currentMatch?.match_time as number, currentMatch?.halfStartTime as number);
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'wrap', fontSize: "10px" }}>{index}</TableCell>

        <TableCell sx={{ whiteSpace: 'wrap', fontSize: "10px" }}>{league_title}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', fontSize: "10px" }}>{startTimez.replace('T', ' ')}</TableCell>

        <TableCell sx={{ whiteSpace: 'wrap', fontSize: "10px" }}>{matchStatus.round}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>{
          <Stack direction='column' justifyContent="center" alignItems="center">
            <Avatar src={localteam_logo} alt={localteam_title}>
            </Avatar>
            <Typography variant='caption'>{localteam_title}</Typography>
          </Stack>
        }</TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>{
          <Stack direction='column' justifyContent="center" alignItems="center">
            <Avatar src={visitorteam_logo} alt={visitorteam_title}>
            </Avatar>
            <Typography variant='caption'>{visitorteam_title}</Typography>
          </Stack>
        }</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="filled" color={m3u8 === "" ? "error" : "success"}>
            {m3u8 === "" ? "không" : "có"}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="filled" color={m3u8 === "" ? "error" : "success"}>
            {m3u8 === "" ? "không" : "có"}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="filled" color={m3u8 === "" ? "error" : "success"}>
            {m3u8 === "" ? "không" : "có"}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="soft" color="info">
            {currentMatch?.score.replace(',', ' - ')}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>

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
          Xóa
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Sửa
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Xóa"
        content="Bạn có chắc muốn xóa?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Xóa
          </Button>
        }
      />
    </>
  );
}
