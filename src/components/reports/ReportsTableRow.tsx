import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
// MUI
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
// CUSTOM COMPONENTS
import FlexBox from '../flexbox/FlexBox'
import { Paragraph } from '../typography'
import { TableMoreMenuItem, TableMoreMenu } from '../table'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'
import { ConfirmToast } from '../confirm-toast'
import { product_url, user_url } from '../../config/config'

interface RowProps {
  entity: any;
  report: any
  isSelected: boolean
  handleDeleteAttributes: (id: number) => void
  handleSelectRow: (_: MouseEvent, id: number) => void
  hanleViewOpen: (Attributes: any) => void
  hanleEditOpen: (Attributes: any) => void
}

export default function ReportsTableRow({
  entity,
  report,
  isSelected,
  handleSelectRow,
  handleDeleteAttributes,
  hanleViewOpen,
  hanleEditOpen
}: RowProps) {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const [deleteAttributes, setDeleteAttributes] = useState<number>(0);

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

  const getImage = (img: any) => {
    if(entity == 'products'){
      return `${product_url}/${img}`
    }
    if(entity == 'users'){
      return `${user_url}/${img}`
    }
    if(entity == 'owners'){
      return `${user_url}/${img}`
    }
  }

  const getEnableDisable = (status: any) => {
    switch (status) {
      case true:
        return "success"
        break;
      case false:
        return "error"
        break;
      return "default"
      break;
    }
  }

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, report.id)}
        />
      </TableCell> */}

    <TableCell padding="normal">
      <FlexBox alignItems="center" gap={2}>
        <Avatar
          variant="rounded"
          alt={
            entity === 'products' ? report?.featuredImage :
            entity === 'orders' ? report?.customer?.avatar ?? 'user' :
            report?.avatar
          }
          src={getImage(
            entity === 'products'
              ? report?.featuredImage
              : entity === 'orders'
                ? report?.customer?.avatar
                : report?.avatar
          )}
          sx={{ width: 50, height: 50 }}
        />
        <div>
          <Paragraph
            fontWeight={500}
            color="text.primary"
            sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' }, textTransform: "capitalize" }}
          >
            {
              entity === 'products'
                ? (i18n.language === "en" ? report?.titleEn ?? 'N/A' : report?.titleSp ?? 'N/A')
                : entity === 'users' || entity === 'owners'
                  ? `${report?.firstName || ''} ${report?.lastName || ''}`.trim() || 'User'
                  : entity === 'orders'
                    ? report?.customer?.username ?? 'Customer'
                    : 'N/A'
            }
          </Paragraph>
        </div>
      </FlexBox>
    </TableCell>


    <TableCell padding="normal"> 
      {
        entity === "products"
          ? (i18n.language === "en" ? report?.category?.nameEn ?? 'N/A' : report?.category?.nameSp ?? 'N/A')
          : (entity === "users" || entity === 'owners')
            ? report?.username ?? 'N/A'
            : entity === 'orders'
              ? report?.vendor?.vendorFullName // Format as needed
              : 'N/A'
      }
    </TableCell>

    {
      entity === "orders" && (
      <TableCell padding="normal">
      MX$ {report?.totalPrice?.toFixed(2)}
      </TableCell>
      )
    }

    <TableCell padding="normal">
      <Chip
        sx={{ textTransform: "capitalize" }}
        label={t(
          entity === "products"
            ? report?.status ?? 'N/A'
            : entity === "orders"
              ? report?.status ?? 'N/A'
              : report?.isVerified === true
                ? "verified"
                : "not_verified"
        )}
        color={
          entity === 'products'
            ? getColor(report?.status)
            : entity === 'orders'
              ? getColor(report?.status)
              : getEnableDisable(report?.status)
        }
      />
    </TableCell>
    
    <TableCell padding="normal">
      {report?.createdAt ? format(new Date(report.createdAt), 'dd MMM yyyy') : 'N/A'}
    </TableCell>


      {/* <TableCell padding="normal" align="right">
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
              hanleViewOpen(report);
            }}
          />
          <TableMoreMenuItem
            Icon={Edit}
            title={t("edit")}
            handleClick={() => {
              handleCloseOpenMenu();
              hanleEditOpen(report);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title={t("delete")}
            handleClick={() => {
              handleCloseOpenMenu()
              setDeleteAttributes(attribute.id)
              showConfirmation(t("are_you_sure"), attribute.id); 
            }}
          />
        </TableMoreMenu>
      </TableCell> */}
    </TableRow>
  )
}
