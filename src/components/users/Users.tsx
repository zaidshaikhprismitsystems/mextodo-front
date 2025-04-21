import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Box, Button, Card, Container, IconButton, Modal, TextField, Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import styled from '@mui/material/styles/styled'
// CUSTOM ICON COMPONENT
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import UsersTableRow from './UsersTableRow'
import UsersTableHead from './UsersTableHead'
import UsersTableActions from './UsersTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import DatasetIcon from '@mui/icons-material/Dataset';
import { CloseOutlined } from '@mui/icons-material'
import { AttributeForm } from '../attribute-form'
import CloseIcon from '@mui/icons-material/Close';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { UpdateUsers } from '../update-users'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth:'95%',
  bgcolor: 'background.paper',
  borderRadius:'10px',
  // boxShadow: 24,
  pt: 0,
  overflow: 'hidden',
  height: "90dvh",
  maxHeight:500
};

export default function AttributesListPageView() {
  const navigate = useNavigate()

  const [usersData, setUsersData] = useState([])
  
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
 
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<any>([]);
  // const [displayAttribute, setDisplayAttribute] = useState<any>(null);
  
  const [userUpdate, setIsUserUpdate] = useState(false);
  const [displayUser, setDisplayUser] = useState<any>(null);


  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const [isEdit, setIsEdit] = useState(false);
  
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setIsUserUpdate(false);
  }

  const onSuccess = async () => {
    setEditOpen(false)
    setIsEdit(false);
    setDisplayUser(null);
    setIsUserUpdate(false);
    await getUsers();
  }

  const [filter, setAttributeFilter] = useState({
    search: '',
    status: ''
  })

  const handleChangeFilter = (key: string, value: string) => {
    setAttributeFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() =>{
    getUsers();
  }, [ , filter, page, rowsPerPage])

  const getUsers = async() => {
    try{
      const users = await ApiService.getUsersList(filter.status, filter.search, page, rowsPerPage);
      setUsersData(users.data)
      setTotal(users.totalCount)
    }catch(e){
      console.log(e);
    }
  }

  const isSelected = (id: number) => {
    return selected.includes(id);
  }

  const handleSelectRow = (event: any, id: number) => {
    setSelected((prevSelected: any) => 
      prevSelected.includes(id) ? prevSelected.filter((item: number) => item !== id )
    : [...prevSelected, id]
    )
  }

  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>, selectedIds: string[]) => {
    if (event.target.checked) {
        setSelected(selectedIds)
    } else {
        setSelected([])
    }
  }

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleDeleteUser = async (id: number) => {
    let deleteUser = await ApiService.deleteUsers(id);
      Toast.showSuccessMessage('User deleted Successfully');
      await getUsers();
  }

  const handleAllUserDelete = async () => {
    try{
      let deleteUser = await ApiService.deleteUsers(selected);
      Toast.showSuccessMessage('Users deleted Successfully');
      setSelected([]);
      await getUsers();
    }catch(e){

    }
  }

  const hanleViewOpen = (user: any) => {
    setDisplayUser(user)
    setOpen(true)
  }

  const hanleEditOpen = (user: any) => {
    setDisplayUser(user)
    setIsEdit(true);
    setEditOpen(true);
    setIsUserUpdate(true);
  }

  const { t } = useTranslation();

  return (
    <>
    <Modal
        open={open || editOpen }
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Scrollbar>
          <Box p={{xs:1, md:3}} onClick={handleClose} sx={{ display:'flex',alignItems:'center', justifyContent:'space-between', position:'fixed', width:'100%', zIndex:2, backgroundColor:'#fff'}} >
            <Typography  variant='h6' fontWeight={600}>Profile</Typography>
            <CloseIcon  sx={{cursor:'pointer'}}/>
          </Box>
          <UpdateUsers isUpdate={userUpdate} enableUpdate={setIsUserUpdate} user={displayUser} handleClose={handleClose} onSuccess={onSuccess} />
        </Scrollbar>
      </Box>
    </Modal>

    <Box  sx={{pt: 2, pb: 4}}>
      <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <ManageAccountsIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>Users List</H6>
              </FlexBox>
            </Grid>
            <Grid size={12}>
               {/* SEARCH AND PUBLISH FILTER SECTION */}
            <UsersTableActions filter={filter} handleChangeFilter={handleChangeFilter} />
            </Grid>

            <Grid  size={{
                xs: 12
              }}>

                {/* TABLE ROW SELECTION HEADER  */}
                {selected.length > 0 && (
                  <TableToolbar selected={selected.length} handleDeleteRows={handleAllUserDelete} />
                )}

                {/* TABLE HEAD AND ROW SECTION */}
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
                        {usersData
                          .map((user: any) => (
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

                {/* PAGINATION SECTION */}
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
    </>
  )
}
