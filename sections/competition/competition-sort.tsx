import CustomPopover, { usePopover } from '#/components/custom-popover';
import Iconify from '#/components/iconify';
import { IMatchFilterValue, IMatchFilters } from '#/types/match';
import { Card, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';


// ----------------------------------------------------------------------

type Props = {
  filters: IMatchFilters;
  onFilters: (name: string, value: IMatchFilterValue) => void;
  //
  competitionOptions: {
    value: string;
    label: string;
  }[];
};

export default function CompetitionSort({ filters, onFilters, competitionOptions }: Props) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterCompetition = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'competitions',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  return (
    <>
      <FormControl
        fullWidth
        hiddenLabel
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
          background: theme => theme.palette.grey[800],
          borderRadius: 1,
        }}
      >
        <Select
          multiple
          displayEmpty
          value={filters.competitions}
          onChange={handleFilterCompetition}
          renderValue={(selected) => {
            if (!selected.length) {
              return (
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  TẤT CẢ TRẬN ĐẤU
                </Typography>
              );
            }
            return (
              <Typography variant="subtitle2" component="span">
                {selected.join(', ')}
              </Typography>
            );
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 240,
                background: theme => theme.palette.grey[800]
              },
            },
          }}
        >
          {competitionOptions.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              <Checkbox disableRipple size="small" checked={filters.competitions.includes(option.label)} />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>




    </>
  );
}
