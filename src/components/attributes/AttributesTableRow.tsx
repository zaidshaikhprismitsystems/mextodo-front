import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
// MUI
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
// MUI ICON COMPONENTS
import Edit from '@mui/icons-material/Edit'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
// CUSTOM COMPONENTS
import { Paragraph } from '../typography'
import { TableMoreMenuItem, TableMoreMenu } from '../table'
// import { Attribute_url } from "../../config/config"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'
import { ConfirmToast } from '../confirm-toast'

interface RowProps {
  attribute: any
  isSelected: boolean
  handleDeleteAttributes: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (Attributes: any) => void
  hanleEditOpen: (Attributes: any) => void
}

export default function AttributesTableRow({
  attribute,
  isSelected,
  handleSelectRow,
  handleDeleteAttributes,
  hanleViewOpen,
  hanleEditOpen
}: RowProps) {

  const { t, i18n } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleConfirm = (id: number) => {
    handleDeleteAttributes(id);
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

  const getColor = (status: string) => {
    switch (status) {
      case "enabled":
        return "primary"
        break;
      case "disabled":
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
          onClick={(event) => handleSelectRow(event, attribute.id)}
        />
      </TableCell>

      <TableCell padding="normal">
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
            >
              { i18n.language === "en" ? attribute.nameEn : attribute.nameSp }
            </Paragraph>
      </TableCell>

      <TableCell padding="normal">{attribute._count.categoriesAttribute}</TableCell>

      <TableCell padding="normal">
        <Chip sx={{textTransform: "capitalize"}} label={t(attribute.status)} color={getColor(attribute.status)} />
      </TableCell>

      <TableCell padding="normal">{format(new Date(attribute.createdAt), 'dd MMM yyyy')}</TableCell>

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
              hanleViewOpen(attribute);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(attribute);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              showConfirmation(t("are_you_sure"), attribute.id); 
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
