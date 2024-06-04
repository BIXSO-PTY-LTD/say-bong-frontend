import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from '#/hooks/use-boolean';

import Label from '#/components/label';
import Iconify from '#/components/iconify';


import { IMatchInfo, IMatchItem } from '#/types/match';
import { useGetInfoMatches } from '#/api/match';
import { useEffect, useState } from 'react';
import { getMatchStatus } from '#/utils/matchFilter';
import { Stack, Tooltip } from '@mui/material';
import LivestreamQuickEditForm from './livestream-quick-edit-form';
import { ILivestreamItem } from '#/types/livestream';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IMatchItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: number
  livestreams: ILivestreamItem[];
};

export default function LivestreamTableRow({
  row,
  selected,
  index,
  livestreams
}: Props) {
  const { matchesInfo } = useGetInfoMatches();

  const { matchId, league_title, startTimez, localteam_title, visitorteam_title, m3u8, localteam_logo, visitorteam_logo } = row;
  const [currentMatch, setCurrentMatch] = useState<IMatchInfo>();

  const [matchingLivestream, setMatchingLivestream] = useState<ILivestreamItem>()

  const quickEdit = useBoolean();


  useEffect(() => {
    if (matchesInfo && row) {
      setCurrentMatch(matchesInfo.find(item => item.matchId === matchId));
      setMatchingLivestream(livestreams.find(item => item.title === matchId));

    }
  }, [livestreams, matchId, matchesInfo, row]);

  const matchStatus = getMatchStatus(currentMatch?.match_time as number, currentMatch?.halfStartTime as number);
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'wrap', textAlign: "center", fontSize: "10px" }}>{index}</TableCell>

        <TableCell sx={{ whiteSpace: 'wrap', textAlign: "center", fontSize: "10px" }}>{league_title}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center", fontSize: "10px" }}>{startTimez.replace('T', ' ')}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center", fontSize: "10px" }}>{matchStatus?.round}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center", fontSize: "10px" }}>{
          <Stack direction='column' justifyContent="center" alignItems="center">
            <Avatar src={localteam_logo} alt={localteam_title}>
            </Avatar>
            {localteam_title}
          </Stack>
        }</TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center", fontSize: "10px" }}>{
          <Stack direction='column' justifyContent="center" alignItems="center">
            <Avatar src={visitorteam_logo} alt={visitorteam_title}>
            </Avatar>
            {visitorteam_title}
          </Stack>
        }</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>
          <Label variant="filled" color={m3u8 !== "" ? "success" : "error"}>
            {m3u8 !== "" ? "có" : "không"}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>

          <Label
            variant="filled"
            color={
              matchingLivestream?.meta?.find(meta => meta.key === 'live')?.content?.toLowerCase() === "người phát sóng trực tiếp" ? "success" :
                matchingLivestream?.meta?.find(meta => meta.key === 'live')?.content?.toLowerCase() === "nguồn video" ? "info" :
                  "error"
            }
          >
            {
              matchingLivestream?.meta?.find(meta => meta.key === 'live')?.content?.toLowerCase() === "người phát sóng trực tiếp" ? "Người phát sóng trực tiếp" :
                matchingLivestream?.meta?.find(meta => meta.key === 'live')?.content?.toLowerCase() === "nguồn video" ? "Nguồn video" :
                  "Không live"
            }
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>
          <Label variant="filled" color={matchingLivestream?.meta?.find(meta => meta.key === 'hot')?.content === "Có" ? "success" : "error"}>
            {matchingLivestream?.meta?.find(meta => meta.key === 'hot')?.content === "Có" ? "Có" : "Không"}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: "center" }}>
          <Label variant="soft" color="info">
            {currentMatch?.score === "" ? currentMatch?.score.replace(',', ' - ') : "chưa có"}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>

          <Tooltip title="Sửa" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>

      </TableRow>

      <LivestreamQuickEditForm currentLivestream={row} open={quickEdit.value} onClose={quickEdit.onFalse} />


    </>
  );
}
