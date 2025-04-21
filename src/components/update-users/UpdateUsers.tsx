import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { UserForm } from "../users-form";
// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

// STYLED COMPONENTS
export const CarouselRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  '& .slide': { objectFit: 'cover', borderRadius: 8 },
}))

export const SlideThumb = styled('div')(({ theme }) => ({
  width: 60,
  height: 55,
  opacity: 0.6,
  borderRadius: 4,
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  '&.active': { opacity: 1 },
  '&.active::after': { height: 3 },
  '&::after': {
    left: 0,
    height: 0,
    bottom: 0,
    content: '""',
    width: '100%',
    position: 'absolute',
    transition: '0.3s ease-in-out',
    backgroundColor: theme.palette.primary.main,
  },
  '& img': {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  top: 10,
  right: 10,
  position: 'absolute',
  backgroundColor: theme.palette.grey[200],
  // '&:hover': { backgroundColor: theme.palette.grey[400] },
}))

export default function UpdateUsers({isUpdate, enableUpdate, user, handleClose, onSuccess}: any) {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState<any>(user);

  // const [country, setCountry] = useState<any>();
  // const [states, setStates] = useState<any>([]);
  // const [cities, setCities] = useState<any>([]);
  

  // useEffect(() => {
  //   getStates(); 
  // }, [])

  // const getStates = async () => {
  //   try{
  //     let data = await ApiService.getStates();
  //     setCountry({id: data.data.id, name: data.data.name});
  //     setFieldValue("country", data.data.id)
  //     setStates(data.data.states);
  //   }catch(e){
  //     console.log(e);
  //   }
  //   finally{
  //     // setIsLoading(false);
  //   }
  // }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("email_validation_message")).max(255).required(t("email_required_message")),
    firstName: Yup.string().optional().nullable(),
    lastName: Yup.string().optional().nullable(),
    username: Yup.string().required(t("username_required")),
    isVerified: Yup.boolean().optional(),
    enableDisable: Yup.boolean().optional()
  });

  const initialValues = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    isVerified: userData.isVerified,
    enableDisable: userData.isDeleted
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        
        let userDetails = {
          id: userData.id,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          isVerified: values.isVerified,
          isDeleted: values.isDeleted
        };
        
        let updateUser = await ApiService.updateUser(userDetails);
        Toast.showSuccessMessage('User Updated Successfully');
        handleClose(true);
        onSuccess();
        // navigate('/dashboard/products');
      } catch (error: any) {
        console.log('Error caught: ', error);
        // Safeguard: check if error.response exists before accessing error.response.data
        if (error?.response?.data?.message) {
          Toast.showErrorMessage(error.response.data.message);
        } else if (error?.message) {
          Toast.showErrorMessage(`Error: ${error.message}`);
        } else {
          Toast.showErrorMessage('An unexpected error occurred');
        }
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  // useEffect(() => {
  //   if(values.state){
  //     getCities(values.state);
  //   }
  // }, [values.state]);

  // const getCities = async (id: number) => {
  //   try{
  //     let data = await ApiService.getCities(id);
  //     setFieldValue("state", id)
  //     setCities(data.data); 
  //   }catch(e){
  //     console.log(e);
  //   }
  // }
  
  return (
    <Box sx={{py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start"}}>
      
        <Grid container spacing={3}>
           <Grid size={{xs:12}}>
              <UserForm 
                // country={country} 
                // states={states} 
                // cities={cities} 
                values={values} 
                setFieldValue={setFieldValue} 
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                isUpdate={isUpdate}
                createdAt={userData.createdAt}
                enableUpdate={enableUpdate}
                handleClose={handleClose}
              />
          </Grid>
        </Grid>
    </Box>
  )
}