// MUI
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import styled from '@mui/material/styles/styled'
import { alpha } from '@mui/system/colorManipulator'
// CUSTOM COMPONENTS
import Scrollbar from '../scrollbar'
import FlexBox from '../flexbox/FlexBox'
import { H6, Paragraph } from '../typography'
import { useTranslation } from 'react-i18next'

// STYLED COMPONENTS
const HeadTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  paddingLeft:0,
  paddingRight:0,
  paddingTop:0,
  paddingBottom: 8,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '&:last-of-type': { textAlign: 'right' },
}))

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
  padding: '0.5rem 0',
  '&:first-of-type': { minWidth: 220 },
  '&:nth-of-type(2)': { minWidth: 140 },
  '&:last-of-type': { textAlign: 'right' },
}))

export default function CustomerList({topCustomers}: any) {
  const { t } = useTranslation();
  return (
    <Card sx={{p:3, height:'100%' }}>
      <H6 mb={3} fontSize={14}>
        {t("customer_list")}
      </H6>

      <Scrollbar autoHide={false}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadTableCell>{t("name")}</HeadTableCell>
              <HeadTableCell>{t("username")}</HeadTableCell>
              <HeadTableCell>{t("email")}</HeadTableCell>
              {/* <HeadTableCell>Role</HeadTableCell> */}
              {/* <HeadTableCell>Actions</HeadTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {topCustomers && topCustomers.length > 0 ? topCustomers.map((customer: any, index: number) => (
              <TableRow key={index}>
                <BodyTableCell>
                  <FlexBox alignItems="center" gap={1}>
                    <Avatar src={customer.customerUsername} alt="user" />
                    <Paragraph color="grey.800" fontWeight={500}>
                      {customer.customerName}
                    </Paragraph>
                  </FlexBox>
                </BodyTableCell>
                <BodyTableCell>{customer.customerUsername}</BodyTableCell>
                <BodyTableCell>{customer.customerEmail}</BodyTableCell>
              </TableRow>
            ))
            :
            <TableRow>
              <BodyTableCell sx={{ textAlign: "center", fontWeight: "bold" }} colSpan={3}>
                No Products In List
              </BodyTableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  )
}
