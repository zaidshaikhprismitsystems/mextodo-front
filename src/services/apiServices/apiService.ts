// import { IUser } from "@/types/commonTypes";
import axios from "axios";
// import AuthService from "./AuthServices";
import { BASE_URI } from "../config";
// import Utils from "./Utils";

// let BASE_URI = import.meta.env.VITE_PUBLIC_API_URI;
// console.log('BASE_URI: ', BASE_URI);

const ApiService = {

  async gteHomeProduct(){
    const res = await axios.get(`${BASE_URI}product/get_home_products`);
    return res.data;
  },

  async getVisitorsList(search: string, country: string, region: string, city: string, page: number, rowsPerPage: number) {
    const token = localStorage.getItem("authToken");
    const params = new URLSearchParams();
  
    if (search) params.append("search", search);
    if (country) params.append("country", country);
    if (region) params.append("region", region);
    if (city) params.append("city", city);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());
  
    const res = await axios.get(`${BASE_URI}visitor/get_all_visitors?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return res.data;
  },
  
  async getPageContent(slug: string) {
    const token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}pages/get_page?slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updatePageContent(data: any) {
    const token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}pages/save_page`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getEmailPattern(template: string) {
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}email_template/get_email_template?template=${template}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addPattern (data: any) {
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}email_template/add_email_template`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getReportData(entityType: string, startDate?: string, endDate?: string) {
    const token = localStorage.getItem("authToken");
  
    const params = new URLSearchParams();
    if (entityType) params.append("entityType", entityType);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
  
    const res = await axios.get(`${BASE_URI}reports/get_reports?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
  },

  async getPromotionList(status: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");

    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}coupons/get_all_coupon?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  },

  async deletePromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}coupons/delete_coupon?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addPromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}coupons/create_coupon`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updatePromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}coupons/update_coupon`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getVendorPromotionList(status: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");

    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}coupons/get_all_vendor_coupon?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  },

  async deleteVendorPromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}coupons/delete_vendor_coupon?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addVendorPromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}coupons/create_vendor_coupon`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updateVendorPromotion(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}coupons/update_vendor_coupon`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getVendorTickets(search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");

    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}tickets/list_tickets_vendor?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  },

  async checkValidAddress(pincode: any){
    const res = await axios.get(
      `${BASE_URI}auth/checkaddress?pincode=${pincode}`
    );
    if (res) {
      return res.data;
    }
    return res;
  },

  async logVisitors(){
    const res = await axios.post(
      `${BASE_URI}auth/log`
    );
    if (res) {
      return res.data;
    }
    return res;
  },

  async checkUser(userData: any) {
    const res = await axios.post(
      `${BASE_URI}api/user/checkuser`, userData
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async loginUser(data: any) {
    const res = await axios.post(`${BASE_URI}auth/login`, data);
    return res.data;
  },

  async loginAdmin(data: any) {
    const res = await axios.post(`${BASE_URI}auth/adminlogin`, data);
    return res.data;
  },
  
  async userRegistration(data: any) {
    const res = await axios.post(`${BASE_URI}auth/register`, data);
    return res;
  },

  async checkUserVendor(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}auth/checkuservendor`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async updateVendor(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}auth/update_vendor`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async checkStripeConnect(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}auth/check_stripe_connect`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async goToStripeOnBoarding(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}auth/generate_onboarding`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async getUserData(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}auth/getuserdata`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async getAllVendors(status: string, search: string, page: number, rowsPerPage: number){
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}auth/get_all_vendors?${params.toString()}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async fetchTickets(status: string, search: string, page: number, rowsPerPage: number){
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}tickets/list_titkets?${params.toString()}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async acceptVendors(id: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}auth/vendor_approve`, {id} , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async rejectVendors(deleteId: any, reason: string){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}auth/vendor_reject`, {id: deleteId, reason: reason} , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async rejectProduct(deleteId: any, reason: string){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/product_reject`, {id: deleteId, reason: reason} , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async acceptProduct(id: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/product_approve`, {id} , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async resetVendor(){
    let token = localStorage.getItem("authToken");
    console.log('token: ', token);
    const res = await axios.post(`${BASE_URI}auth/vendor_reset`, {}, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async sellerRegistration(data: any) {
    console.log('data: ', data);
    const res = await axios.post(`${BASE_URI}auth/vendorregister`, data);
    return res;
  },

  async userVerification(data: any) {
    const res = await axios.post(`${BASE_URI}auth/verifyuser`, data);
    return res.data;
  },
  
  async forgotPassword(data: any) {
    const res = await axios.post(`${BASE_URI}auth/forgotpassword`, data);
    return res.data;
  },

  async resetPassword(data: any) {
    const res = await axios.post(`${BASE_URI}auth/resetpassword`, data);
    return res.data;
  },

  async getOwnerProducts(status: string, search: string, stock: string, page: number, rowsPerPage: number){

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (stock) params.append("stock", stock);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}product/get_owner_products?${params.toString()}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    console.log('res: ', res);
    return res.data;
  },

  async getOrderDetails(id: number){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}orders/get_order_details?id=${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },
  
  async getTicketDetails(id: number){
    console.log('id: ', id);
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}tickets/view_ticket?id=${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getVendorTicketDetails(id: number){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}tickets/view_vendor_ticket?id=${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updateTicket(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}tickets/update_ticket`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async AddReply(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}tickets/add_reply`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getOwnerOrders(orderStatus: string, paymentStatus: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");

    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (orderStatus) params.append("orderStatus", orderStatus);
    if (paymentStatus) params.append("paymentStatus", paymentStatus);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}orders/get_orders?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  },

  async getAllOwnerProducts(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}product/get_all_products`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  },

  async getProductById(id: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}product/get_product?id=${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addProduct(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/add_product`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updateProduct(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/update_product`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async deleteProducts(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}product/delete_products?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async deleteVendors(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}auth/delete_vendors?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async generateShipping(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}orders/generate_shipping`, data , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getShippingData(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}orders/get_shiiping_data`, data , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getOwnerStat(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}dashboard/get_owner_data`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getAdminStat(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}dashboard/get_admin_data`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async generateInvoice(id: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}orders/generate_invoice?id=${id}` , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async shedulePickup(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}orders/shedule_pickup`, data , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getCarriers(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}orders/get_all_carriers`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async cancelOrders(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}product/cancel_orders?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addCategory(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/add_category`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getCategories(){
    // let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}product/get_categories`,
      // {
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // }
    );
    return res.data;
  },

  async getCategoriesList(status: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");
    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}product/get_all_categories?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  },

  async deleteCategories(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}product/delete_categories?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updateCategory(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/update_category`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async addAttribute(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/add_attribute`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getAttributes(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}product/get_attributes`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getAttributeList(status: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");
    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}product/get_all_attributes?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  },

  async deleteAttributes(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}product/delete_attributes?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async updateAttribute(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}product/update_attribute`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async fetchCategoryAttributes(category: any){
    const res = await axios.get(`${BASE_URI}product/get_category_attributes?category=${category}`);
    return res.data;
  },

  async setCategoryAttributes(data: any){
    const res = await axios.post(`${BASE_URI}product/add_attribute_to_category`, data);
    return res.data;
  },

  async getUsersList(status: string, search: string, page: number, rowsPerPage: number){
    let token = localStorage.getItem("authToken");
    const params = new URLSearchParams();
    
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (page || page === 0) params.append("page", page.toString());
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage.toString());

    const res = await axios.get(`${BASE_URI}users/get_all_users?${params.toString()}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  },

  async updateUser(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}users/update_user`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  },

  async deleteUsers(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.delete(`${BASE_URI}users/delete_users?ids=${data.toString()}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async saveSetting(data: any){
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}settings/save_setting`, {settingData: data} , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async getSetting(){
    let token = localStorage.getItem("authToken");
    const res = await axios.get(`${BASE_URI}settings/get_setting`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async changePassword(data: any) {
    const res = await axios.post(`${BASE_URI}auth/changepassword`, data);
    return res.data;
  },

  async changeAdminPassword(data: any) {
    let token = localStorage.getItem("authToken");
    const res = await axios.post(`${BASE_URI}auth/change_admin_password`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  },

  async saveProfile(data: any) {
    const res = await axios.post(`${BASE_URI}auth/updateprofile`, data);
    return res.data;
  },

  async getStates() {
    const res = await axios.get(`${BASE_URI}location/getstates?country_code=MX`);
    return res.data;
  },

  async getCities(stateId: number) {
    const res = await axios.get(
      `${BASE_URI}location/getcities?state_id=${stateId}`
    );
    return res.data;
  },

  async getMapLocation(mapAddress: string) {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${mapAddress}&limit=10&format=json`
    );
    return res.data;
  },

  async saveSocialLinks(io: any) {
    const res = await axios.post(`${BASE_URI}api/company/savesocial`, io);
    return res.data;
  },

  // async getSocialLinksData() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`${BASE_URI}/api/company/fetchsocial/${AuthService.getUserEmail()}?token=${token}`);
  //   return res.data;
  // },

  // async getAdminSiteSettingInfo() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`${BASE_URI}api/sitesetting/getsetting?token=${token}`);
  //   return res.data;
  // },

  async getPublicSiteSettingInfo() {
    const res = await axios.get(`${BASE_URI}api/sitesetting/getpublicsetting`);
    return res.data;
  },

  async saveAdminSiteSetting(io: any) {
    const res = await axios.post(`${BASE_URI}api/sitesetting/savesetting`, io);
    return res.data;
  },

  // async getProductPageDetails() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`${BASE_URI}/api/product/getproducts/${AuthService.getUserEmail()}?token=${token}`);
  //   return res.data;
  // },

  async saveProductPageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/product/createproduct`, io);
    return res.data;
  },

  async saveClientPageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/client/createclient`, io);
    return res.data;
  },

  async saveAdminThemeInfo(io: any) {
    const res = await axios.post(`${BASE_URI}api/theme/createtheme`, io);
    return res.data;
  },

  // async getServicePageDetails() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/service/getservice/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  // async getDashboardCounts() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`${BASE_URI}api/user/getcompanydashdata/${AuthService.getUserEmail()}?token=${token}`);
  //   return res.data;
  // },

  // async getClientsPageDetails() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/client/getclients/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  // async getAdminThemes() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`${BASE_URI}api/theme/getadminthemes?token=${token}`);
  //   return res.data;
  // },

  async saveServicePageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/service/createservice`, io);
    return res.data;
  },

  // async getImageGalleryDetails() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/portfolio/getportfolio/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  // async getTestimonialList() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/testimonial/gettestimonial/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  // async getEnquiryPageDetails() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/inquiry/getinquiry/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  // async getCompanyDetailsPageData() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(
  //     `${BASE_URI}api/company/getcompany/${AuthService.getUserEmail()}?token=${token}`
  //   );
  //   return res.data;
  // },

  async getCompanyDetailsForOwner() {
    let email: any = localStorage.getItem("localEmail");
    const res = await axios.get(
      `${BASE_URI}api/company/getcompanydetails/${email}`
    );
    return res.data;
  },

  // async getCompanyDetailsPageData() {
  //   let token: any = AuthService.getToken();
  //   const res = await axios.get(`/api/company/getcompany?user=${AuthService.getUserEmail()}`,{
  //     headers:{
  //       token: token
  //     }
  //   });
  //   return res.data;
  // },

};

export default ApiService;
