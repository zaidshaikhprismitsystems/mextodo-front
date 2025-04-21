import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Scrollbar from '../../components/scrollbar';
import FlexBetween from '../../components/flexbox/FlexBetween';
import { H6, Paragraph } from '../../components/typography';
import { BodyTableCell, HeadTableCell } from './styles';
import ApiService from '../../services/apiServices/apiService';
import { useSearchParams } from 'react-router-dom';
import Toast from '../../utils/toast';

export default function OrderDetails() {
  
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(orderId !== null && orderId !== undefined){
      getOrderDetails(parseInt(orderId));
    }
  }, [orderId])

  const getOrderDetails = async(id: number) => {
    try{
      let details = await ApiService.getOrderDetails(id);
      setDetails(details.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  return (
    <Box sx={{pt:2, pb:4}}>
      {
        !loading ?
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }} display={'flex'} flexWrap={'wrap'} flexDirection={'column'} gap={3}>

            <Card>
              <Box p={3}>
                <FlexBetween sx={{mb:2, gap:1, alignItems:{xs:'start', md:'center'}}}>
                  <H6 fontSize={18} mb={0} mr={1}>
                    Order Details
                  </H6>
                </FlexBetween>
              </Box>

              <Divider />

              <Card>
                <Box p={3}>
                  <H6 fontSize={18} mb={0} mr={1}>
                    Invoice
                  </H6>
                  <Box>
                    <Scrollbar>
                      <Table sx={{ mt: 3, minWidth: 375, maxWidth:'100%' }}>
                        <TableHead>
                          <TableRow>
                            <HeadTableCell>Invoice</HeadTableCell>
                            <HeadTableCell>Quantity</HeadTableCell>
                            <HeadTableCell>Rate</HeadTableCell>
                            <HeadTableCell>Amount</HeadTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {
                            details?.order_items?.map((item: any) => 
                              <TableRow>
                                <BodyTableCell>{item.product.title}</BodyTableCell>
                                <BodyTableCell>{item.quantity}</BodyTableCell>
                                <BodyTableCell>{item.price}</BodyTableCell>
                                <BodyTableCell>{item.total}</BodyTableCell>
                              </TableRow>
                            )
                          }
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </Box>
                </Box>
              </Card>
            </Card>
          </Grid>
        </Grid>
        : 
        <div>Loading...</div>
      }
    </Box>
  )
}
