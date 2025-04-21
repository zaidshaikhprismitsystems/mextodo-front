import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Card, Modal, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Scrollbar from '../scrollbar';
import { TableDataNotFound, TableToolbar } from '../table';
import UsersTableRow from './UsersTableRow';
import UsersTableHead from './UsersTableHead';
import UsersTableActions from './UsersTableActions';
import ApiService from '../../services/apiServices/apiService';
import Toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox";
import IconWrapper from '../icon-wrapper';
import { H6 } from "../typography";
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { UpdateUsers } from '../update-users';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '95%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  pt: 0,
  overflow: 'hidden',
  height: "90dvh",
  maxHeight: 500
};

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<any>([]);
  const [userUpdate, setIsUserUpdate] = useState(false);
  const [displayUser, setDisplayUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setIsUserUpdate(false);
  };

  const onSuccess = async () => {
    setEditOpen(false);
    setDisplayUser(null);
    setIsUserUpdate(false);
    await getUsers();
  };

  const [filter, setAttributeFilter] = useState({
    search: '',
    status: ''
  });

  const handleChangeFilter = (key: string, value: string) => {
    setAttributeFilter((state) => ({ ...state, [key]: value }));
  };

  useEffect(() => {
    getUsers();
  }, [filter, page, rowsPerPage]);

  const getUsers = async () => {
    try {
      const users = await ApiService.getUsersList(filter.status, filter.search, page, rowsPerPage);
      setUsersData(users.data);
      setTotal(users.totalCount);
    } catch (e) {
      console.log(e);
    }
  };

  const isSelected = (id: number) => selected.includes(id);

  const handleSelectRow = (id: number) => {
    setSelected((prevSelected: any) =>
      prevSelected.includes(id) ? prevSelected.filter((item: number) => item !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>, selectedIds: string[]) => {
    setSelected(event.target.checked ? selectedIds : []);
  };

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDeleteUser = async (id: number) => {
    await ApiService.deleteUsers(id);
    Toast.showSuccessMessage('User deleted Successfully');
    await getUsers();
  };

  const handleAllUserDelete = async () => {
    await ApiService.deleteUsers(selected);
    Toast.showSuccessMessage('Users deleted Successfully');
    setSelected([]);
    await getUsers();
  };

  const hanleViewOpen = (user: any) => {
    setDisplayUser(user);
    setOpen(true);
  };

  const hanleEditOpen = (user: any) => {
    setDisplayUser(user);
    setEditOpen(true);
    setIsUserUpdate(true);
  };

  return (
    <Box>
      <Modal open={open || editOpen} onClose={handleClose}>
        <Box sx={style}>
          <Scrollbar>
            <Box p={{ xs: 1, md: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h6' fontWeight={600}>Profile</Typography>
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </Box>
            <UpdateUsers isUpdate={userUpdate} enableUpdate={setIsUserUpdate} user={displayUser} handleClose={handleClose} onSuccess={onSuccess} />
          </Scrollbar>
        </Box>
      </Modal>
      <Box sx={{ pt: 2, pb: 4 }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <ManageAccountsIcon color="primary" />
                </IconWrapper>
                <H6 sx={{ m: 0 }} fontSize={16}>Users List</H6>
              </FlexBox>
            </Grid>
            <Grid size={12}>
              <UsersTableActions filter={filter} handleChangeFilter={handleChangeFilter} />
            </Grid>
            <Grid size={12}>
              {selected.length > 0 && <TableToolbar selected={selected.length} handleDeleteRows={handleAllUserDelete} />}
              <TableContainer>
                <Scrollbar>
                  <Table sx={{ minWidth: 820 }}>
                    <UsersTableHead
                      order={order}
                      orderBy={orderBy}
                      numSelected={selected.length}
                      rowCount={usersData.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllRows={(event) => handleSelectAllRows(event, usersData.map((row: any) => row.id))}
                    />
                    <TableBody>
                      {usersData.map((user: any) => (
                        <UsersTableRow
                          key={user.id}
                          user={user}
                          handleSelectRow={handleSelectRow}
                          hanleViewOpen={hanleViewOpen}
                          hanleEditOpen={hanleEditOpen}
                          isSelected={isSelected(user.id)}
                          handleDelete={handleDeleteUser}
                        />
                      ))}
                      {usersData.length === 0 && <TableDataNotFound />}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePagination
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={total}
                rowsPerPageOptions={[2, 5, 10, 25]}
                onPageChange={(_, page) => setPage(page)}
                onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value || 5)}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}
