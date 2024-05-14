'use client';

import { Container, IconButton, Pagination, Table, TableBody, TableContainer, Tooltip, Typography, paginationClasses } from '@mui/material';
import { useSettingsContext } from '#/components/settings';
import { IUserItem, IUserTableFilters } from '#/types/user';
import { TableHeadCustom, TableSelectedAction, getComparator, useTable } from '#/components/table';
import { useEffect, useState } from 'react';

import Iconify from '#/components/iconify';
import Scrollbar from '#/components/scrollbar';
import UserTableRow from '../user-table-row';
import { useBoolean } from '#/hooks/use-boolean';
import { useGetUsers } from '#/api/user';
import TableSkeleton from '#/sections/skeletons/table-skeleton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Họ tên' },
  { id: 'userName', label: 'Username', width: 180 },
  { id: 'phone', label: 'Số điện thoại', width: 220 },
  { id: 'createdAt', label: 'Ngày tạo', width: 180 },
];


export default function UserListView() {
  const table = useTable();
  const [currentPage, setCurrentPage] = useState(1);


  const { users, usersLoading, usersEmpty, paginate } = useGetUsers(currentPage);


  const settings = useSettingsContext();

  const confirm = useBoolean();


  const [tableData, setTableData] = useState<IUserItem[]>([]);




  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (users.length) {
      setTableData(users);
    }

  }, [users]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });









  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>

      <Typography sx={{
        mb: { xs: 3, md: 5 }
      }} variant="h3">Danh sách người dùng</Typography>
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
            <Tooltip title="Xóa">
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
              {usersLoading ? (
                [...Array(table.rowsPerPage)].map((i, index) => (
                  <TableSkeleton key={index} />
                ))
              ) : (
                <>
                  {dataFiltered.map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                    />
                  ))}
                </>
              )}



            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <Pagination
        count={paginate && paginate.total && paginate.per_page ? Math.ceil(paginate.total / paginate.per_page) : 1}
        page={currentPage}
        onChange={handlePageChange}
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
