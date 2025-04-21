import { Fragment, useEffect, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// CUSTOM COMPONENTS
import { H3, H5 } from '../typography';
import FlexBox from '../flexbox/FlexBox'; // CUSTOM PAGE SECTION COMPONENTS

import TabComponent from './tabs';
import Apps from '../../icons/Apps';
// import Apps from '@mui/icons-material';
import Icons from '../../icons/account';
import { StyledButton } from './style';
import { Button, Container, Divider, MenuItem, TextField } from '@mui/material';
import ApiService from '../../services/apiServices/apiService';
import { LoaderWithLogo } from '../loader';
import { TextBox } from '../textbox';
import { useTranslation } from 'react-i18next';
import EditComponent from '../edit-component/EditComponent';

const Pages = () => {

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [active, setActive] = useState('General Settings');
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { t } = useTranslation()
  const [termsAndCondition, setTermsAndCondition] = useState("");

  function handleChangeFilter(arg0: string, value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>

      <FlexBox gap={0.5} alignItems="center">
        {/* <IconWrapper>
                <TokenIcon color="primary" />
              </IconWrapper> */}
        <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>Pages</H3>
      </FlexBox>

      <Container sx={{ px: '0 !important', maxWidth: { lg: "lg", xl: "xl" } }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} pb={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                select
                fullWidth
                label={'Select'}
                className="select"
                value={'home'}
                onChange={(e) => handleChangeFilter('status', e.target.value)}
              >
                <MenuItem key={0} value={'home'}>
                  {'Home'}
                </MenuItem>

                <MenuItem key={0} value={'about'}>
                  {'About'}
                </MenuItem>

                <MenuItem key={0} value={'contact'}>
                  {'Contact'}
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Divider/>

          <Box pt={2}>
            <form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, }}>

                  <TextField
                    fullWidth
                    label='Title'
                    value={undefined}

                  />
                </Grid>
                <Grid size={{ xs: 12, }}>
                {/* <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue="Default Value"
                /> */}
                <EditComponent
                  description={termsAndCondition}
                  setDescription={(desc) => { setTermsAndCondition(desc) }}
                />
                </Grid>
                <Grid size={{ xs: 12, }}>
                  <Button variant='contained'>
                    Save
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Box>




        </Card>
      </Container >
    </>
  )

};

export default Pages;
