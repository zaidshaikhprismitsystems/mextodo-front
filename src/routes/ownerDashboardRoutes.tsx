import { lazy } from 'react';
import Loadable from './loadable';
import OwnerLayout from '../layouts/ownerLayout';
import { Products } from '../components/products';
import { AddProducts } from '../components/add-products';

const OwnerDashboard = Loadable(lazy(() => import('../pages/owner/dashboard')));
const Login = Loadable(lazy(() => import('../pages/login')));
const OrderListPageView = Loadable(lazy(() => import('../pages/orders')));
const OrderDetailsPageView = Loadable(lazy(() => import('../pages/order-details')));
const OrderPickup = Loadable(lazy(() => import('../pages/order-pickup')));
const PromotionDiscount = Loadable(lazy(() => import('../pages/owner/promotions-discounts-owner/promotions-discounts')));
const PromotionDiscountAdd = Loadable(lazy(() => import('../pages/owner/promotions-discounts-owner/add-promotions-discounts')));
const OwnerTickets = Loadable(lazy(() => import('../pages/owner/tickets/manage-ticket')));
const ViewTickets = Loadable(lazy(() => import('../pages/owner/tickets/view-ticket')));

export const OwnerDashboardRoutes = [
  {
    path: '/dashboard',
    element: <OwnerLayout />,
    children: [
      { path: '', element: <OwnerDashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'products', element: <Products /> },
      { path: 'add-products', element: <AddProducts /> },
      { path: 'orders', element: <OrderListPageView /> },
      { path: 'order-details', element: <OrderDetailsPageView /> },
      { path: 'pickup', element: <OrderPickup /> },
      { path: 'promotion-discount', element: <PromotionDiscount /> },
      { path: 'add-promotion-discount', element: <PromotionDiscountAdd /> },
      { path: 'tickets', element: <OwnerTickets /> },
      { path: 'view-ticket', element: <ViewTickets /> },
    ],
  },
];