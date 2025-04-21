import { Card, colors, useTheme } from '@mui/material'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { H6 } from '../../components/typography'
import { useTranslation } from 'react-i18next';

export default function ProjectStatus({productStatus}: any) {
 
  const {t} = useTranslation();
  const theme = useTheme()

  const getLangData = (data: any) => {
    switch (data) {
      case "pending":
        return t("pending")
        break;
      case "approved":
        return t("approved")
        break;
      case "rejected":
        return t("rejected")
        break;
      case "disabled":
        return t("disabled")
        break;
      default:
        break;
    }
  }

  const labels: any = Object.keys(productStatus).map((data: any) => {
    return getLangData(data)
  })

  const chartOptions: ApexOptions = {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ],
    chart: {
      stacked: false,
      background: 'none',
      sparkline: { enabled: true },
      fontFamily: theme.typography.fontFamily,
    },
    plotOptions: {
      pie: { donut: { size: '72%' } },
    },
    states: {
      //@ts-ignore
      normal: { filter: { type: 'none' } },
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    legend: {
      show: true,
      offsetY: 6,
      fontWeight: 500,
      position: 'bottom',
      itemMargin: { horizontal: 10 },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
    },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    labels: labels,
  }

  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <H6 fontSize={14} mb={4} textAlign="center">
        {t('product_status')}
      </H6>

      <Chart height={250} type="donut" options={chartOptions} series={productStatus && Object.values(productStatus)} />
    </Card>
  )
}
