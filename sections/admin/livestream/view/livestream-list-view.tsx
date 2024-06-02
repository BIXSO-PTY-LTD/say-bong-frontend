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
import { IMatchFilters, IMatchInfo, IMatchItem } from '#/types/match';
import { ILivestreamFilterValue, ILivestreamFilters, ILivestreamItem } from '#/types/livestream';
import { useGetInfoMatches, useGetMatches } from '#/api/match';
import LivestreamTableToolbar from '../livestream-table-toolbar';
import LivestreamTableRow from '../livestream-table-row';
import { fTimestamp, formatStringToDateTime } from '#/utils/format-time';
import LivestreamTableFiltersResult from '../livestream-table-filters-result';
import { MATCH_HOT_OPTIONS, MATCH_LIVE_OPTIONS, MATCH_PROCESS_OPTIONS, MATCH_VIDEO_OPTIONS } from '#/_mock';
import { getMatchStatus } from '#/utils/matchFilter';
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
  videoSource: '',
  live: '',
  hot: ''
};

// ----------------------------------------------------------------------
export default function LivestreamListView() {
  const table = useTable();

  const { matches, matchesLoading } = useGetMatches();

  const { livestreams } = useGetLivestreams(1, 100);

  const { matchesInfo } = useGetInfoMatches();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState<IMatchItem[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
    dateError,
    matchesInfo,
    livestreams
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


  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h3">Danh sách livestream</Typography>


        <Card>

          <LivestreamTableToolbar
            filters={filters}
            onFilters={handleFilters}
            canReset={canReset}
            onResetFilters={handleResetFilters}
            roleOptions={MATCH_PROCESS_OPTIONS}
            videoOptions={MATCH_VIDEO_OPTIONS}
            liveOptions={MATCH_LIVE_OPTIONS}
            hotOptions={MATCH_HOT_OPTIONS}
          //
          />
          {/* {canReset && (
            <LivestreamTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )} */}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                // onSort={table.onSort}
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
                          livestreams={livestreams}
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
  filters,
  dateError,
  matchesInfo,
  livestreams
}: {
  inputData: IMatchItem[];
  filters: ILivestreamFilters;
  dateError: boolean;
  matchesInfo: IMatchInfo[];
  livestreams: ILivestreamItem[];
}) {
  const { league_title, startDate, endDate, process, localTeam, visitorTeam, videoSource, hot, live } = filters;



  if (!matchesInfo) {
    return [];
  }

  const matchingIds = inputData.map((item) => item.matchId);

  // Filter matchesInfo to get the matching MatchInfo objects
  const matchingMatchesInfo = matchesInfo.filter((matchInfo) => matchingIds.includes(matchInfo.matchId));

  if (localTeam) {
    inputData = inputData.filter(
      (item) => item.localteam_title.toLowerCase().indexOf(localTeam.toLowerCase()) !== -1
    );
  }

  if (visitorTeam) {
    inputData = inputData.filter(
      (item) => item.visitorteam_title.toLowerCase().indexOf(visitorTeam.toLowerCase()) !== -1
    );
  }


  if (videoSource) {
    inputData = inputData.filter((item) => {
      if (videoSource.toLowerCase() === "có") {
        return item.m3u8 !== "";
      } else {
        return item.m3u8 === ""; // Include all items when videoSource is not "có"
      }
    });
  }
  if (hot) {
    const hotValue = hot.toLowerCase(); // Convert to lowercase for comparison
    livestreams = livestreams.filter((livestream) => {
      const hotMeta = livestream.meta?.find(meta => meta.key === "hot");
      if (hotMeta) {
        return hotMeta?.content?.toLowerCase() === hotValue;
      }
      return false; // If there's no "hot" meta, exclude the livestream
    });

    // Filter inputData based on matching livestream titles
    inputData = inputData.filter((item) => {
      // Find if there's any livestream whose title matches the matchId of the current item
      return livestreams.some((livestream) => livestream.title === item.matchId);
    });
  }

  if (live) {
    const liveValue = live.toLowerCase();
    livestreams = livestreams.filter((livestream) => {
      const liveMeta = livestream.meta?.find(meta => meta.key === "live");
      if (liveMeta) {
        return liveMeta?.content?.toLowerCase() === liveValue;
      }
      return false;
    });

    // Filter inputData based on matching livestream titles
    inputData = inputData.filter((item) => {
      // Find if there's any livestream whose title matches the matchId of the current item
      return livestreams.some((livestream) => livestream.title === item.matchId);
    });

  }


  if (process) {
    inputData = inputData.filter((item) => {
      const matchInfo = matchingMatchesInfo.find((info) => info.matchId === item.matchId);
      const matchStatus = matchInfo ? getMatchStatus(matchInfo.match_time, matchInfo.halfStartTime) : { round: "Chưa bắt đầu" };

      if (process === "Chưa bắt đầu") {
        return matchStatus.round === "Chưa bắt đầu";
      } else {
        return matchStatus.round === process || process.includes("Chưa bắt đầu");
      }
    });
  }
  if (league_title) {
    inputData = inputData.filter(
      (item) => item.league_title.toLowerCase().indexOf(league_title.toLowerCase()) !== -1
    );
  }

  if (!dateError && startDate && endDate) {
    inputData = inputData.filter(
      (match) =>
        fTimestamp(formatStringToDateTime(match.startTimez)) >= fTimestamp(startDate) &&
        fTimestamp(formatStringToDateTime(match.startTimez)) <= fTimestamp(endDate)
    );
  }


  inputData.sort((a, b) => {
    return formatStringToDateTime(a.startTimez).getTime() - formatStringToDateTime(b.startTimez).getTime();
  });


  return inputData;
}

// ----------------------------------------------------------------------
