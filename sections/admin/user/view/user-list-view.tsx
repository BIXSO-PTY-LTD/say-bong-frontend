'use client';

import { Button, Card, Container, IconButton, Pagination, Stack, Table, TableBody, TableContainer, Tooltip, Typography, paginationClasses } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useSettingsContext } from '#/components/settings';
import { IUserItem, IUserTableFilters } from '#/types/user';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedAction, getComparator, useTable } from '#/components/table';
import { useRouter } from '#/routes/hooks';
import { useCallback, useState } from 'react';
import { _userList } from '#/_mock/_user';
import isEqual from 'lodash.isequal';
import Iconify from '#/components/iconify';
import Scrollbar from '#/components/scrollbar';
import UserTableRow from '../user-table-row';
import { useBoolean } from '#/hooks/use-boolean';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'name', label: 'Họ tên' },
  { id: 'username', label: 'Username', width: 180 },
  { id: 'phoneNumber', label: 'Số điện thoại', width: 220 },
  { id: 'createdAt', label: 'Ngày tạo', width: 180 },
  { id: '', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
};

export default function UserListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const router = useRouter();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);



  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );
  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.user.details(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách người dùng</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.user.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm người dùng
        </Button>
      </Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              tableData.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={confirm.onTrue}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}

            />

            <TableBody>
              {dataFiltered.slice(0, 10)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}
              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
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
    </Container >
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: IUserItem[];
  comparator: (a: any, b: any) => number;
}) {

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);




  return inputData;
}
