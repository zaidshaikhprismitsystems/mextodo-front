import { use, useEffect, useState } from 'react'
// MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
// CUSTOM COMPONENTS
import Link from '../link'
import Scrollbar from '../scrollbar'
import FlexBetween from '../flexbox/FlexBetween'
import { H6, H5, Paragraph, Span } from '../typography'
// CUSTOM ICON COMPONENT
import DownloadTo from '../../icons/DownloadTo'
// CUSTOM UTILS METHODS
import { currency } from '../../utils/currency'
// STYLED COMPONENTS
import { BodyTableCell, HeadTableCell, StyledBox } from './styles'

import MoreHoriz from '@mui/icons-material/MoreHoriz'
import MoreButton from '../more-button'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { FlexBox } from '../flexbox'
import Avatar from '@mui/material/Avatar';
import { EmailOutlined, PhoneAndroid, Drafts, LocalShipping, ShoppingBag, ShoppingCart, Edit, KeyboardArrowDown } from '@mui/icons-material'
import ListItem from '@mui/material/ListItem/ListItem'
import { FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, List, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, TextField, Typography, } from '@mui/material'
import { TextBox } from '../textbox'
import { useSearchParams } from 'react-router-dom';
import ApiService from '../../services/apiServices/apiService'
import { LoaderWithLogo } from '../loader'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Toast from '../../utils/toast'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonGroup from '@mui/material/ButtonGroup'
import { ButtonOne, ButtonTwo } from './styles'

export default function ManageTicket() {
  
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('id');
  console.log('ticketId: ', ticketId);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCarrierloading, setIsCarrierloading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [ carriers ,setCarriers ] = useState([]);
  const [ shippingAmount, setShippingAmount ] = useState(0);
  const [ shippingData, setShippingData ] = useState([]);
  const [ isShipLoading, setIsShipLoading ] = useState(false);
  const [isDownloadInvoice, setIsDownloadInvoice] = useState(false);

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
      // setShippingAmount(details.shippingData.data[0].totalPrice)
      // setTrackingNumber(details.data.trackingNumber)
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const getShippingData = async () => {
    setIsShipLoading(true);
    let shippingData = await ApiService.getShippingData({order_id: ticketId, from: details.shippingAddress, to: details.shippingAddress, items: details.order_items,declaredValue: values.declaredValue, boxQuantity: values.boxQuantity, content: values.content, packType: values.packType, carriers: values.carriers});
    setShippingData(shippingData.data);
    setIsShipLoading(true);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validationSchema = Yup.object({
    // declaredValue: Yup.number().required('Declared Value is Required!'),
    carriers: Yup.string().required('Carriers is Required!'),
  });

  const initialValues = {
    carriers: details?.carrier
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        // declaredValue: values.declaredValue,
        let generateShipping = await ApiService.generateShipping({order_id: ticketId, from: details.shippingAddress, to: details.shippingAddress, items: details.order_items, carriers: values.carriers});
        setDetails(generateShipping.order);
        setTrackingNumber(generateShipping.order.trackingNumber);
        Toast.showSuccessMessage("Shipment Generated Successfully");
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  const getOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
        break;
      case "completed":
        return "success"
        break;
      case "canceled":
        return "error"
        break;
      case "refunded":
        return "info"
        break;
      default:
        return "secondary"
        break;
    }
  }

  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
        break;
      case "completed":
        return "success"
        break;
      case "failed":
        return "error"
        break;
      case "refunded":
        return "info"
        break;
      default:
        return "secondary"
        break;
    }
  }

  const downloadInvoice = async () => {
    try{
      setIsDownloadInvoice(true);
      const invoice = await ApiService.generateInvoice(details.id);
      window.open(invoice.url, "_blank");
    }catch(e){
      console.log('e: ', e);
    }finally{
      setIsDownloadInvoice(false);
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
                  {/* <Stack spacing={1} direction="row" alignItems="center">
                    <Chip size="small" color={getOrderStatus(details.status)} label={`${t("order")} - ${details.status}`} />
                    <Chip size="small" color={getPaymentStatus(details.payment[0].status)} label={`${t("payment")} - ${details.payment[0].status}`} />
                  </Stack> */}
                  </FlexBox>

                  {/* <Stack direction="row" justifyContent="flex-end" spacing={2} >
                    <LoadingButton loading={isDownloadInvoice} onClick={() => {downloadInvoice()}} variant="outlined" color="success" size='small' sx={{borderRadius:1, border:0, backgroundColor:'success.50'}} startIcon={<DownloadTo />}>
                      {t("invoice")}
                    </LoadingButton>
                  </Stack> */}
                </FlexBetween>

                {/* <FlexBetween sx={{gap:1, alignItems:'center', flexWrap:'wrap' }}>
                  <Stack  direction="row" spacing={2}>
                  <CalendarMonthOutlinedIcon color='primary' sx={{fontSize:20}} />  
                  <Typography lineHeight={1.75} color="text.secondary" component={'p'} ml={'8px !important'} fontSize={14} fontWeight={500}>
                    {format(details.createdAt, 'MMM dd, yyyy hh:MM - aaa')}
                  </Typography>
                </Stack>
                </FlexBetween> */}
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
