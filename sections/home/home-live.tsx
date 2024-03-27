'use client';

import { COMPETITION_SORT_OPTIONS, MATCH_STATUS_OPTIONS, _matchList } from "#/_mock/_match";
import Label from "#/components/label";
import { IMatchFilterValue, IMatchFilters, IMatchItem } from "#/types/match";
import { Container, Stack, Tab, Tabs, Typography, alpha } from "@mui/material";
import { useCallback, useState } from "react";
import CompetitionSort from "../competition/competition-sort";
import MatchListHorizontal from "../match/match-list-horizontal";
import { orderBy } from "lodash";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [...MATCH_STATUS_OPTIONS, { value: 'all', label: 'Tất cả' }];

const defaultFilters: IMatchFilters = {
  competitions: [],
  status: 'all',
};
// ----------------------------------------------------------------------
export default function HomeLive() {

  const [sortBy, setSortBy] = useState('Tất cả giải đấu');

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = useCallback((name: string, value: IMatchFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const dataFiltered = applyFilter({
    inputData: _matchList,
    filters,
    sortBy
  });
  return (
    <Container>
      <Typography sx={{ textTransform: "uppercase", mt: "24px" }} variant="h3">Trực tiếp bóng đá</Typography>
      <Stack spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            background: (theme) => theme.palette.grey[800],
            pl: 2,
            pr: 17,
            borderRadius: 1,
            my: { xs: 3, md: 5 },
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'live' && 'info') ||
                    (tab.value === 'hot' && 'primary') ||
                    (tab.value === 'today' && 'warning') ||
                    (tab.value === 'tomorrow' && 'error') ||
                    'success'
                  }
                >

                  {tab.value === 'live' && _matchList.filter((match) => match.status === 'live').length}

                  {tab.value === 'hot' && _matchList.filter((match) => match.status === 'hot').length}

                  {tab.value === 'today' && _matchList.filter((match) => match.status === 'today').length}

                  {tab.value === 'tomorrow' && _matchList.filter((match) => match.status === 'tomorrow').length}

                  {tab.value === 'all' && _matchList.length}

                </Label>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>
        <CompetitionSort sort={sortBy} onSort={handleSortBy} sortOptions={COMPETITION_SORT_OPTIONS} />
      </Stack>
      <MatchListHorizontal matchs={dataFiltered}
      //  loading={matchsLoading} 
      />
    </Container>
  )
}
// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy
}: {
  inputData: IMatchItem[];
  filters: IMatchFilters;
  sortBy: string;
}) => {
  const { status } = filters;

  if (sortBy === 'fifa world cup') {
    inputData = orderBy(inputData, ['competitions'], ['desc']);
  }

  if (sortBy === 'uefa european championship (euro)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'copa america') {
    inputData = orderBy(inputData, ['competitions'], ['desc']);
  }

  if (sortBy === 'uefa champions league') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'uefa europa league') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'english premier league') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'la liga (spain)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'bundesliga (germany)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'serie a (italy)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'ligue 1 (france)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'brasileirão (brazil)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'argentine primera división') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'mls (major league soccer - usa)') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'afc asian cup') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }

  if (sortBy === 'africa cup of nations') {
    inputData = orderBy(inputData, ['competitions'], ['asc']);
  }
  if (status !== 'all') {
    inputData = inputData.filter((match) => match.status === status);
  }

  return inputData;
};
