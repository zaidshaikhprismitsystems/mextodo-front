import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box';
// CUSTOM COMPONENTS
import InfoCard from './InfoCard'
import RecentOrders from './RecentOrders'
import EarningReport from './EarningReport'
import CustomerReview from './CustomerReview'
import CustomerList from './CustomerList'
import Sales from './Sales'
import PopularProducts from './PopularProducts'
import { useEffect, useState } from 'react';
import ApiService from '../../services/apiServices/apiService';
import { useTranslation } from 'react-i18next';

// CUSTOM DATA
export const CARD_LIST = [
  { trend: 'up', title: 'Revenue', amount: 'MX$ 35,800', showCurrency: true, percentage: 10.23 },
  { trend: 'up', amount: 'MX$12,900', percentage: 20.4, title: 'Repeat Purchase', showCurrency: false },
  { trend: 'down', amount: 'MX$1,000', percentage: 10.23, title: 'Average Order value', showCurrency: true },
  { amount: 143, trend: 'down', percentage: 10.23, title: 'New Customers', showCurrency: false },
]

export default function OwnerDashboard() {

  const [ statistics, setStatistics ] = useState<any>({});
  const [ loading, setLoading ] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getOwnerStat();
  }, [])

  const getOwnerStat = async () => {
    try{
      let stats = await ApiService.getOwnerStat();
      setStatistics(stats.data);
    }catch(error){
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }
  
  const getTitle = (title: string) => {
    switch (title) {
      case "Revenue":
        return t("revenue")
        break;
      case "Total Products":
        return t("total_products")
        break;
      case "Average Order Value":
        return t("average_order_value")
        break;
      case "New Customers":
        return t("new_customers")
        break;
      default:
        break;
    }
  }

  let trendsData = !loading && Object.entries(statistics).length > 0 && statistics.trends.length > 0 && statistics.trends.map((data: any) => {
    return{
      amount: data.amount,
      // percentage: 0,
      title: getTitle(data.title),
      showCurrency: data.showCurrency
      // trend: "down"
    }
  })

  return (

    <Box sx={{pt:3, pb:4}}>
      <Grid container spacing={3}>
        {/* DIFFERENT ANALYTICS DATA */}
        
        <Grid container spacing={3} size={{ lg: 6, xs: 12 }}>
          {
            loading && Object.entries(statistics).length < 0 ? 
            CARD_LIST.map((item, index) => (
              <Grid key={index} size={{  xs: 6 }}>
                <InfoCard
                  // trend={item.trend}
                  title={item.title}
                  amount={item.amount}
                  showCurrency={item.showCurrency}
                  // percentage={item.percentage}
                />
              </Grid>
            ))
             :
             !loading && Object.entries(statistics).length > 0 && trendsData.map((item: any, index: number) => (
              <Grid key={index} size={{  xs: 6 }}>
                <InfoCard
                  // trend={item.trend}
                  title={item.title}
                  amount={item.amount}
                  showCurrency={item.showCurrency}
                  // percentage={item.percentage}
                />
              </Grid>
            ))
          }
        </Grid>

        {/* EARNING REPORT DATA VISUAL CHART */}
        <Grid size={{ lg: 6, xs: 12 }}>
          <EarningReport reports={statistics.earningsByMonth} orderYears={statistics.orderYears} />
        </Grid>

        {/* SALES CARD */}
        <Grid size={{lg: 8,  md: 7, xs: 12 }}>
          <Sales earningsByDay={statistics.earningsByDay}/>
        </Grid>

        {/* TOTAL CUSTOMER REVIEW CARD */}
        <Grid size={{lg: 4,  md: 5, xs: 12 }}>
          {
            !loading
            ?
            <CustomerReview avgRatting={statistics.averageRating} ratingCounts={statistics.ratingCounts} totalRattings={statistics.totalRattings} />
            : ''
          }
        </Grid>

        {/* POPULAR PRODUCTS DATA TABLE */}
        <Grid size={{ lg: 8, md: 12, xs: 12 }}>
          <PopularProducts popularProducts={statistics.popularProducts} />
        </Grid>

        {/* RECENT ORDER LIST CARD */}
        <Grid size={{ lg: 4, md: 12, xs: 12 }}>
          <RecentOrders recentOrders={statistics.recentOrders} />
        </Grid>

        {/* CUSTOMER LIST DATA TABLE */}
        <Grid size={12}>
          <CustomerList topCustomers={statistics.topCustomers} />
        </Grid>

      </Grid>
    </Box>
  )
}
