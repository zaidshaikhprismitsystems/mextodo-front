import React, { useState } from 'react'; // Add useState import
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
// CUSTOM COMPONENTS
import { H3 } from '../typography';
import FlexBox from '../flexbox/FlexBox'; 
import { Button, Container, Divider, MenuItem, TextField } from '@mui/material';
import EditComponent from '../edit-component/EditComponent';

const Pages = () => {

  const [termsAndCondition, setTermsAndCondition] = useState("");

  function handleChangeFilter() {
    throw new Error('Function not implemented.');
  }

  return (
    <>

      <FlexBox gap={0.5} alignItems="center">
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
                onChange={(e) => handleChangeFilter()}
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
                <EditComponent
                  description={termsAndCondition}
                  setDescription={(desc: string) => { setTermsAndCondition(desc) }}
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
