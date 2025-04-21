import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Modal from '@mui/material/Modal';
import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import { UpdateVendors } from '../update-vendors'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { FlexBox } from '../flexbox'
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import VendorsTableRow from './VendorsTableRow'
import VendorsTableHead from './VendorsTableHead'
import VendorsTableActions from './VendorsTableActions'

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
  overflow: 'auto',
  maxHeight: "90dvh"
};

export default function Vendors() {
  const [vendorData, setVendorData] = useState([])
  const [addressData, setAddressData] = useState([]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
 
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<any>([]);
  const [displayVendor, setDisplayVendor] = useState<any>(null);

  const [loader, setLoader] = React.useState(false);
  const [modelLoader, setModelLoader] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const [ deleteId, setDeleteId ] = useState<any>();
  const [ modelOpen, setModelOpen ] = useState(false);
  const [reason, setReason ] = useState("");
  
  const [ isGetAddrLoading, setIsGetAddrLoading ] = useState(false);

  const [vendorUpdate, setIsVendorUpdate] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setIsVendorUpdate(false);
  }

  const handleCloseModel = () => {
    setModelOpen(false);
    setDeleteId(null);
    setReason("");
  }

  const [productFilter, setProductFilter] = useState({
    search: '',
    status: ''
  })

  const handleChangeFilter = (key: string, value: string) => {
    setProductFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() => {
    getVendors();
  }, [ , productFilter, page, rowsPerPage])

  const checkVendorByPincode = async (pincode: any) => {
    try{
      setIsGetAddrLoading(true);
      let validAddress = await ApiService.checkValidAddress(pincode);
      setAddressData(validAddress.data && validAddress.data.length > 0 && validAddress.data[0]);
    }catch(e){
      console.log(e);
      Toast.showErrorMessage("Error Fetching Address");
    }finally{
      setIsGetAddrLoading(false);
    }
  }

  const getVendors = async() => {
    try{
      const vendors = await ApiService.getAllVendors(productFilter.status, productFilter.search, page, rowsPerPage);
      console.log('vendors.data: ', vendors.data);
      setVendorData(vendors.data)
      setTotal(vendors.totalCount)
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

  const handleDeleteVendor = async (id: number) => {
    let deleteProduct = await ApiService.deleteVendors(id);
      Toast.showSuccessMessage('Vendors deleted Successfully');
      await getVendors();
  }

  const handleAllVendorDelete = async () => {
    try{
      let deleteProduct = await ApiService.deleteVendors(selected);
      Toast.showSuccessMessage('Vendors deleted Successfully');
      setSelected([]);
      await getVendors();
    }catch(e){

    }
  }

  const hanleViewOpen = (vendor: any) => {
    setDisplayVendor(vendor)
    setOpen(true)
  }

  const hanleEditOpen = (vendor: any) => {
    setDisplayVendor(vendor)
    setEditOpen(true)
    setIsVendorUpdate(true);
  }

  const handleReject = async (id: any) => {
    console.log(id);
    setDeleteId(id);
    setModelOpen(true);
  }

  const rejectUserRequest = async () => {
    try{
      setModelLoader(true);
      let rejectVendor = await ApiService.rejectVendors(deleteId, reason);
      console.log('rejectVendor: ', rejectVendor);
      Toast.showSuccessMessage("Vendor Profile Rejected Successfully. Email with reason sent.");
      await getVendors();
    }catch(e: any){
      console.log(e);
      Toast.showSuccessMessage(e.response.data.message || "Error Accepting Vendor");
      console.log(e);
    }finally{
      setModelLoader(false);
      handleCloseModel();
    }
  }

  const handleAccept = async (id: any) => {
    try{
      setLoader(true);
      let acceptVendor = await ApiService.acceptVendors(id); 
      console.log('acceptVendor: ', acceptVendor);
      Toast.showSuccessMessage("Vendor Profile Accepted Successfully. Confirmation Email with stripe onboarding sent.");
      await getVendors();
    }catch(e: any){
      Toast.showSuccessMessage(e.response.data.message || "Error Accepting Vendor");
      console.log(e);
    }finally{
      setLoader(false);
    }
  }

  return (
    <div className="pt-2 pb-4">

       
<Modal
        open={modelOpen}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title-model"
        aria-describedby="modal-modal-description-model"
      >
        <Box sx={style}>
          <Scrollbar>
              <Box p={{xs:1, md:3}} onClick={handleClose} sx={{ display:'flex',alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, width:'100%', zIndex:2, backgroundColor:'#fff'}} >
                <Typography  variant='h6' fontWeight={600}>Reject Reason </Typography>
                <CloseIcon  sx={{cursor:'pointer'} } onClick={handleCloseModel}/>
              </Box>
              <Box sx={{ display: 'flex', flexDirection:'column', gap: 2, px:{ xs: 1, md: 3 }, pb:3 }}>
                <TextField placeholder='Write Reason Here...' name='reason' multiline fullWidth rows={10} value={reason} onChange={(e: any) => { setReason(e.target.value) }} />
                <FlexBox gap={2}>
                  <LoadingButton loading={modelLoader} disabled={reason === ''} onClick={() => { rejectUserRequest() }}>Submit</LoadingButton>
                  <Button onClick={() => { handleCloseModel() }}>Cancel</Button>
                </FlexBox>
              </Box>
          </Scrollbar>
        </Box>
      </Modal>
 
      <Modal
        open={open || editOpen }
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Scrollbar >
            <Box p={{xs:1, md:3}} onClick={handleClose} sx={{ display:'flex',alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, width:'100%', zIndex:2, backgroundColor:'#fff'}} >
              <Typography  variant='h6' fontWeight={600}>Profile</Typography>
              <CloseIcon  sx={{cursor:'pointer'}}/>
            </Box>
            <UpdateVendors isUpdate={vendorUpdate} enableUpdate={setIsVendorUpdate} vendor={displayVendor} handleClose={handleClose} onSuccess={getVendors} checkVendorByPincode={checkVendorByPincode} addressData={addressData} isAddressDone={addressData && addressData.length !== 0 } isGetAddrLoading={isGetAddrLoading} />
          </Scrollbar>
        </Box>
      </Modal>
 

      <Card sx={{ mt: 4 }}>
        {/* SEARCH AND PUBLISH FILTER SECTION */}
        <VendorsTableActions filter={productFilter} handleChangeFilter={handleChangeFilter} />

        {/* TABLE ROW SELECTION HEADER  */}
        {selected.length > 0 && (
          <TableToolbar selected={selected.length} handleDeleteRows={handleAllVendorDelete} />
        )}

        {/* TABLE HEAD AND ROW SECTION */}
        <TableContainer>
          <Scrollbar>
            <Table sx={{ minWidth: 820 }}>
              <VendorsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={vendorData.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={(event) => handleSelectAllRows(event, vendorData.map((row: any) => row.id))}
              />

              <TableBody>
                {vendorData
                  .map((vendor: any) => (
                    <VendorsTableRow
                      key={vendor.id}
                      vendor={vendor}
                      handleSelectRow={handleSelectRow}
                      hanleViewOpen={hanleViewOpen}
                      hanleEditOpen={hanleEditOpen}
                      isSelected={isSelected(vendor.id)}
                      handleDeleteVendor={handleDeleteVendor}
                      handleAccept={handleAccept}
                      handleReject={handleReject}
                      loader={loader}
                    />
                  ))}

                {vendorData.length === 0 && <TableDataNotFound />}
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
      </Card>
    </div>
  )
}
