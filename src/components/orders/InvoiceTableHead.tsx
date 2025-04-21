import { MouseEvent, ChangeEvent } from 'react'
// MUI
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import visuallyHidden from '@mui/utils/visuallyHidden'
// CUSTOM COMPONENT
import { Span } from '../typography'
// CUSTOM UTILS METHOD
import { isDark } from '../../utils/constants'
import { useTranslation } from 'react-i18next'

// ==============================================================
interface InvoiceTableHeadProps {
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  numSelected: number
  onSelectAllRows: (event: ChangeEvent<HTMLInputElement>) => void
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void
}
export default function InvoiceTableHead(props: InvoiceTableHeadProps) {

  const { t } = useTranslation();
  
  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: t("id") },
    { id: 'name', numeric: true, disablePadding: false, label: t("name") },
    { id: 'email', numeric: true, disablePadding: false, label: t("email") },
    { id: 'date', numeric: true, disablePadding: false, label: t("created_date") },
    { id: 'order-status', numeric: true, disablePadding: false, label: t("order_status") },
    { id: 'payment-status', numeric: true, disablePadding: false, label: t("payment_status") },
    { id: 'amount', numeric: true, disablePadding: false, label: t("amount") },
    { id: '', numeric: true, disablePadding: false, label: t("action") },
  ];
  
  
  const { order, orderBy, onRequestSort, rowCount, numSelected, onSelectAllRows } = props

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ backgroundColor: (theme) => (isDark(theme) ? 'grey.700' : 'grey.100') }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            onChange={onSelectAllRows}
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Span sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
