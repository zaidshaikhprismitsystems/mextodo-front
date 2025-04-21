import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import styled from '@mui/material/styles/styled'

import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import FlexBox from '../flexbox/FlexBox'
import { H6, Paragraph, Span } from '../typography'
import { FlexBetween } from '../flexbox'
import { NavLink } from 'react-router-dom'
// CUSTOM DATA
export const PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air max 170',
    image: '/static/products/shoe-1.png',
    date: new Date(),
    price: 654,
    category: 'Shoes',
    status: 'Available',
    brand: 'Nike',
  },
  {
    id: 2,
    name: 'Cactus Plant',
    image: '/static/products/bonsai.png',
    date: new Date(),
    price: 654,
    category: 'Tree',
    status: 'Available',
    brand: 'Bonsai',
  },
  {
    id: 3,
    name: 'Minimal Pot',
    image: '/static/products/airbud.png',
    date: new Date(),
    price: 654,
    category: 'Accessories',
    status: 'Out of Stock',
    brand: 'Ikea',
  },
  {
    id: 4,
    name: 'Adidas Blaze',
    image: '/static/products/shoe-2.png',
    date: new Date(),
    price: 654,
    category: 'Shoes',
    status: 'Out of Stock',
    brand: 'Adidas',
  },
]

// STYLED COMPONENTS
const HeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  paddingBottom: '.5rem',
  color: theme.palette.text.secondary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': { paddingLeft: '1.5rem' },
}))

const BodyCell = styled(TableCell)(() => ({
  paddingBlock: '.75rem',
  '&:first-of-type': { paddingLeft: '1.5rem' },
}))

const BodyTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': { borderBottom: 'none' },
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeInOut,
  }),
  ':hover': { backgroundColor: theme.palette.action.hover },
}))

export default function PopularProducts({popularProducts}: any) {
  const { t } = useTranslation()
  
  const getColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
        break;
      case "approved":
        return "primary"
        break;
      case "rejected":
        return "error"
        break;
      default:
        return "default"
        break;
    }
  }

  return (
    <Card sx={{height: "100%"}}>

      <FlexBetween  mx={3} mt={3} mb={2}>
        <H6 fontSize={14}>
          {t('popular_products')}
        </H6>

        <NavLink to="/dashboard/products">
          <Span fontSize={14} color="primary.main">
            {t('view_all')}
          </Span>
        </NavLink>
      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <HeadCell>{t("product")}</HeadCell>
              <HeadCell>{t("date")}</HeadCell>
              <HeadCell>{t("category")}</HeadCell>
              <HeadCell>{t("quantity_sold")}</HeadCell>
              <HeadCell>{t("price")}</HeadCell>
              <HeadCell align="center">{t("status")}</HeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {popularProducts && popularProducts.length > 0 ? popularProducts.map((item: any) => (
              <BodyTableRow key={item.id}>
                <BodyCell>
                  <FlexBox alignItems="center" gap={2}>
                    <Avatar src={item.image} alt={item.nameEn} variant="rounded" />
                    <Paragraph color="text.primary" fontWeight={500}>
                      {item.nameEn}
                    </Paragraph>
                  </FlexBox>
                </BodyCell>

                <BodyCell>{format(item.date, 'MMM dd, yyyy')}</BodyCell>
                <BodyCell>{item.categoryEn}</BodyCell>
                <BodyCell>{item.quantitySold}</BodyCell>
                <BodyCell>${item.price}</BodyCell>

                <BodyCell align="center">
                  <Chip
                    size="small"
                    label={t(item.status)}
                    color={getColor(item.status)}
                  />
                </BodyCell>
              </BodyTableRow>
            ))
            : 
            <BodyTableRow>
              <BodyCell sx={{ textAlign: "center", fontWeight: "bold" }} colSpan={6}>
                No Products In List
              </BodyCell>
            </BodyTableRow>
          }
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  )
}
