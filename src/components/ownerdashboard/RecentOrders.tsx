import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
// CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from '../flexbox'
import { H6, Paragraph, Span } from '../typography'
// CUSTOM DATA
import { product_url } from '../../config/config'
import { formatDistanceToNow } from 'date-fns';
import { Typography } from '@mui/material'

export const ORDER_LIST = [
  { name: 'Nike Air max 170', image: '/static/products/shoe-1.png', price: 654 },
  { name: 'Cactus Plant', image: '/static/products/bonsai.png', price: 654 },
  { name: 'Minimal Pot', image: '/static/products/airbud.png', price: 654 },
  { name: 'Adidas Blaze', image: '/static/products/shoe-2.png', price: 654 },
]

export default function RecentOrders({recentOrders}: any) {
  const { t, i18n } = useTranslation()

  return (
    <Card  sx={{p:3, height:'100%' }}>
      <FlexBetween pb={1}>
        <H6 fontSize={14}>{t("recent_orders")}</H6>

        <NavLink to="/dashboard/orders">
          <Span fontSize={14} color="primary.main">
            {t('view_all')}
          </Span>
        </NavLink>
      </FlexBetween>

      {recentOrders && recentOrders.length > 0 ? recentOrders.map((item: any, index: number) => (
        <FlexBetween key={index} mt={3.5} gap={1}>
          <FlexBox alignItems="center" gap={1.5}>
            <Avatar src={`${product_url}/${item.order_items[0].product.featuredImage}`} alt={item.name} sx={{ borderRadius: '15%' }} />

            <div>
              <H6 lineHeight={1} fontSize={14}>
                {i18n.language === "en" ? item.order_items[0].product.titleEn : item.order_items[0].product.titleSp}
              </H6>

              <Paragraph pt={0.6} fontSize={12} color="text.secondary">
                {formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </Paragraph>
            </div>
          </FlexBox>

          <Paragraph fontSize={12} fontWeight={600}>
            ${item.totalPrice}
          </Paragraph>
        </FlexBetween>
      ))
      :
      <Typography variant='body1' sx={{ textAlign: "center", fontWeight: "bold" }}>No Orders Found</Typography>
      }
    </Card>
  )
}
