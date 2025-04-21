import { useNavigate } from 'react-router-dom';
import ApiService from "../../services/apiServices/apiService";
import { H5 } from '../../components/typography';
import { useEffect, useState } from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from '../../services/store/store';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Paragraph, Small } from '../../components/typography';
import { Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';


const SwitchWrapper = styled('div')({
  width: '100%',
  marginTop: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const StyledCard = styled(Card)({
  padding: 16,
  minHeight: 400,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
});

const ButtonWrapper = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100]
}));

const UploadButton = styled('div')(({ theme }) => ({
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.background.paper}`
}));

const Profile = () => {
  const navigate = useNavigate();
  
  const [userDetails, setUserData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const userData: any = useAppSelector((state: RootState) => state.user);
  console.log('userData: ', userData);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let data = await ApiService.getUserData();
      console.log('data: ', data.data.data.userData);
      setUserData(data.data.data.userData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const mainValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Fisrt Name is Required!'),
    lastName: Yup.string().required('Last Name is Required!'),
    username: Yup.string().required('Username is Required!'),
    email: Yup.string().email().required('Email is Required!'),
    currency: Yup.string().required('Currency is Required!'),
    language: Yup.string().required('Language is Required!'),
    phone: Yup.string().required('Phone is Required!'),
    country: Yup.string().required('Country is Required!'),
    state: Yup.string().required('State is Required!'),
    city: Yup.string().required('City is Required!'),
    address: Yup.string().required('Address is Required!'),
    zip: Yup.string().required('Zip is Required!'),
    about: Yup.string().required('About is Required!')
  });

  const [addAddress, setAddAddress] = useState(false);

  const handleClickOpen = () => {
    setAddAddress(true);
  };

  const handleClose = () => {
    setAddAddress(false);
  };

  const mainFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      currency: '',
      language: '',
      country: '',
      state: '',
      city: '',
      address: '',
      zip: '',
      about: ''
    },
    validationSchema: mainValidationSchema,
    onSubmit: (values) => {
      console.log("Main Form submitted:", values);
    },
  });


  const popupValidationSchema = Yup.object().shape({
    address: Yup.string().required('Address is Required!'),
    zipcode: Yup.string().required('Zipcode is Required!'),
    city: Yup.string().required('City is Required!'),
    state: Yup.string().email().required('State is Required!'),
    country: Yup.string().required('Country is Required!'),
    type: Yup.string().required('Type is Required!'),
    label: Yup.string().required('Label is Required!'),
    receivername: Yup.string().required('Reciver name is Required!'),
    receiverphone: Yup.number().required('Reciver phone is Required!'),
    isdefault: Yup.boolean()
  });

  // Popup Form
  const popupFormik = useFormik({
    initialValues: {
      address: '',
      zipcode: '',
      city: '',
      state: '',
      country: '',
      type: '',
      label: '',
      receivername: '',
      receiverphone: '',
      isdefault: false
    },
    validationSchema: popupValidationSchema,
    onSubmit: (values) => {
      console.log("Popup Form submitted:", values);
      // setIsPopupOpen(false); // Close popup after submission
    },
  });

  const Model = (
    <React.Fragment>
      <Dialog
        open={addAddress}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            location Name
          </DialogContentText>
          <form onSubmit={popupFormik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="address" label="Address" value={popupFormik.values.address} onChange={popupFormik.handleChange} helperText={popupFormik.touched.address && popupFormik.errors.address} error={Boolean(popupFormik.touched.address && popupFormik.errors.address)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="zipcode" label="Zip Code" value={popupFormik.values.zipcode} onChange={popupFormik.handleChange} helperText={popupFormik.touched.zipcode && popupFormik.errors.zipcode} error={Boolean(popupFormik.touched.zipcode && popupFormik.errors.zipcode)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="country" label="Country" value={popupFormik.values.country} onChange={popupFormik.handleChange} helperText={popupFormik.touched.country && popupFormik.errors.country} error={Boolean(popupFormik.touched.country && popupFormik.errors.country)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="state" label="State" value={popupFormik.values.state} onChange={popupFormik.handleChange} helperText={popupFormik.touched.state && popupFormik.errors.state} error={Boolean(popupFormik.touched.state && popupFormik.errors.state)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="city" label="City" value={popupFormik.values.city} onChange={popupFormik.handleChange} helperText={popupFormik.touched.city && popupFormik.errors.city} error={Boolean(popupFormik.touched.city && popupFormik.errors.city)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="type" label="Type" value={popupFormik.values.type} onChange={popupFormik.handleChange} helperText={popupFormik.touched.type && popupFormik.errors.type} error={Boolean(popupFormik.touched.type && popupFormik.errors.type)} />
              </Grid>

              {/* show input to add other type label */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="label" label="Label" value={popupFormik.values.label} onChange={popupFormik.handleChange} helperText={popupFormik.touched.label && popupFormik.errors.label} error={Boolean(popupFormik.touched.label && popupFormik.errors.label)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="receivername" label="Reciver Name" value={popupFormik.values.receivername} onChange={popupFormik.handleChange} helperText={popupFormik.touched.receivername && popupFormik.errors.receivername} error={Boolean(popupFormik.touched.receivername && popupFormik.errors.receivername)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="receiverphone" label="Reciver Phone" value={popupFormik.values.receiverphone} onChange={popupFormik.handleChange} helperText={popupFormik.touched.receiverphone && popupFormik.errors.receiverphone} error={Boolean(popupFormik.touched.receiverphone && popupFormik.errors.receiverphone)} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Add Address
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )

  return (
    <Box display="flex" justifyContent="center" alignItems="center" maxWidth="100%" p={2}>
      <Box maxWidth="1000px" padding={4} bgcolor="white">
        <H5 textAlign="center" fontSize={{ sm: 30, xs: 25 }}>{t("profile")}</H5>
        {Model}
        {isLoading ? "Loading..." : (
          <Grid container spacing={2}>
            {/* Left - Profile Upload Section */}
            <Grid item xs={12} md={4}>
              <StyledCard>
                <ButtonWrapper>
                  <UploadButton>
                    <label htmlFor="upload-btn">
                      <input accept="image/*" id="upload-btn" type="file" style={{ display: 'none' }} />
                      <IconButton component="span">
                        <PhotoCamera sx={{ fontSize: 26, color: 'grey.400' }} />
                      </IconButton>
                    </label>
                  </UploadButton>
                </ButtonWrapper>

                <Paragraph marginTop={2} maxWidth={200} textAlign="center" color="text.secondary">
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                </Paragraph>

                <Box maxWidth={300} marginTop={5}>
                  
                  <SwitchWrapper>
                    <Paragraph fontWeight={600}>Banned</Paragraph>
                    <Switch disabled />
                  </SwitchWrapper>

                  {/* <Small color="text.secondary">Apply disable account</Small> */}

                  <SwitchWrapper>
                    <Paragraph fontWeight={600}>Email Verified</Paragraph>
                    <Switch disabled defaultChecked />
                  </SwitchWrapper>

                  {/* <Small color="text.secondary">
                    Disabling this will automatically send the user a verification email
                  </Small> */}
                </Box>
              </StyledCard>
            </Grid>

            {/* Right - Form Section */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 2 }}>
                <form onSubmit={mainFormik.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="firstName" label="First Name" value={mainFormik.values.firstName} onChange={mainFormik.handleChange} helperText={mainFormik.touched.firstName && mainFormik.errors.firstName} error={Boolean(mainFormik.touched.firstName && mainFormik.errors.firstName)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="lastName" label="Last Name" value={mainFormik.values.lastName} onChange={mainFormik.handleChange} helperText={mainFormik.touched.lastName && mainFormik.errors.lastName} error={Boolean(mainFormik.touched.lastName && mainFormik.errors.lastName)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="username" label="Username" value={mainFormik.values.username} onChange={mainFormik.handleChange} helperText={mainFormik.touched.username && mainFormik.errors.username} error={Boolean(mainFormik.touched.username && mainFormik.errors.username)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="email" label="Email Address" value={mainFormik.values.email} onChange={mainFormik.handleChange} helperText={mainFormik.touched.email && mainFormik.errors.email} error={Boolean(mainFormik.touched.email && mainFormik.errors.email)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="language" label="Language" value={mainFormik.values.language} onChange={mainFormik.handleChange} helperText={mainFormik.touched.language && mainFormik.errors.language} error={Boolean(mainFormik.touched.language && mainFormik.errors.language)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="currency" label="Currency" value={mainFormik.values.currency} onChange={mainFormik.handleChange} helperText={mainFormik.touched.currency && mainFormik.errors.currency} error={Boolean(mainFormik.touched.currency && mainFormik.errors.currency)} />
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" fullWidth>
                        Save User
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
              
              <Grid container spacing={2} sx={{marginTop: 1}}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Home
                      </Typography>
                      <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                        Address, city, state, country, zipcode.
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="outlined">Edit</Button>
                      <Button size="small" variant="outlined" color="error">Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Home
                      </Typography>
                      <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                        Address, city, state, country, zipcode.
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="outlined">Edit</Button>
                      <Button size="small" variant="outlined" color="error">Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
                {/* Add Address Card */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" sx={{textAlign: "center"}}>
                        Add New Address
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
                        <AddCircleOutlineIcon onClick={() => { setAddAddress(true) }} fontSize='large' />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
