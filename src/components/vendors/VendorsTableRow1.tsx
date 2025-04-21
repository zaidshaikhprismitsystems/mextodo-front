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
import { product_url } from "../../config/config"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmToast } from '../confirm-toast'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress } from '@mui/material'
import Toast from '../../utils/toast'

interface RowProps {
  vendor: any
  isSelected: boolean
  handleDeleteVendor: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (product: any) => void
  hanleEditOpen: (product: any) => void
  handleAccept: (id: number) => void
  handleReject: (id: number) => void
  loader: boolean
}

export default function TicketsTableRow({
  vendor,
  isSelected,
  handleSelectRow,
  handleDeleteVendor,
  hanleViewOpen,
  hanleEditOpen,
  handleAccept,
  handleReject,
  loader
}: RowProps) {

  const navigate = useNavigate()
  const { t } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)
  const [message, setMessage] = useState("");

  // const [deleteVendor, setDeleteVendor] = useState<number>(0);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }

  const handleConfirm = (id: number) => {
    handleDeleteVendor(id);
  }

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

  const [ currentVendorId , setCurrentVendorId ] = useState<any>();

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, vendor.id)}
        />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar
            variant="rounded"
            alt={vendor.vendorFullName}
            // src={`${product_url}/${product.featuredImage}`}
            sx={{ width: 50, height: 50 }}
          />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
            >
              { vendor.vendorFullName }
            </Paragraph>
            <Paragraph fontSize={13}>
              { vendor.storeLocation }
            </Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{vendor.storeName}</TableCell>

      <TableCell padding="normal">
        {vendor.whatsappNumber}
      </TableCell>

      <TableCell padding="normal">{vendor.email}</TableCell>

      <TableCell padding="normal">
        {
          loader && currentVendorId === vendor.id ? <CircularProgress size={18} /> :
          vendor.status === "pending" ?
          <Box sx={{display: "flex"}}>
            <Button 
            onClick={() => {
              setCurrentVendorId(vendor.id);
              Toast.showConfirmation(
                  <ConfirmToast 
                    message={t("are_you_sure")} 
                    onConfirm={() => handleAccept(vendor.id)} 
                    onCancel={handleCancel}
                  />
                ) 
              }} 
              sx={{outline: "none", background: "none", color: "primary.main"}}><DoneIcon /></Button>
            <Button 
            onClick={() => { handleReject(vendor.id) }}
              sx={{outline: "none", background: "none", color: "primary.main"}}><CloseIcon /></Button>
          </Box>
          :
          <Chip sx={{textTransform: "capitalize"}} label={t(vendor.status)} color={getColor(vendor.status)} />
        }
      </TableCell>

      <TableCell padding="normal">{vendor.availableBalance}</TableCell>

      <TableCell padding="normal">{format(new Date(vendor.createdAt), 'dd MMM yyyy')}</TableCell>

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
              hanleViewOpen(vendor);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(vendor);
            }}
          />
          {
            vendor.status !== "suspended" ?
            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("delete")}
              handleClick={() => {
                handleCloseOpenMenu()
                Toast.showConfirmation(
                  <ConfirmToast 
                    message={t("are_you_sure")} 
                    onConfirm={() => handleConfirm(vendor.id)} 
                    onCancel={handleCancel}
                  />
                )
              }}
            />
            : ''
          }
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
