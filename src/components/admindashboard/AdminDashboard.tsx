import { Container } from "@mui/material"
import Grid from '@mui/material/Grid2';
import InfoCard from "../admindashboard/InfoCard";
import Transactions from "../admindashboard/Transactions";
import ProjectStatus from "../admindashboard/ProjectStatus";
import TopProducts from "../admindashboard/TopProducts";
import TopSeller from "../admindashboard/TopSeller";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import PaidIcon from '@mui/icons-material/Paid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { LoaderWithLogo } from "../loader";

export default function AdminDashboard() {
  
  const [ statistics, setStatistics ] = useState<any>({});
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    getAdminStat();
  }, [])

  const getAdminStat = async () => {
    try{
      let stats = await ApiService.getAdminStat();
      setStatistics(stats.data);
    }catch(error){
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }

  const CARD_LIST = [
    { amount: statistics.totalUsers, icon: PersonIcon,  title: 'total_users', color: 'warning', link: '/admindashboard/manage-users' },
    { amount: statistics.totalOrders, icon: BallotIcon, title: 'total_orders', color: 'info', link: '/admindashboard/orders' },
    { amount: statistics.totalVendors, icon: PeopleAltIcon, title: 'total_vendors', color: 'error', link: '/admindashboard/manage-vendors' },
    { amount: `MX$ ${statistics.totalRevenue}`, icon: PaidIcon, title: 'total_earnings', color: 'primary', link: '' },
    { amount: statistics.totalVisitors, icon: HowToRegIcon, title: 'total_visitors', color: 'secondary', link: '/admindashboard/manage-visitors' },
  ]
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, px:'0 !important' }}>
      {
        !loading ?
        <Grid container spacing={3}>
          {/*Summry*/}
          <Grid container spacing={3} size={12}>
            {CARD_LIST.map((item, index) => (
                <Grid key={index} size={{  xs: 6, md: 4, lg: 4 }}>
                  <InfoCard
                    // trend={item.trend}
                    icon={item.icon}
                    color={item.color}
                    title={item.title}
                    amount={item.amount}
                    link={item.link}
                    // percentage={item.percentage}
                  />
                </Grid>
              ))}
            </Grid>

          {/* TRANSACTION CHART CARD */}
          <Grid size={{ md: 8, xs: 12 }}>
            <Transactions monthlyVendor={statistics.monthlyVendorCount} monthlyUser={statistics.monthlyUserCount} />
          </Grid>

          {/* YOUR CARD  */}
          <Grid size={{ md: 4, xs: 12 }}>
            <ProjectStatus productStatus={statistics.productStatus} />
          </Grid>

            {/* TOP PRODUCTS CARD */}
            <Grid size={{ md: 8, xs: 12 }}>
            <TopProducts products={statistics.topProducts} />
          </Grid>

          {/* TOP SELLER CARD */}
          <Grid size={{ md: 4, xs: 12 }}>
            <TopSeller topVendors={statistics.topVendors} />
          </Grid>
        </Grid>
        : 
        <LoaderWithLogo />
      }
    </Container>
  )
}