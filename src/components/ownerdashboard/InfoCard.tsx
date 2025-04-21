import Card from '@mui/material/Card'
import styled from '@mui/material/styles/styled'
import { useTranslation } from 'react-i18next'
// CUSTOM COMPONENTS
import { H6, Paragraph } from '../typography'
import Icon from '@mui/material/Icon'
import FlexBetween from '../flexbox/FlexBetween'
// STYLED COMPONENTS
const StyledRoot = styled(Card)(() => ({
  padding: '1rem 1.5rem',
  height: '100%',
  display: 'flex',
  flexDirection:'column',
  alignItems: 'flex-start',
  '& .analytics': { gap: 4, display: 'flex', alignItems: 'center' },
}))

interface Props {
  title: string
  color: string
  icon: any
  // percentage: number
  amount: number | string
  showCurrency: boolean
  // trend?: 'up' | 'down' | string
}


const LisItemIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: string }>(({ theme, type }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  ...(type === 'info' && { backgroundColor: theme.palette.info.main }),
  ...(type === 'error' && { backgroundColor: theme.palette.error.main }),
  ...(type === 'primary' && { backgroundColor: theme.palette.primary.main }),
  ...(type === 'warning' && { backgroundColor: theme.palette.warning.main }),
  ...(type === 'secondary' && { backgroundColor: theme.palette.text.secondary }),
}))

export default function InfoCard({ title, amount,color, icon, showCurrency }: Props) {
  const { t } = useTranslation()

  // const color = trend === 'up' ? 'success.main' : 'error.main'

  return (
    <StyledRoot>
      <FlexBetween sx={{gap:2, width:'100%' }}>
      <Paragraph color="text.secondary" fontWeight={500}>
        {t(title)}
      </Paragraph>

      <LisItemIcon  type={color}>
        <Icon component={icon} sx={{ fontSize: 30 }} />
      </LisItemIcon>
      
      </FlexBetween>

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
