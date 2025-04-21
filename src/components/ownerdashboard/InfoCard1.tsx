import Card from '@mui/material/Card'
import styled from '@mui/material/styles/styled'
import { useTranslation } from 'react-i18next'
// CUSTOM COMPONENTS
import { H6, Paragraph } from '../typography'
// STYLED COMPONENTS
const StyledRoot = styled(Card)(() => ({
  padding: '1rem 1.5rem',
  height: '100%',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .analytics': { gap: 4, display: 'flex', alignItems: 'center' },
}))

interface Props {
  title: string
  // percentage: number
  amount: number | string
  showCurrency: boolean
  // trend?: 'up' | 'down' | string
}

export default function InfoCard({ title, amount, showCurrency }: Props) {
  const { t } = useTranslation()

  // const color = trend === 'up' ? 'success.main' : 'error.main'

  return (
    <StyledRoot>
      <Paragraph color="text.secondary" fontWeight={500}>
        {t(title)}
      </Paragraph>

      <H6 py={1} fontSize={24}>
        {showCurrency ? `MX$` : ''} {amount}
      </H6>

      {/* <Box className="analytics" sx={{mt:'auto'}}>
        <IconWrapper isDown={trend === 'down'}>
          {trend === 'up' && <ArrowUpward className="icon" sx={{ fontSize: 14, color }} />}
          {trend === 'down' && <ArrowDownward sx={{ fontSize: 14, color }} />}
        </IconWrapper>

        <Paragraph fontSize={12} fontWeight={600} color={color}>
          {trend === 'down' ? `-${percentage}%` : `+${percentage}%`}
        </Paragraph>
      </Box> */}
    </StyledRoot>
  )
}
