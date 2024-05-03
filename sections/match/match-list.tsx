'use client';

import { COMPETITION_SORT_OPTIONS, MATCH_RESULT_OPTIONS, MATCH_STATUS_OPTIONS, SCHEDULE_OPTIONS } from "#/_mock/_match";
import Label from "#/components/label";
import { IMatchFilterValue, IMatchFilters, IMatchItem } from "#/types/match";
import { Box, Button, Pagination, Stack, Tab, Tabs, Typography, alpha, paginationClasses, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import CompetitionSort from "../competition/competition-sort";
import MatchListHorizontal from "./match-list-horizontal";
import { usePathname } from "next/navigation";
import { paths } from "#/routes/paths";
import { fTimestamp, formatStringToDateTime } from "#/utils/format-time";
import { filterLiveMatches, filterMatchesByLeagueTitle, filterTodayMatches, filterTomorrowMatches } from "#/utils/matchFilter";
import { useFilteredMatchesCount } from "#/hooks/use-filtered-matches-count";
import { addDays, format, subDays } from "date-fns";

// ----------------------------------------------------------------------


const defaultFilters: IMatchFilters = {
  league_title: 'all',
  matchStatus: 'all',
};

type Props = {
  matches: IMatchItem[];
}

// ----------------------------------------------------------------------
export default function MatchList({ matches }: Props) {
  const pathname = usePathname();

  const matchesPerPage = 10;

  const formatDate = (date: Date) => format(date, 'dd/MM');

  const STATUS_OPTIONS = pathname === "/" ? [...MATCH_STATUS_OPTIONS, { value: 'all', label: 'Tất cả' }] : [...MATCH_RESULT_OPTIONS, { value: 'all', label: 'Tất cả' }];

  const SHEDULE_STATUS_OPTIONS = [...SCHEDULE_OPTIONS].map((option) => {
    let label = option.label;
    let date;
    switch (option.value) {
      case 'yesterday':
        date = subDays(new Date(), 1);
        break;
      case 'today':
        date = new Date();
        break;
      case 'tomorrow':
        date = addDays(new Date(), 1);
        break;
      default:
        date = new Date();
    }
    label += ' - ' + formatDate(date);
    return { ...option, label };
  })

  const COMPETITION_OPTIONS_SET = new Set(matches.map(match => match.league_title.trim().toLowerCase()));
  const COMPETITION_OPTIONS = Array.from(COMPETITION_OPTIONS_SET).sort();

  const allOption = 'all';
  COMPETITION_OPTIONS.unshift(allOption);

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = useCallback((name: string, value: IMatchFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  }, []);
  const theme = useTheme();

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('matchStatus', newValue);
    },
    [handleFilters]
  );
  const [page, setPage] = useState<number>(1)

  const handlePageChange = (event: React.ChangeEvent<any>, newPage: number) => {
    setPage(newPage);
  };
  const dataFiltered = applyFilter({
    inputData: matches,
    filters,
    page,
    matchesPerPage
  });

  const filteredMatchesCount = useFilteredMatchesCount(matches, filters, matchesPerPage);


  return (
    <>
      {pathname === "/schedule" ? (
        <Box sx={{ my: 5 }}>
          <Tabs
            value={filters.matchStatus}
            onChange={handleFilterStatus}
            sx={{
              background: (theme) => theme.palette.grey[800],
              minWidth: { md: "600px", lg: "833px" },
              px: 2,
              py: 0.5,
              borderRadius: 1,
              my: { xs: 3, md: 5 },
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor:
                  theme.palette.primary.main,
              },
            }}
          >
            {SCHEDULE_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                sx={{
                  color:
                    (theme) =>
                      theme.palette.primary.main
                }}
              />
            ))}
          </Tabs>
          <CompetitionSort filters={filters}
            onFilters={handleFilters}
            //
            competitionOptions={COMPETITION_OPTIONS} />
        </Box>
      ) : (
        <Stack spacing={3}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          direction={{ sm: 'column', md: 'row' }}
          sx={{
            mb: { xs: 3, md: 5 },

          }}>
          <Tabs
            value={filters.matchStatus}
            onChange={handleFilterStatus}
            sx={{
              background: (theme) => theme.palette.grey[800],
              minWidth: { md: "600px", lg: "833px" },
              px: 2,
              py: 0.5,
              borderRadius: 1,
              my: { xs: 3, md: 5 },
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor:
                  (filters.matchStatus === "live" && theme.palette.info.main) ||
                  (filters.matchStatus === "today" && theme.palette.warning.main) ||
                  (filters.matchStatus === "tomorrow" && theme.palette.error.main) ||
                  theme.palette.success.main,
              },
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
                      (tab.value === "all" || tab.value === filters.matchStatus)
                        ? "filled"
                        : undefined
                    }
                    color={
                      tab.value === "live"
                        ? "info"
                        : tab.value === "today"
                          ? "warning"
                          : tab.value === "tomorrow"
                            ? "error"
                            : "success"
                    }
                  >
                    {tab.value === "live" &&
                      filterLiveMatches(
                        filterMatchesByLeagueTitle(matches, filters.league_title)
                      ).length}
                    {tab.value === "tomorrow" &&
                      filterTomorrowMatches(
                        filterMatchesByLeagueTitle(matches, filters.league_title)
                      ).length}
                    {tab.value === "today" &&
                      filterTodayMatches(
                        filterMatchesByLeagueTitle(matches, filters.league_title)
                      ).length}
                    {tab.value === "all" &&
                      filterMatchesByLeagueTitle(
                        matches,
                        filters.league_title
                      ).length}
                  </Label>
                }
                sx={{
                  textTransform: "uppercase",
                  color:
                    (theme) =>
                      theme.palette[
                        tab.value === "live"
                          ? "info"
                          : tab.value === "hot"
                            ? "primary"
                            : tab.value === "today"
                              ? "warning"
                              : tab.value === "tomorrow"
                                ? "error"
                                : "success"
                      ].main,
                }}
              />
            ))}
          </Tabs>
          <CompetitionSort filters={filters}
            onFilters={handleFilters}
            //
            competitionOptions={COMPETITION_OPTIONS} />
        </Stack>
      )}



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
            count={filteredMatchesCount}
            color="primary"
            page={page}
            onChange={handlePageChange}
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
  page,
  matchesPerPage
}: {
  matchesPerPage: number,
  page: number,
  inputData: IMatchItem[];
  filters: IMatchFilters;
}) => {
  const { matchStatus, league_title } = filters;
  const startIndex = (page - 1) * matchesPerPage;
  const endIndex = startIndex + matchesPerPage;

  // Define filters
  const filtersToApply: ((matches: IMatchItem[]) => IMatchItem[])[] = [];

  // Filter based on league_title
  if (league_title !== 'all') {
    const leagueTitleLower = league_title.toLowerCase();
    filtersToApply.push(matches => matches.filter(match => match.league_title.toLowerCase().includes(leagueTitleLower)));
  }

  // Filter based on matchStatus
  if (matchStatus !== 'all') {
    switch (matchStatus) {
      case 'today':
        filtersToApply.push(filterTodayMatches);
        break;
      case 'tomorrow':
        filtersToApply.push(filterTomorrowMatches);
        break;
      case 'live':
        filtersToApply.push(filterLiveMatches);
        break;
      default:
        break;
    }
  }

  // Apply filters sequentially
  let filteredData = inputData;
  for (const filter of filtersToApply) {
    filteredData = filter(filteredData);
  }

  // Sort and paginate filtered data
  return filteredData
    .sort((a, b) => new Date(a.startTimez).getTime() - new Date(b.startTimez).getTime())
    .slice(startIndex, endIndex);
};