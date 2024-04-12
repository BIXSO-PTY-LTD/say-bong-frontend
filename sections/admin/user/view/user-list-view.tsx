'use client';

import { Button, Container, IconButton, Pagination, Stack, Table, TableBody, TableContainer, Tooltip, Typography, paginationClasses } from '@mui/material';
import { _careerPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useSettingsContext } from '#/components/settings';
import { IUserItem, IUserTableFilters } from '#/types/user';
import { TableHeadCustom, TableNoData, TableSelectedAction, TableSkeleton, getComparator, useTable } from '#/components/table';
import { useRouter } from '#/routes/hooks';
import { useCallback, useEffect, useState } from 'react';
import { _userList } from '#/_mock/_user';
import isEqual from 'lodash.isequal';
import Iconify from '#/components/iconify';
import Scrollbar from '#/components/scrollbar';
import UserTableRow from '../user-table-row';
import { useBoolean } from '#/hooks/use-boolean';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { useDeleteUser, useGetUsers } from '#/api/user';
import { ConfirmDialog } from '#/components/custom-dialog';
import { mutate } from 'swr';
import { endpoints } from '#/utils/axios';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Họ tên' },
  { id: 'userName', label: 'Username', width: 180 },
  { id: 'phone', label: 'Số điện thoại', width: 220 },
  { id: 'createdAt', label: 'Ngày tạo', width: 180 },
  { id: '', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
};

export default function UserListView() {
  const table = useTable();

  const { users, usersLoading, usersEmpty, paginate } = useGetUsers();


  const settings = useSettingsContext();

  const confirm = useBoolean();


  const [tableData, setTableData] = useState<IUserItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (paginate.current_page) {
      setCurrentPage(paginate.current_page);
    }
  }, [paginate]);

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

  const startIndex = (currentPage - 1) * paginate.per_page;
  const endIndex = Math.min(startIndex + paginate.per_page, paginate.total);

  const dataInPage = dataFiltered.slice(startIndex, endIndex);

  const canReset = !isEqual(defaultFilters, defaultFilters);

  const notFound = (!dataFiltered.length && canReset) || usersEmpty;



  const deleteUser = useDeleteUser();

  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await deleteUser(id);
        mutate(endpoints.user.list)
        const updatedTableData = tableData.filter((row) => row.id !== id);
        setTableData(updatedTableData);

        table.onUpdatePageDeleteRow(dataInPage.length);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    [dataInPage.length, table, tableData, deleteUser]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      const deletedRowIds = table.selected;


      await Promise.all(
        deletedRowIds.map(async (id) => {
          await deleteUser(id);
          mutate(endpoints.user.list)
        })
      );


      const updatedTableData = tableData.filter((row) => !deletedRowIds.includes(row.id));
      setTableData(updatedTableData);

      table.onUpdatePageDeleteRows({
        totalRows: updatedTableData.length,
        totalRowsInPage: dataInPage.length,
        totalRowsFiltered: dataFiltered.length,
      });
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  }, [dataFiltered.length, dataInPage.length, table, tableData, deleteUser]);

  return (
    <>
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
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}
                  </>
                )}



                <TableNoData notFound={notFound} />
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
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
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
            Delete
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
