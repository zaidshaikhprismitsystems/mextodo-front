import { Box, Button, Card, MenuItem, TextField, Typography, Chip, Avatar, Divider } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBetween, FlexBox } from "../flexbox"
import { H3, H5, Paragraph } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ApiService from "../../services/apiServices/apiService";

import Stack from '@mui/material/Stack'
import { ticket_url } from "../../config/config"

import { LoaderWithLogo } from "../loader";
import { formatDistanceToNow } from "date-fns";
import LoadingButton from '@mui/lab/LoadingButton';
import { ConfirmToast } from "../confirm-toast";

export default function ViewTicket() {

  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('id');
  const [details, setDetails] = useState<any>(null);
  const [relatedData, setRelatedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAssignLoading, setIsAssignLoading] = useState(false);

  const [priority, setPriority] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    if (ticketId !== null && ticketId !== undefined) {
      getTicketDetails(parseInt(ticketId));
    }
  }, [ticketId])

  const getTicketDetails = async (id: number) => {
    try {
      let details = await ApiService.getTicketDetails(id);
      setDetails(details.data);
      setRelatedData(details.relatedData);
      setPriority(details.data.priority);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    replyText: Yup.string().required('Reply Text is Required!'),
  });

  const initialValues = {
    replyText: details?.carrier
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let addReply = await ApiService.AddReply({ replyText: values.replyText, ticketId: details.id });
        setDetails(addReply.data);
        Toast.showSuccessMessage("Reply Added.");
        setFieldValue("replyText", "");
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const getColor = (status: any) => {
    switch (status) {
      case "pending":
        return "warning"
      case "open":
        return "info"
      case "inProgress":
        return "success"
      case "closed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const FILTER_VALUES = [
    { id: 2, name: t("pending"), value: 'pending' },
    { id: 3, name: t("open"), value: 'open' },
    { id: 4, name: t("inProgress"), value: 'inProgress' },
    { id: 5, name: t("closed"), value: 'closed' },
  ]

  const handleConfirm = async (status: any) => {
    try {
      let changeStatus = await ApiService.updateTicket({ status: status, ticketId: details.id });
      setDetails(changeStatus.data);
      Toast.showSuccessMessage("Ticket status changed.");
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {

  }

  const assignTicket = async () => {
    try {
      setIsAssignLoading(true);
      let assignTicket = await ApiService.updateTicket({ assignedTo: relatedData?.vendor.id, priority: priority, ticketId: details.id });
      setDetails(assignTicket.data);
      setRelatedData(assignTicket.relatedData);
      Toast.showSuccessMessage("Ticket status changed.");
    } catch (error: any) {
      console.log('error: ', error);
      Toast.showErrorMessage(error.response.data.message);
      setIsSubmitting(false);
    } finally {
      setIsAssignLoading(false);
    }
  }

  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      {
        !loading ?
          <>
            <FlexBox gap={0.5} alignItems="center">
              <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>View Tickets</H3>
            </FlexBox>

            <Card sx={{ p: 2 }}>
              <Grid container spacing={3} alignItems="start">
                <Grid size={12}>
                  
                  <FlexBox gap={2} alignItems="center" flexWrap="wrap" sx={{mt:2}}>
                     {/* owner email */}
                     <Box
                      sx={{ flex:{xs:'100%',  lg:1,}, maxWidth:{lg:'400px'},
                        '& .MuiInputBase-root': {
                          background: '#fff',
                        },
                      }}>
                      <TextField
                        id="owner"
                        label="Owner"
                        value={relatedData?.vendor.email}
                        variant="outlined"
                        name="priority-Status"
                        fullWidth
                        disabled
                      />
                    </Box>

                    {/* status ticket */}
                    <Box
                      sx={{ flex:{xs:'50%',  sm:'0  0 200px',},
                        '& .MuiInputBase-root': {
                          background: '#fff',
                          
                        },
                      }}>
                      <TextField
                        id="status"
                        label="Status"
                        select
                        value={details?.status}
                        variant="outlined"
                        onChange={(e: any) => {
                          Toast.showConfirmation(
                            <ConfirmToast
                              message={t("are_you_sure")}
                              onConfirm={() => handleConfirm(e.target.value)}
                              onCancel={handleCancel}
                            />
                          )
                        }}
                        name="priority-Status"
                        fullWidth
                      >
                        {
                          FILTER_VALUES.map((data: any) =>
                            <MenuItem value={data.value}>{data.name}</MenuItem>
                          )
                        }
                      </TextField>
                    </Box>
                   

                    {/* priority */}
                    <Box
                      sx={{ flex:{xs:'50%', sm:'0  0 200px',},
                        '& .MuiInputBase-root': {
                          background: '#fff',
                        },
                      }}>
                      <TextField
                        id="priority-status"
                        label="Priority"
                        select
                        value={priority}
                        variant="outlined"
                        onChange={(event: any) => { setPriority(event.target.value) }}
                        name="priority-Status"
                        fullWidth
                      >
                        <MenuItem value={"low"}>Low</MenuItem>
                        <MenuItem value={"medium"}>Medium</MenuItem>
                        <MenuItem value={"high"}>High</MenuItem>
                      </TextField>
                    </Box>

                    {/* assign owner button */}
                    {
                      !details?.assignedTo ?
                        <Box 
                          sx={{ flex:0, ml:'auto',
                            '& .MuiInputBase-root': {
                              background: '#fff',
                            },
                          }}>
                          <LoadingButton variant="contained" size='large' loading={isAssignLoading} color="primary" onClick={() => { assignTicket() }}>Assign</LoadingButton>
                        </Box>
                        : ''
                    }

                  </FlexBox>
                  
                  <Divider sx={{mt:3, marginInline:-2 }}/>
                </Grid>
               
                <Grid size={12}>
                  <FlexBetween>

                    <Stack direction='column' gap={1} alignItems='flex-start'>
                      <Typography component={H3} variant='h3' fontWeight={600} fontSize={20}>{details.title}</Typography>
                      <Stack direction='row' gap={2} alignItems='flex-start'>
                        <Chip label={t(details.status)} color={getColor(details.status)} size="small" />
                        <Paragraph color="grey"><strong>By:</strong> {details?.users?.firstName || details?.users?.lastName ? `${details?.users?.firstName} ${details?.users?.lastName}` : details?.users?.username}</Paragraph>
                        <Paragraph color="grey"><strong>created:</strong> {formatDistanceToNow(details.createdAt, { addSuffix: true })}</Paragraph>
                      </Stack>

                    </Stack>




                  </FlexBetween>

                </Grid>
                <Grid size={12}>
                  <Stack direction='column' gap={2} alignItems="start">
                    <Paragraph>
                      Hello,
                    </Paragraph>
                    <Paragraph>
                      {details.description}
                    </Paragraph>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {
                        details?.images && details?.images.length > 0 && details?.images.map((image: any) =>
                          <img src={`${ticket_url}/${image}`} width={150} style={{ maxWidth: '100%' }} />
                        )
                      }
                    </Box>
                  </Stack>

                </Grid>
                <Grid size={12}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.25' }} >
                    <Typography component={H5} variant='h5' fontWeight={600} fontSize={16} mb={2}>{t('reply_to_ticket')}</Typography>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                      <Grid container spacing={3}>
                        <Grid size={{
                          md: 4,
                          xs: 12
                        }}>
                          <Box
                            sx={{
                              '& .MuiInputBase-root': {
                                background: '#fff',
                              },
                            }}
                          >
                            <TextBox
                              type={"text"}
                              fullWidth={true}
                              placeholder={"Customer Email"}
                              name={"Customer email"} handleBlur={undefined} handleChange={undefined} value={details?.users.email} disabled helperText={""} error={undefined}
                            />
                          </Box>
                        </Grid>

                        <Grid size={{
                          md: 4,
                          xs: 12
                        }}>
                          <Box
                            sx={{
                              '& .MuiInputBase-root': {
                                background: '#fff',
                              },
                            }}
                          >
                            <TextBox
                              type={"text"}
                              fullWidth={true}
                              placeholder={"Ticket Type"}
                              name={"Ticket Type"}
                              handleBlur={undefined}
                              handleChange={undefined}
                              value={t(details?.category)}
                              disabled
                              helperText={""}
                              error={undefined}
                            />
                          </Box>
                        </Grid>

                        <Grid size={12}>
                          <Box
                            sx={{
                              '& .MuiInputBase-root': {
                                background: '#fff',
                              },
                            }}>
                            <TextBox
                              type={"text"}
                              fullWidth={true}
                              placeholder={t('reply_text')}
                              name={"replyText"}
                              rows={4}
                              multiline={true}
                              handleChange={handleChange}
                              handleBlur={undefined}
                              value={values.replyText}
                              helperText={""}
                              error={Boolean(touched.replyText && errors.replyText)}
                            />
                          </Box>
                        </Grid>

                        <Grid size={12}>
                          <FlexBox flexWrap="wrap" gap={2} sx={{ justifyContent: 'end' }}>
                            <Button variant="outlined" type="reset" color="primary">
                              Cancle
                            </Button>
                            <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
                              Submit Replay
                            </LoadingButton>
                          </FlexBox>
                        </Grid>

                      </Grid>

                    </form>

                  </Card>

                </Grid>
              </Grid>

              {/* Replies */}
              {
                details?.replies && details.replies.length > 0 && details.replies.map((reply: any) =>
                  <Box sx={{ mt: 2, padding: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Avatar src={""} alt={reply?.users?.firstName || reply?.users?.lastName ? `${reply?.users?.firstName} ${reply?.users?.lastName}` : reply?.users?.username} />
                      <Box sx={{ ml: 2 }}>
                        <Typography>{reply?.users?.firstName || reply?.users?.lastName ? `${reply?.users?.firstName} ${reply?.users?.lastName}` : reply?.users?.username}</Typography>
                        <Typography>{formatDistanceToNow(reply.createdAt, { addSuffix: true })}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ mt: 1 }}>{reply.replyText}</Typography>
                  </Box>
                )
              }

            </Card>

          </>
          : <LoaderWithLogo />
      }
    </Box>
  )
}
