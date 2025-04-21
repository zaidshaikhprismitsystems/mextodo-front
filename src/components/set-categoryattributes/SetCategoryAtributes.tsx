import { Box, Button, Card, Container, ListItemText, MenuItem, OutlinedInput, TextField, InputLabel, FormControl, Chip} from "@mui/material"
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
import { useEffect, useState } from "react";
import HubIcon from '@mui/icons-material/Hub';
import ApiService from "../../services/apiServices/apiService";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import React from "react";
import LayerGroup from '../../icons/duotone/LayerGroup'

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
  
  const { t, i18n } = useTranslation();
  
  const navigate = useNavigate();

  const [categoryName, setcategoryName] = React.useState<string>("");
  const [categoryList, setcategoryList] = React.useState<any>([]);

  const [selectedAttributes, setSelectedAttributes] = React.useState<any>([]);
  const [attributes, setAttributes] = React.useState<string[]>([]);
  
  const [attributesList, setAttributesList] = React.useState<any>([]);

  const handleChangeSelect = (event: SelectChangeEvent<typeof attributes>) => {
    const {
      target: { value },
    } = event;
    setAttributes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    getCategories();
    getAttributes();
  }, [])

  useEffect(() => {
    if(categoryName){
      fetchCategoryAttributes(categoryName);
    }
  }, [categoryName])

  // fetch selected category attributes
  const fetchCategoryAttributes = async (category: any) => {
    try {
      let categoryAttributes = await ApiService.fetchCategoryAttributes(category);
      setSelectedAttributes(categoryAttributes);
      let selected = categoryAttributes.data.map((data: any) => {
        return data.attributeId
      })
      setAttributes(selected);
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
    }
  }

  const getCategories = async () => {
    try {
      let categories = await ApiService.getCategories();
      setcategoryList(categories.data);
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
    }
  }

  const getAttributes = async () => {
    try {
      let attributes = await ApiService.getAttributes();
      setAttributesList(attributes.data);
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
    }
  }

  const setCategoryAttributes = async () => {
    try {
      // setIsSubmitting(true);
      let setcategoryattributes = await ApiService.setCategoryAttributes({ category: categoryName, attributes });
      Toast.showSuccessMessage('Attribute Added Successfully');
      setAttributes([]);
      setcategoryName("");
      // navigate("/admindashboard/attributes");

    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
      // setIsSubmitting(false);
    }finally{
      // setIsSubmitting(false);
    }
  }

  return (
    <Box sx={{padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form style={{width:'100%'}}>
        <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <LayerGroup color="primary" />
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

                  <TextField
                    select
                    fullWidth
                    label={t("category")}
                    className="select"
                    value={categoryName}
                    onChange={(e: any) => {setcategoryName(e.target.value)}}
                  >
                    {
                      categoryList && categoryList.map((item: any) => {
                        return(
                          <MenuItem value={item.id}>{i18n.language === "en" ? item.nameEn : item.nameSp}</MenuItem>
                        )
                      })
                    }
                  </TextField>
              </Grid>

              <Grid size={{
                  sm: 12,
                  xs: 12
                }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-standard-label">Attributes</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      label="Attributes"
                      multiple
                      fullWidth
                      value={attributes}
                      variant="outlined"
                      onChange={handleChangeSelect}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {attributesList.map((value: any) => (
                            selected.includes(value.id) ? 
                            <Chip key={value.id} label={i18n.language === "en" ? value.nameEn : value.nameSp} />
                            : ''
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      aria-placeholder="Select Attributes"
                    >
                      {attributesList.map((attribute: any, index: number) => (
                        <MenuItem key={index} value={attribute.id}>
                          <Checkbox checked={attributes.includes(attribute.id)} />
                          <ListItemText primary={ i18n.language === "en" ? attribute.nameEn : attribute.nameSp} />
                        </MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>
          </Grid>
          </Grid>

          <FlexBox flexWrap="wrap" sx={{mt: 4}} gap={2}>
            <Button onClick={() => { setCategoryAttributes() }} variant="contained">
            {t("save")}
            </Button>

            <Button variant="outlined" color="secondary" type="reset">
            {t("cancel")}
            </Button>
          </FlexBox>

        </Card>
      </form>
    </Box>
  )
}