import { Autocomplete, Box, Button, ListItem, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslation } from "react-i18next";

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { TextBox } from "../textbox";

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
    isSubmitting,
    handleClose,
    isUpdate
  }: any) {
     
    const { t, i18n } = useTranslation();
    
  return (
    <Box  
      sx={{ width:'100%',
        backgroundImage: 'white.main', 
        height: '100%', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
      }}>
          {
            !isUpdate ?
            <Button onClick={enableUpdate}>Unable Update</Button>
            :
            ''
          }
          <Box padding={{xs:2 , md:4}} bgcolor={'rgba(255,255,255,0.1)'} sx={{backdropFilter:'blur(10px)', }}>
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
                      disabled={!isUpdate}
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
                      disabled={!isUpdate}
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
                    disabled={!isUpdate}
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
                    disabled={!isUpdate}
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
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={12}>
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
                    disabled={!isUpdate}
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
                      disabled={!isUpdate}
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
                          disabled={!isUpdate}
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
                          disabled={!isUpdate}
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
                          disabled={!isUpdate}
                        />
                      }
                  </Grid>

                  <Grid size={12}>
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
                    />
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
                      disabled={!isUpdate}
                    />
                  </Grid>

                  <Grid size={12}>
                  <TextField
                      select
                      fullWidth={true}
                      label={t("status")}
                      variant='standard'
                      name={"status"}
                      onChange={(event: any) => { setFieldValue("status", event.target.value) }}
                      value={values.status}
                      helperText={touched.status && typeof errors.status === "string" ? errors.status : ""}
                      error={Boolean(touched.status && errors.status)}
                      disabled={!isUpdate}
                    >
                      <ListItem value={"pending"}>Pending</ListItem>
                      <ListItem value={"approved"}>Approved</ListItem>
                      <ListItem value={"rejected"}>Rejected</ListItem>
                      <ListItem value={"suspended"}>Suspended</ListItem>
                    </TextField>
                  </Grid>

                  {
                    isUpdate ?
                    <Grid container mt={2}>
                      <Grid size={6}>
                        <LoadingButton loading={isSubmitting} type="submit" variant="contained" fullWidth sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                        {t("confirm")}
                        </LoadingButton>
                      </Grid>
                      <Grid size={6}>
                        <Button onClick={handleClose}  variant="contained" fullWidth sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                        {t("cancel")}
                        </Button>
                      </Grid>
                    </Grid>
                    :
                    ''
                  }
                </Grid>
              </form>

          </Box>
        </Box>
  )
}