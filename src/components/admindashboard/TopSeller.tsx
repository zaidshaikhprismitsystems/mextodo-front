import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { nanoid } from 'nanoid'
// CUSTOM COMPONENTS
import { Paragraph, Small, Span } from '../../components/typography'
import { FlexBetween, FlexBox } from '../../components/flexbox'
// CUSTOM UTILS METHODS
import { currency, format } from '../../utils/currency'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TopSeller({topVendors}: any) {

  const { t } = useTranslation();
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <FlexBetween>
        <Paragraph fontSize={18} fontWeight={500}>
          {t("top_seller")}
        </Paragraph>

        <NavLink to="/admindashboard/vendors">
          <Span fontSize={14} color="primary.main">
            {t('view_all')}
          </Span>
        </NavLink>
      </FlexBetween>

      <FlexBetween mt={3} mb={2}>
        <Paragraph color="text.secondary" fontWeight={500}>
          {t("profile")}
        </Paragraph>
        <Paragraph color="text.secondary" fontWeight={500}>
          {t("items_sold")}
        </Paragraph>
      </FlexBetween>

      <Stack spacing={2.5}>
        {topVendors.map((item: any) => (
          <FlexBetween key={item.id}>
            <FlexBox gap={1.5} alignItems="center">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar alt={item.vendorName} src={item.vendorName} sx={{ width: 45, height: 45 }} />
              </Badge>

              <div>
                <Paragraph lineHeight={1} fontWeight={600}>
                  {item.vendorName}
                </Paragraph>
                <Small fontWeight={500} color="text.secondary">
                  {currency(item.totalSalesAmount)}
                </Small>
              </div>
            </FlexBox>

            <Paragraph fontWeight={500} color="text.secondary">
              {format(item.totalQuantitySold)}
            </Paragraph>
          </FlexBetween>
        ))}
      </Stack>
    </Card>
  )
}
