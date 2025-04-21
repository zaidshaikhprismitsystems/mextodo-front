import { useNavigate } from 'react-router-dom';

import ApiService from "../../services/apiServices/apiService"
import { useSearchParams } from "react-router-dom"

import { H5 } from '../../components/typography';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Box, Card, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const { t } = useTranslation();
  
  let [searchParams] = useSearchParams();

  const token = searchParams.get("token")
  
  useEffect(() => {
    if(token !== undefined && token !== null){
      verifyUserData(token);
    }
  }, [token])

  const verifyUserData = async (token: string) => {
    try{
      let verifyUser = await ApiService.userVerification({token});
      console.log('verifyUser: ', verifyUser);
      setIsLoading(false);
      setVerified(true);
    }catch(e: any){
      console.log(e);
      setIsError(true);
      setError(e.response.data.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} maxWidth={"100%"} p={2}>
        <Box maxWidth={"550px"} padding={4} bgcolor={"white"}>
          <H5 display={"flex"} alignItems={"center"} justifyContent={"center"} fontSize={{ sm: 30, xs: 25 }}>{t("user_erification")}</H5>
          {
            isLoading ? t("verifying") :
            <Box
              sx={{
                textAlign: "center",
                padding: "40px 0",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Card
                sx={{
                  backgroundColor: "white",
                  padding: "40px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 3px #C8D0D8",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    height: "150px",
                    width: "150px",
                    backgroundColor: "#F8FAF5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  {
                   isError && !verified ?  
                   <CloseIcon sx={{ fontSize: 100, color: "#ff3333" }} />
                   :
                   <CheckCircleIcon sx={{ fontSize: 100, color: "#9ABC66" }} />
                  }
                </Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: isError && !verified ? "#ff3333" : "#88B04B",
                    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
                    fontWeight: 900,
                    fontSize: "40px",
                    marginBottom: "10px",
                    marginTop: "10px"
                  }}
                >
                  {
                   isError && !verified ? t("failed") : t("success")
                  }
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#404F5E",
                    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  {
                    verified ? t("user_verified") : isError ? error : ""
                  }
                </Typography>

                  <Button sx={{marginTop: "20px"}} onClick={() => { navigate("/login") }}>{t("click_here_to_login")}</Button>
                  
              </Card>
            </Box>
          }
        </Box>
      </Box>
  )
}

export default Login;