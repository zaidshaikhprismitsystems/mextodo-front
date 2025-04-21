import Card from '@mui/material/Card'
import styled from '@mui/material/styles/styled'
import { alpha } from '@mui/system/colorManipulator'
import { useTranslation } from 'react-i18next'
// MUI ICON COMPONENTS
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
// CUSTOM COMPONENTS
import { H6, Paragraph } from '../typography'

import Icon from '@mui/material/Icon';
import { FlexBetween, FlexBox } from '../flexbox'
import {Link} from 'react-router-dom'
// STYLED COMPONENTS
const StyledRoot = styled(Card)(() => ({
  padding: '1rem 1.5rem',
  '& .analytics': { gap: 4, display: 'flex', alignItems: 'center' },
}))

const IconWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDown',
})<{ isDown: boolean }>(({ theme, isDown }) => ({
  width: 20,
  height: 20,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  ...(isDown && { backgroundColor: alpha(theme.palette.error.main, 0.1) }),
}))

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

// ==============================================================
interface Props {
  title: string
  // percentage: number
  icon: any
  color: string
  amount: number | string
  link?: string
  // trend?: 'up' | 'down' | string
}
// ==============================================================

export default function InfoCard({ title, amount, color, icon, link }: Props) {
  const { t } = useTranslation()

  // const trendColor = trend === 'up' ? 'success' : 'error'

  return (
    <StyledRoot>
      <Link to={link ? link : ''}>
        <FlexBetween sx={{gap:2 }}>
        <Paragraph color="text.secondary" fontWeight={500}>
          {t(title)}
        </Paragraph>

        <LisItemIcon  type={color}>
          <Icon component={icon} sx={{ fontSize: 30 }} />
        </LisItemIcon>
        
        </FlexBetween>
        <H6 py={1} fontSize={24}>
          {amount}
        </H6>
      </Link>
    </StyledRoot>
  )
}