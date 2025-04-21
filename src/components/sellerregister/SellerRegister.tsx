import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import { Autocomplete, Link, MenuItem, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import * as Yup from 'yup';

import ApiService from "../../services/apiServices/apiService"
import { LoadingProgress } from "../../components/loader"
import { H5, H6, Paragraph } from '../../components/typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from '../../services/store/store';
import Toast from '../../utils/toast';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { VendorStatus } from '../vendorstatus/'
import { TextBox } from '../textbox';

const AutoCompleteTextBox = styled(TextField)<any>(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Register = () => {
  const navigate = useNavigate();

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [country, setCountry] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermSet, setIsTermSet] = useState(false);

  const [status, setStatus] = useState("");

  const userData: any = useAppSelector((state: RootState) => state.user)
  
  const { t, i18n } = useTranslation();

  const initialValues = {
    email: '',
    fullname: '',
    store_name: '',
    store_location: '',
    curp: '',
    whatsapp_number: '',
    postal_code: '',
    country: '',
    state: '',
    city: '',
    sell_description: ''
  };

  useEffect(() => {
    checkUserVendor();
  }, [])

  const checkUserVendor = async () => {
    try{
      let data = await ApiService.checkUserVendor();
      console.log('data.data: ', data.data);
      if(!data.data.isApplied){
        getStates();
      }else{
        switch (data.data?.status) {
          case "pending":
            setStatus("pending");
            break;
          case "suspended":
            setStatus("suspended");
            break;
          case  "disabled":
            setStatus("disabled");
            break;
          case  "rejected":
            setStatus("rejected");
            break;
          case "approved":
            setStatus("approved");
            navigate("/dashboard");
            break;
          default:
            break;
        }
        setAlreadyApplied(true);
        setIsLoading(false);
      }
    }catch(e){
      getStates();
      setAlreadyApplied(false);
      setIsLoading(false);
    }
  }

  const getStates = async () => {
    try{
      let data = await ApiService.getStates();
      setCountry({id: data.data.id, name: data.data.name});
      setFieldValue("country", data.data.id)
      setStates(data.data.states);
    }catch(e){
      console.log(e);
    }
    finally{
      setIsLoading(false);
    }
  }

  const getCities = async (id: number) => {
    try{
      let data = await ApiService.getCities(id);
      setFieldValue("state", id)
      setCities(data.data);
    }catch(e){
      console.log(e);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("email_validation_message")).max(255).required(t("email_required_message")),
    fullname: Yup.string().required(t("full_name_required")),
    store_name: Yup.string().required(t("store_name_required")),
    store_location: Yup.string().required(t("store_location_required")),
    curp: Yup.string().min(18).max(18).required(t("curp_required")),
    whatsapp_number: Yup.number().required(t("whatsapp_number_required")),
    // address: Yup.string().required(t("address_required")),
    postal_code: Yup.number().required(t("postal_code_required")),
    country: Yup.string().required(t("country_required")),
    state: Yup.string().required(t("state_required")),
    city: Yup.string().required(t("city_required")),
    sell_description: Yup.string().required(t("sell_description_required"))
  });

  useEffect(() => {
    validateForm();
  }, [i18n.language]); 

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    validateForm
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let sellerRegister = await ApiService.sellerRegistration(
          {
            userId: userData.userDetails.id,
            vendorFullName: values.fullname,
            storeName: values.store_name, 
            storeLocation: values.store_location,
            curp: values.curp,
            email: values.email,
            whatsappNumber: values.whatsapp_number,
            postalCode: values.postal_code,
            cityId: values.city,
            stateId: values.state,
            countryId: values.country,
            sellDescription: values.sell_description,
            district: values.district
          });
          if(sellerRegister){
            Toast.showSuccessMessage('Applied for vendor successfully.');
            checkUserVendor();
            // setAlreadyApplied(true);
          }
        // navigate('/');
      } catch (error: any) {
        setIsSubmitting(false);
        Toast.showErrorMessage('Registration Failed For Vendor.');
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if(values.state){
      getCities(values.state);
    }
  }, [values.state])

  if(!isLoading && alreadyApplied){
    return(
      <VendorStatus status={status} />
    )
  }
  
  return (
    <Box  sx={{ width:'100%',
      backgroundImage: 'white.main', 
      height: '100%', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
    }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} maxWidth={"100%"} marginBlock={{xs:6, md:12}} paddingInline={2} >
        {
          !isLoading ?
          <Box maxWidth={"550px"} padding={{xs:2 , md:4}} border={'2px solid '} borderColor={'primary.main'} borderRadius={10} bgcolor={'rgba(255,255,255,0.1)'} sx={{backdropFilter:'blur(10px)', }}>
            <H5 display={"flex"} alignItems={"center"} justifyContent={"center"} color={'primary.main'} fontSize={{ sm: 30, xs: 25 }} marginBottom={5} marginTop={2} >{t("seller_create_account")}</H5>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("vendor_full_name")}
                    name={"fullname"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.fullname}
                    helperText={touched.fullname && typeof errors.fullname === "string" ? errors.fullname : ""}
                    error={Boolean(touched.fullname && errors.fullname)}
                  />
                </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("email_id")}
                    name={"email"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.email}
                    helperText={touched.email && typeof errors.email === "string" ? errors.email : ""}
                    error={Boolean(touched.email && errors.email)}
                  />
                </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("store_name")}
                    name={"store_name"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.store_name}
                    helperText={touched.store_name && typeof errors.store_name === "string" ? errors.store_name : ""}
                    error={Boolean(touched.store_name && errors.store_name)}
                  />
                </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"number"}
                    fullWidth={true}
                    placeholder={t("whatsapp_number")}
                    name={"whatsapp_number"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.whatsapp_number}
                    helperText={touched.whatsapp_number && typeof errors.whatsapp_number === "string" ? errors.whatsapp_number : ""}
                    error={Boolean(touched.whatsapp_number && errors.whatsapp_number)}
                  />
                </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("curp")}
                    name={"curp"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.curp}
                    helperText={touched.curp && typeof errors.curp === "string" ? errors.curp : ""}
                    error={Boolean(touched.curp && errors.curp)}
                  />
                </Grid>

                <Grid size={12}>
                  <Typography mb={0.5} variant='body2'>*{t("please_enter_your_store_location")}</Typography>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("store_location")}
                    name={"store_location"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.store_location}
                    helperText={touched.store_location && typeof errors.store_location === "string" ? errors.store_location : ""}
                    error={Boolean(touched.store_location && errors.store_location)}
                  />
                </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("postal_code")}
                    name={"postal_code"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.postal_code}
                    helperText={touched.postal_code && typeof errors.postal_code === "string" ? errors.postal_code : ""}
                    error={Boolean(touched.postal_code && errors.postal_code)}
                  />
                </Grid>


                  <Grid size={12}>
                    <TextField 
                      select 
                      fullWidth 
                      name="country" 
                      placeholder={t("country")} 
                      onBlur={handleBlur} 
                      onChange={handleChange} value={values.country} 
                      helperText={touched.language && errors.language ? String(errors.language) : ""} 
                      error={Boolean(touched.language && errors.language)} 
                      slotProps={{
                        select: {
                          native: true,
                          IconComponent: KeyboardArrowDown
                        }
                      }}
                      sx={{
                        border: "0",
                        p: 0,
                        "& .MuiInputBase-input": {
                          p: "8px 0px",
                          border: "0",
                          outline: 0,
                          color: "primary.main",
                          fontWeight: 300,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            outline: 0,
                            borderLeft: "0 !important",
                            borderRight: "0 !important",
                            borderTop: "0 !important",
                            borderBottom: "2px solid primary.main",
                            borderRadius: 0,
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                        "& .Mui-error": {
                          mx: 0,
                        },
                      }}
                      >
                      {
                        country && country !== null && country !== undefined && Object.entries(country).length > 0 ?
                          <option value={country?.id}>{country?.name}</option>
                        : ''
                      }
                      </TextField>
                  </Grid>

                  <Grid size={12}>
                      {
                        states && states !== null && states !== undefined && states.length > 0 ?
                        <Autocomplete
                          id="state-select"
                          sx={{ width: "100%" }} // Adjust width if needed
                          options={states || []} // Ensure `states` is defined
                          autoHighlight
                          getOptionLabel={(option: any) => option.name} // Display state name
                          isOptionEqualToValue={(option, value) => option.id === value.id} // Ensure correct selection
                          onChange={(event, newValue) => {
                            handleChange({ target: { name: "state", value: newValue?.id || "" } });
                          }}
                          value={states?.find((s: any) => s.id === values.state) || null} // Keep it controlled
                          renderOption={(props, option) => (
                            <Box component="li" {...props}>
                              {option.name}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t("state")}
                              onBlur={handleBlur}
                              variant='standard'
                              error={Boolean(touched.state && errors.state)}
                              helperText={touched.state && errors.state ? String(errors.state) : ""}
                              sx={{
                                border: "0",
                                p: 0,
                                "& .MuiAutocomplete-inputRoot":{
                                  p: " 0px !important"
                                },
                                "& .MuiInputBase-input": {
                                  p: "8px 0px !important",
                                  border: "0",
                                  outline: 0,
                                  color: "primary.main",
                                  fontWeight: 300,
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    outline: 0,
                                    borderLeft: "0 !important",
                                    borderRight: "0 !important",
                                    borderTop: "0 !important",
                                    borderBottom: "2px solid primary.main",
                                    borderRadius: 0,
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "primary.main",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "primary.main",
                                  },
                                },
                                "& .Mui-error": {
                                  mx: 0,
                                },
                              }}
                            />
                          )}
                        />
                        : ''
                      }
                  </Grid>

                  <Grid size={12}>
                      {
                        cities && cities !== null && cities !== undefined && cities.length > 0 ?
                        <Autocomplete
                          id="city-select"
                          sx={{ width: "100%" }}
                          options={cities || []} 
                          autoHighlight
                          getOptionLabel={(option: any) => option.name}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          onChange={(event, newValue) => {
                            handleChange({ target: { name: "city", value: newValue?.id || "" } });
                          }}
                          value={cities?.find((s: any) => s.id === values.city) || null}
                          renderOption={(props, option) => (
                            <Box component="li" {...props}>
                              {option.name}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t("city")}
                              onBlur={handleBlur}
                              variant='standard'
                              error={Boolean(touched.city && errors.city)}
                              helperText={touched.city && errors.city ? String(errors.city) : ""}
                              sx={{
                                border: "0",
                                p: 0,
                                "& .MuiAutocomplete-inputRoot":{
                                  p: " 0px !important"
                                },
                                "& .MuiInputBase-input": {
                                  p: "8px 0px !important",
                                  border: "0",
                                  outline: 0,
                                  color: "primary.main",
                                  fontWeight: 300,
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    outline: 0,
                                    borderLeft: "0 !important",
                                    borderRight: "0 !important",
                                    borderTop: "0 !important",
                                    borderBottom: "2px solid primary.main",
                                    borderRadius: 0,
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "primary.main",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "primary.main",
                                  },
                                },
                                "& .Mui-error": {
                                  mx: 0,
                                },
                              }}
                            />
                          )}
                        />
                        : 
                        <TextBox
                          type={"select"}
                          fullWidth={true}
                          placeholder={t("city")}
                          name={"city"}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          value={values.city}
                          helperText={touched.city && typeof errors.city === "string" ? errors.city : ""}
                          error={Boolean(touched.city && errors.city)}
                        />
                      }
                  </Grid>

                  <Grid size={12}>
                  <TextBox
                      type={"text"}
                      fullWidth={true}
                      placeholder={t("sell_description")}
                      name={"sell_description"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.sell_description}
                      helperText={touched.sell_description && typeof errors.sell_description === "string" ? errors.sell_description : ""}
                      error={Boolean(touched.sell_description && errors.sell_description)}
                    />
                  </Grid>

                  <Grid size={12}>
                    
                    <Box pl={0} display={"flex"} justifyContent={"left"} alignItems={"center"} mb={'20px'}>
                      <Checkbox  sx={{ p: 0, color:'primary.main','&.Mui-checked':{color:'primary.main'}, mr:0.5, }} checked={isTermSet} onChange={() => {setIsTermSet(!isTermSet)}} />
                      <Paragraph m={0.5}  color="Black" fontSize={14} fontWeight={400}>
                        {t("i_accept_the")}{' '}
                        <Link color='secondary'>{t("terms_and_conditions")}</Link>
                      </Paragraph>
                    </Box>

                    <LoadingButton disabled={!isTermSet || Object.entries(errors).length > 0 || Object.entries(touched).length <= 0 } loading={isSubmitting} type="submit" variant="contained" fullWidth sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                    {t("confirm")}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>

          </Box>
          : <LoadingProgress />
        }
      </Box>
    </Box>
  )
}

export default Register;