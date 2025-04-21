import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import { category_url } from "../../config/config"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from '../confirm-toast'

interface RowProps {
  categories: any
  isSelected: boolean
  handleDeleteCategories: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (categories: any) => void
  hanleEditOpen: (categories: any) => void
}

export default function CategoriesTableRow({
  categories,
  isSelected,
  handleSelectRow,
  handleDeleteCategories,
  hanleViewOpen,
  hanleEditOpen
}: RowProps) {
  
  const { t, i18n } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleConfirm = (id: number) => {
    handleDeleteCategories(id);
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
          onClick={(event) => handleSelectRow(event, categories.id)}
        />
      </TableCell>
      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar
            variant="rounded"
            alt={categories.image}
            src={`${category_url}/${categories.image}`}
            sx={{ width: 50, height: 50 }}
          />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
            >
              { i18n.language === "en" ? categories.nameEn : categories.nameSp }
            </Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal" sx={{ ...(categories.stock === 0 && { color: 'error.main' }) }}>
        { i18n.language === "en" ? categories.descriptionEn.substr(0, 50) : categories.descriptionSp.substr(0, 50) }
      </TableCell>

      <TableCell padding="normal">{categories._count.products}</TableCell>

      <TableCell padding="normal">
      <Chip sx={{textTransform: "capitalize"}} label={t(categories.status)} color={getColor(categories.status)} />
      </TableCell>

      <TableCell padding="normal">{format(new Date(categories.createdAt), 'dd MMM yyyy')}</TableCell>

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
              hanleViewOpen(categories);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(categories);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              showConfirmation(t("are_you_sure"), categories.id); 
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
