import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import Scrollbar from '../../components/scrollbar';
import { Span } from '../../components/typography';
import FlexBetween from '../../components/flexbox/FlexBetween';
import ArrowLeftToLine from '../../icons/duotone/ArrowLeftToLine';
import ListContent from './ListContent';

export default function AdminDrower() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
    
  const TOP_HEADER_AREA = 72;

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
    <Box>
        <FlexBetween padding=" 1rem" >
          
          <Link href="/"  style={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Box component="img" src="../../../public/logo.svg" alt="logo" width={100} />
          </Link>

            {
            <IconButton onClick={handleMenuClose}>
                <ArrowLeftToLine />
              </IconButton>
            }
        </FlexBetween>

        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
            <ListContent />
        </Scrollbar>
      </Box>
  </Drawer>
  );

    return (
      <>
        <Box display={{xs:'inline-block', md:'none'}} >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ m: 0, p:0, borderRadius:0, '& .MuiSvgIcon-root': { color: 'black', fontSize:30 },'&:hover':{backgroundColor:'transparent'},}}
            onClick={handleProfileMenuOpen}
          >
            <MenuIcon /><Typography component={Span} ml={1}></Typography>
          </IconButton>
        </Box>
        {renderMenu}
      </>
    );
}