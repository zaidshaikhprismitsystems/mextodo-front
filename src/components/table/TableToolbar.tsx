import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
// MUI ICON COMPONENT
import Delete from '@mui/icons-material/Delete'
// CUSTOM COMPONENT
import { Paragraph } from '../typography'
import { ConfirmToast } from '../confirm-toast'

// ==============================================================
interface TableToolbarProps {
  selected: number
  handleDeleteRows: () => void
}
// ==============================================================

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'


const showConfirmation = (message: any, onConfirm: any, onCancel: any) => {
  toast(
    <ConfirmToast 
      message={message} 
      onConfirm={onConfirm} 
      onCancel={onCancel} 
    />, 
    { autoClose: false, closeOnClick: false }
  );
};

export default function TableToolbar({ selected, handleDeleteRows }: TableToolbarProps) {

  const handleConfirm = () => handleDeleteRows();
  const handleCancel = () => alert("Cancelled!");
  const { t } = useTranslation();

  return (
    <Toolbar sx={{ backgroundColor: 'action.selected' }}>
      <Paragraph fontWeight={600} flex="1 1 100%" color="inherit">
        {selected} {t("selected")}
      </Paragraph>

      <Tooltip title={t("delete")}>
        <IconButton onClick={() => showConfirmation(t("are_you_sure"), handleConfirm, handleCancel)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
