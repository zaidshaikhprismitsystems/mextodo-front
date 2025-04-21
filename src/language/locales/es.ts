import EsData from './es.json';
import SidebarEsData from '../components/sidebar/sidebarEs.json';
import ProductsEsData from '../components/product/productEs.json';
import OrdersEsData from '../components/order/orderEs.json';
import DashboardEsData from '../components/ownerDashboard/dashboardEs.json';
import VendorEs from '../components/vendor/vendorEs.json';
import ticketEs from '../components/tickets/ticketEs.json';
import settingEs from '../components/setting/settingEs.json';
import promotionDiscountEs from '../components/promotion-discount/promotionDiscountEs.json';

const mergedEs = { ...EsData, ...SidebarEsData, ...ProductsEsData, ...OrdersEsData, ...DashboardEsData, ...VendorEs, ...ticketEs, ...settingEs, ...promotionDiscountEs };

export default mergedEs;