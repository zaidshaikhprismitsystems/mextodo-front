import { MouseEvent, useState } from 'react'
import { format } from 'date-fns'
// MUI
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
// ICONS
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
// CUSTOM
import { Paragraph } from '../typography'
import { TableMoreMenu, TableMoreMenuItem } from '../table'
import { ConfirmToast } from '../confirm-toast'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// ==============================================================
// Optional fields handled safely inside component
interface RowProps {
  visitor: {
    id?: number
    ip?: string
    city?: string
    region?: string
    country?: string
    browser?: string
    device?: string
    visitCount?: number
    lastVisit?: string
    createdAt?: string
  }
}
// ==============================================================

export default function VisitorsTableRow({
  visitor
}: RowProps) {
  const { t } = useTranslation()
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleCloseOpenMenu = () => setOpenMenuEl(null)

  const getFormattedDate = (date?: string, withTime = false) => {
    try {
      return date ? format(new Date(date), withTime ? 'dd MMM yyyy HH:mm' : 'dd MMM yyyy') : '-'
    } catch {
      return '-'
    }
  }

  return (
    <TableRow hover>
    
      <TableCell padding="normal">
        <Paragraph fontWeight={500} color="text.primary">
          {visitor?.ip || '-'}
        </Paragraph>
      </TableCell>

      <TableCell padding="normal">
        {visitor?.country || '-'}
      </TableCell>

      <TableCell padding="normal">
        {visitor?.region || '-'}
      </TableCell>

      <TableCell padding="normal">
        {visitor?.city || '-'}
      </TableCell>

      <TableCell padding="normal">
        <Chip
          label={visitor?.browser || '-'}
          size="small"
          color={
            visitor?.browser === 'mobile'
              ? 'primary'
              : visitor?.browser === 'desktop'
              ? 'secondary'
              : 'default'
          }
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>

      <TableCell padding="normal">
        {visitor?.device ?? '-'}
      </TableCell>

      <TableCell padding="normal">
        {visitor?.visitCount ?? '-'}
      </TableCell>

      <TableCell padding="normal">
        {getFormattedDate(visitor?.lastVisit, true)}
      </TableCell>

      <TableCell padding="normal">
        {getFormattedDate(visitor?.createdAt)}
      </TableCell>

    </TableRow>
  )
}
