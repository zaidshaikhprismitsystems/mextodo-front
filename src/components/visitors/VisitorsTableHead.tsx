import { ChangeEvent, MouseEvent } from 'react'
// MUI
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import visuallyHidden from '@mui/utils/visuallyHidden'
// CUSTOM
import { Span } from '../typography'
import { isDark } from '../../utils/constants'
import { useTranslation } from 'react-i18next'

// ==============================================================
interface VisitorsTableHeadProps {
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  numSelected: number
  onSelectAllRows: (event: ChangeEvent<HTMLInputElement>) => void
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void
}
// ==============================================================

export default function VisitorsTableHead(props: VisitorsTableHeadProps) {
  const { t } = useTranslation()
  const { onSelectAllRows, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const headCells = [
    { id: 'ip', label: t('ip'), numeric: false },
    { id: 'country', label: t('country'), numeric: false },
    { id: 'region', label: t('region'), numeric: false },
    { id: 'city', label: t('city'), numeric: false },
    { id: 'browser', label: t('browser'), numeric: false },
    { id: 'device', label: t('device'), numeric: false },
    { id: 'visitCount', label: t('visits'), numeric: true },
    { id: 'lastVisit', label: t('last_visit'), numeric: true },
    { id: 'createdAt', label: t('created_at'), numeric: true }
  ]

  return (
    <TableHead sx={{ backgroundColor: (theme) => (isDark(theme) ? 'grey.700' : 'grey.100') }}>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
