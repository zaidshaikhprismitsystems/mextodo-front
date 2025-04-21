import { Autocomplete, Box, Button, Card, FormHelperText, Select, Tab, Tabs, FormControl, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField, Typography, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { FlexBetween, FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H2, H6, Paragraph } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from "../../services/apiServices/apiService";
import AdminEcommerce from "../../icons/duotone/AdminEcommerce";
import Carousel from '../carousel'
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DropZone from "../dropzone";
import Stack from '@mui/material/Stack'
import { category_url } from "../../config/config"
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { ProductPreview } from "../product-preview";
// STYLED COMPONENTS

import styled from '@mui/material/styles/styled'
import { phyical_name, digital_name, vehicle_name, property_name } from "../../config/config";
import { FolderZip, KeyboardArrowDown, Label } from "@mui/icons-material";
import { relative } from "path";
import { grey } from "@mui/material/colors";

import { EmailOutlined, PhoneAndroid, Drafts, LocalShipping, ShoppingBag, ShoppingCart, Edit } from '@mui/icons-material'

import FolderZipIcon from '@mui/icons-material/FolderZip';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from '../../services/store/store';
import { UserRole } from '../../utils/enums';

export default function ProductForm(
  {
    action,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleDropFile,
    removeImage,
    featuredImage,
    handleDropFeaturedImage,
    removeFeaturedImage,
    attributes,
    displayImages,
    handleDropVideo,
    video,
    removeVideo,
    categoryName,
    handleChangeUnit,
    removeDigitalProduct,
    digitalProduct,
    handleDropDigital,
    states,
    cities,
    handleRentOrSale,
    isUpdate,
    isSubmitting,
    setFieldValue
  }: any) {
     
    const { t, i18n } = useTranslation();
    
    const defaultPhysicalData = [ 
      { title: t("length"), name: "length" },
      { title: t("width"), name: "width" },
      { title: t("height"), name: "height" },
      { title: t("weight"), name: "weight" }
    ];

    const FILTER_VALUES = [
      { id: 1, name: t("pending"), value: 'pending' },
      { id: 2, name: t("approved"), value: 'approved' },
      { id: 3, name: t("rejected"), value: 'rejected' },
      { id: 4, name: t("disabled"), value: 'disabled' },
    ]

    function isValidURL(string: any) {
      try {
          new URL(string);
          return true;
      } catch (_) {
          return false;
      }
    }
  
  const userData: any = useAppSelector((state: RootState) => state.user)
  
  const getDigitalProductView = (type: any, data: any) => {
    console.log('data: ', data);
    switch (type) {
      case "image":
        return <img src={data} alt="Digital Product" width={'100%'} height={'200px'} style={{objectFit:"cover",  borderRadius:5,}} />;
      break;
    case "video":
      return <video controls src={data}  width={'100%'} height={'200px'} style={{objectFit:"cover",  borderRadius:5,}} />;
      break;
    case "audio":
      return <audio controls src={data} style={{objectFit:"cover",  borderRadius:5,}} />;
      break;
    case "documents":
      return (
        <div>
          {
            isUpdate && isValidURL(data) ?
            <iframe 
              src={data} 
              width="100%" 
              height={'200px'}
              style={{ border: "none" }}
            />
            :
            <>
            📄{data}
            <p>Document File: <DocumentScannerIcon /></p>
            </>
          }
        </div>
      );
    break;    
    case "compresed_files":
      return (
          isUpdate && isValidURL(data) ?
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FolderZip style={{ color: "#FF9370" }} />
            <a href={data} download style={{ textDecoration: "none", color: "#007bff" }}>
              Download
            </a>
          </div>
          :
          <div>
            📦{data}
            <p>Compressed File: <FolderZipIcon /></p>
          </div>
      );
      break;
    default:
      return null;
      break;
  }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{p: 2}}>
        <Grid container spacing={3} alignItems="start">
          <Grid size={12}>
            <FlexBox gap={0.5} alignItems="center">
              <IconWrapper>
                <AdminEcommerce color="primary" />
              </IconWrapper>

              <H6 sx={{m: 0,}} fontSize={16}>{!isUpdate ? t("create_new_product") : t("update_product") }</H6>
            </FlexBox>
          </Grid>

          <Grid container spacing={2} size={{
              xs: 12
            }}>
              
              <Grid size={12}>
                <H6 sx={{my: 1}} fontSize={16}>{t("main_parameters")}</H6>
              </Grid>

              <Grid size={{
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("title_english")} 
                  name={"titleEn"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.titleEn}
                  helperText={touched.titleEn && typeof errors.titleEn === "string" ? errors.titleEn : ""} 
                  error={Boolean(touched.titleEn && errors.titleEn)}
                />
              </Grid>

              <Grid size={{
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("title_spanish")}
                  name={"titleSp"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.titleSp}
                  helperText={touched.titleSp && typeof errors.titleSp === "string" ? errors.titleSp : ""} 
                  error={Boolean(touched.titleSp && errors.titleSp)}
                />
              </Grid>
          </Grid>

            <Grid container spacing={2} size={{
                xs: 12
              }}>

              <Grid size={{
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("desc_english")} 
                  name={"descriptionEn"}
                  rows={5}
                  multiline={true}
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.descriptionEn}
                  helperText={touched.descriptionEn && typeof errors.descriptionEn === "string" ? errors.descriptionEn : ""} 
                  error={Boolean(touched.descriptionEn && errors.descriptionEn)}
                />
              </Grid>

              <Grid size={{
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("desc_spanish")} 
                  name={"descriptionSp"} 
                  handleBlur={handleBlur}
                  rows={5}
                  multiline={true}
                  handleChange={handleChange} 
                  value={values.descriptionSp}
                  helperText={touched.descriptionSp && typeof errors.descriptionSp === "string" ? errors.descriptionSp : ""} 
                  error={Boolean(touched.descriptionSp && errors.descriptionSp)}
                />
              </Grid>

            </Grid>
              
            <Grid container spacing={2} size={{
                xs: 12
              }}>
            
              <Grid size={{
                  xs: 6
                }}>
                <TextBox
                  type={"number"}
                  fullWidth={true}
                  placeholder={t("price")} 
                  name={"price"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.price}
                  helperText={touched.price && typeof errors.price === "string" ? errors.price : ""} 
                  error={Boolean(touched.price && errors.price)}
                />
                {
                  categoryName === phyical_name && values.price > 2999 ?
                    <Box component="p" sx={{ fontSize: "12px", color: "primary.main" }}>{`price exeded the limit of 2,999. Your Product Price Should be ${values.price+(1.5*values.price/100)}`}</Box>
                  : 
                  ''
                }
              </Grid>

              <Grid size={{
                  xs: 6
                }}>
                <TextBox
                  type={"number"}
                  fullWidth={true}
                  placeholder={t("discount_price")} 
                  name={"discountPrice"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.discountPrice}
                  helperText={touched.discountPrice && typeof errors.discountPrice === "string" ? errors.discountPrice : ""} 
                  error={Boolean(touched.discountPrice && errors.discountPrice)}
                />
                {
                  categoryName === phyical_name && values.price > 2999 ?
                    <Box component="p" sx={{ fontSize: "12px", color: "primary.main" }}>{`price exeded the limit of 2,999. Your Product Price Should be ${values.discountPrice+(1.5*values.discountPrice/100)}`}</Box>
                  : 
                    ''
                }
              </Grid>

            </Grid>

            {
              categoryName === phyical_name ?
                <Grid size={{
                      xs: 6
                    }}>
                    <TextBox
                      type={"number"}
                      fullWidth={true}
                      placeholder={t("stock")} 
                      name={"stock"} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.stock}
                      helperText={touched.stock && typeof errors.stock === "string" ? errors.stock : ""} 
                      error={Boolean(touched.stock && errors.stock)}
                    />
                </Grid>
              : ''
            }


            {
              categoryName === vehicle_name || categoryName === property_name ?
              <>
              <Grid container spacing={2} size={{
                xs: 12
              }}>
                <Grid size={12}>
                  <Typography variant="caption">{t("rent_or_sale")}</Typography>
                </Grid>
                  <Grid size={{
                    xs: 6
                  }}>
                    <FlexBox sx={{gap:1, mt:1,
                      '& label':{
                        width:'100%',
                        P:1,
                        display:'flex',
                        alignItems:'center',
                        borderRadius:'30px',
                        color:'primary.main',
                        '&:has(.Mui-checked)':{
                          backgroundColor:'primary.100',
                        }
                        }
                    }}>
                      <label>
                        <Radio
                          checked={values.rentOrSale === 'rent'}
                          onChange={() => {handleRentOrSale("rent")}}
                          value={values.rentOrSale}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'Rent' }}
                        />
                        {t("rent")} 
                      </label>

                      <label>
                        <Radio
                          checked={values.rentOrSale === 'sale'}
                          onChange={() => {handleRentOrSale("sale")}}
                          value={values.rentOrSale}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'Sale' }}
                        />{t("sale")} 
                        </label>
                    </FlexBox>
                </Grid> 
              </Grid>
              
              {/* Whatsapp Number */}
              <Grid container spacing={2} size={{
                xs: 12
              }}>
                  <Grid size={{
                    xs: 12
                  }}>
                  <TextBox
                    type={"number"}
                    fullWidth={true}
                    placeholder={t("whatsapp_number")} 
                    name={"whatsappNumber"} 
                    handleBlur={handleBlur} 
                    handleChange={handleChange} 
                    value={values.whatsappNumber}
                    helperText={touched.whatsappNumber && typeof errors.whatsappNumber === "string" ? errors.whatsappNumber : ""} 
                    error={Boolean(touched.whatsappNumber && errors.whatsappNumber)}
                  />
                </Grid> 
              </Grid>
              </>
              :
              ''
          }

            <Grid size={12}>
                {
                  states && states !== null && states !== undefined && states.length > 0 ?
                  <Autocomplete
                    id="state-select"
                    sx={{ width: "100%" }} // Adjust width if needed
                    options={states || []} // Ensure `states` is defined
                    autoHighlight
                    getOptionLabel={(option: any) => option.name} // Display state name
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      handleChange({ target: { name: "state", value: newValue?.id || "" } });
                    }}
                    value={states?.find((s: any) => s.id === values.state) || null}
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
                        variant='outlined'
                        error={Boolean(touched.state && errors.state)}
                        helperText={touched.state && errors.state ? String(errors.state) : ""}
                      />
                    )}
                  />
                  : ''
                }
            </Grid>

                {
                categoryName === phyical_name || categoryName === digital_name ? 
                  ''
                : 
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
                        variant='outlined'
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city ? String(errors.city) : ""}
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
                }

                {
                categoryName === digital_name ?
                <>
                <Grid size={{
                    xs: 12
                  }}>
                    <FlexBetween sx={{gap:1}}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("digital_product_type")}</InputLabel>
                    <Select 
                        fullWidth 
                        name={"digitalProductType"}
                        label={t("digital_product_type")}
                        variant='outlined'
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.digitalProductType}
                        error={Boolean(touched.digitalProductType && errors.digitalProductType)} 
                        >
                          <MenuItem value={"image"}>{t("image")}</MenuItem>
                          <MenuItem value={"audio"}>{t("audio")}</MenuItem>
                          <MenuItem value={"video"}>{t("video")}</MenuItem>
                          <MenuItem value={"documents"}>{t("documents")}</MenuItem>
                          <MenuItem value={"compresed_files"}>{t("compressed_files")}</MenuItem>
                    </Select>
                    </FormControl>
                    {touched.digitalProductType && errors.digitalProductType && (
                      <FormHelperText>{String(errors.digitalProductType)}</FormHelperText>
                    )}
                    </FlexBetween>
                </Grid>
                
                <Box sx={{width:'100%'}}>
                  <Typography variant="body2" sx={{ fontSize:16, fontWeight:600}}>{t("digital_product")}</Typography>
                  <Card sx={{my: 1, width:'100%', p:1, borderRadius:2}}>
                    {
                      values?.digitalProduct && values?.digitalProduct !== null && values?.digitalProduct !== undefined ?
                      <>
                      <Grid container spacing={2} sx={{py:0,}} >
                        <Grid size={12}  sx={{p:0, height:'auto', position:'relative'}}>
                          {getDigitalProductView(values.digitalProductType, digitalProduct)}
                          <Button onClick={() => {removeDigitalProduct()}}  sx={{width:'100%', cursor:"pointer", backgroundColor:"grey.300"}}>
                            {t("remove")}
                          </Button>
                        </Grid>
                      </Grid>
                      </>
                      :
                      <DropZone 
                        onDrop={handleDropDigital} 
                        maxFiles={1} 
                        minFiles={1} 
                        curFile={values.digitalProduct.length}
                        placeholder={t("add_digital_product")}
                        paragraph={t("drop_your_digital_product_here")}
                        accept={['.png', '.gif', '.jpeg', '.jpg', '.mp4', '.wav', '.pdf', '.docx', '.txt', '.xls', '.rar', '.zip']}
                        formError={errors.digitalProduct}
                      />
                    }
                  </Card>
                  </Box>
                </>
                : ''
                }           

                {
                  categoryName === phyical_name ?
                  <Grid container alignItems={'center'} size={{
                    xs: 12
                  }}>
                    
                    <FlexBetween  sx={{gap:1, width:'100%'}}>
                      <Typography variant="body2" sx={{ fontSize:16, fontWeight:600}}>{t("unit")}</Typography>
                      
                      <Tabs  
                        value={values.unit === "KG/CM" ? 0 : 1}
                        onChange={handleChangeUnit}
                        aria-label="unit type"
                        sx={{ border:2, borderRadius:3,  borderColor:'primary.800', minHeight:'auto',

                          '& .MuiTabs-flexContainer':{
                            gap:0,
                          },
                          '& .MuiTabs-list':{
                            gap:0,
                            zIndex:1,
                            position:'relative',
                          },
                          '& .MuiTabs-indicator':{
                            backgroundColor:'primary.800',
                            height:'100%',
                            zIndex:'0',
                          },
                          '& .MuiButtonBase-root':{
                            py:1, px:2,
                            zIndex:2,
                            position:'relative',
                            border:0,
                            fontWeight:500,
                            '&.Mui-selected':{
                              color:'white.main',
                            },
                          },
                          }}
                      >
                        <Tab label="KG/CM" />
                        <Tab label="LB/IN" />
                      </Tabs>
                    </FlexBetween>
                  </Grid>
                  : ''
                }

                {
                  categoryName === phyical_name ?
                  defaultPhysicalData.map((data: any) => {
                    return(
                      <Grid size={{
                        xs: 6
                      }}>
                        <TextBox
                          type={"number"}
                          fullWidth={true}
                          placeholder={data.title} 
                          name={data.name} 
                          handleBlur={handleBlur} 
                          handleChange={handleChange} 
                          value={values[data.name]}
                          helperText={touched[data.name] && typeof errors[data.name] === "string" ? errors[data.name] : ""} 
                          error={Boolean(touched[data.name] && errors[data.name])}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">{data.name === "weight" ? values.weight_type : values.dimensions_type}</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    )
                  })
                  : ''
                }

            {/* Attributes Input List */}
            {
              attributes.map((attribute: any, index: number) => {
                return(
                <Grid size={{
                  md: 6,
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={i18n.language === 'en' ? attribute.name : attribute.nameSp}
                  name={attribute.name} 
                  handleBlur={handleBlur}
                  handleChange={handleChange} 
                  value={values[attribute.name]}
                  helperText={
                    touched[attribute.name] && typeof errors[attribute.name] === "string"
                      ? String(errors[attribute.name])
                      : ""
                  } 
                  error={Boolean(touched[attribute.name] && errors[attribute.name])}
                />
              </Grid>
                )
              })
            }

            <Box sx={{width:'100%'}}>
              <Typography variant="body2" sx={{ fontSize:16, fontWeight:600}}>{t("featured_image")}</Typography>
              <Card sx={{my: 1, width:'100%', p:1, borderRadius:2}}>
                {
                  featuredImage && featuredImage !== null ?
                  <>
                  <Grid container spacing={2} sx={{py:0,}} >
                    <Grid size={12}  sx={{p:0, height:'auto', position:'relative'}}>
                      <img src={featuredImage} width={'100%'} height={'200px'} style={{objectFit:"cover",  borderRadius:5,}}/>
                      <Button onClick={() => {removeFeaturedImage()}}  sx={{width:'100%', cursor:"pointer", backgroundColor:"grey.300"}}>
                        {t("remove")}
                      </Button>
                    </Grid>
                  </Grid>
                  </>
                  :
                  <DropZone 
                    onDrop={handleDropFeaturedImage} 
                    maxFiles={1} 
                    minFiles={1} 
                    curFile={values.featuredImage.length}
                    placeholder={t("add_featured_image")} 
                    paragraph={t("drop_your_featured_image_here")}
                    accept={['.png', '.gif', '.jpeg', '.jpg']}
                    formError={errors.featuredImage}
                  />
                }
              </Card>
            </Box>
            
            {
              categoryName !== digital_name ?
              <Box sx={{width:'100%'}}>
              <Typography variant="body2" sx={{ fontSize:16, fontWeight:600}}>Video</Typography>
              
              <Card sx={{my: 1, width:'100%', p:1, borderRadius:2}}>
                {
                  video && video !== null ?
                  <>
                  <Grid container spacing={2} sx={{py:0,}} >
                  <Grid size={12}  sx={{p:0, height:'auto', position:'relative'}}>
                          <video src={video} width={'100%'} height={'200px'} style={{objectFit:"cover",  borderRadius:5,}}/>
                          <Button onClick={() => {removeVideo()}}  sx={{width:'100%', cursor:"pointer", backgroundColor:"grey.300"}}>
                          {t("remove")}
                          </Button>
                        </Grid>
                  </Grid>
                  </>
                  :
                  <DropZone 
                    onDrop={handleDropVideo} 
                    maxFiles={1} 
                    minFiles={1} 
                    curFile={values.video.length} 
                    placeholder={t("add_video")} 
                    paragraph={t("drop_your_video_here")}
                    accept={['.mp4', '.wav']}
                    formError={errors.video}
                    isVideo={true}
                  />
                }
              </Card>
            </Box>
            : '' 
            }

            <Box sx={{width:'100%'}}>
            <Typography variant="body2" sx={{ fontSize:16, fontWeight:600}}>{t("thumbnails")}</Typography>
              <Card sx={{my: 1, width:'100%', p:1, borderRadius:2}}>
                {/* {
                  displayImages && displayImages.length > 0 ? */}
                  <>
                  {
                    displayImages && displayImages.length > 0 ?
                    <Grid container spacing={2} sx={{py:2,}} >
                      {displayImages.map((img: any, index: number) => {
                        return(
                          <Grid size={4}  sx={{p:0, height:'100px', position:'relative'}}>
                            <span onClick={() => {removeImage(index)}} style={{position:"absolute", top:'-10px', right:'-10px', cursor:"pointer"}}>
                              <DoDisturbOnIcon sx={{fontSize:"20px", color:'red'}} />
                              </span>
                            <img src={img} width={'100%'} height={'100%'} style={{objectFit:"cover",  borderRadius:10,}}/>
                          </Grid>
                        )
                      })}
                    </Grid>
                    : ''
                  }
                  {
                    values.images.length >= 14 ? '' : 
                    <DropZone 
                      onDrop={handleDropFile} 
                      maxFiles={14}
                      minFiles={5}
                      curFile={values.images.length} 
                      placeholder={t("add_thumbnails_image")} 
                      paragraph={t("drop_your_images_here")} 
                      accept={['.png', '.gif', '.jpeg', '.jpg']}
                      formError={errors.images}
                    />
                  }
                  </>
              </Card>
            </Box>

            {/* Shipping Details */}
            {
              categoryName === phyical_name ?
              <>
                <FlexBetween sx={{gap:2, flexWrap:'wrap' }}>
                  <H6 fontSize={14} >
                  {t("shipping")}
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
                      value={values.packType}
                      onChange={(e: any) => { setFieldValue("packType", e.target.value) }}
                    >
                      <FormControlLabel value="envelope" control={<Radio />} label={<FlexBox gap={0.5}><Drafts fontSize='small'/>{t("envelope")}</FlexBox>} />
                      <FormControlLabel value="box" control={<Radio />} label={<FlexBox gap={0.5}><ShoppingBag  fontSize='small'/> {t("box")}</FlexBox>} />
                      <FormControlLabel value="pallet" control={<Radio />} label={<FlexBox gap={0.5}><ShoppingCart  fontSize='small'/> {t("pallet")}</FlexBox>} />
                      <FormControlLabel value="truck" control={<Radio />} label={<FlexBox gap={0.5}><LocalShipping  fontSize='small'/> {t("truck")}</FlexBox>} />
                      
                    </RadioGroup>
                    <Typography sx={{fontSize: "12px", color: "red"}}>{touched.packType && typeof errors.packType === "string" ? errors.packType : ""}</Typography>
                  </FormControl>

                </FlexBetween>
                <Grid container spacing={3}>
                  <Grid size={{ xs:12, sm: 6 }}>
                    <TextBox
                      type={"text"}
                      fullWidth={true}
                      placeholder={t("content")} 
                      name={"content"} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.content}
                      helperText={touched.content && typeof errors.content === "string" ? errors.content : ""} 
                      error={Boolean(touched.content && errors.content)}
                    />
                  </Grid>
                  <Grid size={{ xs:12, sm: 6 }}>
                    <TextBox
                      type={"number"}
                      fullWidth={true}
                      placeholder={t("box_quantity")}
                      name={"boxQuantity"}
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.boxQuantity}
                      helperText={touched.boxQuantity && typeof errors.boxQuantity === "string" ? errors.boxQuantity : ""} 
                      error={Boolean(touched.boxQuantity && errors.boxQuantity)}
                    />
                  </Grid>
                </Grid>
              </>
              : ''
            }

            {
              userData && userData?.userDetails.role === UserRole.SUPER_ADMIN && action === 'update' &&
              <Grid size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label={t("status")}
                  className="select"
                  value={values.status}
                  onChange={(e) => setFieldValue('status', e.target.value)}
                  disabled={!isUpdate}
                >
                  {FILTER_VALUES.map(({ id, name, value }) => (
                    <MenuItem key={id} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            }

            <Grid size={{
                xs: 12
              }}>
              <TextField
                type={"select"}
                fullWidth={true}
                placeholder={t("desc_spanish")} 
                name={"descriptionSp"}
                onChange={(e: any) => {setFieldValue("vendorId", errors.target.value)}} 
                value={values.descriptionSp}
                helperText={touched.descriptionSp && typeof errors.descriptionSp === "string" ? errors.descriptionSp : ""} 
                error={Boolean(touched.descriptionSp && errors.descriptionSp)}
              />
            </Grid>
              
        </Grid>

        <FlexBox flexWrap="wrap" sx={{mt: 4}} gap={2}>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained">
          { !isUpdate ? t("create_new_product") : t("update_product") }
          </LoadingButton>

          <Button variant="outlined" color="secondary" type="reset">
          {t("cancel")}
          </Button>
        </FlexBox>

      </Card>
    </form>
  )
}