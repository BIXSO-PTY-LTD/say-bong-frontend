import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import Iconify from '#/components/iconify';
import CustomPopover, { usePopover } from '#/components/custom-popover';
import { ILivestreamFilterValue, ILivestreamFilters } from '#/types/livestream';
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// ----------------------------------------------------------------------

type Props = {
  filters: ILivestreamFilters;
  onFilters: (name: string, value: ILivestreamFilterValue) => void;
  canReset: boolean;
  onResetFilters: VoidFunction;
  roleOptions: string[];
  videoOptions: string[];
  liveOptions: string[];
  hotOptions: string[];
};

export default function LivestreamTableToolbar({
  filters,
  onFilters,
  canReset,
  onResetFilters,
  roleOptions,
  videoOptions,
  liveOptions,
  hotOptions
  //
}: Props) {
  const popover = usePopover();

  const handleFilterLeagueTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('league_title', event.target.value);
    },
    [onFilters]
  );

  const handleFilterLocalTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('localTeam', event.target.value);
    },
    [onFilters]
  );
  const handleFilterVisitorTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('visitorTeam', event.target.value);

    },
    [onFilters]
  );

  const handleFilterProcess = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('process', event.target.value);
    },
    [onFilters]
  );


  const handleFilterVideoSource = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('videoSource', event.target.value);
    },
    [onFilters]
  );

  const handleFilterLive = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('live', event.target.value);
    },
    [onFilters]
  );

  const handleFilterHot = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('hot', event.target.value);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: Date | null) => {
      if (newValue instanceof Date && !isNaN(newValue.getTime())) {
        onFilters('startDate', newValue);
      }
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: Date | null) => {
      if (newValue instanceof Date && !isNaN(newValue.getTime())) {
        onFilters('endDate', newValue);
      }
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <DatePicker
          label="Ngày bắt đầu"
          value={filters.startDate}
          format='dd/MM/yyyy'
          onChange={handleFilterStartDate}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
          sx={{
            maxWidth: { md: 200 },
          }}
        />

        <DatePicker
          label="Ngày kết thúc"
          format='dd/MM/yyyy'
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 200 },
          }}
        />



        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Tiến độ trận đấu</InputLabel>

          <Select
            value={filters.process}
            onChange={handleFilterProcess}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant='filled'
          fullWidth
          value={filters.league_title}
          onChange={handleFilterLeagueTitle}
          placeholder="Tìm giải đấu..."
          sx={{
            '& input': {
              paddingTop: '8px',
              height: '2.7em'

            },
          }}
        />

      </Stack>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pt: 0.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <TextField
          variant='filled'
          value={filters.localTeam}
          onChange={handleFilterLocalTeam}
          placeholder="Đội nhà..."
          sx={{
            '& input': {
              paddingTop: '8px',
              height: '2.7em'

            },
          }}
        />
        <TextField
          variant='filled'
          value={filters.visitorTeam}
          onChange={handleFilterVisitorTeam}
          placeholder="Đội khách..."
          sx={{
            '& input': {
              paddingTop: '8px',
              height: '2.7em'

            },
          }}
        />

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Nguồn video</InputLabel>

          <Select
            value={filters.videoSource}
            onChange={handleFilterVideoSource}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {videoOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Live</InputLabel>

          <Select
            value={filters.live}
            onChange={handleFilterLive}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {liveOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Lập lịch thủ công</InputLabel>

          <Select
            value={filters.hot}
            onChange={handleFilterHot}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {hotOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {canReset && (
          <Button
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
          </Button>
        )}
      </Stack>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
