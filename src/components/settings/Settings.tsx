import { Fragment, useEffect, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// CUSTOM COMPONENTS
import { H3, H5 } from '../../components/typography';
import FlexBox from '../../components/flexbox/FlexBox'; // CUSTOM PAGE SECTION COMPONENTS

import TabComponent from './tabs';
import Apps from '../../icons/Apps';
// import Apps from '@mui/icons-material';
import Icons from '../../icons/account';
import { StyledButton } from './style';
import { Container } from '@mui/material';
import ApiService from '../../services/apiServices/apiService';
import { LoaderWithLogo } from '../loader';

const Settings = () => {

  const [ settings, setSettings ] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [active, setActive] = useState('General Settings');
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));

  useEffect(() => {
    getSettingData();
  }, [])

  const getSettingData = async () => {
    try{
      let setting = await ApiService.getSetting();
      console.log('setting: ', setting);
      setSettings(setting.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const handleListItemBtn = (name: any)  => {
    setActive(name);
    setOpenDrawer(false);
  };
  
  const tabList = [
  {
    id: 1,
    name: 'General Settings',
    Icon: Icons.SettingsOutlined
  },   
  {
    id: 2,
    name: 'Email Settings',
    Icon: Icons.UserOutlined
  },
  {
    id: 3,
    name: 'SMTP',
    Icon: Icons.EmailOutlined
  },
  {
    id: 4,
    name: 'Password',
    Icon: Icons.LockOutlined
  },
  // {
  //   id: 5,
  //   name: 'Billing',
  //   Icon: Icons.DollarOutlined
  // },
  {
    id: 5,
    name: 'Envia',
    Icon: Icons.Key
  },
  {
    id: 6,
    name: 'SEO',
    Icon: Icons.DevicesApple
  },  
  // {
  //   id: 8,
  //   name: 'Delete account',
  //   Icon: Icons.DeleteOutlined
  // }
];

  const TabListContent = <FlexBox flexDirection="column">
      {tabList.map(({
      id,
      name,
      Icon
    }) => <StyledButton
            key={id}
            variant="text"
            startIcon={<Icon />}
            active={active === name}
            onClick={() => handleListItemBtn(name)}
            >
              {name}
            </StyledButton>)}
    </FlexBox>;

  const generalSettingData = [
    "globalName",
    "siteLogo",
    "siteFavicon",
    "isEmailVerification",
    "isMaintenanceMode"
  ];

  const emailSettingData = [
    "notificationEmail",
    "fromEmail"
  ];

  const smtpData = [
    "host",
    "port",
    "authUser",
    "authPassword"
  ];

  const seoData = [
    "landingTitle",
    "landingKeywords",
    "landingDescription"
  ];

  const enviaData = [
    "sandboxKey",
    "sandboxApi",
    "liveKey",
    "liveApi",
    "mode"
  ];

  let generalSetting: any = [];
  let emailSetting: any = [];
  let smtpSetting: any = [];
  let seoSetting: any = [];
  let enviaSetting: any = [];

  settings.filter((setting: any) => { 
    if(generalSettingData.includes(setting.key)){
      generalSetting[setting.key] = setting.value
    }

    if(emailSettingData.includes(setting.key)){
      emailSetting[setting.key] = setting.value
    }

    if(smtpData.includes(setting.key)){
      smtpSetting[setting.key] = setting.value
    }

    if(seoData.includes(setting.key)){
      seoSetting[setting.key] = setting.value
    }

    if(enviaData.includes(setting.key)){
      enviaSetting[setting.key] = setting.value
    }
  })

  return (
    <>
      {
        !loading ?
        <>
          <FlexBox gap={0.5} alignItems="center">
            {/* <IconWrapper>
                <TokenIcon color="primary" />
              </IconWrapper> */}
            <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>Settings</H3>
          </FlexBox>
          
          <Container sx={{ px:'0 !important', maxWidth:{lg:"lg", xl:"xl"}}}>
            <Box>
            <Grid container spacing={3} sx={{p: 0}} >
              <Grid size={{
                md: 3,
                xs: 12
              }}>
                {downMd ? <Fragment>
                    <FlexBox alignItems="center" gap={1} onClick={() => setOpenDrawer(true)} >
                      <IconButton sx={{
                        padding: 0
                      }}>
                        <Apps sx={{
                          color: 'text.primary'
                        }} />
                      </IconButton>

                      <H5 fontSize={16}>More</H5>
                    </FlexBox>

                    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                      <Box padding={1}>{TabListContent}</Box>
                    </Drawer>
                  </Fragment> : <Card sx={{
                p: '1rem 0'
              }}>{TabListContent}</Card>}
              </Grid>

              <Grid size={{
                md: 9,
                xs: 12
              }}>
                {active === tabList[0].name && <TabComponent.General settings={generalSetting} />}
                {active === tabList[1].name && <TabComponent.EmailSettings settings={emailSetting} />}
                {active === tabList[2].name && <TabComponent.Smtp settings={smtpSetting} />}
                {active === tabList[3].name && <TabComponent.Password />}
                {/* {active === tabList[4].name && <TabComponent.Billing />} */}
                {active === tabList[4].name && <TabComponent.Envia settings={enviaSetting} />}
                {active === tabList[5].name && <TabComponent.Seo settings={seoSetting} />}
                {/* {active === tabList[7].name && <TabComponent.DeleteAccount />} */}
                {/* {active === tabList[2].name && <TabComponent.Notifications />} */}
                {/* {active === tabList[5].name && <TabComponent.TwoStepVerification />} */}
                {/* {active === tabList[6].name && <TabComponent.ConnectedAccounts />}
                {active === tabList[7].name && <TabComponent.SocialAccounts />} */}
                {/* {active === tabList[9].name && <TabComponent.Statements />} */}
                {/* {active === tabList[10].name && <TabComponent.Referrals />} */}
                
                
              </Grid>
            </Grid>
            </Box>
          </Container>
        </>
        : 
        <LoaderWithLogo />
      }
    </>
  )

};

export default Settings;
