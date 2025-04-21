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
import CategoryTableRow from './CategoriesTableRow'
import CategoryTableHead from './CategoriesTableHead'
import CategoryTableActions from './CategoriesTableActions'
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

export default function CategoriesListPageView() {

  const [categoriesData, setCategoriesData] = useState([])

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

  const [CategoryFilter, setCategoryFilter] = useState({
    search: '',
    status: ''
  })

  const handleChangeFilter = (key: string, value: string) => {
    setCategoryFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() => {
    getCategories();
  }, [, CategoryFilter, page, rowsPerPage])

  const getCategories = async () => {
    try {
      const Categories = await ApiService.getCategoriesList(CategoryFilter.status, CategoryFilter.search, page, rowsPerPage);
      console.log('Categories: ', Categories);
      setCategoriesData(Categories.data)
      setTotal(Categories.totalCount)
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
      <Modal
        open={open || editOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Scrollbar>
            <Box p={{ xs: 1, md: 3 }} onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top:'0', width: '100%', zIndex: 2, backgroundColor: '#fff' }} >
              <Typography variant='h6' fontWeight={600}>Category</Typography>
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </Box>
            <CategoryForm
              category={displayCategory}
              isUpdate={isEdit}
              handleClose={handleClose}
              onSuccess={onSuccess}
            />
          </Scrollbar>
        </Box>
      </Modal>
      <Box sx={{ pt: 2, pb: 4 }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DatasetIcon color="primary" />
                </IconWrapper>

                <H6 sx={{ m: 0 }} fontSize={16}>Categories List</H6>
              </FlexBox>
            </Grid>

            <Grid size={12}>
              {/* SEARCH AND PUBLISH FILTER SECTION */}
              <CategoryTableActions filter={CategoryFilter} handleChangeFilter={handleChangeFilter} />
            </Grid>

            <Grid size={{
              md: 12,
              xs: 12
            }}>

              {/* TABLE ROW SELECTION HEADER  */}
              {selected.length > 0 && (
                <TableToolbar selected={selected.length} handleDeleteRows={handleAllCategoryDelete} />
              )}

              {/* TABLE HEAD AND ROW SECTION */}
              <TableContainer>
                <Scrollbar>
                  <Table sx={{ minWidth: 820 }}>
                    <CategoryTableHead
                      order={order}
                      orderBy={orderBy}
                      numSelected={selected.length}
                      rowCount={categoriesData.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllRows={(event) => handleSelectAllRows(event, categoriesData.map((row: any) => row.id))}
                    />
                    <TableBody>
                      {categoriesData
                        .map((Category: any, index: number) => (
                          <CategoryTableRow
                            key={Category.id}
                            categories={Category}
                            index={index + 1}
                            handleSelectRow={handleSelectRow}
                            hanleViewOpen={hanleViewOpen}
                            hanleEditOpen={hanleEditOpen}
                            isSelected={isSelected(Category.id)}
                            handleDeleteCategories={handleDeleteCategory}
                          />
                        ))}

                      {categoriesData.length === 0 && <TableDataNotFound />}
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
