import { useState } from 'react'
// MUI
import Card from '@mui/material/Card'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import styled from '@mui/material/styles/styled'
import useTheme from '@mui/material/styles/useTheme'

import { useTranslation } from 'react-i18next'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import merge from 'lodash.merge'
// CUSTOM COMPONENT
import { H6 } from '../typography'
// CUSTOM UTILS METHODS
import { currency, formatK } from '../../utils/currency'
import { baseChartOptions } from '../../utils/baseChartOptions'

// STYLED COMPONENTS
const StyledRoot = styled(Card)(({ theme }) => ({
  height: '100%',
  '& .title': {
    gap: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem 0 1.5rem',
  },
  '& .chart': { paddingLeft: '.5rem' },
  '& .MuiOutlinedInput-input.MuiInputBase-input': { padding: '7px 14px' },
}))

export default function EarningReport({reports, orderYears}: any) {
  const { t } = useTranslation()

  // REACT CHART CATEGORIES
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
    t('Dec'),
  ]

  let maxValue = 0;
  reports && reports.length > 0 && reports.map((data: any) => {
    if(data > maxValue){
      maxValue = data;
    }
  })
  const theme = useTheme()
  const [seriesData, setSeriesData] = useState(2025)

  // REACT CHART DATA
const chartData = [
  {
    title: '2025',
    data: [
      {
        name: t("earnings"),
        data: reports
      },
    ],
  }
]

  const handleChangeSeriesData = (event: SelectChangeEvent) => {
    setSeriesData(parseInt(event.target.value))
  }

  // REACT CHART DATA SERIES
  const chartSeries = chartData.find((item) => parseInt(item.title) === seriesData)?.data

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(theme), {
    stroke: { show: false },
    colors: [theme.palette.primary.main],
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    xaxis: {
      categories: chartCategories,
      labels: {
        show: true,
        style: { fontWeight: 500, colors: theme.palette.text.secondary },
      },
    },
    yaxis: {
      min: 0,
      max: maxValue*2,
      show: true,
      tickAmount: 4,
      labels: {
        formatter: (value) => formatK(value),
        style: { colors: theme.palette.text.secondary, fontWeight: 500 },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          return `${w.globals.labels[dataPointIndex]} : ${currency(val)}`
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
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
        borderRadiusApplication: 'around',
      },
    },
    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: { height: 350 },
          plotOptions: { bar: { horizontal: true } },
          xaxis: {
            min: 0,
            max: maxValue*2,
            tickAmount: 4,
            labels: {
              show: true,
              formatter: (value: number) => formatK(Math.floor(value)),
              style: { colors: theme.palette.text.secondary, fontWeight: 500 },
            },
          },
          yaxis: {
            show: true,
            labels: { style: { colors: theme.palette.text.secondary, fontWeight: 500 } },
          },
        },
      },
    ],
  } as ApexOptions)

  return (
    <StyledRoot>
      <div className="title">
        <H6 fontSize={14}>{t('earnings_report')}</H6>

        <Select size="small" value={seriesData.toString()} onChange={handleChangeSeriesData}>
          {
            orderYears && orderYears.length > 0 && orderYears.map((year: any) =>
              <MenuItem value={year}>{year}</MenuItem>
            )
          }
        </Select>
      </div>

      <div className="chart">
        <Chart type="bar" height={210} options={chartOptions} series={chartSeries} />
      </div>
    </StyledRoot>
  )
}
