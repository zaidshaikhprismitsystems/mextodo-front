import { ReactNode, use, useEffect, useState } from 'react'
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
import Link from '../../components/link'
import Scrollbar from '../../components/scrollbar'
import FlexBetween from '../../components/flexbox/FlexBetween'
import { H6, H5, Paragraph, Span } from '../../components/typography'
// CUSTOM ICON COMPONENT
import DownloadTo from '../../icons/DownloadTo'
// CUSTOM UTILS METHODS
import { currency } from '../../utils/currency'
// STYLED COMPONENTS
import { BodyTableCell, HeadTableCell, StyledBox } from './styles'

import MoreHoriz from '@mui/icons-material/MoreHoriz'
import MoreButton from '../../components/more-button'
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

export default function OrderDetails() {
  
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
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
    if(orderId !== null && orderId !== undefined){
      getOrderDetails(parseInt(orderId));
    }
  }, [orderId])

  const getOrderDetails = async(id: number) => {
    try{
      let details = await ApiService.getOrderDetails(id);
      setDetails(details.data);
      setShippingAmount(details.shippingData.data[0].totalPrice)
      setTrackingNumber(details.data.trackingNumber)
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const getShippingData = async () => {
    setIsShipLoading(true);
    let shippingData = await ApiService.getShippingData({order_id: orderId, from: details.shippingAddress, to: details.shippingAddress, items: details.order_items,declaredValue: values.declaredValue, boxQuantity: values.boxQuantity, content: values.content, packType: values.packType, carriers: values.carriers});
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

  const { t, i18n } = useTranslation();
  
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
        let generateShipping = await ApiService.generateShipping({order_id: orderId, from: details.shippingAddress, to: details.shippingAddress, items: details.order_items, carriers: values.carriers});
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
                    {t("order")} <Typography component={'span'} fontWeight={'inherit'}>#{details.id}</Typography> {t("details")}
                  </H5>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Chip size="small" color={getOrderStatus(details.status)} label={`${t("order")} - ${details.status}`} />
                    <Chip size="small" color={getPaymentStatus(details.payment[0].status)} label={`${t("payment")} - ${details.payment[0].status}`} />
                  </Stack>
                  </FlexBox>

                  <Stack direction="row" justifyContent="flex-end" spacing={2} >
                    <LoadingButton loading={isDownloadInvoice} onClick={() => {downloadInvoice()}} variant="outlined" color="success" size='small' sx={{borderRadius:1, border:0, backgroundColor:'success.50'}} startIcon={<DownloadTo />}>
                      {t("invoice")}
                    </LoadingButton>
                  </Stack>
                </FlexBetween>

                <FlexBetween sx={{gap:1, alignItems:'center', flexWrap:'wrap' }}>
                  <Stack  direction="row" spacing={2}>
                  <CalendarMonthOutlinedIcon color='primary' sx={{fontSize:20}} />  
                  <Typography lineHeight={1.75} color="text.secondary" component={'p'} ml={'8px !important'} fontSize={14} fontWeight={500}>
                    {format(details.createdAt, 'MMM dd, yyyy hh:MM - aaa')}
                  </Typography>
                </Stack>
                </FlexBetween>
              </Box>

              <Divider />

              <Card>
            <Box p={3}>
              <H5 fontSize={18} mb={0} mr={1}>
                {t("invoice")}
                  </H5>
                  <Box>
                <Scrollbar>
                  <Table sx={{ mt: 3, minWidth: 375, maxWidth:'100%' }}>
                    <TableHead>
                      <TableRow>
                        <HeadTableCell>{t("invoice")}</HeadTableCell>
                        <HeadTableCell>{t("quantity")}</HeadTableCell>
                        <HeadTableCell>{t("rate")}</HeadTableCell>
                        <HeadTableCell>{t("amount")}</HeadTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {
                        details.order_items.map((item: any) => 
                        <TableRow>
                          <BodyTableCell>{i18n.language === "en" ? item.product.titleEn : item.product.titleSp}</BodyTableCell>
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

                <Divider />

                <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
                  {/* <FlexBetween>
                    <Paragraph fontWeight={500}>Subtotal:</Paragraph>
                    <Paragraph fontWeight={500}>{currency(20600.0)}</Paragraph>
                  </FlexBetween>

                  <FlexBetween>
                    <Paragraph fontWeight={500}>Vat 0%:</Paragraph>
                    <Paragraph fontWeight={500}>$ 00.00</Paragraph>
                  </FlexBetween>

                  <FlexBetween>
                    <Paragraph fontWeight={500}>Sub total 0%:</Paragraph>
                    <Paragraph fontWeight={500}>{currency(20600.0)}</Paragraph>
                  </FlexBetween> */}

                  <FlexBetween>
                    <Paragraph fontWeight={500}>{t("total")}:</Paragraph>
                    <Paragraph fontWeight={500}>{currency(details.totalPrice)}</Paragraph>
                  </FlexBetween>
                </Stack>
              </Box>
            </Card>
            
              
            </Card>

           {/* shipping form */}
           {
            trackingNumber && trackingNumber !== null ?
            <Card >
              <Box py={2} px={1}>
                <List sx={{}}>
                <ListItem><strong>{t("total_shiping_price")}: </strong>&nbsp; <Typography variant='body1'> {details.totalShipingPrice}</Typography></ListItem>
                <ListItem><strong>{t("track_url")}: </strong>&nbsp;  <Typography variant='body1'><Link target='__blank' href={details.trackUrl} color='secondary'> {details.trackUrl}</Link></Typography></ListItem>
                <ListItem><strong>{t("tracking_number")}: </strong>&nbsp;  <Typography variant='body1'> {details.trackingNumber}</Typography></ListItem>
                <ListItem>
                  {/* <strong>Label: </strong>&nbsp;<Typography variant='body1'><Link href='{details.label}'> Download</Link></Typography> */}
                  <strong>{t("label")}: </strong>&nbsp;
                  <Link download={true} target='__blank' href={details.label}>
                    <Button variant="outlined" color="success" size='small' sx={{borderRadius:1, border:0, backgroundColor:'success.50'}} endIcon={<DownloadTo />}>
                    {t("label")}
                    </Button>
                  </Link>
                </ListItem>
                <ListItem><strong>{t("carrier")}: </strong>&nbsp;  <Typography variant='body1'> {details.carrier}</Typography></ListItem>
                </List>
              </Box>
            </Card>
            :
            <Card>
              <Box py={5} px={3}>
                    <Grid container spacing={3}>
                      {/* Shipping */}
                      <Grid size={{ xs: 12 }}>
                        <form onSubmit={handleSubmit}>
                          <FlexBetween sx={{gap:2, mb:3, flexWrap:'wrap' }}>
                            <H6 fontSize={14} >
                            {t("shipping")}
                            </H6>
                            
                          </FlexBetween>
                          <Grid container spacing={3}>
                            {/* <Grid size={{ xs:12, sm: 4 }}>
                              <TextBox
                                type={"number"}
                                fullWidth={true}
                                placeholder={t("declared_value")} 
                                name={"declaredValue"} 
                                handleBlur={handleBlur} 
                                handleChange={handleChange} 
                                value={values.declaredValue}
                                helperText={touched.declaredValue && typeof errors.declaredValue === "string" ? errors.declaredValue : ""} 
                                error={Boolean(touched.declaredValue && errors.declaredValue)}
                              />
                            </Grid> */}
                            
                            <Grid container size={12} spacing={3}>
                              <Grid size={{ xs:12, sm: 6 }}>
                                <TextBox
                                  type={"text"}
                                  disabled={true}
                                  fullWidth={true}
                                  // placeholder={t("carriers")} 
                                  placeholder={""} 
                                  name={"carriers"} 
                                  handleBlur={handleBlur} 
                                  handleChange={handleChange} 
                                  value={values.carriers}
                                  helperText={touched.carriers && typeof errors.carriers === "string" ? errors.carriers : ""} 
                                  error={Boolean(touched.carriers && errors.carriers)}
                                />
                                {/* {
                                  <TextField
                                    select
                                    fullWidth
                                    label={t("carrier")}
                                    variant='standard'
                                    className="select"
                                    value={values.carriers}
                                    onChange={(e) => setFieldValue('carriers', e.target.value)}
                                    helperText={touched.carriers && typeof errors.carriers === "string" ? errors.carriers : ""} 
                                    error={Boolean(touched.carriers && errors.carriers)}
                                  >
                                    <MenuItem value={"fedex"}>{"FedEx"}</MenuItem>
                                    <MenuItem value={"dhl"}>{"DHL"}</MenuItem>
                                    <MenuItem value={"redpack"}>{"redpack"}</MenuItem>
                                    <MenuItem value={"paquetexpress"}>{"paquetexpress"}</MenuItem>
                                    <MenuItem value={"noventa9Minutos"}>{"99 Minutos"}</MenuItem>
                                    <MenuItem value={"almex"}>{"almex"}</MenuItem>
                                    <MenuItem value={"tresGuerras"}>{"tresGuerras"}</MenuItem>
                                    <MenuItem value={"mensajerosUrbanos"}>{"mensajerosUrbanos"}</MenuItem>
                                  </TextField>
                                } */}
                              </Grid>
                              <Grid size={{ xs:12, sm: 6 }}>
                                <H6 fontSize={12} color={'#0009'} >
                                  {t("carrier_amount")}
                                </H6>
                                <ButtonGroup fullWidth>
                                  <ButtonOne disableRipple>{values.carriers}</ButtonOne>
                                  <ButtonTwo disableRipple>{isCarrierloading ? <CircularProgress size={16} /> : shippingAmount}</ButtonTwo>
                                </ButtonGroup>
                              </Grid>
                            </Grid>

                          </Grid>
                          <LoadingButton loading={isSubmitting} type="submit" variant="contained" sx={{ marginTop: "20px", backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:12, fontWeight:500, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                            {t("generate_shipping")}
                          </LoadingButton>
                        </form>
                      </Grid>

                    </Grid>
              </Box>
            </Card>
           }
          </Grid>

          {/* right widgets */}
          <Grid size={{ md: 4, xs: 12 }}>
            <Box sx={{gap: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',}}
            >
              <Card sx={{p:3,}}  >
              <FlexBetween sx={{gap:1, mb:2} }>
                  <H6 fontSize={14} >
                  {t("order_action")}
                  </H6>
                  <Button variant="text" color="error" size='small' sx={{borderRadius:1, color:'white.main', backgroundColor:'primary.800'}}>{t("send")}</Button>
                </FlexBetween>
                <Box >
                  <TextField 
                    select 
                    fullWidth 
                    name={'text'}
                    label={t("choose_a_action")}
                    variant='standard'
                    slotProps={{
                      select: {
                        native: true,
                        IconComponent: KeyboardArrowDown
                      }
                    }}
                  >
                    <ListItem>Resend Invoice</ListItem>
                    <ListItem>Resend Invoice</ListItem>
                    <ListItem>Resend Invoice</ListItem>
                  </TextField>
                </Box>
              </Card>


              <Card sx={{p:3}} >
                {/* Customer Details */}
              <FlexBetween sx={{gap:1, mb:2}}>
                <H6 fontSize={14} >
                {t("customer_details")}
                </H6>
                <Button variant="text" color="info" size='small' sx={{borderRadius:1, color:'info.main', backgroundColor:'info.light'}}>{t("view_profile")}</Button>
              </FlexBetween>

              <FlexBox alignItems="center" gap={1.5}>
                <Avatar alt={details.customer.firstName !== null && details.customer.lastName !== null ? `${details.customer.firstName} ${details.customer.lastName}` : details.customer.username} src="/static/user/user-11.png" />
                <Box>
                  <Paragraph fontWeight={600}>{details.customer.firstName !== null && details.customer.lastName !== null ? `${details.customer.firstName} ${details.customer.lastName}` : details.customer.username}</Paragraph>
                  <Paragraph fontSize={12} mt="2px" color="text.secondary">
                  {t("customer")}
                  </Paragraph>
                </Box>
              </FlexBox>

                <Stack  spacing={0} mt={2}>
                <ListItem  sx={{px:1}}>
                  <ListItemIcon>
                    <EmailOutlined />
                  </ListItemIcon>
                  <ListItemText sx={{'& .MuiTypography-root ':{color:'black'}}}
                    // primary="Email"
                    secondary={details.customer.email}
                  />
                </ListItem>
                <ListItem  sx={{px:1,}}>
                  <ListItemIcon>
                    <PhoneAndroid />
                  </ListItemIcon>
                  {/* Add mobile number */}
                  <ListItemText sx={{'& .MuiTypography-root ':{color:'black'}}}
                    // primary="Email"
                    secondary="+00 987 654 3210" 
                  />
                </ListItem>              
                
                </Stack>
              </Card>
    {/*  Billing Address  */}
              <Card sx={{p:3}} >
              <FlexBetween sx={{gap:1, mb:2} }>
                {/* <Paragraph fontWeight={600}>Billing Address</Paragraph> */}
                <H6 fontSize={14} >
                {t("billing_address")}
                </H6>
                <IconButton>
                    <Edit sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </IconButton>
                </FlexBetween>

                <Box>
                  <Paragraph mb={0.5}>
                    {details.billingAddress.address} <Span color="text.grey.500">{`(${details.billingAddress.label})`}</Span>
                  </Paragraph>

                  <Paragraph color="text.grey.500">
                    {details.billingAddress.cities.name} <br />{details.billingAddress.state.name} {details.billingAddress.zipCode} <br /> {details.billingAddress.countries.name}
                  </Paragraph>
                </Box>
              </Card>
    {/*  Billing Address  */}
            <Card sx={{p:3}} >
              <FlexBetween sx={{gap:1, mb:2 }}>
                
                <H6 fontSize={14}>
                {t("shipping_address")}
                </H6>
                <IconButton >
                    <Edit sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </IconButton>
                </FlexBetween>

                <Box>
                  <Paragraph mb={0.5}>
                    {details.shippingAddress.address} <Span color="text.grey.500">{`(${details.shippingAddress.label})`}</Span>
                  </Paragraph>

                  <Paragraph color="text.grey.500">
                    {details.shippingAddress.cities.name} <br />{details.shippingAddress.state.name} {details.shippingAddress.zipCode} <br /> {details.shippingAddress.countries.name}
                  </Paragraph>
                </Box>
              </Card>

            </Box>
          </Grid>
        </Grid>
        : 
        <LoaderWithLogo />
      }
  </Box>
  )
}
