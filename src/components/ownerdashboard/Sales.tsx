import Card from '@mui/material/Card'
import useTheme from '@mui/material/styles/useTheme'
import merge from 'lodash.merge'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
// CUSTOM COMPONENTS
import { Paragraph } from '../typography'
import FlexBetween from '../flexbox/FlexBetween'
// CUSTOM UTILS METHOD
import { baseChartOptions } from '../..//utils/baseChartOptions'
import { useTranslation } from 'react-i18next'

export default function Sales({earningsByDay}: any) {
  
  const theme = useTheme()
  const { t } = useTranslation();

  let maxValue = 0;
  earningsByDay && earningsByDay.length > 0 && earningsByDay.map((data: any) => {
    if(data > maxValue){
      maxValue = data
    }
  })
  
  // REACT CHART CATEGORIES LABEL
  const chartCategories = [t('SAT'), t('SUN'), t('MON'), t('TUE'), t('WED'), t('THU'), t('FRI')]

  // REACT CHART DATA SERIES
  const chartSeries = [
    {
      name: t("sales"),
      data: earningsByDay,
    },
  ]

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(theme), {
    stroke: { width: 0 },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    colors: [theme.palette.primary.main, theme.palette.divider],
    xaxis: {
      categories: chartCategories,
      labels: {
        show: true,
        style: { colors: theme.palette.text.secondary },
      },
    },
    yaxis: {
      min: 0,
      show: true,
      max: maxValue*2,
      tickAmount: 4,
      labels: {
        formatter: (value) => value.toString(),
        style: { colors: theme.palette.text.secondary },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '17%',
        borderRadiusApplication: 'end',
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          return `${w.globals.labels[dataPointIndex]} : ${val}`
        },
      },
      theme: "dark",
      fillSeriesColor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const seriesColor = w.config.colors[seriesIndex];
        const seriesName = w.globals.seriesNames[seriesIndex];
        return `<div style="padding:8px; border-radius:5px; color:#000; font-size:14px;">
                  <span style="display:inline-block; width:10px; height:10px; background:${seriesColor}; border-radius:50%; margin-right:5px;"></span><strong>${seriesName}</strong>: MX$ ${series[seriesIndex][dataPointIndex]}
                </div>`;
      },
    },
  } as ApexOptions)

  return (
    <Card sx={{ pt: 3, px: 2 }}>
      <FlexBetween px={2}>
        <Paragraph fontSize={18} fontWeight={500}>
          {t("sales")}
        </Paragraph>
      </FlexBetween>

      <Chart type="bar" height={315} series={chartSeries} options={chartOptions} />
    </Card>
  )
}
