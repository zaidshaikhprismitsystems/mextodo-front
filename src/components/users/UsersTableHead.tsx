import { ChangeEvent, MouseEvent } from 'react'
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
interface ProductTableHeadProps {
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  numSelected: number
  onSelectAllRows: (event: ChangeEvent<HTMLInputElement>) => void
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void
}
// ==============================================================

export default function TicketsTableHead(props: ProductTableHeadProps) {

  const { t } = useTranslation();
  const { onSelectAllRows, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const headCells = [
    { id: 'user', numeric: false, disablePadding: false, label: t("user") },
    { id: 'email', numeric: true, disablePadding: false, label: t("email") },
    { id: 'username', numeric: true, disablePadding: false, label: t("username") },
    { id: 'isVerified', numeric: true, disablePadding: false, label: t("is_verified") },
    { id: 'enable_disable', numeric: true, disablePadding: false, label: t("enable_disable") },
    { id: 'createdAt', numeric: true, disablePadding: false, label: t("created_at") },
    { id: '' },
  ]
  
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
