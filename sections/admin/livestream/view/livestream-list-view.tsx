'use client';

import { Button, Card, Container, IconButton, Tab, Table, TableBody, TableContainer, Tabs, Tooltip, Typography, alpha } from '@mui/material';
import { useSettingsContext } from '#/components/settings';

import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { useCallback, useEffect, useState } from 'react';
import Label from '#/components/label';
import { TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, emptyRows, getComparator, useTable } from '#/components/table';
import Scrollbar from '#/components/scrollbar';
import { useRouter } from '#/routes/hooks';
import { useBoolean } from '#/hooks/use-boolean';
import isEqual from 'lodash.isequal';
import { ConfirmDialog } from '#/components/custom-dialog';
import { useGetLivestreams } from '#/api/livestream';
import { IMatchFilters, IMatchItem } from '#/types/match';
import { ILivestreamFilterValue, ILivestreamFilters } from '#/types/livestream';
import { useGetMatches } from '#/api/match';
import LivestreamTableToolbar from '../livestream-table-toolbar';
import LivestreamTableRow from '../livestream-table-row';
// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'id', label: '#' },
  { id: 'league_title', label: 'Tên giải đấu' },
  { id: 'startDate', label: 'Ngày thi đấu' },
  { id: 'process', label: 'Tiến độ trận đấu' },
  { id: 'localTeam', label: 'Đội nhà' },
  { id: 'visitorTeam', label: 'Đội khách' },
  { id: 'videoSource', label: 'Nguồn video' },
  { id: 'live', label: 'Live' },
  { id: 'hot', label: 'Lập lịch thủ công' },
  { id: 'score', label: 'Tỷ số hiện tại' },
  { id: 'actions', label: 'Thao tác' },
];

const defaultFilters: ILivestreamFilters = {
  league_title: '',
  process: '',
  startDate: null,
  endDate: null,
  localTeam: '',
  visitorTeam: '',
  videoSource: false,
  live: false,
  hot: false
};

// ----------------------------------------------------------------------
export default function LivestreamListView() {
  const table = useTable();

  const { matches, matchesLoading } = useGetMatches();
  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState<IMatchItem[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  useEffect(() => {
    if (matches) {
      setTableData(matches)
    }
  }, [matches])

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: ILivestreamFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.matchId !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.matchId));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.livestream.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography variant="h3">Danh sách livestream</Typography>


        <Card>

          <LivestreamTableToolbar
            filters={filters}
            onFilters={handleFilters}
          //
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {matchesLoading ? (
                    <Typography>Loading...</Typography>
                  ) : (
                    dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row, index) => (
                        <LivestreamTableRow
                          key={row.matchId}
                          index={index}
                          row={row}
                          selected={table.selected.includes(row.matchId)}
                          onSelectRow={() => table.onSelectRow(row.matchId)}
                          onDeleteRow={() => handleDeleteRow(row.matchId)}
                          onEditRow={() => handleEditRow(row.matchId)}
                        />
                      ))
                  )}


                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Bạn có chắc muốn xóa? <strong> {table.selected.length} </strong> livestream?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Xóa
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IMatchItem[];
  comparator: (a: any, b: any) => number;
  filters: ILivestreamFilters;
}) {
  const { league_title } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (league_title) {
    inputData = inputData.filter(
      (user) => user.league_title.toLowerCase().indexOf(league_title.toLowerCase()) !== -1
    );
  }



  return inputData;
}

// ----------------------------------------------------------------------
