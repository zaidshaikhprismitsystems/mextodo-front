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
interface AttributesTableHeadProps {
  entity: string
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  numSelected: number
  onSelectAllRows: (event: ChangeEvent<HTMLInputElement>) => void
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void
}
// ==============================================================

export default function AttributesTableHead(props: AttributesTableHeadProps) {

  const { t } = useTranslation();
  const { entity, onSelectAllRows, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  let headCells: any = [];

  if(entity === 'users' || entity === 'owners'){
    headCells.push(
    { id: 'name', numeric: false, disablePadding: false, label: t("name") },
    { id: 'username', numeric: true, disablePadding: false, label: t("username") },
    { id: 'status', numeric: false, disablePadding: false, label: t("status") },
    { id: 'createdAt', numeric: true, disablePadding: false, label: t("created_at") }
    )
  }

  if(entity === 'products'){
    headCells.push(
    // { id: 'title', numeric: false, disablePadding: false, label: t("title") },
    { id: 'product', numeric: false, disablePadding: false, label: t("product") },
    { id: 'category', numeric: false, disablePadding: false, label: t("category") },
    { id: 'status', numeric: true, disablePadding: false, label: t("status") },
    // { id: 'price', numeric: true, disablePadding: false, label: t("price") },
    { id: 'createdAt', numeric: true, disablePadding: false, label: t("created_at") }
    )
  }

  if(entity === 'orders'){
    headCells.push(
    { id: 'user name', numeric: false, disablePadding: false, label: t("user") },
    { id: 'vendor', numeric: false, disablePadding: false, label: t("vendor") },
    { id: 'price', numeric: true, disablePadding: false, label: t("price") },
    { id: 'status', numeric: false, disablePadding: false, label: t("status") },
    { id: 'createdAt', numeric: true, disablePadding: false, label: t("created_at") }
    )
  }
  
  return (
    <TableHead sx={{ backgroundColor: (theme) => (isDark(theme) ? 'grey.700' : 'grey.100') }}>
      <TableRow>
        {headCells.map((headCell: any) => (
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
