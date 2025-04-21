import { useEffect, useState } from 'react'

// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'

// CUSTOM COMPONENTS
import { H6 } from '../typography'
import { FlexBox } from '../flexbox'
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField, Typography, } from '@mui/material'
import { TextBox } from '../textbox'
import ApiService from '../../services/apiServices/apiService'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Toast from '../../utils/toast'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Pickup() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ carriers ,setCarriers ] = useState([]);
  
  const validationSchema = Yup.object({
    timeFrom: Yup.string().required('From Time is Required!'),
    timeTo: Yup.string().required('To Time Required!'),
    carrier: Yup.string().required('Carrier Required!'),
    date: Yup.string().required('Date is Required!'),
    instructions: Yup.string().required('Instruction is Required!'),
    totalPackages: Yup.number().required('Total Packages is Required!'),
    totalWeight: Yup.number().required('Total Weight is Required!')
  });

  const initialValues = {
    sameDay: false,
    hourLimit: 14,
    timeFrom: 9,
    timeTo: 18,
    date: "",
    carrier: "",
    instructions: "",
    totalPackages: "",
    totalWeight: ""
  };

  // useEffect(() => {
  //   // fetch carrier services
  //   getCarriers();
  // }, [])

  // const getCarriers = async () => {
  //   let carriers = await ApiService.getCarriers();
  //   setCarriers(carriers.data);
  // }

  const { t } = useTranslation();
  
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
        let shedulePickup = await ApiService.shedulePickup({
          timeFrom: values.timeFrom,
          timeTo: values.timeTo,
          date: values.date,
          instructions: values.instructions,
          totalPackages: values.totalPackages,
          totalWeight: values.totalWeight,
          carrier: values.carrier
        });
        console.log('shedulePickup: ', shedulePickup);
        if(shedulePickup?.error){
          Toast.showSuccessMessage(shedulePickup?.error ? shedulePickup?.error?.message : `Pickup Creation Failed`);
        }else{
          Toast.showSuccessMessage(`Pickup Sheduled for date ${values.date} Successfully`);
        }
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });
  
  return (
    <Box  sx={{pt:2, pb:4}}>
      
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }} display={'flex'} flexWrap={'wrap'} flexDirection={'column'} gap={3}>

           {/* Form For Pickup */}
            <Card>
              <Box py={3} px={3}>
                    <Grid container spacing={3}>
                      {/* Pickup */}
                      <Grid  size={{ xs: 12 }}>
                        
                        <form onSubmit={handleSubmit}>
                        <Grid container  spacing={3}>

                          <Grid size={12} container spacing={3}>
                            <Grid size={{ xs:12, sm: 6 }}>
                              <H6 fontSize={14} mb={1} >
                              {t("same_day")}
                              </H6>
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  sx={{
                                    gap:1,
                                    "& .MuiFormControlLabel-root":{
                                      border:1,
                                      borderRadius:10,
                                      color:"primary.main",
                                      py:1,
                                      px:1.3,
                                      minWidth:100,
                                      width:{xs:'48%', sm:'auto' },
                                      textAlign:'center',
                                      justifyContent:'center',
                                      mx:0,
                                      borderColor:'primary.500',

                                      "& .MuiBox-root":{
                                        fontSize:14,
                                      },
                                      
                                      "& .MuiRadio-root":{
                                        display:"none",
                                        
                                      },

                                      '&:has(.Mui-checked)':{
                                        color:"white.main",
                                        backgroundColor:'primary.main',
                                        borderColor:'primary.main',
                                      }
                                    },
                                  }}
                                  value={values.sameDay}
                                  onChange={(e: any) => { setFieldValue("sameDay", e.target.value) }}
                                >
                                  <FormControlLabel value={true} control={<Radio />} label={<FlexBox gap={1}><CheckIcon fontSize='small'/>{t("yes")}</FlexBox>} />
                                  <FormControlLabel value={false} control={<Radio />} label={<FlexBox gap={1}><CloseIcon  fontSize='small'/> {t("no")}</FlexBox>} />
                                </RadioGroup>
                                <Typography sx={{fontSize: "12px", color: "red"}}>{touched.sameDay && typeof errors.sameDay === "string" ? errors.sameDay : ""}</Typography>
                              </FormControl>
                            </Grid>
                            
                            <Grid size={{ xs:12, sm: 6 }}>
                              <H6 fontSize={14} mb={1} >
                                {t("carrier")}
                              </H6>
                              <TextField
                                select
                                fullWidth
                                // label={t("carrier")}
                                placeholder={t("carrier")}
                                className="select"
                                value={values.carrier}
                                onChange={(e) => setFieldValue('carrier', e.target.value)}
                                helperText={touched.carrier && typeof errors.carrier === "string" ? errors.carrier : ""} 
                                error={Boolean(touched.carrier && errors.carrier)}
                              >
                                {/* {
                                  carriers && carriers.length > 0 && carriers.map((data: any) => 
                                    <MenuItem value={data.name}>{data.description}</MenuItem>
                                  )
                                } */}
                                  <MenuItem value={"fedex"}>{"FedEx"}</MenuItem>
                                  <MenuItem value={"dhl"}>{"DHL"}</MenuItem>
                                  <MenuItem value={"redpack"}>{"redpack"}</MenuItem>
                                  <MenuItem value={"paquetexpress"}>{"paquetexpress"}</MenuItem>
                                  <MenuItem value={"noventa9Minutos"}>{"99 Minutos"}</MenuItem>
                                  <MenuItem value={"almex"}>{"almex"}</MenuItem>
                                  <MenuItem value={"tresGuerras"}>{"tresGuerras"}</MenuItem>
                                  <MenuItem value={"mensajerosUrbanos"}>{"mensajerosUrbanos"}</MenuItem>
                              </TextField>
                            </Grid>
                          </Grid>

                          <Grid size={12} container mb={0} spacing={3}>
                            <Grid size={{ xs:12, sm: 6 }}>
                              <TextBox
                                type={"date"}
                                fullWidth={true}
                                placeholder={t("date")}
                                name={"date"}
                                handleBlur={handleBlur} 
                                handleChange={handleChange} 
                                value={values.date}
                                helperText={touched.date && typeof errors.date === "string" ? errors.date : ""}
                                error={Boolean(touched.date && errors.date)}
                              />
                            </Grid>
                          </Grid>

                          <Grid size={12} container spacing={3}>
                            <Grid size={{ xs:12, sm: 6 }}>
                              <TextField
                                select
                                fullWidth
                                label={t("time_from")}
                                className="select"
                                value={values.timeFrom}
                                onChange={(e) => setFieldValue('timeFrom', e.target.value)}
                                helperText={touched.timeFrom && typeof errors.timeFrom === "string" ? errors.timeFrom : ""} 
                                error={Boolean(touched.timeFrom && errors.timeFrom)}
                              >
                                {Array.from({ length: 10 }, (_, i) => {
                                  const hour = (9 + i).toString().padStart(2, "0");
                                  return (
                                    i < 7 ?
                                    <MenuItem key={hour} value={9 + i}>
                                      {`${hour}:00`}
                                    </MenuItem>
                                    : ''
                                  );
                                })}
                              </TextField>
                            </Grid>
                            <Grid size={{ xs:12, sm: 6 }}>
                              <TextField
                                select
                                fullWidth
                                label={t("time_to")}
                                className="select"
                                value={values.timeTo}
                                onChange={(e) => setFieldValue('timeTo', e.target.value)}
                                helperText={touched.timeTo && typeof errors.timeTo === "string" ? errors.timeTo : ""} 
                                error={Boolean(touched.timeTo && errors.timeTo)}
                              >
                                {Array.from({ length: 10 }, (_, i) => {
                                  const hourValue = 9 + i;
                                  const hour = (9 + i).toString().padStart(2, "0");
                                  return (
                                    values?.timeFrom && hour > values?.timeFrom+2 &&
                                    <MenuItem key={hour} value={parseInt(hourValue.toString())}>
                                      {`${hour}:00`}
                                    </MenuItem>
                                    
                                  );
                                })}
                              </TextField>
                            </Grid>
                          </Grid>

                          <Grid size={12}>
                            <TextBox
                                type={"text"}
                                fullWidth={true}
                                placeholder={t("instructions")}
                                name={"instructions"}
                                handleBlur={handleBlur} 
                                handleChange={handleChange} 
                                multiline={true}
                                rows={4}
                                value={values.instructions}
                                helperText={touched.instructions && typeof errors.instructions === "string" ? errors.instructions : ""}
                                error={Boolean(touched.instructions && errors.instructions)}
                              />
                          </Grid>

                          <Grid size={12} container spacing={3}>
                            <Grid size={{ xs:12, sm: 6 }}>
                            <TextBox
                                type={"number"}
                                fullWidth={true}
                                placeholder={t("total_packages")}
                                name={"totalPackages"}
                                handleBlur={handleBlur} 
                                handleChange={handleChange}
                                value={values.totalPackages}
                                helperText={touched.totalPackages && typeof errors.totalPackages === "string" ? errors.totalPackages : ""}
                                error={Boolean(touched.totalPackages && errors.totalPackages)}
                              />
                            </Grid>
                            <Grid size={{ xs:12, sm: 6 }}>
                            <TextBox
                                type={"number"}
                                fullWidth={true}
                                placeholder={t("total_weight")}
                                name={"totalWeight"}
                                handleBlur={handleBlur} 
                                handleChange={handleChange}
                                value={values.totalWeight}
                                helperText={touched.totalWeight && typeof errors.totalWeight === "string" ? errors.totalWeight : ""}
                                error={Boolean(touched.totalWeight && errors.totalWeight)}
                              />
                            </Grid>
                          </Grid>

                          <LoadingButton loading={isSubmitting} type="submit" variant="contained" sx={{ marginTop: "20px", backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:12, fontWeight:500, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                            {t("generate_pickup")}
                          </LoadingButton>
                          </Grid>
                        </form>
                    </Grid>
                    </Grid>
              </Box>
            </Card>
          
          </Grid>

        </Grid>
      
  </Box>
  )
}
