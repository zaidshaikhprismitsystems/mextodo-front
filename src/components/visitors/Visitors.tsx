import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Box, Card, IconButton, Modal, Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import styled from '@mui/material/styles/styled'
// CUSTOM ICON COMPONENT
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import VisitorsTableRow from './VisitorsTableRow'
import VisitorsTableHead from './VisitorsTableHead'
import VisitorsTableActions from './VisitorsTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import React from 'react'
// import { category_url } from '../../config/config'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import DatasetIcon from '@mui/icons-material/Dataset';
import { CloseOutlined } from '@mui/icons-material'
import { CategoryForm } from '../category-form'
import CloseIcon from '@mui/icons-material/Close';

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
  maxHeight:600
};

export default function Visitors() {

  const [visitorsData, setVisitorsData] = useState([])

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<any>([]);
  const [displayCategory, setDisplayCategory] = useState<any>(null);

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setIsEdit(false);
  }

  const [visitorFilter, setVisitorFilter] = useState({
    search: '',
    country: '',
    region: '',
    city: ''
  });

  const handleChangeFilter = (key: string, value: string) => {
    setVisitorFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() => {
    getCategories();
  }, [, visitorFilter, page, rowsPerPage])

  const getCategories = async () => {
    try {
      const visitors = await ApiService.getVisitorsList(visitorFilter.search, visitorFilter.country, visitorFilter.region, visitorFilter.city, page, rowsPerPage);
      console.log('visitors: ', visitors);
      setVisitorsData(visitors.data)
      setTotal(visitors.totalCount)
    } catch (e) {
      console.log(e);
    }
  }

  const isSelected = (id: number) => {
    return selected.includes(id);
  }

  const handleSelectRow = (event: any, id: number) => {
    setSelected((prevSelected: any) =>
      prevSelected.includes(id) ? prevSelected.filter((item: number) => item !== id)
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

  const handleDeleteCategory = async (id: number) => {
    let deleteCategory = await ApiService.deleteCategories(id);
    Toast.showSuccessMessage('Category deleted Successfully');
    await getCategories();
  }

  const handleAllCategoryDelete = async () => {
    try {
      let deleteCategory = await ApiService.deleteCategories(selected);
      Toast.showSuccessMessage('Categories deleted Successfully');
      setSelected([]);
      await getCategories();
    } catch (e) {

    }
  }

  const hanleViewOpen = (Category: any) => {
    setDisplayCategory(Category)
    setOpen(true)
  }

  const hanleEditOpen = (Category: any) => {
    setDisplayCategory(Category)
    setEditOpen(true)
    setIsEdit(true);
  }

  const onSuccess = async () => {
    setEditOpen(false)
    setIsEdit(false);
    setDisplayCategory(null);
    await getCategories();
  }

  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ pt: 2, pb: 4 }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DatasetIcon color="primary" />
                </IconWrapper>

                <H6 sx={{ m: 0 }} fontSize={16}>Visitors</H6>
              </FlexBox>
            </Grid>

            <Grid size={12}>
              {/* SEARCH AND PUBLISH FILTER SECTION */}
              <VisitorsTableActions filter={visitorFilter} handleChangeFilter={handleChangeFilter} />
            </Grid>

            <Grid size={{
              md: 12,
              xs: 12
            }}>

              {/* TABLE ROW SELECTION HEADER  */}
              {/* {selected.length > 0 && (
                <TableToolbar selected={selected.length} handleDeleteRows={handleAllCategoryDelete} />
              )} */}

              {/* TABLE HEAD AND ROW SECTION */}
              <TableContainer>
                <Scrollbar>
                  <Table sx={{ minWidth: 820 }}>
                    <VisitorsTableHead
                      order={order}
                      orderBy={orderBy}
                      numSelected={selected.length}
                      rowCount={visitorsData.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllRows={(event) => handleSelectAllRows(event, visitorsData.map((row: any) => row.id))}
                    />
                    <TableBody>
                      {visitorsData
                        .map((visitor: any, index: number) => (
                          <VisitorsTableRow
                            visitor={visitor}
                          />
                        ))}

                      {visitorsData.length === 0 && <TableDataNotFound />}
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
