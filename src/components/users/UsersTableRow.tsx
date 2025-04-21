import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
// MUI
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
// MUI ICON COMPONENTS
import Edit from '@mui/icons-material/Edit'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
// CUSTOM COMPONENTS
import FlexBox from '../flexbox/FlexBox'
import { Paragraph } from '../typography'
import { TableMoreMenuItem, TableMoreMenu } from '../table'
import { user_url } from "../../config/config"

interface RowProps {
  user: any
  isSelected: boolean
  handleDelete: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (product: any) => void
  hanleEditOpen: (product: any) => void
}

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'
import { ConfirmToast } from '../confirm-toast'

export default function TicketsTableRow({
  user,
  isSelected,
  handleSelectRow,
  handleDelete,
  hanleViewOpen,
  hanleEditOpen
}: RowProps) {

  const { t } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleConfirm = (id: number) => {
    handleDelete(id);
  }

  const showConfirmation = (message: string, id: number) => {
    toast(
      <ConfirmToast 
        message={message} 
        onConfirm={() => handleConfirm(id)} 
        onCancel={handleCancel} 
      />, 
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleCancel = () => {
    alert("Cancelled!");
  }

  const handleCloseOpenMenu = () => setOpenMenuEl(null)

  const getColor = (status: boolean) => {
    switch (status) {
      case true:
        return "primary"
        break;
      case false:
        return "error"
        break;
      default:
        return "default"
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
          onClick={(event) => handleSelectRow(event, user.id)}
        />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar
            variant="rounded"
            alt={user?.image}
            src={`${user_url}/${user?.image}`}
            sx={{ width: 50, height: 50 }}
          />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
            >
              {user?.firstName || user?.lastName ? `${user?.firstName} ${user?.lastName}` : `User` }
            </Paragraph>
            {/* <Paragraph fontSize={13}>
              { user?.email }
            </Paragraph> */}
          </div>
        </FlexBox>
      </TableCell>


      <TableCell padding="normal">{ user?.email }</TableCell>

      <TableCell padding="normal">{ user?.username }</TableCell>


      <TableCell padding="normal">
        <Chip sx={{textTransform: "capitalize"}} label={user.isVerified.toString()} color={getColor(user.isVerified)} />
      </TableCell>

      <TableCell padding="normal">
        <Chip sx={{textTransform: "capitalize"}} label={(!user.isDeleted).toString()} color={getColor(!user.isDeleted)} />
      </TableCell>

      <TableCell padding="normal">{format(new Date(user.createdAt), 'dd MMM yyyy')}</TableCell>

      <TableCell padding="normal" align="right">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          <TableMoreMenuItem
            Icon={RemoveRedEye}
            title={t("view")}
            handleClick={() => {
              handleCloseOpenMenu()
              hanleViewOpen(user);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(user);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              showConfirmation(t("are_you_sure"), user.id); 
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
