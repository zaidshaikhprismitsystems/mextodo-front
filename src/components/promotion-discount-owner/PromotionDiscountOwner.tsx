import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// MUI
import {
  Box, Card, Grid, Modal, Typography, Table, TableBody, TableContainer, TablePagination
} from '@mui/material'
import { CloseIcon } from '@mui/icons-material'
import DiscountIcon from '@mui/icons-material/Discount'

// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import PromotionTableRow from './PromotionTableRow'
import PromotionTableHead from './PromotionTableHead'
import PromotionTableActions from './PromotionTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import { useTranslation } from 'react-i18next'
import { FlexBox } from '../flexbox'
import IconWrapper from '../icon-wrapper'
import { H6 } from '../typography'
import PromotionDiscountUpdateOwner from '../promotion-discount-update-owner/PromotionDiscountUpdateOwner'

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

export default function PromotionDiscountOwner() {
  const { t } = useTranslation();

  const [promotions, setPromotions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('code');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<any>(null);

  const [filter, setFilter] = useState({ search: '', status: '' });

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setIsEdit(false);
    setCurrentPromotion(null);
  };

  const onSuccess = async (data: any) => {
    let promotionsData = await promotions.map((promotion: any) => {
      if(promotion.id === data.id){
        return data
      }else{
        return promotion
      }
    })
    setPromotions(promotionsData);
    setEditOpen(false);
    setIsEdit(false);
    setCurrentPromotion(null);
    // await getPromotions();
  };

  const getPromotions = async () => {
    try {
      const result: any = await ApiService.getVendorPromotionList(filter.status, filter.search, page, rowsPerPage);
      setPromotions(result.data);
      setTotal(result.totalCount);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPromotions();
  }, [filter, page, rowsPerPage]);

  const handleChangeFilter = (key: string, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectRow = (_: any, id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>, selectedIds: number[]) => {
    if (event.target.checked) {
      setSelected(selectedIds);
    } else {
      setSelected([]);
    }
  };

  const isSelected = (id: number) => selected.includes(id);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDeletePromotion = async (id: number) => {
    await ApiService.deleteVendorPromotion(id);
    Toast.showSuccessMessage('Promotion deleted successfully');
    await getPromotions();
  };

  const handleAllDelete = async () => {
    await ApiService.deleteVendorPromotion(selected);
    Toast.showSuccessMessage('Promotions deleted successfully');
    setSelected([]);
    await getPromotions();
  };

  const handleEditOpen = (promo: any) => {
    setCurrentPromotion(promo);
    setIsEdit(true);
    setEditOpen(true);
  };

  const handleViewOpen = (promo: any) => {
    setCurrentPromotion(promo);
    setOpen(true);
  };

  return (
    <>
      <Modal open={open || editOpen} onClose={handleClose}>
        <Box sx={style}>
          <Scrollbar>
            <Box
              p={{ xs: 1, md: 3 }}
              onClick={handleClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 2,
                backgroundColor: '#fff'
              }}
            >
              <Typography variant='h6' fontWeight={600}>Promotion</Typography>
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </Box>

            <PromotionDiscountUpdateOwner
              promotion={currentPromotion}
              isUpdate={isEdit}
              handleClose={handleClose}
              onSuccess={onSuccess}
            />
          </Scrollbar>
        </Box>
      </Modal>

      <Box sx={{ pt: 2, pb: 4 }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DiscountIcon color="primary" />
                </IconWrapper>
                <H6 sx={{ m: 0 }} fontSize={16}>Promotion List</H6>
              </FlexBox>
            </Grid>

            <Grid item xs={12}>
              <PromotionTableActions filter={filter} handleChangeFilter={handleChangeFilter} />
            </Grid>

            <Grid item xs={12}>
              {selected.length > 0 && (
                <TableToolbar selected={selected.length} handleDeleteRows={handleAllDelete} />
              )}

              <TableContainer>
                <Scrollbar>
                  <Table sx={{ minWidth: 820 }}>
                    <PromotionTableHead
                      order={order}
                      orderBy={orderBy}
                      numSelected={selected.length}
                      rowCount={promotions.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllRows={(e) => handleSelectAllRows(e, promotions.map(p => p.id))}
                    />

                    <TableBody>
                      {promotions.map((promo) => (
                        <PromotionTableRow
                          key={promo.id}
                          promotion={promo}
                          handleSelectRow={handleSelectRow}
                          isSelected={isSelected(promo.id)}
                          handleDeletePromotion={handleDeletePromotion}
                          handleEditOpen={handleEditOpen}
                          handleViewOpen={handleViewOpen}
                        />
                      ))}

                      {promotions.length === 0 && <TableDataNotFound />}
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
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value || 5)}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
