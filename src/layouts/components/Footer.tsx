import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { primary } from "../../theme/colors";


export default function Footer() {

  const { t, i18n } = useTranslation();
  
  return (
    <Box sx={{position: "sticky", top: "100%", }}>
      <Box sx={{backgroundColor: primary[900],  paddingInline:'20px',paddingBlock:'34px' }}>
        <Container maxWidth="md" sx={{ display: "flex", paddingInline:'0 !important', justifyContent: "center", alignItems: "center",  }}>
          <Grid container direction="row"  rowSpacing={5} columnSpacing={2} width={'100%'}> 
            <Grid size={{xs: 12, sm: 4, md: 4}} >
              <Box>
                <Typography variant="h1" fontSize={36} fontWeight={700} color="white" fontFamily={['inter',"sans-serif"]}  textAlign={{xs:'center', sm:'left'}}>
                  MEXTODO
                </Typography>
                <Typography component="p" fontSize={15} fontWeight={400} color="white" fontFamily={['inter',"sans-serif"]} textAlign={{xs:'center', sm:'left'}} sx={{margin:'0'}}>
                  {t("the_gate_of_mexico")}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{xs: 6, sm: 3, md: 3}}>
              <Box>
                <Typography variant="h5" fontSize={16} fontWeight={700} color="white" mb={"24px"} fontFamily={['inter',"sans-serif"]}>{t("help")}</Typography>
                <List disablePadding sx={{display:'flex', flexDirection: 'column', gap:'5px'}}>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("faq")}
                    </Link> 
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("payments")}
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("customer_service")}
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid size={{xs: 6, sm: 3, md: 3}}>
            <Box>
                <Typography variant="h5" fontSize={16} fontWeight={700} color="white" mb={"24px"} fontFamily={['inter',"sans-serif"]} >{t("company")}</Typography>
                <List disablePadding sx={{display:'flex', flexDirection: 'column', gap:'5px'}}>
                  <ListItem disablePadding >
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("about_us")}
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("payments")}
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("how_to_use_mxtd")}
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid size={{xs: 12, sm: 2, md: 2}} >
              <Box>
                <Typography variant="h5" fontSize={16} fontWeight={700} color="white" mb={"24px"} fontFamily={['inter',"sans-serif"]} >{t("connect")}</Typography>
                <List disablePadding sx={{display:'flex', flexDirection: 'column', gap:'5px'}}>
                  <ListItem disablePadding >
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("twitter")}
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("youtube")}
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 13, fontWeight: 400, color: 'white', fontFamily: 'Inter, sans-serif',}}>
                    {t("instagram")}
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Container>
        
      </Box>
      <Box sx={{backgroundColor: primary.main,  paddingInline:'20px',paddingBlock:'10px' }}>
      <Typography component="p" fontSize={16} fontWeight={400} color="white" fontFamily={['inter',"sans-serif"]} textAlign="center" sx={{margin:'0'}}>
        {t("copyright_text")}
      <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer' }}>{t("terms_and_conditions")}</Link>
      </Typography>
      </Box>
    </Box>

    
  )
}