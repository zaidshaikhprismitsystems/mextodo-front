import { Box, Button, Card, CardMedia, MenuItem, Select, SelectChangeEvent, TextField, Typography, FormControl, InputLabel } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H2, H3, H4, H5, H6, Paragraph } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from "../../services/apiServices/apiService";
import AdminEcommerce from "../../icons/duotone/AdminEcommerce";
import Carousel from '../carousel'
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DropZone from "../dropzone";
import Stack from '@mui/material/Stack'
import { category_url, phyical_name, digital_name, vehicle_name, property_name } from "../../config/config"
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { ProductPreview } from "../product-preview";
// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'
import React from "react";
import { KeyboardArrowDown } from "@mui/icons-material";


export default function AddTicket() {

  const MySelectComponent = () => {
    const [status, setStatus] = React.useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setStatus(event.target.value);
    };

  };

  function handleChange(event: SelectChangeEvent<string>, child: ReactNode): void {
    throw new Error("Function not implemented.");
  }
  const [imagePreview, setImagePreview] = useState<any>(null);
  const handleDropFile = (event: any) => {
    const file = event[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = async () => {
        if (!reader.result) return;

        const base64String = reader.result.toString().split(",")[1];
        if (!base64String) return;

        const mimetype = file.type;
        const imageData = { image: base64String, mimetype };

        setImagePreview(reader.result.toString());
        // setFieldValue("image", imageData);
    };
};

const removeImage = () => {
  setImagePreview(null);
  // setFieldValue("image", null);
}


  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      <FlexBox gap={0.5} alignItems="center">
        {/* <IconWrapper>
              <TokenIcon color="primary" />
            </IconWrapper> */}

        <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>Add Tickets</H3>
      </FlexBox>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={3} alignItems="start">
          <Grid size={12}>
            <Typography variant="h6" fontSize={18}>Create a Ticket</Typography>
            <Paragraph>Need help? Describe your issue, and we’ll get back to you as soon as possible.</Paragraph>
          </Grid>

          <Grid size={12}>
            <form style={{ width: '100%' }}>
              <Grid container spacing={3} size={12}>
              <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={"Subject"}
                    name={"subject"} handleBlur={undefined} handleChange={undefined} value={""} helperText={""} error={undefined}
                  // handleBlur={handleBlur} 
                  // handleChange={handleChange} 
                  // value={values.nameEn}
                  // helperText={touched.nameEn && typeof errors.nameEn === "string" ? errors.nameEn : ""} 
                  // error={Boolean(touched.nameEn && errors.nameEn)}
                  />
                </Grid>
                <Grid size={{
                  md: 4,
                  xs: 12
                }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={"Email"}
                    name={"email"} handleBlur={undefined} handleChange={undefined} value={""} helperText={""} error={undefined}
                  // handleBlur={handleBlur} 
                  // handleChange={handleChange} 
                  // value={values.nameEn}
                  // helperText={touched.nameEn && typeof errors.nameEn === "string" ? errors.nameEn : ""} 
                  // error={Boolean(touched.nameEn && errors.nameEn)}
                  />
                </Grid>

                <Grid size={{
                    md: 4,
                    xs: 12
                  }}>
                    
                    {/* <FormControl fullWidth variant="outlined">
                      <InputLabel id="ticket-type-label">Ticket Type</InputLabel> */}
                      <TextField 
                        labelId="ticket-type-label"
                        id="ticket-type"
                        label="Ticket Type"
                        select
                        value={status}
                        variant="outlined"
                        onChange={handleChange}
                        name="ticket-Type"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </TextField >

                      
                    {/* </FormControl> */}
                  </Grid>

                  <Grid size={{
                    md: 4,
                    xs: 12
                  }}>
                   

                    {/* <FormControl fullWidth variant="outlined">
                      <InputLabel id="priority-status-label">Priority Status</InputLabel> */}
                      <TextField
                        labelId="priority-status-label"
                        id="priority-status"
                        label="Priority Status"
                        select
                        value={status}
                        variant="outlined"
                        onChange={handleChange}
                        name="priority-Status"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </TextField>
                    {/* </FormControl> */}

                  </Grid>

                <Grid size={12}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder='Issue description'
                    name={"descriptionSp"}
                    rows={4}
                    multiline={true}
                    handleChange={handleChange} handleBlur={undefined} value={""} helperText={""} error={undefined}
                  // value={}                
                  // error={Boolean(touched.descriptionSp && errors.descriptionSp)}
                  />

                </Grid>

                <Grid size={12}>
                  <H6 sx={{my: 1}} fontSize={16}>Attachments</H6>
                   <Card sx={{ p:2, width:'100%', maxWidth:'100%'}}> 
                    {
                      imagePreview && typeof imagePreview !== null && imagePreview !== undefined && imagePreview.trim() !== "" ?
                      <FlexBox  gap={2} justifyContent={'center'}>
                        <Box sx={{width:{xs:'50%', md:'100px', lg:'150px'} ,p:0, height:{xs:'auto', md:'100px', lg:'150px'}, aspectRatio:'1/1', position:'relative'}}>
                          <span onClick={() => {removeImage()}} style={{position:"absolute", top:'-10px', right:'-10px', cursor:"pointer"}}>
                            <DoDisturbOnIcon sx={{fontSize:"20px", color:'red'}} />
                            </span>
                          <img src={imagePreview} width={'100%'} height={'100%'} style={{objectFit:"cover",  borderRadius:10,}}/>
                        </Box>
                      </FlexBox>
                      :
                      <DropZone 
                        onDrop={(e: any) => {handleDropFile(e)}} 
                        maxFiles={1} 
                        minFiles={1} 
                        placeholder={'Drop files here or click to upload.'}
                        paragraph={'Upload up to 10 files'}
                        // curFile={values?.image ? values.image.length : 0} 
                        accept={['.png', '.gif', '.jpeg', '.jpg']} 
                        // formError={errors.image}
                      />
                    }
                  </Card>
                </Grid>

                <Grid size={12}>
                  <FlexBox flexWrap="wrap" gap={2} sx={{justifyContent:'end'}}>
                    <Button variant="outlined" type="reset" color="primary">
                     Cancle
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Send
                    </Button>
                  </FlexBox>
                </Grid>


              </Grid>
            </form>
          </Grid>


        </Grid>
      </Card>
    </Box>
  )
}
