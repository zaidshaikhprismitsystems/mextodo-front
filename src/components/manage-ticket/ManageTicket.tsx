import { useEffect, useState } from 'react'
// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'
// CUSTOM COMPONENTS
import { H5 } from '../typography'
// CUSTOM UTILS METHODS
import ApiService from '../../services/apiServices/apiService'
import { LoaderWithLogo } from '../loader'
import Toast from '../../utils/toast'
import { useSearchParams } from 'react-router-dom'

export default function ManageTicket() {
  
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('id');
  console.log('ticketId: ', ticketId);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(ticketId !== null && ticketId !== undefined){
      getTicketDetails(parseInt(ticketId));
    }
  }, [ticketId])

  const getTicketDetails = async(id: number) => {
    try{
      let details = await ApiService.getTicketDetails(id);
      console.log('details: ', details);
      setDetails(details.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  return (
    <Box  sx={{pt:2, pb:4}}>
      {
        !loading ?
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }} display={'flex'} flexWrap={'wrap'} flexDirection={'column'} gap={3}>

            <Card>
              <Box p={3}>
                <H5 fontSize={18} mb={0} mr={1}>
                  {"Title"} <Box component={'span'} fontWeight={'inherit'}>{details?.title}</Box>
                </H5>
                <Box>
                  {"Description"} <Box component={'span'} fontWeight={'inherit'}>{details?.description}</Box>
                </Box>
              </Box>

              <Divider />
              
            </Card>

          </Grid>

        </Grid>
        : 
        <LoaderWithLogo />
      }
  </Box>
  )
}
