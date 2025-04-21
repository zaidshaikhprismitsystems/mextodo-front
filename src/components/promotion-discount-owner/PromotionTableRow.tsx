import { MouseEvent, useState } from 'react'
import { format } from 'date-fns'
// MUI
import Chip from '@mui/material/Chip'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
// ICONS
import Edit from '@mui/icons-material/Edit'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
// COMPONENTS
import FlexBox from '../flexbox/FlexBox'
import { Paragraph } from '../typography'
import { TableMoreMenuItem, TableMoreMenu } from '../table'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from 'react-i18next'
import { ConfirmToast } from '../confirm-toast'

interface RowProps {
  promotion: any
  isSelected: boolean
  handleDeletePromotion: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  handleViewOpen: (promotion: any) => void
  handleEditOpen: (promotion: any) => void
}

export default function VendorCouponTableRow({
  promotion,
  isSelected,
  handleSelectRow,
  handleDeletePromotion,
  handleViewOpen,
  handleEditOpen
}: RowProps) {
  const { t } = useTranslation()
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleCloseOpenMenu = () => setOpenMenuEl(null)

  const handleConfirm = (id: number) => {
    handleDeletePromotion(id)
  }

  const handleCancel = () => {
    toast.dismiss()
  }

  const showConfirmation = (message: string, id: number) => {
    toast(
      <ConfirmToast
        message={message}
        onConfirm={() => handleConfirm(id)}
        onCancel={handleCancel}
      />,
      { autoClose: false, closeOnClick: false }
    )
  }

  const getColor = (status: boolean) => {
    switch (status) {
      case true:
        return "primary"
      case false:
        return "error"
      default:
        return "default"
    }
  }

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, promotion.id)}
        />
      </TableCell>

      <TableCell>
        <Paragraph
          fontWeight={500}
          color="text.primary"
          sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: 'capitalize' }}
        >
          {promotion.code}
        </Paragraph>
      </TableCell>

      <TableCell>{promotion.description}</TableCell>

      <TableCell>{promotion.discountType}</TableCell>

      <TableCell>{promotion.discountValue}</TableCell>

      <TableCell>
        <Chip
          sx={{ textTransform: 'capitalize' }}
          label={promotion.isActive ? t("active") : t("inactive")}
          color={getColor(promotion.isActive)}
        />
      </TableCell>

      <TableCell>
        {format(new Date(promotion.startDate), 'dd MMM yyyy HH:mm')}
      </TableCell>

      <TableCell>
        {format(new Date(promotion.endDate), 'dd MMM yyyy HH:mm')}
      </TableCell>

      <TableCell>
        {format(new Date(promotion.createdAt), 'dd MMM yyyy HH:mm')}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          {/* Uncomment if view functionality is used
          <TableMoreMenuItem
            Icon={RemoveRedEye}
            title={t("view")}
            handleClick={() => {
              handleCloseOpenMenu()
              handleViewOpen(promotion)
            }}
          /> */}
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu()
              handleEditOpen(promotion)
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              showConfirmation(t("are_you_sure"), promotion.id)
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
