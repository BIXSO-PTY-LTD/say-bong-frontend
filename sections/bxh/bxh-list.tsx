import { Stack, Table, TableBody, TableContainer, Typography } from "@mui/material";
import { COMPETITION_SORT_OPTIONS } from "#/_mock";
import { useCallback, useState } from "react";
import { IMatchFilterValue, IMatchFilters } from "#/types/match";
import Scrollbar from "#/components/scrollbar";
import { TableEmptyRows, TableHeadCustom, TableNoData, emptyRows, getComparator, useTable } from "#/components/table";
import { _teamList } from "#/_mock/_team";
import { ITeamItem, ITeamTableFilters } from "#/types/team";
import CompetitionSort from "../competition/competition-sort";
import BXHTableRow from "./bxh-table-row";

const TABLE_HEAD = [
  { id: 'team', label: 'TEAM', width: 1000, },
  { id: 'matchs', label: 'ST', },
  { id: 'win', label: 'T', color: "#007AFF" },
  { id: 'draw', label: 'H', color: "#01B243" },
  { id: 'lose', label: 'B', color: "#E4312B" },
  { id: 'score', label: 'HS', },
  { id: 'goal difference', label: 'Đ', color: "#E4312B" },
  { id: '5_matchs', label: '5 trận gần nhất', },
];

const defaultFilters: ITeamTableFilters = {
  competition: 'all',
};

const COMPETITION_OPTIONS = [...COMPETITION_SORT_OPTIONS];
const allOption = { value: 'all', label: 'Tất cả' };
COMPETITION_OPTIONS.unshift(allOption);

export default function BXHList() {
  const table = useTable();
  const [filters, setFilters] = useState(defaultFilters);

  const [tableData, setTableData] = useState(_teamList);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const handleFilters = useCallback((name: string, value: IMatchFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  }, []);
  return (
    <>
      <Stack spacing={3}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        direction={{ sm: 'column', md: 'row' }}
      >
        <Typography sx={{ textTransform: "uppercase", my: 8 }} variant="h4">Bảng xếp hạng bóng đá mới nhất - bảng xếp hạng của mọi giải đấu</Typography>
        <CompetitionSort filters={filters}
          onFilters={handleFilters}
          //
          competitionOptions={COMPETITION_OPTIONS} />
      </Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: { xs: 3, md: 0 } }}>


        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}

            />

            <TableBody>
              {dataFiltered.map((row) => (
                <BXHTableRow
                  key={row.id}
                  row={row}
                />
              ))}

              {/* <TableNoData notFound={notFound} /> */}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: ITeamItem[];
  comparator: (a: any, b: any) => number;
  filters: ITeamTableFilters;
}) {
  const { competition } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);



  if (competition !== 'all') {
    inputData = inputData.filter((team) => team.competition === competition);
  }


  return inputData;
}
