import { Autocomplete, Box, Button, ListItem, MenuItem, Select, Switch, TextField } from '@mui/material'
import { Fragment } from 'react'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card'
import { useTranslation } from "react-i18next";
import { CoverPicWrapper } from './styles'

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { TextBox } from "../textbox";

import UserInfo from './UserInfo'
import { FlexBetween } from '../flexbox';
import { Paragraph, Small } from '../typography';

export default function VendorForm(
  {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    enableUpdate,
    setFieldValue,
    country,
    states,
    cities,
    createdAt,
    isSubmitting,
    handleClose,
    isUpdate,
    checkVendorByPincode,
    addressData,
    isAddressDone,
    isGetAddrLoading
  }: any) {
    
    const { t, i18n } = useTranslation();
    
    let stateName = states?.find((s: any) => {
      if(s.id == values.state){
        return s.name;
      }
      return;
    } );

    console.log('values.cities: ', values);
    let cityName = cities?.find((s: any) => {
      if(s.id == values.city){
        return s.name;
      }
      return;
    } );

    console.log('addressData: ', addressData);

  return (


    <Box
      sx={{
        width: '100%',
        backgroundImage: 'white.main',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* {
        !isUpdate ?
          <Box px={{ xs: 1, md: 3 }} pb={3}>
            <Button onClick={enableUpdate} variant='outlined'>Unable Update</Button>
          </Box>
          :
          ''
      } */}
      <Box px={{ xs: 1, md: 3 }} bgcolor={'rgba(255,255,255,0.1)'} sx={{ backdropFilter: 'blur(10px)', }}>
        <Fragment>
          <Card sx={{ padding: 3, position: 'relative', boxShadow:0, border:'1px solid rgb(223, 223, 223)', borderRadius:3}}>
            {/* COVER IMAGE SECTION */}
            <CoverPicWrapper>
              <img
                width="100%"
                height="100%"
                alt="Team Member"
                src="/user-cover-pic.png"
              />
            </CoverPicWrapper>

            {/* USER INFO SECTION */}
            <UserInfo enableUpdate={enableUpdate} isUpdate={isUpdate} createdAt={createdAt} checkVendorByPincode={checkVendorByPincode} isGetAddrLoading={isGetAddrLoading} pincode={values.postal_code} isVerified={values.status === "approved" } />
          </Card>

          <Card sx={{ padding: 3, position: 'relative', mt: 3, boxShadow:0, border:'1px solid rgb(223, 223, 223)', borderRadius:3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>
                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                    disabled={!isUpdate}
                    // color={touched.email && !errors.email ? "success" : "primary"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderWidth: isAddressDone && addressData?.zip_code == values.postal_code ? "2px" : isAddressDone ? "2px" : '',
                          borderColor: isAddressDone && addressData?.zip_code == values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&:hover fieldset': {
                          borderColor: isAddressDone && addressData?.zip_code == values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isAddressDone && addressData?.zip_code == values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                      },
                      '& label': {
                        color: isAddressDone && addressData?.zip_code == values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                      },
                      '& label.Mui-focused': {
                        color: isAddressDone && addressData?.zip_code == values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                      },
                    }}
                  />
                </Grid>


                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextField
                    select
                    fullWidth
                    name="country"
                    variant='outlined'
                    label={t("country")}
                    onBlur={handleBlur}
                    onChange={handleChange} value={values.country}
                    helperText={touched.language && errors.language ? String(errors.language) : ""}
                    error={Boolean(touched.language && errors.language)}
                    disabled={!isUpdate}
                    slotProps={{
                      select: {
                        native: true,
                        IconComponent: KeyboardArrowDown
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderWidth: isAddressDone ? "2px" : isAddressDone ? "2px" : '',
                          borderColor: isAddressDone ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&:hover fieldset': {
                          borderColor: isAddressDone ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isAddressDone ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                      },
                      '& label': {
                        color: isAddressDone ? 'green' : isAddressDone ?   'red'  :  undefined,
                      },
                      '& label.Mui-focused': {
                        color: isAddressDone ? 'green' : isAddressDone ?   'red'  :  undefined,
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

                <Grid size={{ sm: 6, xs: 12 }}>
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
                        value={states?.find((s: any) => s.id === values.state) || null}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            {option.name}
                          </Box>
                        )}
                        disabled={!isUpdate}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("state")}
                            onBlur={handleBlur}
                            variant='outlined'
                            error={Boolean(touched.state && errors.state)}
                            helperText={touched.state && errors.state ? String(errors.state) : ""}
                            color={isAddressDone && addressData?.state?.name === stateName?.name ? "success" : "primary" }
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderWidth: "2px",
                                  borderColor: isAddressDone && addressData?.state?.name === stateName?.name ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                                '&:hover fieldset': {
                                  borderColor: isAddressDone && addressData?.state?.name === stateName?.name ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: isAddressDone && addressData?.state?.name === stateName?.name ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                              },
                              '& label': {
                                color: isAddressDone && addressData?.state?.name === stateName?.name ? 'green' : isAddressDone ?   'red'  :  undefined,
                              },
                              '& label.Mui-focused': {
                                color: isAddressDone && addressData?.state?.name === stateName?.name ? 'green' : isAddressDone ?   'red'  :  undefined,
                              },
                            }}
                          />
                        )}
                      />
                      : ''
                  }
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
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
                        disabled={!isUpdate}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("city")}
                            onBlur={handleBlur}
                            variant='outlined'
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city ? String(errors.city) : ""}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderWidth: isAddressDone && addressData?.locality === values.postal_code ? "2px" : isAddressDone ? "2px" : '',
                                  borderColor: isAddressDone && addressData?.zip_code === values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                                '&:hover fieldset': {
                                  borderColor: isAddressDone && addressData?.zip_code === values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: isAddressDone && addressData?.zip_code === values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                                },
                              },
                              '& label': {
                                color: isAddressDone && addressData?.zip_code === values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
                              },
                              '& label.Mui-focused': {
                                color: isAddressDone && addressData?.zip_code === values.postal_code ? 'green' : isAddressDone ?   'red'  :  undefined,
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
                        disabled={!isUpdate}
                      />
                  }
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("colonial")}
                    name={"district"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.district}
                    helperText={touched.district && typeof errors.district === "string" ? errors.district : ""}
                    error={Boolean(touched.district && errors.district)}
                    disabled={!isUpdate}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderWidth: addressData?.suburbs?.includes(values.district) ? "2px" : isAddressDone ? "2px" : '',
                          borderColor: addressData?.suburbs?.includes(values.district) ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&:hover fieldset': {
                          borderColor: addressData?.suburbs?.includes(values.district) ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: addressData?.suburbs?.includes(values.district) ? 'green' : isAddressDone ?   'red'  :  undefined,
                        },
                      },
                      '& label': {
                        color: addressData?.suburbs?.includes(values.district) ? 'green' : isAddressDone ?   'red'  :  undefined,
                      },
                      '& label.Mui-focused': {
                        color: addressData?.suburbs?.includes(values.district) ? 'green' : isAddressDone ?   'red'  :  undefined,
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextField
                    select
                    fullWidth={true}
                    label={t("status")}
                    variant='outlined'
                    name={"status"}
                    onChange={(event: any) => { setFieldValue("status", event.target.value) }}
                    value={values.status}
                    helperText={touched.status && typeof errors.status === "string" ? errors.status : ""}
                    error={Boolean(touched.status && errors.status)}
                    disabled={!isUpdate}
                  >
                    <MenuItem  value={"pending"}>Pending</MenuItem >                                             
                    <MenuItem  value={"approved"}>Approved</MenuItem >
                    <MenuItem  value={"rejected"}>Rejected</MenuItem >
                    <MenuItem  value={"suspended"}>Suspended</MenuItem >
                  </TextField>
                </Grid>
                
                {
                  isAddressDone && addressData ?
                  <a onClick={() => {
                    const latitude = addressData?.coordinates?.latitude;
                    const longitude = addressData?.coordinates?.longitude;
                    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    window.open(googleMapsUrl, '_blank');
                  }}>Click here to see location</a>
                  : ''
                }

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
                    disabled={!isUpdate}
                    multiline={true}
                    rows={3}
                  />
                </Grid>



                <Grid size={12}>
                  <FlexBetween>
                    <div>
                      <Paragraph fontWeight={500}>Vendor Approved</Paragraph>
                      <Small color="text.secondary">Vendor is approved by admin.</Small>
                    </div>
                    <Switch checked={values.approved} />
                  </FlexBetween>

                  <FlexBetween mt={2}>
                    <div>
                      <Paragraph fontWeight={500}>User is completed stripe verification</Paragraph>
                      <Small color="text.secondary">User be able to get amount from stripe connect.</Small>
                    </div>

                    <Switch checked={values.stripeVendorVerified} />
                  </FlexBetween>
                </Grid>

                {
                  isUpdate ?
                    <Grid container mt={2} size={12}>
                      <Grid size={6}>
                        <LoadingButton loading={isSubmitting} type="submit" variant="contained" fullWidth >
                          {t("confirm")}
                        </LoadingButton>
                      </Grid>
                      <Grid size={6}>
                        <Button onClick={handleClose} variant="outlined" fullWidth >
                          {t("cancel")}
                        </Button>
                      </Grid>
                    </Grid>
                    :
                    ''
                }
              </Grid>
            </form>
          </Card>
        </Fragment>
      </Box>
    </Box>


  )
}