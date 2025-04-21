import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import useTheme from '@mui/material/styles/useTheme'
import merge from 'lodash.merge'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import { FlexBetween } from '../flexbox'
import { Paragraph } from '../../components/typography'
// CUSTOM UTILS METHOD
import { baseChartOptions } from '../../utils/baseChartOptions'
import { useTranslation } from 'react-i18next'

export default function Transactions({ type = 'bar', monthlyVendor, monthlyUser }: any) {
  const theme = useTheme()
  const {t} = useTranslation();
  
  // REACT CHART CATEGORIES LABEL
  const chartCategories = [
    t('Jan'),
    t('Feb'),
    t('Mar'),
    t('Apr'),
    t('May'),
    t('Jun'),
    t('Jul'),
    t('Aug'),
    t('Sep'),
    t('Oct'),
    t('Nov'),
    t('Dec')
  ]


  // REACT CHART DATA SERIES
  const chartSeries = [
    {
      name: t('user'),
      data: monthlyUser,
    },
    {
      name: t('vendor'),
      data: monthlyVendor,
    },
  ]

  let maxUser = 0;
  monthlyUser.map((data: any) => {
    if(data > maxUser){
      maxUser = data
    }
  })

  let maxVendor = 0;
  monthlyVendor.map((data: any) => {
    if(data > maxVendor){
      maxVendor = data
    }
  })

  let maxVal = maxVendor > maxUser ? maxVendor : maxUser

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(theme), {
    colors: [theme.palette.primary.main, theme.palette.grey[200]],
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },

    xaxis: {
      crosshairs: { show: false },
      categories: chartCategories,
      labels: {
        show: true,
        style: { colors: theme.palette.text.secondary },
      },
    },

    yaxis: {
      min: 0,
      show: true,
      max: maxVal*2,
      tickAmount: 5,
      labels: {
        formatter: (value) => value.toString(),
        style: { colors: theme.palette.text.secondary },
      },
    },

    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `$${val}` },
      theme: "dark",
      fillSeriesColor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const seriesColor = w.config.colors[seriesIndex];
        const seriesName = w.globals.seriesNames[seriesIndex];
        return `<div style="padding:8px; border-radius:5px; color:#000; font-size:14px;">
                  <span style="display:inline-block; width:10px; height:10px; background:${seriesColor}; border-radius:50%; margin-right:5px;"></span><strong>${seriesName}</strong>: ${series[seriesIndex][dataPointIndex]}
                </div>`;
      },
    },

    chart: { stacked: false },
    stroke: {
      show: true,
      ...(type === 'bar' && { width: 3, colors: ['transparent'] }),
    },

    legend: {
      show: true,
      position: 'top',
      fontSize: '14px',
      itemMargin: { horizontal: 12 },
      fontFamily: theme.typography.fontFamily,
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
      markers: { shape: 'circle', strokeWidth: 0, size: 6, offsetX: -2 },
    },

    ...(type === 'bar' && {
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '43%',
          borderRadiusApplication: 'end',
        },
      },

      responsive: [
        {
          breakpoint: 550,
          options: {
            chart: { height: 450 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: {
              min: 0,
              show: true,
              max: maxVal*2,
              tickAmount: 5,
              labels: {
                formatter: (value: number) => value.toString(),
                style: { colors: theme.palette.text.secondary },
              },
            },
            yaxis: {
              show: true,
              labels: {
                style: {
                  fontWeight: 500,
                  colors: theme.palette.text.secondary,
                  fontFamily: theme.typography.fontFamily,
                },
              },
            },
          },
        },
      ],
    }),
  } as ApexOptions)


  return (
    <Card>
      <FlexBetween mb={2} px={3} pt={3}>
        <Paragraph fontSize={18} fontWeight={500}>
          {t('user_vendor_stats')}
        </Paragraph>
      </FlexBetween>

      <Box px={1}>
        <Chart type={type} height={275} options={chartOptions} series={chartSeries} />
      </Box>
    </Card>
  )
}
