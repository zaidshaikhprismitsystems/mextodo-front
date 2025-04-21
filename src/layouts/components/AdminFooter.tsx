import { Box, Typography } from "@mui/material";
// import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { primary } from "../../theme/colors";


export default function Footer() {

  const { t, i18n } = useTranslation();
  
  return (
    <Box sx={{position: "sticky", top: "100%", }}>
      <Box sx={{backgroundColor: primary.main,  paddingInline:'20px',paddingBlock:'10px' }}>
      <Typography component="p" fontSize={16} fontWeight={400} color="white" fontFamily={['inter',"sans-serif"]} textAlign="center" sx={{margin:'0'}}>
        {t("copyright_text")}
      <Link href="#" underline="none" color="white" sx={{ cursor: 'pointer' }}>{t("terms_and_conditions")}</Link>
      </Typography>
      </Box>
    </Box>

    
  )
}