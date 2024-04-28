import { IMatchFilterValue, IMatchFilters } from '#/types/match';
import { ITeamTableFilters } from '#/types/team';
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';


// ----------------------------------------------------------------------

type Props = {
  filters: IMatchFilters | ITeamTableFilters;
  onFilters: (name: string, value: IMatchFilterValue) => void;
  //
  competitionOptions: string[];
};

export default function CompetitionSort({ filters, onFilters, competitionOptions }: Props) {

  const handleFilterCompetition = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;
      onFilters('league_title', newValue);

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
          width: { xs: 1, md: "239px" },
          background: theme => theme.palette.grey[800],
          borderRadius: 1,
        }}
      >
        <Select
          displayEmpty
          value={filters.league_title}
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
            <MenuItem key={option} value={option}>
              {option === "all" ? "TẤT CẢ TRẬN ĐẤU" : option.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


    </>
  );
}
