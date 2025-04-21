import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Card, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Scrollbar from '../../components/scrollbar';
import { TableDataNotFound, TableToolbar } from '../../components/table';
import OrdersTableActions from './ordersTableActions';
import OrdersTableHead from './ordersTableHead';
import OrdersTableRow from './ordersTableRow';
import ApiService from '../../services/ApiService';
import Toast from '../../components/Toast';
import FlexBox from '../../components/flexbox/FlexBox';
import IconWrapper from '../../components/icons/IconWrapper';
import Folder from '../../icons/duotone/Folder';
import H6 from '../../components/typography/H6';

export default function OrderListPageView() {
  const [ordersData, setOrdersData] = useState([]);

  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<'desc' | 'asc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [selected, setSelected] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [total, setTotal] = useState(0);

  const [orderFilter, setOrderFilter] = useState({
    search: '',
    orderStatus: '',
    paymentStatus: '',
  });

  const handleChangeFilter = (key: string, value: string) => {
    setOrderFilter((state) => ({ ...state, [key]: value }));
  };

  useEffect(() => {
    getOrders();
  }, [, orderFilter, page, rowsPerPage]);

  const getOrders = async () => {
    try {
      const orders = await ApiService.getOwnerOrders(
        orderFilter.orderStatus,
        orderFilter.paymentStatus,
        orderFilter.search,
        page,
        rowsPerPage
      );
      setOrdersData(orders.data);
      setTotal(orders.totalCount);
    } catch (e) {
      console.log(e);
    }
  };

  const isSelected = (id: number) => {
    return selected.includes(id);
  };

  const handleSelectRow = (event: any, id: any) => {
    setSelected((prevSelected: any) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item: number) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllRows = (
    event: ChangeEvent<HTMLInputElement>,
    selectedIds: string[]
  ) => {
    if (event.target.checked) {
      setSelected(selectedIds);
    } else {
      setSelected([]);
    }
  };

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDeleteProduct = async (id: number) => {
    await ApiService.cancelOrders(id);
    Toast.showSuccessMessage('Order cancelled Successfully');
    await getOrders();
  };

  const handleAllProductDelete = async () => {
    try {
      await ApiService.cancelOrders(selected);
      Toast.showSuccessMessage('Orders cancelled Successfully');
      setSelected([]);
      await getOrders();
    } catch (e) {}
  };

  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={3} alignItems="start">
          <Grid size={12}>
            <FlexBox gap={0.5} alignItems="center">
              <IconWrapper>
                <Folder color="primary" />
              </IconWrapper>

              <H6 sx={{ m: 0 }} fontSize={16}>
                Order List
              </H6>
            </FlexBox>
          </Grid>

          {/* SEARCH AND PUBLISH FILTER SECTION */}
          <Grid size={12}>
            <OrdersTableActions
              filter={orderFilter}
              handleChangeFilter={handleChangeFilter}
            />
          </Grid>

          {/* TABLE ROW SELECTION HEADER  */}
          <Grid size={12}>
            {selected.length > 0 && (
              <TableToolbar
                selected={selected.length}
                handleDeleteRows={handleAllProductDelete}
              />
            )}
          </Grid>

          {/* TABLE HEAD AND ROW SECTION */}
          <Grid size={12}>
            <TableContainer>
              <Scrollbar>
                <Table sx={{ minWidth: 820 }}>
                  <OrdersTableHead
                    order={order}
                    orderBy={orderBy}
                    numSelected={selected.length}
                    rowCount={ordersData.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllRows={(event: any) =>
                      handleSelectAllRows(
                        event,
                        ordersData.map((row: any) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {ordersData.map((order: any) => (
                      <OrdersTableRow
                        key={order.id}
                        order={order}
                        handleSelectRow={handleSelectRow}
                        isSelected={isSelected(order.id)}
                        handleDeleteInvoice={handleDeleteProduct}
                      />
                    ))}

                    {ordersData.length === 0 && <TableDataNotFound />}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Grid>

          <Grid size={12}>
            {/* PAGINATION SECTION */}
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={total}
              onPageChange={(_, page) => setPage(page)}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={(e) =>
                setRowsPerPage(+e.target.value || 5)
              }
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
