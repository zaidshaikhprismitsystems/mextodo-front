import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import styled from '@mui/material/styles/styled'
// CUSTOM ICON COMPONENT
import Add from '../../icons/Add'
// CUSTOM COMPONENTS
import Scrollbar from '../../components/scrollbar'
import { TableDataNotFound, TableToolbar } from '../../components/table'
import ProductTableRow from './ProductTableRow'
import ProductTableHead from './ProductTableHead'
import ProductTableActions from './ProductTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import { ProductPreview } from '../product-preview'
import Modal from '@mui/material/Modal';
import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { product_url } from '../../config/config'
import { UpdateProducts } from '../update-products'
import { useTranslation } from 'react-i18next'
import { CloseOutlined, Height } from "@mui/icons-material"
import LoadingButton from '@mui/lab/LoadingButton'
//  STYLED COMPONENTS
const ListWrapper = styled('div')(({ theme }) => ({
  gap: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down(440)]: {
    flexDirection: 'column',
    '.MuiButton-root': { width: '100%' },
  },
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
  height: "600px"
};

const styleRejectModel = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  minWidth: 300,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  overflow: 'auto'
};

export default function ProductListPageView() {
  const navigate = useNavigate()

  const [productsData, setProductsData] = useState([])

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
 
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<any>([]);
  const [displayProduct, setDisplayProduct] = useState<any>(null);
  const [attributes, setAttributeList] = useState<any>([]);
  const [categoryAttrLoading, setCategoryAttrLoading] = useState(false);
  const [ deleteId, setDeleteId ] = useState<any>();

  const [loader, setLoader] = React.useState(false);
  const [modelLoader, setModelLoader] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const [ modelOpen, setModelOpen ] = useState(false);
  const [reason, setReason ] = useState("");
  
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  }

  const [productFilter, setProductFilter] = useState({
    stock: '',
    search: '',
    status: ''
  })

  const handleChangeFilter = (key: string, value: string) => {
    setProductFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() =>{
    getProducts();
  }, [ , productFilter, page, rowsPerPage])

  const getProducts = async() => {
    try{
      const products = await ApiService.getOwnerProducts(productFilter.status, productFilter.search, productFilter.stock, page, rowsPerPage);
      setProductsData(products.data)
      setTotal(products.totalCount)
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

  const handleDeleteProduct = async (id: number) => {
    let deleteProduct = await ApiService.deleteProducts(id);
      Toast.showSuccessMessage('Product deleted Successfully');
      await getProducts();
  }

  const handleAllProductDelete = async () => {
    try{
      let deleteProduct = await ApiService.deleteProducts(selected);
      Toast.showSuccessMessage('Products deleted Successfully');
      setSelected([]);
      await getProducts();
    }catch(e){

    }
  }

  const hanleViewOpen = (product: any) => {
    setDisplayProduct(product)
    setOpen(true)
  }

  const hanleEditOpen = (product: any) => {
    setDisplayProduct(product)
    setEditOpen(true)
  }

  useEffect(() => {
    if(displayProduct?.categoryId){
      fetchCategoryAttributes(displayProduct?.categoryId)
    }
  }, [displayProduct?.categoryId])

  const fetchCategoryAttributes = async (selectedCategory: any) => {
    try {
      setCategoryAttrLoading(true);
      let categoryAttributes = await ApiService.fetchCategoryAttributes(selectedCategory);
      setAttributeList(categoryAttributes.data);
    } catch (error: any) {
      Toast.showErrorMessage(error.response.data.message);
    }finally{
      setCategoryAttrLoading(false);
    }
  }

  const rejectProductRequest = async () => {
    try{
      setModelLoader(true);
      let rejectProdcut = await ApiService.rejectProduct(deleteId, reason);
      console.log('rejectProdcut: ', rejectProdcut);
      Toast.showSuccessMessage("Product Rejected.");
      await getProducts();
    }catch(e: any){
      console.log(e);
      Toast.showSuccessMessage(e.response.data.message || "Error Rejecting Product");
      console.log(e);
    }finally{
      setModelLoader(false);
      handleCloseModel();
    }
  }

  const handleAccept = async (id: any) => {
    try{
      setLoader(true);
      let acceptVendor = await ApiService.acceptProduct(id); 
      console.log('acceptVendor: ', acceptVendor);
      Toast.showSuccessMessage("Product Accepted Successfully.");
      await getProducts();
    }catch(e: any){
      Toast.showSuccessMessage(e.response.data.message || "Error Accepting Vendor");
      console.log(e);
    }finally{
      setLoader(false);
    }
  }


  const handleCloseModel = () => {
    setModelOpen(false);
    setDeleteId(null);
    setReason("");
  }

  const handleReject = async (id: any) => {
    setDeleteId(id);
    setModelOpen(true);
  }

  const { t } = useTranslation();
  
  return (
    <div className="pt-2 pb-4">

      <Modal
        open={modelOpen}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title-model"
        aria-describedby="modal-modal-description-model"
      >
        <Box sx={styleRejectModel}>
        <IconButton
            aria-label="close"
            onClick={handleCloseModel}
            sx={{
              position: "absolute",
              top: 2,
              right: 10,
              color: "gray",
            }}
          >
            <CloseOutlined />
          </IconButton>
          <TextField sx={{mt: 2}} placeholder='Write Reason Here...' name='reason' multiline fullWidth rows={10} value={reason} onChange={(e: any) => { setReason(e.target.value) }} />
          <Box sx={{mt: 2, display: 'flex', gap: 2}}>
            <LoadingButton loading={modelLoader} disabled={reason === ''} onClick={() => { rejectProductRequest() }}>Submit</LoadingButton>
            <Button onClick={() => { handleCloseModel() }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={open || editOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 2,
              right: 10,
              color: "gray",
            }}
          >
            <CloseOutlined />
          </IconButton>
          {
            !categoryAttrLoading && open ?
              <ProductPreview 
                categoryName={displayProduct.category.nameEn} 
                featuredImage={`${product_url}/${displayProduct?.featuredImage}`}
                images={displayProduct?.images.map((image: string) => `${product_url}/${image}`)}
                video={`${product_url}/${displayProduct?.video}`}
                title={displayProduct?.titleEn} 
                description={displayProduct?.descriptionEn} 
                titleSp={displayProduct?.titleSp} 
                descriptionSp={displayProduct?.descriptionSp} 
                price={displayProduct?.price} 
                discountPrice={displayProduct?.discount_price}
                packType={displayProduct?.packType}
                content={displayProduct?.content}
                boxQuantity={displayProduct?.boxQuantity}
                attributes={attributes.map((obj: any) => {
                  return { name: obj.attribute.nameEn, nameSp: obj.attribute.nameSp, value: displayProduct?.attributes[obj.attribute.nameEn] };
                })}
                pysicalAttributes={displayProduct?.attributes}
                isView={true}
            />
            : 
            <UpdateProducts 
              product={displayProduct} 
              handleClose={handleClose} 
              attributes={attributes.map((obj: any) => {
                return { name: obj.attribute.nameEn, nameSp: obj.attribute.nameSp, value: displayProduct?.attributes[obj.attribute.nameEn] };
              })}
              onSuccess={getProducts}
            />
          }
        </Box>
      </Modal>

      <ListWrapper>
        <Tabs
          value={productFilter.stock}
          onChange={(_, value) => handleChangeFilter('stock', value)}
        >
          <Tab disableRipple label={t("all")} value="" />
          <Tab disableRipple label={t("in_stock")} value="stock" />
          <Tab disableRipple label={t("out_of_stock")} value="out-of-stock" />
        </Tabs>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/dashboard/add-products')}
        >
          {t("add_product")}
        </Button>
      </ListWrapper>

      <Card sx={{ mt: 4 }}>
        {/* SEARCH AND PUBLISH FILTER SECTION */}
        <ProductTableActions filter={productFilter} handleChangeFilter={handleChangeFilter} />

        {/* TABLE ROW SELECTION HEADER  */}
        {selected.length > 0 && (
          <TableToolbar selected={selected.length} handleDeleteRows={handleAllProductDelete} />
        )}

        {/* TABLE HEAD AND ROW SECTION */}
        <TableContainer>
          <Scrollbar>
            <Table sx={{ minWidth: 820 }}>
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={productsData.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={(event) => handleSelectAllRows(event, productsData.map((row: any) => row.id))}
              />

              <TableBody>
                {productsData
                  .map((product: any) => (
                    <ProductTableRow
                      key={product.id}
                      product={product}
                      handleSelectRow={handleSelectRow}
                      hanleViewOpen={hanleViewOpen}
                      hanleEditOpen={hanleEditOpen}
                      isSelected={isSelected(product.id)}
                      handleDeleteProduct={handleDeleteProduct}
                      handleAccept={handleAccept}
                      handleReject={handleReject}
                      loader={loader}
                    />
                  ))}

                {productsData.length === 0 && <TableDataNotFound />}
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
