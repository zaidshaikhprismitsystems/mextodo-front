import { Box, Button, Card, Container, ListItemText, MenuItem, OutlinedInput, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import ShoppingBasket from '../../icons/ShoppingBasket'
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HubIcon from '@mui/icons-material/Hub';
import ApiService from "../../services/apiServices/apiService";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import React from "react";

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddCategoryAtributes() {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeSelect = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    nameEn: Yup.string().required('Name in English is Required!'),
    nameSp: Yup.string().required('Name in Spanish is Required!')
  });

  const initialValues = {
    nameEn: '',
    nameSp: ''
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let addAttribute = await ApiService.addAttribute({nameEn: values.nameEn, nameSp: values.nameSp});
        Toast.showSuccessMessage('Attribute Added Successfully');
        navigate("/admindashboard/attributes");
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
    <Box  sx={{padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={handleSubmit} style={{width:'100%'}}>
        <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <HubIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>{t("map_attributes_to_category")}</H6>
              </FlexBox>
            </Grid>

            <Grid container spacing={4} size={{
                md: 12,
                xs: 12
              }}>
              
              <Grid size={12}>
                <H6 sx={{my: 1}} fontSize={16}>{t("main_parameters")}</H6>
              </Grid>

              <Grid size={{
                  sm: 12,
                  xs: 12
                }}>
                {/* <TextBox
                  type={"select"}
                  fullWidth={true}
                  placeholder={t("name_english")} 
                  name={"nameEn"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.nameEn}
                  helperText={touched.nameEn && typeof errors.nameEn === "string" ? errors.nameEn : ""} 
                  error={Boolean(touched.nameEn && errors.nameEn)}
                /> */}
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={personName}
                  label="Category"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  // label="Age"
                >
                {/* <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  fullWidth
                  value={personName}
                  onChange={handleChange}
                  aria-placeholder="Select Category"
                > */}
                  {/* {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))} */}
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>

              <Grid size={{
                  sm: 12,
                  xs: 12
                }}>
                {/* <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("name_spanish")} 
                  name={"nameSp"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.nameSp}
                  helperText={touched.nameSp && typeof errors.nameSp === "string" ? errors.nameSp : ""} 
                  error={Boolean(touched.nameSp && errors.nameSp)}
                /> */}
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  variant="outlined"
                  label="Category"
                  multiple
                  fullWidth
                  value={personName}
                  onChange={handleChange}
                  // input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  aria-placeholder="Select Category"
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
          </Grid>
          </Grid>

          <FlexBox flexWrap="wrap" sx={{mt: 4}} gap={2}>
          <Button type="submit" variant="contained" color="primary">
            {t("create_new_attribute")}
            </Button>

            <Button type="reset" variant="outlined" color="primary" >
            {t("cancel")}
            </Button>
          </FlexBox>

        </Card>
      </form>
    </Box>
  )
}