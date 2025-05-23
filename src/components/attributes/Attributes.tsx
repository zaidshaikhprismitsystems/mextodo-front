import { ChangeEvent, useEffect, useState } from 'react'
// MUI
import { Box, Card, Modal, Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import AttributeTableRow from './AttributesTableRow'
import AttributeTableHead from './AttributesTableHead'
import AttributeTableActions from './AttributesTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import CloseIcon from '@mui/icons-material/Close';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { AttributeForm } from '../attribute-form'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth:'95%',
  bgcolor: 'background.paper',
  borderRadius:'10px',
  pt: 0,
  overflow: 'hidden',
  height: "90dvh",
  maxHeight:500
};

export default function AttributesListPageView() {
  const [attributesData, setAttributesData] = useState([])
  
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
 
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<any>([]);
  const [displayAttribute, setDisplayAttribute] = useState<any>(null);

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  }

  const onSuccess = async () => {
    setEditOpen(false)
    setIsEdit(false);
    setDisplayAttribute(null);
    await getAttributes();
  }

  const [attributeFilter, setAttributeFilter] = useState({
    search: '',
    status: ''
  })

  const handleChangeFilter = (key: string, value: string) => {
    setAttributeFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() =>{
    getAttributes();
  }, [ , attributeFilter, page, rowsPerPage])

  const getAttributes = async() => {
    try{
      const attributes = await ApiService.getAttributeList(attributeFilter.status, attributeFilter.search, page, rowsPerPage);
      setAttributesData(attributes.data)
      setTotal(attributes.totalCount)
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

  const handleDeleteAttribute = async (id: number) => {
    await ApiService.deleteAttributes(id);
    Toast.showSuccessMessage('Attribute deleted Successfully');
    await getAttributes();
  }

  const handleAllAttributeDelete = async () => {
    try{
      await ApiService.deleteAttributes(selected);
      Toast.showSuccessMessage('Attributes deleted Successfully');
      setSelected([]);
      await getAttributes();
    }catch(e){

    }
  }

  const hanleViewOpen = (Attribute: any) => {
    setDisplayAttribute(Attribute)
    setOpen(true)
  }

  const hanleEditOpen = (Attribute: any) => {
    setDisplayAttribute(Attribute)
    setIsEdit(true);
    setEditOpen(true)
  }

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
            <Typography variant='h6' fontWeight={600}>Attributes</Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} />
          </Box>
          <AttributeForm
            attribute={displayAttribute}
            isUpdate={isEdit}
            handleClose={handleClose}
            onSuccess={onSuccess}
          />
        </Scrollbar>
        </Box>
      </Modal>
    <Box  sx={{pt: 2, pb: 4}}>
      <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DeviceHubIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>Attributes List</H6>
              </FlexBox>
            </Grid>
            <Grid size={12}>
               {/* SEARCH AND PUBLISH FILTER SECTION */}
            <AttributeTableActions filter={attributeFilter} handleChangeFilter={handleChangeFilter} />
            </Grid>

            <Grid  size={{
                xs: 12
              }}>

                {/* TABLE ROW SELECTION HEADER  */}
                {selected.length > 0 && (
                  <TableToolbar selected={selected.length} handleDeleteRows={handleAllAttributeDelete} />
                )}

                {/* TABLE HEAD AND ROW SECTION */}
                <TableContainer>
                  <Scrollbar>
                    <Table sx={{ minWidth: 820 }}>
                      <AttributeTableHead
                        order={order}
                        orderBy={orderBy}
                        numSelected={selected.length}
                        rowCount={attributesData.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllRows={(event) => handleSelectAllRows(event, attributesData.map((row: any) => row.id))}
                      />

                      <TableBody>
                        {attributesData
                          .map((attribute: any) => (
                            <AttributeTableRow
                              key={attribute.id}
                              attribute={attribute}
                              handleSelectRow={handleSelectRow}
                              hanleViewOpen={hanleViewOpen}
                              hanleEditOpen={hanleEditOpen}
                              isSelected={isSelected(attribute.id)}
                              handleDeleteAttributes={handleDeleteAttribute}
                            />
                          ))}

                        {attributesData.length === 0 && <TableDataNotFound />}
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
