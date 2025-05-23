import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from 'react'
import { Box, Chip, ListItemButton, Pagination, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { FlexBox, FlexRowAlign } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import TokenIcon from '@mui/icons-material/Token';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { LoaderWithLogo } from '../loader'
import TicketTableActions from './TicketsTableActions'
import ApiService from '../../services/apiServices/apiService'
import { useTranslation } from 'react-i18next'

export default function TicketsOwner() {

  const [ticketsFilter, setTicketsFilter] = useState({
    search: ''
  })

  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsData, setTicketsData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(0);

  const handleChangeFilter = (key: string, value: string) => {
    setTicketsFilter((state) => ({ ...state, [key]: value }))
  }

  useEffect(() =>{
    getTickets();
  }, [ , ticketsFilter, page])

  const getTickets = async() => {
    try{
      const tickets = await ApiService.getVendorTickets(ticketsFilter.search, page, 5);
      setTicketsData(tickets.data)
      setTotal(tickets.total)
    }catch(e){
      console.log(e);
    }finally{
      setTicketsLoading(false);
    }
  }

  const navigate = useNavigate();

  const { t } = useTranslation();
  
  const getColor = (status: any) => {
    switch (status) {
      case "pending":
        return "warning"
        break;
      case "open":
        return "info"
        break;
      case "inProgress":
        return "success"
        break;
      case "closed":
        return "secondary"
        break;
      default:
        return "secondary"
        break;
    }
  }

  const getTicketColor = (status: any) => {
    switch (status) {
      case "low":
        return "secondary"
        break;
      case "medium":
        return "info"
        break;
      case "high":
        return "error"
        break;
      default:
        return "secondary"
        break;
    }
  }
  

  const handlePageChange = (value: number) => {
    setPage(value-1);
  };

  return (

    <Box sx={{ pt: 2, pb: 4 }}>
      {
        !ticketsLoading ?
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <TokenIcon color="primary" />
                </IconWrapper>

                <H6 sx={{ m: 0 }} fontSize={16}>Manage Tickets</H6>
              </FlexBox>
            </Grid>
            <Grid size={12}>
              {/* SEARCH AND PUBLISH FILTER SECTION */}
              <TicketTableActions filter={ticketsFilter} handleChangeFilter={handleChangeFilter} />
              <Divider variant="fullWidth" sx={{mt:3}} />
            </Grid>
            <Grid container spacing={3} size={12}>
              <Grid  size={{xs:12, md:12}}>
                <List sx={{ width: '100%', pt:0}}>
                  {
                    ticketsData && ticketsData.length > 0 ?
                    <>
                    {
                        ticketsData.map((ticket: any) => {
                          return(
                            <>
                            <ListItem sx={{gap:2, px:0}} >
                              <ListItemText
                                primary={
                                  <Stack direction='row' gap={1} alignItems='center'>
                                  <Typography component={H6} variant='h6' fontWeight={600} fontSize={16}>{ticket.title}</Typography>
                                  <Chip label={t(ticket.status)} color={getColor(ticket.status)} size="small"  />
                                  </Stack>
                                }
                                secondary={
                                  <>
                                  Priority - <Chip label={t(ticket.priority)} color={getTicketColor(ticket.priority)} size="small"  />
                                  </>
                                }
                              />
                              <ListItemButton disableRipple disableTouchRipple  sx={{flexGrow:'inherit',  
                                justifyContent:'center', padding:0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                  },
                                  '&:focus': {
                                    backgroundColor: 'transparent',
                                  },}}>
                                    <Button onClick={() => {navigate(`/dashboard/view-ticket?id=${ticket.id}`)}} variant='text' >{t('view')}</Button>
                              </ListItemButton>
                            </ListItem>
                            <Divider variant="fullWidth" component="li"  sx={{my:1, opacity:0.5}} />
                            </>
                          )
                        })
                    }
                    </>
                      : 
                      ticketsData && ticketsData.length === 0 && 
                      <FlexRowAlign
                        m={2}
                        fontSize={18}
                        minHeight={300}
                        fontWeight={700}
                        borderRadius={2}
                        bgcolor="action.selected"
                      >
                        {t("data_not_found")}
                      </FlexRowAlign>
                  }

                </List>
                {
                  ticketsData && ticketsData.length === 0 ? '' :
                  <Stack direction='row' gap={2} justifyContent='center' alignItems='center' sx={{my:2}}>
                    <Pagination count={Math.ceil(total/10)} color="primary" variant='text' shape='rounded' showFirstButton showLastButton hidePrevButton hideNextButton 
                      onChange={(event, value) => handlePageChange(value)} />
                  </Stack>
                }
              </Grid>

            </Grid>
          </Grid>
        </Card>
        : 
        <LoaderWithLogo />
      }
    </Box>
  )
}
