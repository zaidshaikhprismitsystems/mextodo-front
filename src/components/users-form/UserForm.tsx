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

export default function UserForm(
  {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    enableUpdate,
    setFieldValue,
    // country,
    // states,
    // cities,
    createdAt,
    isSubmitting,
    handleClose,
    isUpdate
  }: any) {

  const { t, i18n } = useTranslation();

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
            <UserInfo enableUpdate={enableUpdate} isUpdate={isUpdate} createdAt={createdAt} />
          </Card>

          <Card sx={{ padding: 3, position: 'relative', mt: 3, boxShadow:0, border:'1px solid rgb(223, 223, 223)', borderRadius:3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("first_name")}
                    name={"firstName"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.firstName}
                    helperText={touched.firstName && typeof errors.firstName === "string" ? errors.firstName : ""}
                    error={Boolean(touched.firstName && errors.firstName)}
                    disabled={!isUpdate}
                  />
                </Grid>
                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("last_name")}
                    name={"lastName"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.lastName}
                    helperText={touched.lastName && typeof errors.lastName === "string" ? errors.lastName : ""}
                    error={Boolean(touched.lastName && errors.lastName)}
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"email"}
                    fullWidth={true}
                    placeholder={t("email")}
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
                    placeholder={t("username")}
                    name={"username"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.username}
                    helperText={touched.username && typeof errors.username === "string" ? errors.username : ""}
                    error={Boolean(touched.username && errors.username)}
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={12}>
                  <FlexBetween>
                    <div>
                      <Paragraph fontWeight={500}>User Verified</Paragraph>
                      <Small color="text.secondary">User is Verified.</Small>
                    </div>
                    <Switch disabled={!isUpdate} checked={values.isVerified} onChange={(event: any) => { setFieldValue("isVerified", event?.target?.checked) }} />
                  </FlexBetween>

                  <FlexBetween mt={2}>
                    <div>
                      <Paragraph fontWeight={500}>User enabled</Paragraph>
                      <Small color="text.secondary">User is enabled or disabled.</Small>
                    </div>
                    <Switch disabled={!isUpdate} checked={!values.isDeleted} onChange={(event: any) => { setFieldValue("isDeleted", !event?.target?.checked) }} />
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