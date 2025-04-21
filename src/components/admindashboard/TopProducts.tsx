import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { nanoid } from 'nanoid'
// CUSTOM COMPONENTS
import Scrollbar from '../../components/scrollbar'
import { Paragraph, Small, Span } from '../../components/typography'
import { FlexBetween, FlexBox } from '../../components/flexbox'
// CUSTOM UTILS METHODS
import { currency, format } from '../../utils/currency'
// COMMON DASHBOARD RELATED COMPONENT
import { BodyTableCell, HeadTableCell } from './_common'
import { product_url } from '../../config/config'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TopProducts({products}: any) {
  const {t, i18n} = useTranslation();
  return (
    <Card>
      <FlexBetween p={3}>
        <Paragraph fontSize={18} fontWeight={500}>
          {t("top_products")}
        </Paragraph>
        <NavLink to="/admindashboard/products">
          <Span fontSize={14} color="primary.main">
            {t('view_all')}
          </Span>
        </NavLink>
      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>{t("product_name_cap")}</HeadTableCell>
              <HeadTableCell>{t("price_cap")}</HeadTableCell>
              <HeadTableCell align="center">{t("sold_cap")}</HeadTableCell>
              <HeadTableCell align="center">{t("sales_cap")}</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products && products.length > 0 && products.map((item: any, index: number) => (
              <TableRow key={index}>
                <BodyTableCell>
                  <FlexBox gap={1}>
                    <Avatar variant="rounded" src={`${product_url}/${item.image}`} />
                    <div>
                      <Paragraph color="text.primary" fontWeight={500}>
                        {i18n.language === "en" ? item.nameEn : item.nameEs}
                      </Paragraph>
                      <Small>{i18n.language === "en" ? item.categoryEn : item.categoryEs }</Small>
                    </div>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell>{currency(item.price)}</BodyTableCell>
                <BodyTableCell align="center">{format(item.quantitySold)} pcs</BodyTableCell>

                <BodyTableCell align="center">
                  <Paragraph color="text.primary" fontWeight={500}>
                    {currency(item.price*item.quantitySold)}
                  </Paragraph>
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  )
}
