'use client';

import { COMPETITION_SORT_OPTIONS, MATCH_RESULT_OPTIONS, MATCH_STATUS_OPTIONS, _matchList } from "#/_mock/_match";
import Label from "#/components/label";
import { IMatchFilterValue, IMatchFilters, IMatchItem } from "#/types/match";
import { Button, Pagination, Stack, Tab, Tabs, Typography, alpha, paginationClasses } from "@mui/material";
import { useCallback, useState } from "react";
import CompetitionSort from "../competition/competition-sort";
import MatchListHorizontal from "./match-list-horizontal";
import { usePathname } from "next/navigation";
import { paths } from "#/routes/paths";

// ----------------------------------------------------------------------



const defaultFilters: IMatchFilters = {
  competition: 'all',
  status: 'all',
};

// ----------------------------------------------------------------------
export default function MatchList() {
  const pathname = usePathname();

  const STATUS_OPTIONS = pathname === "/" || pathname === "/schedule" ? [...MATCH_STATUS_OPTIONS, { value: 'all', label: 'Tất cả' }] : [...MATCH_RESULT_OPTIONS, { value: 'all', label: 'Tất cả' }];

  const COMPETITION_OPTIONS = [...COMPETITION_SORT_OPTIONS];
  const allOption = { value: 'all', label: 'Tất cả trận đấu' };
  COMPETITION_OPTIONS.unshift(allOption);

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



  const dataFiltered = applyFilter({
    inputData: _matchList,
    filters,
  });
  return (
    <>

      <Stack spacing={3}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        direction={{ sm: 'column', md: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },

        }}>
        {
          (
            <Tabs
              value={filters.status}
              onChange={handleFilterStatus}
              sx={{
                background: (theme) => theme.palette.grey[800],
                px: 2,
                py: 0.5,
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
          )}

        <CompetitionSort filters={filters}
          onFilters={handleFilters}
          //
          competitionOptions={COMPETITION_OPTIONS} />
      </Stack>
      <MatchListHorizontal matchs={dataFiltered}
      //  loading={matchsLoading} 
      />
      {pathname === '/' ?
        (
          <Button
            fullWidth
            href={paths.livestream.root}
            sx={{
              my: 5,
              color: "#01B243",
              background: theme => theme.palette.grey[800]
            }}>
            Xem thêm lịch trực tiếp
          </Button>
        ) :
        (
          <Pagination
            count={10}
            color="primary"
            sx={{
              my: 10,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: 'center',
              },
            }}
          />
        )}

    </>
  )
}
// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
}: {
  inputData: IMatchItem[];
  filters: IMatchFilters;
}) => {
  const { status, competition } = filters;


  if (status !== 'all') {
    inputData = inputData.filter((match) => match.status === status);
  }

  if (competition !== 'all') {
    inputData = inputData.filter((match) => match.competition === competition);
  }

  return inputData;
};
