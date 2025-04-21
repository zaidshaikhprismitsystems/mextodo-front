import Box from '@mui/material/Box';
import Scrollbar from '../../components/scrollbar';
import { NestedListItem } from '../../components/nested-listitem';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Folder from '../../icons/duotone/Folder';
import AdminEcommerce from '../../icons/duotone/AdminEcommerce';

const TOP_HEADER_AREA = 50;

export default function OwnerDashboardSidebar() {
  
  const navigate = useNavigate();

  const productRoutes = [
    {
      name: "Products",
      onClick: () => {
        navigate("products")
      },
      active: location.pathname === "/dashboard/products" ? true : false
    },
    {
      name: "Create New Products",
      onClick: () => {
        navigate("add-products")
      },
      active: location.pathname === "/dashboard/add-products" ? true : false
    }
  ];

  const orderRoutes = [
    {
      name: "Orders",
      onClick: () => {
        navigate("orders")
      },
      active: location.pathname === "/dashboard/orders" ? true : false
    },
    {
      name: "Order Details",
      onClick: () => {
        navigate("order-details")
      },
      active: location.pathname === "/dashboard/order-details" ? true : false
    }
  ];

  const [openProducts, setOpenProducts] = React.useState(false);
  const [openOrders, setOpenOrders] = React.useState(false);
  
  return (
      <Box position={'sticky'} top={169} height={'100%'}>
        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            height:'100%',
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
          <Box height="100%" px={2}>
          
          <Typography component="p"   sx={{fontSize: '12px', margin: '20px 0 10px 15px',fontWeight: 600,marginBottom: '10px',textTransform: 'uppercase', color: 'rgb(17, 24, 39)',}}>Admin Account</Typography>
              
              <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', py:0,
                    "& .MuiButtonBase-root ":{
                      borderRadius:50,
                      marginBottom:1,
                      // color:'primary.main',

                      '& .MuiTypography-root':{
                        // color:'grey.500'
                       },
                     
                      "& .MuiListItemIcon-root":{
                        minWidth:'inherit',

                        "& .MuiSvgIcon-root":{
                          width:"18px",
                          height:"18px",
                          // color:'grey.400',
                          
                        },
                      },
                      "& .MuiListItemText-root":{
                        my:0,
                        pl:1,

                        '& .MuiTypography-root':{
                          // color:'grey.500',
                          fontSize:"14px",
                          fontWeight:500,
                         },
                       
                        
                      },
                    //  hover

                      '&:hover ': {
                        '& .MuiSvgIcon-root':{
                          color:'primary.main',
                        },
                        '& .MuiTypography-root':{
                          color:'primary.main',
                         },
                      },
                    },
                    "& .MuiCollapse-root":{
                        width:'100%',
                      },
                    
                  }}
                >

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/products" || location.pathname === "/dashboard/add-products" ? "primary.100" : "" }} onClick={() => {setOpenProducts(!openProducts)}}>
                    <ListItemIcon>
                      <AdminEcommerce />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openProducts} list={productRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/orders" ? "primary.100" : "" }} onClick={() => {setOpenOrders(!openOrders)}}>
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                    {openOrders ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openOrders} list={orderRoutes} />

                </List>
            
          </Box>
        </Scrollbar>
      </Box>
  )
}