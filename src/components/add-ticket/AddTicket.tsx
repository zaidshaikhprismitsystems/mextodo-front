import { Box, Button, Card, MenuItem, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import { H3, H6, Paragraph } from "../typography"
import { useState } from "react";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DropZone from "../dropzone";

export default function AddTicket() {

  const [imagePreview, setImagePreview] = useState<any>(null);
  const handleDropFile = (event: any) => {
    const file = event[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = async () => {
        if (!reader.result) return;

        const base64String = reader.result.toString().split(",")[1];
        if (!base64String) return;

        setImagePreview(reader.result.toString());
    };
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      <FlexBox gap={0.5} alignItems="center">
        <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>Add Tickets</H3>
      </FlexBox>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={3} alignItems="start">
          <Grid size={12}>
            <Typography variant="h6" fontSize={18}>Create a Ticket</Typography>
            <Paragraph>Need help? Describe your issue, and we’ll get back to you as soon as possible.</Paragraph>
          </Grid>

          <Grid size={12}>
            <form style={{ width: '100%' }}>
              <Grid container spacing={3} size={12}>
                <Grid size={12}>
                  <TextField
                    type="text"
                    fullWidth
                    placeholder="Subject"
                    name="subject"
                  />
                </Grid>
                <Grid size={{
                  md: 4,
                  xs: 12
                }}>
                  <TextField
                    type="text"
                    fullWidth
                    placeholder="Email"
                    name="email"
                  />
                </Grid>

                <Grid size={{
                    md: 4,
                    xs: 12
                  }}>
                  <TextField 
                    id="ticket-type"
                    label="Ticket Type"
                    select
                    variant="outlined"
                    name="ticket-Type"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{
                    md: 4,
                    xs: 12
                  }}>
                  <TextField
                    id="priority-status"
                    label="Priority Status"
                    select
                    variant="outlined"
                    name="priority-Status"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    type="text"
                    fullWidth
                    placeholder="Issue description"
                    name="descriptionSp"
                    rows={4}
                    multiline
                  />
                </Grid>

                <Grid size={12}>
                  <H6 sx={{my: 1}} fontSize={16}>Attachments</H6>
                   <Card sx={{ p:2, width:'100%', maxWidth:'100%'}}> 
                    {
                      imagePreview && typeof imagePreview !== null && imagePreview !== undefined && imagePreview.trim() !== "" ?
                      <FlexBox  gap={2} justifyContent={'center'}>
                        <Box sx={{width:{xs:'50%', md:'100px', lg:'150px'} ,p:0, height:{xs:'auto', md:'100px', lg:'150px'}, aspectRatio:'1/1', position:'relative'}}>
                          <span onClick={() => {removeImage()}} style={{position:"absolute", top:'-10px', right:'-10px', cursor:"pointer"}}>
                            <DoDisturbOnIcon sx={{fontSize:"20px", color:'red'}} />
                          </span>
                          <img src={imagePreview} width={'100%'} height={'100%'} style={{objectFit:"cover",  borderRadius:10,}}/>
                        </Box>
                      </FlexBox>
                      :
                      <DropZone 
                        onDrop={(e: any) => {handleDropFile(e)}} 
                        maxFiles={1} 
                        minFiles={1} 
                        placeholder={'Drop files here or click to upload.'}
                        paragraph={'Upload up to 10 files'}
                        accept={['.png', '.gif', '.jpeg', '.jpg']} 
                      />
                    }
                  </Card>
                </Grid>

                <Grid size={12}>
                  <FlexBox flexWrap="wrap" gap={2} sx={{justifyContent:'end'}}>
                    <Button variant="outlined" type="reset" color="primary">
                     Cancle
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Send
                    </Button>
                  </FlexBox>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
