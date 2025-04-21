import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
// MUI
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
// MUI ICON COMPONENTS
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
// CUSTOM COMPONENTS
import FlexBox from '../flexbox/FlexBox'
import { Paragraph } from '../typography'
import { TableMoreMenuItem, TableMoreMenu } from '../table'

// ==============================================================
type Order = {
  id: number;
  customer: any;
  date: Date
  name: string
  email: string
  status: string
  avatar: string
  invoiceId: string
  createdAt: string;
  payment: any;
  totalPrice: number;
}

interface InvoiceTableRowProps {
  order: Order
  isSelected: boolean
  handleDeleteInvoice: (id: number) => void
  handleSelectRow: (_: MouseEvent, name: number) => void
}
// ==============================================================

export default function InvoiceTableRow(props: InvoiceTableRowProps) {
  const { order, isSelected, handleDeleteInvoice, handleSelectRow } = props
  
  const navigate = useNavigate()
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleCloseOpenMenu = () => setOpenMenuEl(null)
 
  const getOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
        break;
      case "completed":
        return "success"
        break;
      case "canceled":
        return "error"
        break;
      case "refunded":
        return "info"
        break;
      case "shipped":
        return "info"
        break;
      default:
        return "secondary"
        break;
    }
  }

  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
        break;
      case "completed":
        return "success"
        break;
      case "failed":
        return "error"
        break;
      case "refunded":
        return "info"
        break;
      
      default:
        return "secondary"
        break;
    }
  }

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, order.id)}
        />
      </TableCell>
      <TableCell padding="normal">#{order.id}</TableCell>
      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
            <Paragraph fontSize={13}>{order.customer.firstName !== null && order.customer.lastName !== null ? order.customer.firstName + order.customer.lastName : order.customer.username }</Paragraph>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{order.customer.email}</TableCell>
      <TableCell padding="normal">{format(order.createdAt, 'MMM dd, yyyy')}</TableCell>

      <TableCell padding="normal">
      <Chip
          size="small"
          label={order.status}
          color={getOrderStatus(order.status)}
        />
      </TableCell>

      <TableCell padding="normal">
        <Chip
          size="small"
          label={order.payment[0].status}
          color={getPaymentStatus(order.payment[0].status)}
        />
      </TableCell>

      <TableCell padding="normal">
        <Paragraph>
          {order.totalPrice}$
        </Paragraph>
      </TableCell>

      <TableCell padding="normal">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          <TableMoreMenuItem
            title="View"
            Icon={RemoveRedEye}
            handleClick={() => {
              handleCloseOpenMenu()
              navigate(`/dashboard/order-details?id=${order.id}`)
            }}
          />
          <TableMoreMenuItem
            title="Cancel"
            Icon={DeleteOutline}
            handleClick={() => {
              handleCloseOpenMenu()
              handleDeleteInvoice(order.id)
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
