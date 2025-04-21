import { MouseEvent, useState } from 'react'
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
import { product_url } from "../../config/config"
import { UserRole } from '../../utils/enums' 
import CloseIcon from '@mui/icons-material/Close';

interface RowProps {
  product: any
  isSelected: boolean
  handleDeleteProduct: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (product: any) => void
  hanleEditOpen: (product: any) => void
  handleAccept: (id: number) => void
  handleReject: (id: number) => void
  loader: boolean
}

import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { useAppSelector } from '../../services/store/hooks/hooks'
import { RootState } from '../../services/store/store'
import { Button, CircularProgress, Stack } from '@mui/material'
import DoneIcon from '../../icons/DoneIcon'
import Toast from '../../utils/toast'
import { ConfirmToast } from '../confirm-toast'

export default function ProductTableRow({
  product,
  isSelected,
  handleSelectRow,
  handleDeleteProduct,
  hanleViewOpen,
  hanleEditOpen,
  handleAccept,
  handleReject,
  loader
}: RowProps) {
  
  const userData: any = useAppSelector((state: RootState) => state.user)
  
  const { i18n } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const [currentProductId, setCurrentProductId] = useState<any>();

  const [deleteProduct, setDeleteProduct] = useState<number>(0);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleConfirm = (id: number) => {
    handleDeleteProduct(id);
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
      case "pending":
        return "warning"
        break;
      case "approved":
        return "primary"
        break;
        case "rejected":
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
          onClick={(event) => handleSelectRow(event, product.id)}
        />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar
            variant="rounded"
            alt={product?.featuredImage}
            src={`${product_url}/${product?.featuredImage}`}
            sx={{ width: 50, height: 50 }}
          />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
            >
              { i18n.language === "en" ? product.titleEn : product.titleSp }
            </Paragraph>
            <Paragraph fontSize={13}>
              { i18n.language === "en" ? product.category.nameEn : product.category.nameSp }
            </Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{format(new Date(product.createdAt), 'dd MMM yyyy')}</TableCell>

      <TableCell padding="normal" sx={{ ...(product.stock === 0 && product.category.nameEn !== "Digital" && { color: 'error.main' }) }}>
        { product.category.nameEn === "Digital" ? '-' : product.stock}
      </TableCell>

      <TableCell padding="normal">${product.price}</TableCell>

      <TableCell padding="normal">
        {
          userData && userData?.userDetails.role === UserRole.SUPER_ADMIN && product.status === "pending" ?
          loader && currentProductId ===  product.id ?
          <CircularProgress />
          : 
          <Stack  direction="row" spacing={2} >
              <Button 
                variant='outlined'
                color='error'
                size='small'
                onClick={() => { handleReject(product.id) }}
                sx={{minWidth:'auto', '&:hover':{borderColor:'var(--variant-outlinedBorder) !important',},}}><CloseIcon sx={{fontSize:18}} />
              </Button>
              <Button
                variant='outlined'
                color='success'
                size='small'
                onClick={() => {
                  Toast.showConfirmation(
                    <ConfirmToast
                      message={t("are_you_sure")}
                      onConfirm={() => handleAccept(product.id)}
                      onCancel={handleCancel}
                    />
                  )
                }}
                sx={{'&:hover':{borderColor:'var(--variant-outlinedBorder) !important',},}}><DoneIcon sx={{fontSize:18}}/> Approve</Button>

            </Stack>
          :
          <Chip sx={{textTransform: "capitalize"}} label={t(product.status)} color={getColor(product.status)} />
        }
      </TableCell>

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
              hanleViewOpen(product);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(product);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              setDeleteProduct(product.id)
              showConfirmation(t("are_you_sure"), product.id); 
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
