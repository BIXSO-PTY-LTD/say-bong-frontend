import CustomPopover, { usePopover } from '#/components/custom-popover';
import Iconify from '#/components/iconify';
import { IMatchFilterValue, IMatchFilters } from '#/types/match';
import { ITeamTableFilters } from '#/types/team';
import { Card, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';


// ----------------------------------------------------------------------

type Props = {
  filters: IMatchFilters | ITeamTableFilters;
  onFilters: (name: string, value: IMatchFilterValue) => void;
  //
  competitionOptions: {
    value: string;
    label: string;
  }[];
};

export default function CompetitionSort({ filters, onFilters, competitionOptions }: Props) {

  const handleFilterCompetition = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;
      onFilters('competition', newValue);

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
          displayEmpty
          value={filters.competition}
          onChange={handleFilterCompetition}
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
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


    </>
  );
}
