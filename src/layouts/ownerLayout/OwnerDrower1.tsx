import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from "../../services/store/store"
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/store/slices/userSlice';
import { Button, ListItemButton, ListItemText, Typography, IconButton } from '@mui/material';
import { Link as RouteLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandMore';
import ExpandMore from '@mui/icons-material/ExpandLess';
import { NestedListItem } from '../../components/nested-listitem';
import { Span } from '../../components/typography';
import ApiService from '../../services/apiServices/apiService';

export default function OwnerDrower() {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [states, setStates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedState, setSelectedState] = React.useState();

  const getStates = async () => {
    try {
      let data = await ApiService.getStates();
      setStates(data.data.states);
    } catch (e) {
      console.log(e);
    }
    finally {
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

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLanguageAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const renderMenu = (
    <Drawer
      anchor="left"
      open={Boolean(anchorEl)}
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
        <MenuItem sx={{ backgroundColor: 'primary.main', p: '10px 10px', width: 200 }}>{
          userData.userDetails && userData.userDetails !== null ?
            <Typography variant='body1' fontSize={16} fontWeight={400} fontFamily={'Inter'} color={'white.main'} sx={{ textTransform: "capitalize" }}>{t("hi")} ,{userData.userDetails.username}</Typography>
            :
            <RouteLink to="/register"><Typography color={'white.main'}> {t("create_account")}</Typography></RouteLink>
        }
        </MenuItem>
        <Button sx={{ p: 0, minWidth: 'auto' }} onClick={handleMenuClose}><CloseIcon color="inherit" sx={{ color: '#000' }} /></Button>
      </Box>

      <Box px={2} pb={2} className="mobile-menu-items-wrap">

        {/* Menu items */}

        <MenuItem sx={{ p: '10px 10px', width: 200, borderTop: '1px solid #858585' }} >
          <RouteLink to="/seller-register">
            <Typography component={'span'} sx={{ lineHeight: 1.2, minHeight: 'auto', fontSize: 16, fontWeight: 400, color: '#333333', fontFamily: 'Inter, sans-serif', }}>
              Account & Orders
            </Typography>
          </RouteLink>
        </MenuItem>

        <ListItemButton onClick={() => { setOpenCategories(!openCategories) }} sx={{ p: '10px 10px', width: 200, borderTop: '1px solid #858585' }}>
          <ListItemText primary="Categories" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Attributes List Item */}
        <NestedListItem open={openCategories} list={categoryRoutes} />


        <ListItemButton onClick={() => { setOpenLanguage(!openLanguage) }} sx={{ p: '10px 10px', width: 200, borderTop: '1px solid #858585' }}>
          <ListItemText primary="Languages" />
          {openLanguage ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Attributes List Item */}
        <NestedListItem open={openLanguage} list={languageRoutes} />


        <MenuItem sx={{ p: '10px 10px', width: 200, borderTop: '1px solid #858585' }} >{
          userData.userDetails && userData.userDetails !== null ?
            <Typography component={'span'} onClick={() => { dispatch(logout()); navigate("/login"); }}
              sx={{ lineHeight: 1.2, minHeight: 'auto', fontSize: 16, fontWeight: 400, color: '#333333', fontFamily: 'Inter, sans-serif', }}
            >{t("logout")}</Typography>
            :
            <RouteLink to="/login"><Typography>{t("login")}</Typography></RouteLink>
        }</MenuItem>

      </Box>
    </Drawer>
  );

  return (
    <>
      <Box display={{ xs: 'inline-block', md: 'none' }} >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ m: 0, p: 0, borderRadius: 0, '& .MuiSvgIcon-root': { color: 'black', fontSize: 30 }, '&:hover': { backgroundColor: 'transparent' }, }}
          onClick={handleProfileMenuOpen}
        >
          <MenuIcon /><Typography component={Span} ml={1} >Menu</Typography>
        </IconButton>
      </Box>
      {renderMenu}
    </>
  );
}