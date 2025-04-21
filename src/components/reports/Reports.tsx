import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Box, Card } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
// CUSTOM ICON COMPONENT
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import { TableDataNotFound, TableToolbar } from '../table'
import ReportTableRow from './ReportsTableRow'
import ReportTableHead from './ReportsTableHead'
import ReportsActions from './ReportsTableActions'
import ApiService from '../../services/apiServices/apiService'
import Toast from '../../utils/toast'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import dayjs from 'dayjs'

export default function Reports() {
  const navigate = useNavigate()

  const [reportsData, setReportsData] = useState([])
  const [summary, setSummary] = useState<any>([])
  
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

  const [loading, setLoading] = useState(true);


  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  }

  const onSuccess = async () => {
    setEditOpen(false)
    setIsEdit(false);
    setDisplayAttribute(null);
    await getReports();
  }

  const [reportFilter, setReportFilter] = useState({
    entity: 'users',
    fromDate: dayjs().subtract(30, 'day').format("YYYY-MM-DD"),
    toDate: dayjs().format("YYYY-MM-DD")
  })

  const handleChangeFilter = (key: string, value: string) => {
    setReportFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() =>{
    getReports();
  }, [ , reportFilter, page, rowsPerPage])

  const getReports = async() => {
    try{
      const reports = await ApiService.getReportData(reportFilter.entity, reportFilter.fromDate, reportFilter.toDate);
      setReportsData(reports.data)
      setSummary(reports.summary)
      // setTotal(reports.totalCount)
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
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
    let deleteAttribute = await ApiService.deleteAttributes(id);
      Toast.showSuccessMessage('Reports deleted Successfully');
      await getReports();
  }

  const handleAllAttributeDelete = async () => {
    try{
      let deleteAttribute = await ApiService.deleteAttributes(selected);
      Toast.showSuccessMessage('Attributes deleted Successfully');
      setSelected([]);
      await getReports();
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
    <Box  sx={{pt: 2, pb: 4}}>
      <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DeviceHubIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>Reporting</H6>
              </FlexBox>
            </Grid>
            <Grid size={12}>
              {
                !loading ?
                <ReportsActions filter={reportFilter} handleChangeFilter={handleChangeFilter} />
                : ''
              }
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
                      <ReportTableHead
                        entity={reportFilter.entity}
                        order={order}
                        orderBy={orderBy}
                        numSelected={selected.length}
                        rowCount={reportsData.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllRows={(event) => handleSelectAllRows(event, reportsData.map((row: any) => row.id))}
                      />

                      <TableBody>
                        {reportsData
                          .map((attribute: any) => (
                            <ReportTableRow
                              entity={reportFilter.entity}
                              key={attribute.id}
                              report={attribute}
                              handleSelectRow={handleSelectRow}
                              hanleViewOpen={hanleViewOpen}
                              hanleEditOpen={hanleEditOpen}
                              isSelected={isSelected(attribute.id)}
                              handleDeleteAttributes={handleDeleteAttribute}
                            />
                          ))}

                        {reportsData.length === 0 && <TableDataNotFound />}
                      </TableBody>

                    </Table>
                  </Scrollbar>
                </TableContainer>

                {/* PAGINATION SECTION */}
                {/* <TablePagination
                  page={page}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  count={total}
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  onPageChange={(_, page) => setPage(page)}
                  onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value || 5)}
                /> */}
                </Grid>

              <Grid sx={{display:'flex', justifyContent:'space-between', padding: '10px 20px', gap: 5}}>
                <Grid sx={{display:'flex', justifyContent:'space-between', padding: '10px 20px', gap: 1}}>
                  <label>{reportFilter.entity === 'orders' ? 'Total Orders - ' : reportFilter.entity === 'users' ? 'Total Users - ' : reportFilter.entity === 'owners' ? 'Total Owners - ' :  reportFilter.entity === 'products' ? 'Total Products - ' : ''}</label>
                  {reportFilter.entity === 'orders' ? summary?.totalOrders : reportFilter.entity === 'users' ? summary?.totalUsers : reportFilter.entity === 'owners' ? summary.totalVendors : reportFilter.entity === 'products' ? summary.totalProducts : ''}
                </Grid>
                {
                  reportFilter.entity === 'orders' ?
                  <Grid sx={{display:'flex', justifyContent:'space-between', padding: '10px 20px', gap: 1}}>
                    <label>Total Revenue - </label>
                    MX$ {summary?.totalRevenue}
                  </Grid>
                  : ''
                }
                {
                  reportFilter.entity === 'products' ?
                  <Grid sx={{display:'flex', justifyContent:'space-between', padding: '10px 20px', gap: 1}}>
                    <label>Total Pending Products - </label>
                    {summary?.statusBreakdown?.pending}
                  </Grid>
                  : ''
                }
                {
                  reportFilter.entity === 'products' ?
                  <Grid sx={{display:'flex', justifyContent:'space-between', padding: '10px 20px', gap: 1}}>
                    <label>Total Approved Products - </label>
                    {summary?.statusBreakdown?.approved}
                  </Grid>
                  : ''
                }
              </Grid>

        </Grid>
      </Card>
    </Box>
    </>
  )
}
