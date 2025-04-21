import { Box, Button, Card, ListItemText, MenuItem, Select, Checkbox } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import HubIcon from '@mui/icons-material/Hub';
import ApiService from "../../services/apiServices/apiService";
import React from "react";
import { SelectChangeEvent } from "@mui/material";

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

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ApiService.addAttribute({ nameEn: '', nameSp: '' });
      Toast.showSuccessMessage('Attribute Added Successfully');
      navigate("/admindashboard/attributes");
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
    }
  };

  return (
    <Box sx={{ padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <HubIcon color="primary" />
                </IconWrapper>

                <H6 sx={{ m: 0 }} fontSize={16}>{t("map_attributes_to_category")}</H6>
              </FlexBox>
            </Grid>

            <Grid container spacing={4} size={{
              md: 12,
              xs: 12
            }}>

              <Grid size={12}>
                <H6 sx={{ my: 1 }} fontSize={16}>{t("main_parameters")}</H6>
              </Grid>

              <Grid size={{
                sm: 12,
                xs: 12
              }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={personName}
                  label="Category"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                >
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
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  variant="outlined"
                  label="Category"
                  multiple
                  fullWidth
                  value={personName}
                  onChange={handleChange}
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

          <FlexBox flexWrap="wrap" sx={{ mt: 4 }} gap={2}>
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