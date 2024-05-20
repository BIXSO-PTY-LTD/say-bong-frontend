import { Box, Stack, Table, TableBody, TableContainer, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IMatchFilterValue, IMatchItem, IRankFilters } from "#/types/match";
import { TableHeadCustom, TableNoData, useTable } from "#/components/table";
import CompetitionSort from "../competition/competition-sort";
import BXHTableRow from "./bxh-table-row";
import { filterMatchesByLeagueTitle } from "#/utils/matchFilter";
import isEqual from "lodash.isequal";

const TABLE_HEAD = [
  { id: 'team', label: 'TEAM', width: { md: 300, lg: 740 } },
  { id: 'matchs', label: 'ST', },
  { id: 'win', label: 'T', color: "#007AFF" },
  { id: 'draw', label: 'H', color: "#01B243" },
  { id: 'lose', label: 'B', color: "#E4312B" },
  { id: 'score', label: 'HS', },
  { id: 'goal difference', label: 'Đ', color: "#E4312B" },
  { id: '5_matchs', label: '5 trận gần nhất', },
];

const defaultFilters: IRankFilters = {
  league_title: '',
};


type Props = {
  matches: IMatchItem[]
  matchesLoading: boolean
  matchesEmpty: boolean
}
export default function BXHList({ matches, matchesLoading, matchesEmpty }: Props) {

  const table = useTable();
  const [filters, setFilters] = useState(defaultFilters);
  const [COMPETITION_OPTIONS, setCompetitionOptions] = useState<string[]>([]);

  const dataFiltered = applyFilter({
    inputData: matches,
    filters,
  });

  const handleFilters = useCallback((name: string, value: IMatchFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  }, []);

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  useEffect(() => {
    if (COMPETITION_OPTIONS.length > 0) {
      // Set filter to the first option in COMPETITION_OPTIONS when component mounts
      setFilters(prevState => ({
        ...prevState,
        league_title: COMPETITION_OPTIONS[0]
      }));
    }
  }, [COMPETITION_OPTIONS]);

  useEffect(() => {
    if (Array.isArray(matches)) {
      // Extract unique league titles and convert to lowercase
      const options = Array.from(new Set(matches.map(match => match.league_title.trim().toLowerCase())));

      // Convert Set to array and sort alphabetically
      setCompetitionOptions(options.sort());
    } else {
      console.error('Expected matches to be an array, but received:', matches);
    }
  }, [matches]);
  return (
    <>
      <Stack spacing={3}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        direction={{ sm: 'column', md: 'row' }}
      >
        <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h4">Bảng xếp hạng bóng đá mới nhất - BXH của mọi giải đấu</Typography>
        <CompetitionSort filters={filters}
          onFilters={handleFilters}
          //
          competitionOptions={COMPETITION_OPTIONS} />
      </Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: { xs: 3, md: 0 }, maxWidth: "xl" }}>


        <Box sx={{ overflow: 'auto' }} >
          <Table >
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={matches.length}
              numSelected={table.selected.length}

            />

            <TableBody>
              {dataFiltered.map((row, index) => (
                <BXHTableRow
                  key={index}
                  row={row}
                />
              ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  )
}

function applyFilter({
  inputData,
  filters,
}: {
  inputData: IMatchItem[];
  filters: IRankFilters;
}) {
  const { league_title } = filters;

  inputData = filterMatchesByLeagueTitle(inputData, league_title)

  return inputData.sort((a, b) => new Date(a.startTimez).getTime() - new Date(b.startTimez).getTime());
}
