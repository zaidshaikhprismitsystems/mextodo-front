// MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import styled from '@mui/material/styles/styled'
// MUI ICON COMPONENT
import Star from '@mui/icons-material/Star'

import { useFormik } from 'formik'
import * as Yup from 'yup'
// CUSTOM COMPONENTS
import ReviewItem from './ReviewItem'
import RatingDetails from './RatingDetails'
import { H5, H6, Paragraph } from '../../components/typography'
// CUSTOM ICON COMPONENTS
import Edit from '../../icons/Edit'
import { FlexBox } from '../flexbox'
import { useState } from 'react'
import dayjs from 'dayjs';

// STYLED COMPONENTS
const ContainerGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse' },
}))

const FirstGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.down('md')]: {
    marginTop: 24,
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}))

export default function ProductReviews({reviews, ratingSummary}: any) {
  
  const initialValues = {
    rating: 0,
    review: '',
    email: '',
    name: '',
  }

  const validationSchema = Yup.object({
    rating: Yup.string().required('Rating is Required!'),
    review: Yup.string().required('Review is Required!'),
    email: Yup.string().required('Email is Required!'),
    name: Yup.string().required('Name is required!'),
  })

  const { values, errors, handleSubmit, handleChange, handleBlur, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => console.log(values),
    })

  const [enableReview, setEnableReview] = useState(false);

  return (
    <Box padding={0}>
      <ContainerGrid container spacing={3}>
        {/* ALL REVIEW LIST */}
        <FirstGrid size={{ md: 8, xs: 12 }}>
          <Stack spacing={4}>
            {
              reviews && reviews.length > 0 ?
              reviews.map((review: any) => 
                <ReviewItem
                  liked={0}
                  rating={review.rating}
                  createdAt={dayjs(review?.createdAt).format("DD MMM, YYYY")}
                  user={{ name: review?.users.username, image: '/static/user/user-11.png' }}
                  comment={review?.comment}
                />
              )
              : 'No Reviews Found'
            }
          </Stack>
        </FirstGrid>

        {/* AVERAGE RATING INFO */}
        {
          reviews && reviews.length > 0 ?
          <Grid size={{ md: 4, xs: 12 }}>
            <Stack alignItems="center">
              <H6 fontSize={16}>Average rating</H6>
              <H5 color="primary.main" my={ratingSummary?.averageRating}>
                {ratingSummary?.averageRating.toFixed(1)}/5
              </H5>

              <Rating
                readOnly
                value={4}
                emptyIcon={<Star sx={{ opacity: 0.4, fontSize: 'inherit' }} />}
              />

              <Paragraph color="text.secondary">({ratingSummary?.totalCount})</Paragraph>
            </Stack>

            <Box maxWidth={300} margin="auto" pt={4}>
              <Stack spacing={1}>
                {
                  ratingSummary?.starCounts.map((item: any, index: number) =>
                    <RatingDetails title={`${5-index} star`} progressValue={item.count*100/ratingSummary?.totalCount} totalReview={item.count} />
                  )
                }
              </Stack>
              {
                !enableReview ?
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{ mt: 4 }}
                  onClick={() => { setEnableReview(true) }}
                >
                  Write Your review
                </Button>
                : ''
              }
            </Box>
          </Grid>
          : ''
        }
    
        {/* CREATE REVIEW FORM */}
        {
          enableReview ?
          <Grid size={12}>
            <Box paddingBlock={2}>
              <H6 fontSize={16} mb={1}>
                Add Review
              </H6>

              <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1}>
                  <Paragraph>Your review about this product:</Paragraph>

                  <Rating
                    name="rating"
                    value={values.rating}
                    onChange={(_, newValue) => setFieldValue('rating', newValue)}
                    emptyIcon={<Star sx={{ opacity: 0.4, fontSize: 'inherit' }} />}
                    sx={{ color: 'warning.main', fontSize: 18 }}
                  />
                </Stack>

                <Stack  spacing={2} mt={3}>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    placeholder="Review"
                    name="review"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.review}
                    helperText={touched.review && errors.review}
                    error={Boolean(touched.review && errors.review)}
                  />

                <FlexBox gap={2}  sx={{flexDirection:{xs:'column', md:'row'}, alignItems:'top'}}>
                  <TextField
                    placeholder="Name"
                    fullWidth
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    helperText={touched.name && errors.name}
                    error={Boolean(touched.name && errors.name)}
                  />

                  <TextField
                    placeholder="Email"
                    fullWidth
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </FlexBox>
                </Stack>

                <Stack direction="row" spacing={2} mt={2} justifyContent="end">
                  <Button variant="outlined" color="secondary">
                    Cancel
                  </Button>

                  <Button type="submit">Post Review</Button>
                </Stack>
              </form>
            </Box>
          </Grid>
          : ''
        }

      </ContainerGrid>
    </Box>
  )
}
