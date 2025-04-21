import { useEffect, useState } from 'react';
import { Box, Card, Modal, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Scrollbar from '../scrollbar';
import { TableDataNotFound, TableToolbar } from '../table';
import CategoryTableRow from './CategoriesTableRow';
import CategoryTableHead from './CategoriesTableHead';
import ApiService from '../../services/apiServices/apiService';
import Toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox";
import IconWrapper from '../icon-wrapper';
import { H6 } from "../typography";
import DatasetIcon from '@mui/icons-material/Dataset';
import CloseIcon from '@mui/icons-material/Close';

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
  maxHeight: 600
};

export default function CategoriesListPageView() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const Categories = await ApiService.getCategoriesList("", "", page, rowsPerPage);
        setCategoriesData(Categories.data);
        setTotal(Categories.totalCount);
      } catch (e) {
        console.log(e);
      }
    };
    getCategories();
  }, [page, rowsPerPage]);

  const handleDeleteCategory = async (id: number) => {
    try {
      await ApiService.deleteCategories(id);
      Toast.showSuccessMessage('Category deleted Successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Scrollbar>
            <Box p={{ xs: 1, md: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h6' fontWeight={600}>Category</Typography>
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </Box>
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
            <Grid size={{
              md: 12,
              xs: 12
            }}>
              <TableContainer>
                <Scrollbar>
                  <Table sx={{ minWidth: 820 }}>
                    <CategoryTableHead />
                    <TableBody>
                      {categoriesData.map((Category: any) => (
                        <CategoryTableRow
                          key={Category.id}
                          categories={Category}
                          handleDeleteCategories={handleDeleteCategory}
                        />
                      ))}
                      {categoriesData.length === 0 && <TableDataNotFound />}
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
    </>
  );
}
