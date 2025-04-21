import { ReactNode, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
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

export default function ManageOwnerTicket() {
  
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
                <FlexBetween sx={{mb:2, gap:1, alignItems:{xs:'start', md:'center'}}}>
                  <FlexBox sx={{gap:1, alignItems:'center', flexWrap:'wrap' }}>
                  <H5 fontSize={18} mb={0} mr={1}>
                    {"Title"} <Typography component={'span'} fontWeight={'inherit'}>{details?.title}</Typography>
                  </H5>
                  <Box>
                    <Typography>
                    {"Description"} <Typography component={'span'} fontWeight={'inherit'}>{details?.description}</Typography>
                    </Typography>
                  </Box>
                  </FlexBox>
                </FlexBetween>
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
