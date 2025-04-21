import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from "../../services/store/store"
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../services/store/slices/userSlice';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, FormHelperText, TextField, ListItem, List, ListItemButton, ListItemIcon, ListItemText,  Typography, Icon, Container, Autocomplete } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from '@mui/material';
import {Link as RouteLink } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { ClassNames } from '@emotion/react';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { primary } from '../../theme/colors';
import ApiService from '../../services/apiServices/apiService';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NestedListItem } from '../../components/nested-listitem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const CustomSelect = styled(Select)({
  border:0,
  
  '& .MuiSelect-select': {
    padding: 0,
    paddingRight: '14px !important',
  
  },
  '& fieldset' :{
    border: 0,
  },
});

const CustomSearch = styled(TextField)({
  width: "100%",
  padding: 0,
  backgorundColor: '#ffffff',
  '& .MuiOutlinedInput-root':{
    height: "100%",
  },
  '& .MuiInputBase-input': {
    height: "100%",
    width: "100%",
    fontFamily: " 'inter', sans-serif",
    fontWeight: 400,
    boxSizing: "border-box",
    borderRadius: 0,
    border: '1px solid #000000',
    backgroundColor: '#ffffff'
    
  },
  
  '& fieldset': {
    border: 0
  }

});

const languageOptions: any = {
  en: {
    icon: '/static/flags/usa.png',
    label: 'English'
  },
  es: {
    icon: '/static/flags/mexico.png',
    label: 'Spanish'
  }
};

const IconWrapper = styled('div')({
  width: 24,
  height: 24,
  padding: '2px',
  display: 'flex',
  '& img': {
    width: '100%',
    borderRadius: '50%',
    objectFit: 'cover'
  }
});

export default function Header() {
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  const [states, setStates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedState, setSelectedState] = React.useState();

  const getStates = async () => {
    try{
      let data = await ApiService.getStates();
      setStates(data.data.states);
    }catch(e){
      console.log(e);
    }
    finally{
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getStates();
  }, [])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openLanguage, setOpenLanguage] = React.useState(false);

  const userData: any = useAppSelector((state: RootState) => state.user)

  const [age, setAge] = React.useState('');

  const handleChange = (event: any)  => {
    setAge(event.target.value as string);
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLanguageAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let categoryRoutes = [
    {
      name: "Digital",
      onClick: () => {

      }
    },
    {
      name: "Pysical",
      onClick: () => {
        
      }
    },
    {
      name: "Vehicle",
      onClick: () => {
        
      }
    },
    {
      name: "Properties",
      onClick: () => {
        
      }
    }
  ];

  let languageRoutes = [
    {
      name: "English",
      onClick: () => {
        handleChangeLanguage("en");
      }
    },
    {
      name: "Spanish",
      onClick: () => {
        handleChangeLanguage("es");
      }
    }
  ];

  const menuId = 'primary-search-account-menu';
  const languageMenu = 'primary-language-menu';

  const renderMenu = (
    <Drawer
      anchor="left" 
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: '300px', 
          width: '100%',
        }
      }}
    >

    {/* menu content here */}
    <Box px={2} pt={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <MenuItem sx={{backgroundColor:'primary.main', p:'10px 10px', width:200} }>   {
          userData.userDetails && userData.userDetails !== null ?
            <Typography variant='body1' fontSize={16} fontWeight={400} fontFamily={'Inter'} color={'white.main'} sx={{ textTransform: "capitalize" }}>{t("hi")} ,{userData.userDetails.username}</Typography>
            : 
            <RouteLink to="/register"><Typography>{t("create_account")}</Typography></RouteLink>
          }
      </MenuItem>
      <Button sx={{p:0, minWidth:'auto'}}  onClick={handleMenuClose}><CloseIcon color="inherit" sx={{ color: '#000' }}/></Button>
    </Box>

    <Box px={2} pb={2}  className="mobile-menu-items-wrap">

      {/* Menu items */}

        <MenuItem sx={{ p:'10px 10px', width:200, borderBottom:'1px solid #858585'}} >
          <RouteLink to="/seller-register">
            <Typography component={'span'} sx={{lineHeight:1.2, minHeight:'auto', fontSize: 16, fontWeight: 400, color: '#333333', fontFamily: 'Inter, sans-serif',}}>
              Account & Orders
            </Typography>
          </RouteLink>
        </MenuItem>

        <ListItemButton onClick={() => {setOpenCategories(!openCategories)}}>
          {/* <ListItemIcon>
            <HubIcon />
          </ListItemIcon> */}
          <ListItemText primary="Categories" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Attributes List Item */}
        <NestedListItem open={openCategories} list={categoryRoutes} />


        <ListItemButton onClick={() => {setOpenLanguage(!openLanguage)}}>
          {/* <ListItemIcon>
            <HubIcon />
          </ListItemIcon> */}
          <ListItemText primary="Languages" />
          {openLanguage ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Attributes List Item */}
        <NestedListItem open={openLanguage} list={languageRoutes} />
        

        <MenuItem sx={{ p:'10px 10px', width:200,}} >{
          userData.userDetails && userData.userDetails !== null ?
          <Typography component={'span'}  onClick={() => { dispatch(logout()); navigate("/login"); }}
          sx={{lineHeight:1.2, minHeight:'auto', fontSize: 16, fontWeight: 400, color: '#333333', fontFamily: 'Inter, sans-serif',}}
          >{t("logout")}</Typography>
          :
          <RouteLink to="/login"><Typography>{t("login")}</Typography></RouteLink>
        }</MenuItem>
      
      </Box>
  </Drawer>
  );

  const renderLanguage = (
    <Menu
      anchorEl={languageAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={languageMenu}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isLanguageMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleChangeLanguage("en")
      }}>English</MenuItem>
      <MenuItem onClick={() => {
        handleChangeLanguage("es")
      }}>Spanish</MenuItem>
    </Menu>
  );
  const selectedLanguage: any = languageOptions[i18n.language];

  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLanguageMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={languageMenu}
          aria-haspopup="true"
          color="inherit"
        >
          <IconWrapper>
            <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
          </IconWrapper>
        </IconButton>
        <Typography color='white.main'>{ i18n.language }</Typography>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar component="nav" sx={{backgroundColor:primary[900], position:"sticky", paddingRight:'0 !important'}}>
        {/* language settings */}
        <Box sx={{backgroundColor:primary.main, width: "100%", textAlign: "right", paddingBlock:{xs:'10px', md:'10px'},  }}>
          <Container sx={{maxWidth:{lg:"lg", xl:"xl"}, display: "flex", alignItems:'center',  gap:'10px'}}>
          {/* toggle */}
          <Box  display={{xs:'inline-block', md:'none'}} >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ m: 0, p:0,'& .MuiSvgIcon-root': { color: 'white.main' },}}
                onClick={handleProfileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {/* logo */}
            <Box p={0}  sx={{ display:{xs:'flex', md:'none'}, alignItems: "center", justifyContent:{xs:'start', sm:'center'}, }}> 
              <RouteLink to={"/"} style={{display:'flex'}}> 
                <img src='logo.svg' height={50} width={164} className="responsive-logo" />
              </RouteLink>
            </Box>
            {/* account */}
            <Box  sx={{display: {xs:'flex', md:'none'}, alignItems:'center', justifyContent:'end',  width: "auto", ml:'auto'}}>
            <RouteLink to={userData.userDetails && userData.userDetails !== null ? '/account' : '/login'}>
              {/* <Typography color="white" minWidth={{xs:'auto', md:'126px'}} sx={{ cursor: 'pointer',fontSize: {xs:'14px', md:'20px'}, lineHeight:1.2, fontWeight: 400, color: 'white.main', fontFamily: 'Inter, sans-serif'}}>
              {t("account_and_orders")}
              </Typography> */}
            </RouteLink>
              <Button sx={{minWidth: 48, width: 48, border:0, padding:0}}>
                  <img src='icon/shopping-cart.svg' height={48} width={48} className="cart_icon" />
              </Button>
            </Box>

            {/* language */}
            <Button
                aria-label="language"
                aria-controls={languageMenu}
                aria-haspopup="true"
                onClick={handleLanguageMenuOpen}
                color="inherit"
                sx={{p:0, display:{xs:'none', md:'flex'}, ml:'auto' }}
              >
                {/* {selectedLanguage.label} */}
                <img alt={selectedLanguage.label} width={20} height={20} src={selectedLanguage.icon} style={{marginRight:"4px"}} />
                <Typography sx={{textTransform: "capitalize", fontSize:{xs:'14px', md:'20px'}, lineHeight:'1'}} color='white.main'>{ i18n.language }</Typography>
                <KeyboardArrowDownIcon  sx={{color:'white.main', fontSize:{xs:'20px', md:'24px'}, }}/>
              {/* <IconWrapper>
              </IconWrapper> */}
            </Button>
            </Container>
          </Box>
        <Toolbar sx={{ display: "flex", flexDirection: 'column',  padding: {xs:'10px 0px', md:'18px 0px', lg:'18px 0px 10px'}, gap:{xs:'10px', md:'23px'} }}>
          {/* logo, states, search, account & orders, cart */}
          <Container sx={{maxWidth:{lg:"lg", xl:"xl"},}}>
          <Box sx={{ display: "flex", flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'space-between',  alignItems: "center",  width: "100%", gap:{xs:'10px', md:'23px'},  }} >
            {/* logo */}
            <Box p={0} flex={{xs:'auto', sm:'1'}} sx={{ display:{xs:'none', md:'flex'}, alignItems: "center", justifyContent:{xs:'start', sm:'center'}, maxWidth:"45%", order:{xs:'1'}}}> 
              <RouteLink to={"/"} style={{display:'flex'}}> 
                <img src='logo.svg' height={50} width={164} className="responsive-logo" />
              </RouteLink>
            </Box>
            {/* search */}
            <Box sx={{ width: "100%", order:{xs:'3', md:'2'} }}>
              <FormControl sx={{ m: 0, width: "100%", flexDirection: "row"}}>
                {/* <CustomSelect
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{minWidth: {xs:'100px', sm:'129px'}, width: {xs:'100px', sm:'129px'}, height: {xs:'42px', md:'51px'}, py: "9px", pl: {xs:'10px', md:'14px'}, pr: "14px", border: "1px solid #000 ", borderRight:'0', backgroundColor:"#D3D3D3", borderRadius: 0, borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px", fontSize: {xs:14, md:20}, fontWeight: 400, color: 'black', fontFamily: 'Inter, sans-serif',  }}
                >
                  <MenuItem value="" >
                    {t("all_state")}
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </CustomSelect> */}
                {states && states !== null && states !== undefined && states.length > 0 ?
                  <Autocomplete
                    id="state-select"
                    // py: "9px", pl: {xs:'10px', md:'14px'}, pr: "14px",
                    sx={{minWidth: {xs:'100px', sm:'129px'}, width: {xs:'100px', sm:'129px'}, height: {xs:'42px', md:'51px'}, border: "1px solid #000 ", borderRight:'0', backgroundColor:"#D3D3D3", borderRadius: 0, borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px", fontSize: {xs:14, md:20}, fontWeight: 400, color: 'black', fontFamily: 'Inter, sans-serif', '& .MuiFormControl-root':{height:'100%'}, '& .MuiInputBase-root':{height:'100%',  pr:'25px !important',},  '& .MuiInputBase-input':{p:'0 !Important',color:'#000',}, '& fieldset':{border:0},'&.Mui-focused fieldset':{border:'0 !important'},'& .MuiInputBase-input::placeholder':{color:'#000'},'& .MuiAutocomplete-endAdornment':{right:'2px !important'}, }}
                    options={states || []}
                    autoHighlight
                    getOptionLabel={(option: any) => option.name} // Display state name
                    isOptionEqualToValue={(option, value) => option.id === value.id} // Ensure correct selection
                    onChange={(event, newValue) => {
                      handleChange(setSelectedState(newValue?.id));
                    }}
                    value={states?.find((s: any) => s.id === selectedState) || null}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label={t("choose_state")}
                        placeholder={t("all_state")}
                        sx={{padding: 0}}
                        // onBlur={handleBlur}
                        // error={Boolean(touched.state && errors.state)}
                        // helperText={touched.state && errors.state ? String(errors.state) : ""}
                      />
                    )}
                  />
                  : ''}

                <CustomSearch type='search' sx={{height: {xs:'42px', md:'51px'}, '& .MuiInputBase-input':{fontSize: { xs: '14px', md: '20px' },padding:{ xs: '10px 10px', md: '14px 15px' } ,}, }}/>
                {/* onClick={} */}
                <Button sx={{minWidth: {xs:40, sm:60}, width: {xs:40, sm:60}, height: {xs:'42px', md:'51px'}, border: "1px solid #000 ", borderLeft:'0', backgroundColor:"#D3D3D3",borderRadius: 0, borderTopRightRadius:"8px", borderBottomRightRadius:"8px"}}>
                  <img src='icon/search.svg' height={31} width={33} className="search-icon"/>
                </Button>
            </FormControl>
            </Box>
            {/* account */}
            <Box flex={{xs:'auto', sm:'1'}} sx={{display: {xs:'none', md:'flex'}, alignItems:'center', justifyContent:'end',  width: "auto", maxWidth:"45%", order:{xs:'2', md:'3'}}}>
            <RouteLink to={userData.userDetails && userData.userDetails !== null ? '/account' : '/login'}>
              <Typography color="white" minWidth={{xs:'auto', md:'126px'}} sx={{ cursor: 'pointer',fontSize: {xs:'14px', md:'20px'}, lineHeight:1.2, fontWeight: 400, color: 'white.main', fontFamily: 'Inter, sans-serif'}}>
              {t("account_and_orders")}
              </Typography>
            </RouteLink>
              <Button sx={{minWidth: 48, width: 48, border:0, padding:0}}>
                  <img src='icon/shopping-cart.svg' height={48} width={48} className="cart_icon" />
              </Button>
            </Box>
          </Box>
          {/* bottom menu */}
          <Box mt={2} width={'100%'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
            <Box >
            <List disablePadding sx={{display:'flex', flexWrap:'wrap', columnGap:'14px'}}>
                  <ListItem disablePadding sx={{width: 'auto',display: {xs:'none', md:'block'},}}>
                  <CustomSelect
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{border:0, outline:0, pr: "14px", cursor: 'pointer', fontSize: 20, fontWeight: 400, color:'white.main', fontFamily: 'Inter, sans-serif', '& .MuiSvgIcon-root':{color:'white.main',},}}
                  >
                  <MenuItem value="" disabled>
                  {t("categories")}
                  </MenuItem>
                  <MenuItem ><RouteLink to="/seller-register"><Typography >Digital Product</Typography></RouteLink></MenuItem>
                  <MenuItem ><RouteLink to="/seller-register"><Typography >Pysical Product</Typography></RouteLink></MenuItem>
                  <MenuItem ><RouteLink to="/seller-register"><Typography >Vehicles</Typography></RouteLink></MenuItem>
                  <MenuItem ><RouteLink to="/seller-register"><Typography >Properties</Typography></RouteLink></MenuItem>
                </CustomSelect>
                  </ListItem>
                  <ListItem disablePadding sx={{width: 'auto'}}>
                    <RouteLink to={userData.userDetails && userData.userDetails !== null ? "/seller-register" : "/login"}><Typography color="white" sx={{ cursor: 'pointer',fontSize:{xs:16, lg:20}, fontWeight: 400, color: 'white.main', fontFamily: 'Inter, sans-serif'}}>{t("sell")}</Typography></RouteLink>
                  </ListItem>
                  <ListItem disablePadding sx={{width: 'auto'}}>
                    <RouteLink to="/seller-register"><Typography color="white" sx={{ cursor: 'pointer',fontSize:{xs:16, lg:20}, fontWeight: 400, color: 'white.main', fontFamily: 'Inter, sans-serif',}}>{t("customer_service")}</Typography></RouteLink>
                  </ListItem>
                </List>
            </Box>

            <Box sx={{ display:{xs:'none', md:'flex'},}}>
            <List disablePadding sx={{display:'flex', flexWrap:'wrap', columnGap:'14px'}}>
                  <ListItem disablePadding sx={{width: 'auto'}}>
                  <Link underline="none" color="white" sx={{ cursor: 'pointer',fontSize: 20, fontWeight: 400, color: 'white.main', fontFamily: 'Inter, sans-serif',}}>
                    {
                      userData.userDetails && userData.userDetails !== null ?
                        <Typography sx={{ fontSize: 20, fontWeight: 400, fontFamily: 'Inter, sans-serif', color: 'white.main'}}>{t("hi")}, {userData.userDetails.username}</Typography>
                      : 
                        <RouteLink to="/register"><Typography sx={{ cursor: 'pointer', fontSize: 20, fontWeight: 400, fontFamily: 'Inter, sans-serif', color: 'white.main'}}>{t("create_account")}</Typography></RouteLink>
                    }
                  </Link>
                  </ListItem>
                  <ListItem disablePadding sx={{width: 'auto'}}>
                    {
                      userData.userDetails && userData.userDetails !== null ?
                      <Typography sx={{ cursor: 'pointer', fontSize: 20, fontWeight: 400, fontFamily: 'Inter, sans-serif', color: 'white.main'}} onClick={() => { dispatch(logout()); navigate("/login"); }}>{t("logout")}</Typography>
                      :
                      <RouteLink to="/login"><Typography sx={{ cursor: 'pointer', fontSize: 20, fontWeight: 400, fontFamily: 'Inter, sans-serif', color: 'white.main'}}>Login</Typography></RouteLink>
                    }
                  </ListItem>
                </List>

            </Box>
          </Box>
          </Container>

        </Toolbar>
      </AppBar>
      {renderLanguage}
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}