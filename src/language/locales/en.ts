import EnData from './en.json';
import SidebarEnData from '../components/sidebar/sidebarEn.json';
import ProductsEnData from '../components/product/productEn.json';
import OrdersEnData from '../components/order/orderEn.json';
import DashboardEnData from '../components/ownerDashboard/dashboardEn.json';
import VendorEn from '../components/vendor/vendorEn.json';
import ticketEn from '../components/tickets/ticketEn.json';
import settingEn from '../components/setting/settingEn.json';
import promotionDiscountEn from '../components/promotion-discount/promotionDiscountEn.json';

const mergedEn = { ...EnData, ...SidebarEnData, ...ProductsEnData, ...OrdersEnData, ...DashboardEnData, ...VendorEn, ...ticketEn, ...settingEn, ...promotionDiscountEn };

export default mergedEn;